import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';
import { initializeApp } from 'firebase-admin/app';
import axios from 'axios';
import * as functions from 'firebase-functions/v2';

initializeApp();
import * as admin from 'firebase-admin';

const auth = admin.auth();
// const db = admin.firestore();

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
// response.send(songMetrics);

// hard code some return data for testing purposes
let returnData = [
  {
    "name": "Heartwerk",
    "genre": ["Electronic"],
    "profileImage": "https://firebasestorage.googleapis.com/v0/b/tulsamusiciandirectory.appspot.com/o/images%2Fwebp%2FHeartwerk4612d57e-a4ad-4101-b199-4dbdb3707152_300x300?alt=media",
    "music": {
      "spotify": "https://open.spotify.com/artist/6EMckwNYOHjvVrG4XfUjP6"
    },
    "social": {
      "instagram": "https://www.instagram.com/heartwerkdj/",
      "facebook": "https://www.facebook.com/heartwerkDJ/"
    }
  },
  {
    "name": "MR. BURNS aka Earl Hazard",
    "genre": ["Hip-Hop/Rap"],
    "profileImage": "https://firebasestorage.googleapis.com/v0/b/tulsamusiciandirectory.appspot.com/o/images%2Fwebp%2FMR.%20BURNS%20aka%20Earl%20Hazard5a09f695-c77f-44ab-a534-6c398fcdbf80_300x300?alt=media",
    "music": {
      "spotify": "https://open.spotify.com/artist/5TjSLDEdLdGrrG4I7yyAVl"
    },
    "social": {
      "instagram": "https://www.instagram.com/318me918/",
      "facebook": "https://www.facebook.com/318me918/"
    }
  },
  {
    "name": "Sami",
    "genre": ["EDM"],
    "profileImage": "https://firebasestorage.googleapis.com/v0/b/tulsamusiciandirectory.appspot.com/o/images%2Fwebp%2FSami4c7c249b-3e0c-4f2c-8dc8-fe87ff9ab60a_300x300?alt=media",
    "music": {
      "spotify": "https://open.spotify.com/artist/3tPK5Zq40UzieZqF70is3r"
    },
    "social": {
      "instagram": "https://instagram.com/iamsami_official",
      "facebook": "https://www.facebook.com/iamsamiofficialmusic"
    }
  },
  {
    "name": "Jsung",
    "genre": ["Electronic"],
    "profileImage": "https://firebasestorage.googleapis.com/v0/b/tulsamusiciandirectory.appspot.com/o/images%2Fwebp%2FJsunga8cdaf9c-ce53-4cfe-8b31-62510e4c3f08_300x300?alt=media",
    "music": {
      "spotify": "https://open.spotify.com/artist/0HtF4dROQ1PBsuPQkGsSsy"
    },
    "social": {
      "instagram": "https://instagram.com/jsung_______"
    }
  },
  {
    "name": "Madame Zeroni",
    "genre": ["R&B"],
    "profileImage": "https://firebasestorage.googleapis.com/v0/b/tulsamusiciandirectory.appspot.com/o/images%2Fwebp%2FMadame%20Zeronie6ad2959-2a26-4940-9dd0-7fcd657a125c_300x300?alt=media",
    "music": {
      "spotify": "https://open.spotify.com/artist/7ygFiWl5xP7rBqq7WyO8ro"
    },
    "social": {
      "instagram": "https://www.instagram.com/mad.zero.ni/",
      "facebook": "https://www.facebook.com/InvisibleFM/",
      "tiktok": "https://www.tiktok.com/@zeroni_if_only?lang=en"
    }
  },
  {
    "name": "dj noname.",
    "genre": ["Hip-Hop/Rap"],
    "profileImage": "https://firebasestorage.googleapis.com/v0/b/tulsamusiciandirectory.appspot.com/o/images%2Fwebp%2Fdj%20noname.ff84be32-4f8e-44a6-83f8-1715f9fa90a4_300x300?alt=media",
    "music": {
      "spotify": "https://open.spotify.com/artist/0Hrsf2DzWUdrSWgdIZ4kd4"
    },
    "social": {
      "facebook": "",
      "instagram": ""
    }
  },
  {
    "name": "Fatso and the Spacewhistle",
    "genre": ["Electronic"],
    "profileImage": "https://firebasestorage.googleapis.com/v0/b/tulsamusiciandirectory.appspot.com/o/images%2Fwebp%2FFatso%20and%20the%20Spacewhistle27746a9f-2e3c-4c7e-86f0-13a6832d6152_300x300?alt=media",
    "music": {
      "spotify": "https://open.spotify.com/artist/1twfgTow5e4NKPiteBBToL"
    },
    "social": {
      "instagram": "https://www.instagram.com/fatsoband/?hl=en"
    }
  },
  {
    "name": "Petty Fox",
    "genre": ["Electronic"],
    "profileImage": "https://firebasestorage.googleapis.com/v0/b/tulsamusiciandirectory.appspot.com/o/images%2Fwebp%2FPetty%20Fox8aa91853-7090-4c78-a9f5-93ab5391cb40_300x300?alt=media",
    "music": {
      "spotify": "https://open.spotify.com/artist/40E0Ed3SRgeOxwXXWjQlPU"
    },
    "social": {
      "instagram": "https://www.instagram.com/pettyfoxloop/",
      "facebook": "https://m.facebook.com/profile.php/?id=100063576729623"
    }
  }
];

console.log("Hardcoded value returned");
// send hardcoded data back to the client
response.send(returnData);
});

export const getMusicians = onCall(async (request) => {
  return { some: 'info' };
});
