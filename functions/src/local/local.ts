// local scripts
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import * as admin from 'firebase-admin';
initializeApp({
  credential: applicationDefault(),
});
const auth = admin.auth();

// (async () => {
//   const uid = uid;
//   await auth.setCustomUserClaims(uid, { admin: true });
//   const user = await auth.getUser(uid);
//   console.log('success', user);
//   process.exit();
// })();

(async () => {
  const uid = 'hbrLp0oqRCWkSmL9qAbfy4tGUdc2';
  const user = await auth.getUser(uid);
  console.log('Nathan is an admin?', user.customClaims?.admin);
})();
