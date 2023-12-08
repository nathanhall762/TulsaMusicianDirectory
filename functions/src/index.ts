import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';
import { initializeApp } from 'firebase-admin/app';

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
