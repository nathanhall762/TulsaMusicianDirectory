import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

const functions = getFunctions(app);
const helloWorld = httpsCallable(functions, 'helloWorld');

export { helloWorld };
