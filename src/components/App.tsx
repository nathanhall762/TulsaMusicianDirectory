import { Outlet, useLoaderData } from 'react-router-dom';
import { app } from '../firebase';
// import { logEvent } from 'firebase/analytics';
import useBearStore from '../bearStore';
import Header from './Header/Header';
import { GlobalStyle } from './GlobalStyle';
import styled from 'styled-components';
import { Musician } from '../global';

// to test if analytics is working
// logEvent(analytics, 'test_event');

function App() {
  const setMusicians = useBearStore((state) => state.setMusicians);
  const musicianData = useLoaderData() as Musician[];

  setMusicians(musicianData);

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
  const { getFirestore, collection, getDocs } = await import(
    'firebase/firestore'
  );
  const db = getFirestore(app);
  const musicianCollection = collection(db, 'musicians');
  const musicianSnapshot = await getDocs(musicianCollection);

  const musicianData = musicianSnapshot.docs.map((doc) => doc.data());

  return musicianData;
}

export default App;
