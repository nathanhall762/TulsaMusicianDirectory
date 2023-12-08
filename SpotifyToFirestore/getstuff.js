import { adminDb } from './firebaseAdminConfig.js';
import * as fs from 'fs';

async function getStuff() {
  const snapshot = await adminDb.collection('audioFeatures').get();
  const data = snapshot.docs.map((doc) => doc.data());

  const jsonData = JSON.stringify(data);

  console.log(jsonData);

  fs.writeFileSync('./audioFeatures.json', jsonData, (err) => {
    if (err) {
      console.log('hey it broke');
    }
  });
}

getStuff();
