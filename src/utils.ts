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
    try {
      const url = new URL(value);
      console.log(url.protocol);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (error) {
      return false;
    }
  });

  return isEveryUrlValid;
}

export { validateURLs };
