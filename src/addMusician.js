import admin from 'firebase-admin';

// Import the service account key, which should be a .json file
import serviceAccount from '../tulsa-musician-directory-firebase-adminsdk-zvck7-d1fa84447b.json' assert { type: 'json' };


// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Function to add a new musician
async function addMusician(musician) {
  try {
    const docRef = await db.collection('musicians').add(musician);
    console.log("Musician added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding musician: ", error);
  }
}

// Musician data
const madameZeroni = {
  bandcamp: "https://mazroni.bandcamp.com/track/clout",
  facebook: "https://www.facebook.com/InvisibleFM/",
  genre: ["Jazz", "Singer-Songwriter"],
  instagram: "https://www.instagram.com/mad.zero.ni/",
  name: "Madame Z",
  profileImage: "../src/assets/madamezeroni.jpg",
  spotify: "https://open.spotify.com/artist/7ygFiWl5xP7rBqq7WyO8ro",
  spotifyID: "7ygFiWl5xP7rBqq7WyO8ro"
};

// Add musician to Firestore
addMusician(madameZeroni);
