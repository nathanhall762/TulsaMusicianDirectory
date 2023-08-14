// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAiPcx5h3o3ITjQBrHThUf3gnl_CtDWPBs',
  authDomain: 'tulsa-musician-directory.firebaseapp.com',
  projectId: 'tulsa-musician-directory',
  storageBucket: 'tulsa-musician-directory.appspot.com',
  messagingSenderId: '1048137599300',
  appId: '1:1048137599300:web:69456c091479eb5b972f11',
  measurementId: 'G-5RL29DB9GF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
