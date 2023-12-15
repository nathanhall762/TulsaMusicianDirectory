import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import fetch from 'node-fetch';
// get musicians from firestore via cloud function
const firebaseConfig = {
  apiKey: 'AIzaSyDi5Aj2hQ0JbgVQye9lQnuT1guMe20oPeA',
  authDomain: 'tulsamusiciandirectory.firebaseapp.com',
  projectId: 'tulsamusiciandirectory',
  storageBucket: 'tulsamusiciandirectory.appspot.com',
  messagingSenderId: '425159254629',
  appId: '1:425159254629:web:57799f514d26f94eb69c8c',
  measurementId: 'G-Y5YWNPZ679',
};
initializeApp(firebaseConfig);
const db = getFirestore();

const clientId = '38f1ee602dbe4bffbb05672320a597f1';
const clientSecret = 'f0341666a7764b2dbe5dee8f8259812f';
const REDIRECT_URI = 'https://musicintulsa.com/callback';
const spotifyToken =
  'BQC2bNXGkmmn475dQCsP_y6Hi5EeK6cKnXOpslDMvIOosVyRD3rzpN7SQvFeXR-CIlXMD0uO96yOEYLEaHWtI8opfuvnafKq7g2T-x9_gGcND9VPqkhRPeG9CvNF_SM_MZZ-VSlEEQ_EqLsEG2Ufe0f4tIiHVh5fodYMVUpIAx8bUN4zsmib6nhfG0DP0hy3L8KegpXNFPdbeyt5voTxNjZX6Nm_dgsVTg';

// Function to get Spotify access token
async function getSpotifyAccessToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${REDIRECT_URI}`,
    });
    const data = await response.json();
    console.log(`Token: ${data.access_token}`);
    return data.access_token;
  } catch (error) {
    console.error('Error fetching token', error);
  }
}

// Function to get top tracks for a musician
async function getTopTracksForMusician(musicianId, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${musicianId}/top-tracks?country=US`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();

  // Check if tracks exist in the response
  if (!data.tracks || !Array.isArray(data.tracks)) {
    console.error('Unexpected response structure:', data);
    return []; // Return an empty array to handle this gracefully
  }

  return data.tracks.map((track) => track.id);
}

// Function to create a Spotify playlist
async function createPlaylist(userId, name, description, trackIds, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
        public: true,
      }),
    }
  );
  const playlist = await response.json();

  // Add tracks to the playlist
  await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uris: trackIds.map((id) => `spotify:track:${id}`) }),
  });

  return playlist;
}

// Function to get Spotify Artist ID from URL
function extractSpotifyIdFromUrl(spotifyUrl) {
  const urlParts = spotifyUrl.split('/');
  const spotifyId = urlParts[urlParts.length - 1].split('?')[0]; // Extracting the ID
  return spotifyId;
}

// Main function
async function main() {
  // const spotifyToken = await getSpotifyAccessToken();
  if (spotifyToken === undefined) {
    throw new Error('No access token returned from Spotify');
  }
  const genresSet = new Set();

  // Fetch all musicians and populate genres
  const musiciansSnapshot = await getDocs(collection(db, 'musicians'));
  musiciansSnapshot.forEach((doc) => {
    const musician = doc.data();
    if (musician.genre) {
      genresSet.add(musician.genre.toString());
    }
  });
  const genres = Array.from(genresSet);

  for (const genre of genres) {
    const trackIds = [];

    for (const doc of musiciansSnapshot.docs) {
      const musician = doc.data();
      const musicianGenre = musician.genre.toString().trim().toLowerCase();
      const comparingGenre = genre.trim().toLowerCase();

      if (musicianGenre === comparingGenre) {
        if (musician.music && musician.music.spotify) {
          const spotifyId = extractSpotifyIdFromUrl(musician.music.spotify);
          const musicianTracks = await getTopTracksForMusician(
            spotifyId,
            spotifyToken
          );
          trackIds.push(...musicianTracks);
        }
      }
    }

    console.log(`Found ${trackIds.length} tracks for ${genre}`);
    console.log(`Found these tracks: ${trackIds} for ${genre}`);

    // Randomize track IDs
    trackIds.sort(() => Math.random() - 0.5);

    // Limit to 100 tracks
    trackIds.length = Math.min(trackIds.length, 100);

    if (trackIds.length > 0) {
      // Create playlist and log the response
      const playlistResponse = await createPlaylist(
        '1261952453',
        `Tulsa ${genre} by musicintulsa.com`,
        `${genre} music from today's local Tulsa musicians. Discover these artists and more at musicintulsa.com!`,
        trackIds,
        spotifyToken
      );
    }

    console.log(`Playlist created for genre '${genre}'`);
  }
}

main().catch(console.error);
