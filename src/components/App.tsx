import { Outlet, useLoaderData } from 'react-router-dom';
import useBearStore from '../bearStore';
import Header from './Header/Header';
import { GlobalStyle } from './GlobalStyle';
import styled from 'styled-components';
import { Musician } from '../global';
import { getMusicians } from '../cloudFunctions';
import { useEffect } from 'react';

// to test if analytics is working
import { analyticsPromise } from '../firebase';
import { logEvent } from 'firebase/analytics';

function App() {
  const setMusicians = useBearStore((state) => state.setMusicians);
  const musicianData = useLoaderData() as Musician[];
  setMusicians(musicianData);

  const effectMe = async () => {
    const analytics = await analyticsPromise;
    if (analytics) {
      logEvent(analytics, 'test_event');
    }
  };

  useEffect(() => {
    effectMe();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Spacer className='spacer' />
      <Outlet />
    </>
  );
}

const Spacer = styled.div`
  height: 8vh;
  z-index: 98;
`;

export async function musicianDataLoader() {
  const response = await getMusicians({});
  const musicianData = response.data.musicianData;

  return musicianData;
}

export default App;
