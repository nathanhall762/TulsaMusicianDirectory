import { describe, it, expect } from 'vitest';
import * as firebaseApp from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

// test firebase load
describe('Firebase App', async () => {
  it('should load musicians DB properly', async () => {
    onSnapshot(collection(firebaseApp.db, 'musicians'), (doc): void => {
      expect(doc).toBeDefined();
    });
  });

  it('should load firebase storage properly', async () => {
    expect(firebaseApp.storage).toBeDefined();
  });

  it('should load auth properly', async () => {
    expect(firebaseApp.auth).toBeDefined();
  });

  it('should  load analytics properly', async () => {
    expect(firebaseApp.analytics).toBeDefined();
  });
});
