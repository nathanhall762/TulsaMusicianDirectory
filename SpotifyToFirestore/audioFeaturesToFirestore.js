// import fs from 'fs';
import { adminDb } from './firebaseAdminConfig.js';
import TrackFeatures from './getSpotifyAudioFeatures.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function updateImageUrls() {
  const musicianImages = await adminDb
    .collection('musicians')
    .get()
    .then((res) =>
      res.docs.map((doc) => {
        return {
          imageUrl: doc.data().profileImage,
          id: doc.id,
        };
      })
    );

  const newMusicianImages = musicianImages.map((image) => {
    const newUrl = image.imageUrl
      .replace('images%2F', 'images%2Fwebp%2F')
      .replace('?alt=media', '_300x300?alt=media')
      .replace(/&token=(.*)/, '');
    return {
      ...image,
      imageUrl: newUrl,
    };
  });
  console.log(newMusicianImages);

  const collection = adminDb.collection('musicians');

  const res = await Promise.all(
    newMusicianImages.map(
      (image) =>
        collection.doc(image.id).update({ profileImage: image.imageUrl })
      // collection.doc(image.id).set({ profileImage: image.imageUrl })
    )
  );

  console.log(res);
}

updateImageUrls();

async function getSpotifyAudioFeatures() {
  const t = new TrackFeatures({
    clientId: '770a806687ce48e5ab4c7e134c808978',
    clientSecret: 'fdb111df508f41ff82b50e5fcb080ef6',
  });
  await t.createToken();

  // const artistsId = ['5TjSLDEdLdGrrG4I7yyAVl', '5TjSLDEdLdGrrG4I7yyAVl'];
  const artistIds = await getAllArtistsFromFirestore();
  // const features = await t.getAllTrackFeatures(artistIds);

  const features = [];

  for (const artist of artistIds) {
    const artistFeatures = await t.getFeaturesFromArtist(artist);
    await sleep(1000);
    features.push(artistFeatures);
  }

  console.log('features', features);

  features.map(processAudioFeatures);

  console.log('it all worked i guess');
}

async function getAllArtistsFromFirestore() {
  const fetchedMusicians = await adminDb
    .collection('musicians')
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));

  const spotifyLinks = fetchedMusicians.map(
    (musician) => musician.music.spotify
  );

  const re = /\/artist\/(\w+)/;
  const artistIds = spotifyLinks
    .filter((link) => link !== '')
    .map((link) => link.match(re)[1]);

  return artistIds;
}

async function processAudioFeatures(artistAudioFeatures) {
  const collectionName = 'audioFeatures';

  console.log('artist features 1', artistAudioFeatures);
  console.log(
    'trackfeatures',
    artistAudioFeatures.albumTracksFeatures[0].trackFeatures
  );

  console.log('artist features', artistAudioFeatures);

  // Push Data to Firebase
  const collection = adminDb.collection(collectionName);
  try {
    if (!artistAudioFeatures.artistId) {
      console.error(
        `artist ID is undefined for artist: ${artistAudioFeatures}`
      );
      return;
    }
    await collection.doc(artistAudioFeatures.artistId).set(artistAudioFeatures);
    console.log(`Added track with ID: ${artistAudioFeatures.artistId}`);
  } catch (error) {
    console.error(
      `Error adding track with ID: ${artistAudioFeatures.artistId}.${error}`
    );
  }
}

// getSpotifyAudioFeatures();
