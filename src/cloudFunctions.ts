import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

const functions = getFunctions(app);
// const helloWorld = httpsCallable(functions, 'helloWorld');
// const setAdmin = httpsCallable(functions, 'setAdmin');

interface ReqInterface {
  uid: string;
}

interface ResInterface {
  isAdmin: boolean;
}

export const isAdmin = httpsCallable<ReqInterface, ResInterface>(
  functions,
  'isAdmin'
);
