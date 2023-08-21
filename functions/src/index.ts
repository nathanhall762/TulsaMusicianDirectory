/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
// import { onCall } from 'firebase-functions/v2/https';
import * as cors from 'cors';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const corsHandler = cors({ origin: true });

export const helloWorld = onRequest(
  async (request, response) => {
    corsHandler(request, response, () => {
      logger.info('Hello logs!', { structuredData: true });

      return { hello: 'world' }
    });
  }
);
