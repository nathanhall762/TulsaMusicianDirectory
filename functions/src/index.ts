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
  try {
    const receivedData = request.data.stuff;

    const snapshot = await db.collection('musicians').get();
    const musicianData = snapshot.docs.map((doc) => doc.data());

    return { some: 'info', receivedData, musicianData };
  } catch {
    throw new HttpsError('internal', 'Unable to retrieve data from Firestore');
  }
});
