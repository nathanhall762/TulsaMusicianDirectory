import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';
import { initializeApp } from 'firebase-admin/app';
import axios from 'axios';
import * as functions from 'firebase-functions/v2';
import * as cors from 'cors';

const corsHandler = cors({origin: ['http://localhost:5173', 'http://musicintulsa.com', 'http://tulsamusiciandirectory.com']});

initializeApp();
import * as admin from 'firebase-admin';

const auth = admin.auth();
const db = admin.firestore();

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

export const getSpotifyData = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
  // recieve the body of the request (json object), and store it to a variable
  const requestBody = JSON.parse(request.body);

  // counter for the number of requests made to spotify
  let requestCounter = 0;

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

  let songIDs: any = []; // array to store the songIDs from the spotify response

  let artistIDs = [];
  let albumIDs = [];
  let playlistIDs = [];

  // iterate through all objects in requestBody
  for (let i = 0; i < requestBody.length; i++) {
    let idType = requestBody[i].idType;

    // switch statement to sort the IDs into their respective arrays
    switch (idType) {
      case "artist":
        artistIDs.push(requestBody[i].objectID);
        break;
      case "album":
        albumIDs.push(requestBody[i].objectID);
        break;
      case "playlist":
        playlistIDs.push(requestBody[i].objectID);
        break;
      default:
        throw new HttpsError('unauthenticated', 'idType is null or undefined or something else, idk man...');
    }
  }; // end of for loop

  // handle the artistIDs if there are any
  if(artistIDs.length > 0) {
    // for each artist id, get their top tracks' song ids and push them to the songIDs array
    for (let i = 0; i < artistIDs.length; i++) {
      const artistTopTracksResponse = await axios.get(`${spotifyURL}/artists/${artistIDs[i]}/top-tracks?market=US`, { headers });

      // increment the request counter
      requestCounter++;

      artistTopTracksResponse.data.tracks.forEach((track: any) => {
        songIDs.push(track.id);
      });
    }
  }

  // handle the albumIDs
  if(albumIDs.length > 0) {
    // for each album id, get the album's tracks' song ids and push them to the songIDs array
    for (let i = 0; i < albumIDs.length; i++) {
      const albumTracksResponse = await axios.get(`${spotifyURL}/albums/${albumIDs[i]}/tracks`, { headers });

      // increment the request counter
      requestCounter++;

      albumTracksResponse.data.items.forEach((item: any) => {
        songIDs.push(item.id);
      });
    }
  }

  // handle the playlistIDs
  if(playlistIDs.length > 0) {
    // for each playlist id, get the playlist's tracks' song ids and push them to the songIDs array
    for (let i = 0; i < playlistIDs.length; i++) {
      const playlistTracksResponse = await axios.get(`${spotifyURL}/playlists/${playlistIDs[i]}/tracks?fields=items.track.id&limit=100`, { headers });

      // increment the request counter
      requestCounter++;

      // for each track in the items, push the track id to the songIDs array
      playlistTracksResponse.data.items.forEach((item: any) => {
        songIDs.push(item.track.id);
      });
    }
  }

  // get song metrics from spotify for each songID
let songMetrics: any = [];

// get song metrics from spotify in batch of 100
let fullSongMetrics: any = [];

// make sure all ids in songIDs are unique
songIDs = [...new Set(songIDs)];

// if songIDs is longer than 100, send in batches of up to 100
if(songIDs.length > 100) {
  for (let i = 0; i < songIDs.length; i += 100) {
    let songIDsBatch = songIDs.slice(i, i + 100);
    fullSongMetrics = await axios.get(`${spotifyURL}/audio-features?ids=${songIDsBatch}`, { headers });
    requestCounter++;

    // only push data we need to songMetrics array
    fullSongMetrics.data.audio_features.forEach((song: any) => {
      songMetrics.push({
        "danceability": song.danceability,
        "energy": song.energy,
        "loudness": song.loudness,
        "mode": song.mode,
        "acousticness": song.acousticness,
        "instrumentalness": song.instrumentalness,
        "liveness": song.liveness,
        "valence": song.valence
      });
    });
  }
}
else {
  fullSongMetrics = await axios.get(`${spotifyURL}/audio-features?ids=${songIDs}`, { headers });
  requestCounter++;
}

// only push data we need to songMetrics array
fullSongMetrics.data.audio_features.forEach((song: any) => {
  songMetrics.push({
    "danceability": song.danceability,
    "energy": song.energy,
    "loudness": song.loudness,
    "mode": song.mode,
    "acousticness": song.acousticness,
    "instrumentalness": song.instrumentalness,
    "liveness": song.liveness,
    "valence": song.valence
  });
});

// send the songMetrics back to the client
console.log(`List of Song Metrics: ${songMetrics}`)
// response.send(songMetrics);

// hard code some return data for testing purposes
let hardCodedData = [
  "0J7CpIAISgYMRE2U5srb",
  "2mGYEbLOtcSebv2Ufwiz",
  "2pHruAGajA52930AmpFJ",
  "3hYfK9hngUq6ib4MXSBq",
  "3yKi215ZuU1ROWSWe8qc"
];

// turn responsecounter into a string and log it
let requestCounterString = requestCounter.toString();
console.log(`Number of requests made to Spotify: ${requestCounterString}`);

// response.send(requestCounterString);

console.log("Hardcoded value returned");
// send hardcoded data back to the client
response.send(hardCodedData);
  });
});

export const getMusicians = onCall(async (request) => {
  const snapshot = await db.collection('musicians').get();
  const musicianData = snapshot.docs.map((doc) => doc.data());

  return { musicianData };
});

export const getPendingMusicians = onCall(async (request) => {
  const snapshot = await db.collection('pendingMusicians').get();
  const pendingMusicians = snapshot.docs.map((doc) => doc.data());

  return { musicianData: pendingMusicians };
});

export const addMusicianPending = onCall(async (request) => {
  const formData = request.data.formData;
  const profileImage = request.data.profileImage;

  const collection = db.collection('pendingMusicians');
  const docRef = await collection.add({ ...formData, profileImage });
  log('add successful: ', docRef);
  return { success: true, id: docRef.id };
});

export const approveMusician = onCall(async (request) => {
  const formData = request.data.formData;
  const profileImage = request.data.profileImage;
  const musicianName = request.data.musicianName;

  const collection = db.collection('musicians');
  const docRef = await collection.add({ ...formData, profileImage });
  log('add successful: ', docRef);

  // delete document from pending
  const pendingCollection = db.collection('pendingMusicians');
  const pendingSnapshot = await pendingCollection.get();
  const pendingMusicianDoc = pendingSnapshot.docs.find(
    (doc) => doc.data().name.toLowerCase() === musicianName
  );

  if (pendingMusicianDoc) {
    await pendingCollection.doc(pendingMusicianDoc.id).delete();
  }

  return { success: true, id: docRef.id };
});

export const getOnePending = onCall(async (request) => {
  const name = request.data.name;
  const snapshot = await db.collection('pendingMusicians').get();

  const doc = snapshot.docs.find(
    (doc) => doc.data().name.toLowerCase() === name
  );

  if (!doc) {
    return { docData: doc };
  }

  const docData = doc?.data();

  return { docData };
});
