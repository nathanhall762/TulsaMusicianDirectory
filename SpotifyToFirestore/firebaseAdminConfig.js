import admin from 'firebase-admin';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
console.log(`adminPrivateKey: ${adminPrivateKey}`); // undefined when ran from JSONtoFirestore.js
const newAdminPrivateKey = adminPrivateKey.replace(/\\n/g, '\n');
console.log(`newAdminPrivateKey: ${newAdminPrivateKey}`);

// Accessing the Vite environment variables
const serviceAccount = {
  type: process.env.ADMIN_TYPE,
  project_id: process.env.ADMIN_PROJECT_ID,
  private_key_id: process.env.ADMIN_PRIVATE_KEY_ID,
  private_key: newAdminPrivateKey,
  client_email: process.env.ADMIN_CLIENT_EMAIL,
  client_id: process.env.ADMIN_CLIENT_ID,
  auth_uri: process.env.ADMIN_AUTH_URI,
  token_uri: process.env.ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.ADMIN_CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log(serviceAccount.private_key);

export const adminDb = admin.firestore();
