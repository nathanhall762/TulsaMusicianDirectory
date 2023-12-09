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

export const getPendingMusicians = httpsCallable<
  {},
  { musicianData: Musician[] }
>(functions, 'getPendingMusicians');

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

interface ApproveReq {
  formData: object;
  profileImage: string;
  musicianName: string;
}

interface ApproveRes {
  success: boolean;
  id: string;
}

export const approveMusician = httpsCallable<ApproveReq, ApproveRes>(
  functions,
  'approveMusician'
);

export const getOnePending = httpsCallable<
  { name: string },
  { docData: Musician }
>(functions, 'getOnePending');
