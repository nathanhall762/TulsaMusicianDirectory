import { adminDb } from './firebaseAdminConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export async function getMusicians() {
  onSnapshot(collection(adminDb, 'musicians'), (snapshot) => {
    const fetchedMusicians = snapshot.docs.map((doc) => doc.data());

    return fetchedMusicians;
  });
}
