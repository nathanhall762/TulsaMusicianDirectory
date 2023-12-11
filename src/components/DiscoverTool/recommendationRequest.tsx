/**
 * Recommendation Request
 *
 * Make request to the cloud function, which will return a list of recommended artists
 * based on the user's input, sorted by relevance.
 */

import axios from 'axios';

const recommendationRequest = async (
  input: { idType: string; objectID: string }[]
) => {
  // convert the input string to json

  const endpoint = 'https://getspotifydata-7hkc33yowq-uc.a.run.app';

  const headers = {
    'Content-Type': 'text/plain',
    Accept: 'application/json',
    'Response-Type': 'application/json',
  };

  const body = input;

  const response = await axios.post(endpoint, body, { headers });
  console.log(response.data);
  return response.data;
};

export default recommendationRequest;
