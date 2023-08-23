import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

const functions = getFunctions(app);
// const helloWorld = httpsCallable(functions, 'helloWorld');
// const setAdmin = httpsCallable(functions, 'setAdmin');
export const isAdmin = httpsCallable(functions, 'isAdmin');
