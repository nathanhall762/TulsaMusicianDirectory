// import fs from 'fs';
import { adminDb } from './firebaseAdminConfig.js';
import TrackFeatures from './getSpotifyAudioFeatures.js';


async function getSpotifyAudioFeatures() {
  const t = new TrackFeatures({
    clientId: '770a806687ce48e5ab4c7e134c808978',
    clientSecret: 'fdb111df508f41ff82b50e5fcb080ef6',
  });
  await t.createToken();

  // TODO: get all artist ids from musicians collection in firestore
  // currently, we're just using one artist id
  const artistsId = ['5TjSLDEdLdGrrG4I7yyAVl', '5TjSLDEdLdGrrG4I7yyAVl'];
  const features = await t.getAllTrackFeatures(artistsId);
  // const features = await t.getFeaturesFromArtist(artistsId);



  // processAudioFeatures(features);

  features.map(processAudioFeatures)

  // const stuff = await t.getFeaturesFromArtist('5TjSLDEdLdGrrG4I7yyAVl');
  // console.log('the features:', stuff);
}

function processAudioFeatures(audioFeatures) {
  // console.log(typeof(audioFeatures)); // object
  // console.log(audioFeatures); // expected return of audiofeatures
  
  // Flatten the data structure
  const flattenedData = audioFeatures.flatMap(item => item.audio_features);
  
  // Map the Data
  const mappedData = flattenedData.map((track) => {
    console.log(track)
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

  // Push Data to Firebase
  const collection = adminDb.collection('audioFeatures');
  mappedData.forEach(async (track) => {
    try {
      if (!track.id) {
        console.error(`Track ID is undefined for track: ${JSON.stringify(track)}`);
        return;
      }
      await collection.doc(track.id).set(track);
      console.log(`Added track with ID: ${track.id}`);
    } catch (error) {
      console.error(`Error adding track with ID: ${track.id}. Error: ${error}`);
    }
  });
}

getSpotifyAudioFeatures();
