import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';
import { Musician } from './global';

const functions = getFunctions(app);
// const helloWorld = httpsCallable(functions, 'helloWorld');
// const setAdmin = httpsCallable(functions, 'setAdmin');

export const isAdmin = httpsCallable<{ uid: string }, { isAdmin: boolean }>(
  functions,
  'isAdmin'
);

export const getMusicians = httpsCallable<{}, { musicianData: Musician[] }>(
  functions,
  'getMusicians'
);

interface MusicianPendingReq {
  formData: object;
  profileImage: string;
}

interface MusicianPendingRes {
  success: boolean;
  id: string;
}

export const addMusicianPending = httpsCallable<
  MusicianPendingReq,
  MusicianPendingRes
>(functions, 'addMusicianPending');
