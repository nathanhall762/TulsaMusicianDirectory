import fs from 'fs';
import { adminDb } from './firebaseAdminConfig.js';

async function processRelatedArtists() {
  // Step 1: Load the JSON Data
  const rawData = fs.readFileSync('./dummyRelatedArtists.json', 'utf-8'); // Assuming the filename is dummyRelatedArtists.json
  const jsonData = JSON.parse(rawData);

  const seedArtist = jsonData['seed_artist'];
  const artists = jsonData['artists'];

  // Step 2: Map the Data
  const mappedArtists = artists.map(artist => {
    return {
      id: artist.id,
      name: artist.name,
    };
  });

  // Push Data to Firebase
  const collection = adminDb.collection('relatedArtists');
  try {
    await collection.doc(seedArtist).set({ related: mappedArtists });
    console.log(`Added related artists for seed artist ID: ${seedArtist}`);
  } catch (error) {
    console.error(`Error adding related artists for seed artist ID: ${seedArtist}. Error: ${error}`);
  }
}

processRelatedArtists();
