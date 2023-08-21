import { getFunctions, httpsCallable } from "firebase/functions";


const functions = getFunctions();
const helloWorld = httpsCallable(functions, 'helloWorld');

export { helloWorld };