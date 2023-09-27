import fs from 'fs';
import { adminDb } from './firebaseAdminConfig.js';

function processAudioFeatures() {
  // Step 1: Load the JSON Data
  const rawData = fs.readFileSync('./dummyAudioFeatures.json', 'utf-8');
  const jsonData = JSON.parse(rawData);

  // Assuming the JSON structure has an "audio_features" key that contains an array of tracks
  const audioFeatures = jsonData['audio_features'];

  // Step 2: Map the Data
  const mappedData = audioFeatures.map((track) => {
    return {
      id: track.id,
      acousticness: track.acousticness,
      danceability: track.danceability,
      energy: track.energy,
      instrumentalness: track.instrumentalness,
      liveness: track.liveness,
      loudness: track.loudness,
      valence: track.valence,
    };
  });

  console.log(mappedData);

  // Push Data to Firebase
  const collection = adminDb.collection('audioFeatures');
  mappedData.forEach(async (track) => {
    try {
      await collection.doc(track.id).set(track);
      console.log(`Added track with ID: ${track.id}`);
    } catch (error) {
      console.error(`Error adding track with ID: ${track.id}. Error: ${error}`);
    }
  });
}

processAudioFeatures();
