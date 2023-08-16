import isUrlHttp from 'is-url-http';

function validateURLs(urlMap: object): boolean {
  /* validates URL map, checks if at least one value is non empty, then checks
  if its a valid URL that matches its map */

  // check for non empty values
  const nonEmptyValues = Object.entries(urlMap).filter(
    ([, value]) => value !== ''
  );
  if (nonEmptyValues.length === 0) {
    return false;
  }

  // check if non empty url values include their key
  // ie key=spotify, value=*spotify* => true
  if (!nonEmptyValues.every(([key, value]) => value.includes(key))) {
    return false;
  }

  // validate URLs by using the URL constructor
  const isEveryUrlValid = nonEmptyValues.every(([, value]) => {
    // this line is broke and idk why
    return isUrlHttp(value);
  });

  return isEveryUrlValid;
}

export { validateURLs };
