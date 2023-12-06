import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';
import { initializeApp } from 'firebase-admin/app';
import axios from 'axios';
import * as functions from 'firebase-functions';

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

// const userID = "fn0rtrc63vt562leulqnw0kqf"; // hard coded for testing purposes


let fetchType = ""; // will be either "artist", "album", or "playlist"
let spotifyURL = "https://api.spotify.com/v1";


// cheesing temp tokens....

let token: string = '';
let tokenTimestamp: number = 0;

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
    token = response.data.access_token;

  } catch (error) {
    console.error(`Error getting access token: ${error}`);
    token = "error getting token";
  }

  return token;
}

export const getSpotifyData = functions.https.onRequest(async (request, response) => {
  // recieve the body of the request (json object), and store it to a variable
  const requestBody = JSON.parse(request.body);

  // Generate a token if one doesn't exist or is expired
  const currentTime = new Date().getTime();
  if (!token || currentTime - tokenTimestamp > 3600000) {
    token = await getSpotifyToken();
    tokenTimestamp = currentTime;
  }

  // Define headers
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // cant work on an empty array! :)
  if (!requestBody) {
    throw new HttpsError('unauthenticated', 'requestBody is null or undefined');
  }

  let songIDs = []; // array to store the songIDs from the spotify response

  // iterate through all objects in requestBody
  for (let i = 0; i < requestBody.length; i++) {
    let idType = requestBody[i].idType;

    // switch statement to determine what endpoint to hit based on the idType
    switch (idType) {
      case "artist":
        fetchType = `artists/${requestBody[i].objectID}/top-tracks?market=US`;
        break;
      case "album":
        fetchType = `albums/${requestBody[i].objectID}/tracks`;
        break;
      case "playlist":
        fetchType = `playlists/${requestBody[i].objectID}/tracks`;
        break;
      default:
        throw new HttpsError('unauthenticated', 'idType is null or undefined or something else, idk man...');
    }

    // get the id from the requestBody
    let requestURL = `${spotifyURL}/${fetchType}`;

    // make the request to spotify
    const spotifyResponse = await axios.get(requestURL, { headers });

    // if the response is empty, throw an error
    if (!spotifyResponse) {
      throw new HttpsError('unauthenticated', 'spotifyResponse is null or undefined');
    }

    // change how we get the songIDs based on the idType
    if (idType === "playlist") {
      if (spotifyResponse.data.items) {
        for (let j = 0; j < spotifyResponse.data.items.length; j++) {
          songIDs.push(spotifyResponse.data.items[j].track.id);
        }
      }
    } else {
      if (spotifyResponse.data.tracks) {
        for (let j = 0; j < spotifyResponse.data.tracks.length; j++) {
          songIDs.push(spotifyResponse.data.tracks[j].id);
        }
      }
    }

  }; // end of for loop

  // get song metrics from spotify for each songID
let songMetrics: any = [];
let promises = songIDs.map(songID => {
  let songURL = `${spotifyURL}/audio-features/${songID}`;
  return axios.get(songURL, { headers });
});

let responses = await Promise.all(promises);

responses.forEach(songResponse => {
  // only push the data we need to the songMetrics array:
  songMetrics.push({
    "danceability": songResponse.data.danceability,
    "energy": songResponse.data.energy,
    "key": songResponse.data.key,
    "loudness": songResponse.data.loudness,
    "mode": songResponse.data.mode,
    "speechiness": songResponse.data.speechiness,
    "acousticness": songResponse.data.acousticness,
    "instrumentalness": songResponse.data.instrumentalness,
    "liveness": songResponse.data.liveness,
    "valence": songResponse.data.valence,
    "tempo": songResponse.data.tempo
  });
});

// send the songMetrics back to the client
console.log(`List of Song Metrics: ${songMetrics}`)
response.send(songMetrics);

});
