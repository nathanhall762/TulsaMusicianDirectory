import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';
import { initializeApp } from 'firebase-admin/app';

// imports for running stuff locally
// import { applicationDefault } from 'firebase-admin/app';
// initializeApp({
//   credential: applicationDefault(),
// });

initializeApp();
import * as admin from 'firebase-admin';

const auth = admin.auth();

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

// (async () => {
//   const uid = uid;
//   await auth.setCustomUserClaims(uid, { admin: true });
//   const user = await auth.getUser(uid);
//   console.log('success', user);
//   process.exit();
// })();

// (async () => {
//   const uid = uid;
//   const user = await auth.getUser(uid);
//   console.log('Nathan is an admin?', user.customClaims?.admin);
// })();
