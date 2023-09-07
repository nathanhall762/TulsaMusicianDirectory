// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDi5Aj2hQ0JbgVQye9lQnuT1guMe20oPeA',
  authDomain: 'tulsamusiciandirectory.firebaseapp.com',
  projectId: 'tulsamusiciandirectory',
  storageBucket: 'tulsamusiciandirectory.appspot.com',
  messagingSenderId: '425159254629',
  appId: '1:425159254629:web:57799f514d26f94eb69c8c',
  measurementId: 'G-Y5YWNPZ679',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, storage, auth, analytics };
