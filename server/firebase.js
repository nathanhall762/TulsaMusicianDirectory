import { adminDb } from './firebaseAdminConfig.js';

export async function getMusicians() {
  // open and retrieve collection
  const collection = adminDb.collection('musicians');
  const snapshot = await collection.get();

  // pull out data from documents into array of muscian info
  const musicians = snapshot.docs.map((doc) => doc.data());
  return musicians;
}
