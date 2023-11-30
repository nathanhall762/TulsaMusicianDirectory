import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';
import { initializeApp } from 'firebase-admin/app';
import axios from 'axios';
import { response } from 'express';

initializeApp();
import * as admin from 'firebase-admin';

const auth = admin.auth();

export const isAdmin = onCall(async (request) => {
  const uid = request.data.uid;

  if (!uid) {
    throw new HttpsError('unauthenticated', 'uid is null or undefined');
  }

  const user = await auth.getUser(uid);
  log('is user an admin??', user);

  const isAdmin = user.customClaims?.admin;

  return { isAdmin: isAdmin === true };
});











// This is where the schenanigans begin
//===================================================================================================


/**
 * Function called by the client to get the user's Spotify data.
 * Function recieves an array of song IDs from the client.
 */

// const userID = "fn0rtrc63vt562leulqnw0kqf"; // hard coded for testing purposes


let fetchType = ""; // will be either "artist", "album", or "playlist"
let spotifyURL = "https://api.spotify.com/v1";

// cheesing temp tokens....
async function getSpotifyToken(): Promise<string> {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials&client_id=347e584660014021ba91fa0f7c5e6ab2&client_secret=2ad42aab452e430fb11bba2f584292b1',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error(`Error getting access token: ${error}`);
    throw error;
  }
}

//  const APIRequestResults: string[] = []; // result to be sent to be converted to metrics
let data: JSON[] = []; // result to be sent to the client
const idList: JSON[] = []; // list of song IDs to get metrics from spotify
const metrics: JSON[] = []; // song metrics to be sent to the model

export const getSpotifyData = onCall(async (request) => {
  /**
   * we are gonna cheat a bit here. Im gonna generate an api token on call.
   * this is not the best way to do this, but it will work for now.
   */

  // take in json object from client
  const songIDs = request.data.songIDs; // will be an array of song IDs passed by the client.

  const token = await getSpotifyToken();


  // Define headers
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };


  // const songIDs = request.data.songIDs; // will be an array of song IDs passed by the client.

  if (!songIDs) {
    // if songIDs is null or undefined, throw an error to the client with the message "songIDs is null or undefined"
    throw new HttpsError("unauthenticated", "songIDs is null or undefined");
  }

  // iterate through all objects in songIDs
  songIDs.forEach((songID: any) => {

    // switch case to determine fetchType
    switch (songID.idType) {
      case "artist":
        fetchType = "artists";
        break;
      case "album":
        fetchType = "albums";
        break;
      case "playlist":
        fetchType = "playlists";
        break;
      default:
        // default to error
        throw new HttpsError("unauthenticated", "idType is not valid");
        break;
    }

    // make the request to the Spotify API
    let requestURL = `${spotifyURL}/${fetchType}/${songID.id}`;
    axios.get(requestURL, {
      headers: headers,
    })
      .then(axiosResponse => {
        // Success
        console.log(axiosResponse);

        // append response to result
        data.push(axiosResponse.data);
      })
      .catch(error => {
        // Error
        console.log(error);
      });
  }); // end forEach loop

  // For each item in jsonData, get the song ID and append it to idList
  data.forEach((item: any) => {
    idList.push(item.id);
  });

  // For each item in idList, get the song metrics (from spotify api) and append it to metrics
  idList.forEach(item => {
      // make the request to the Spotify API
      let requestURL = `${spotifyURL}/${fetchType}/${item}/audio-features`;
      axios.get(requestURL, {
          headers: headers,
          })
          .then(axiosResponse => {
              // Success
              console.log(axiosResponse);

              // append response to result
              metrics.push(axiosResponse.data);
          })
          .catch(error => {
              // Error
              console.log(error);
          });
  });


  response.status(200).send({
      statusCode: 200,
      data: metrics, // Send the data received from the Spotify API
  });
});