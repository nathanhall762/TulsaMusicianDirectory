import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Musician } from '../global';
// import { logEvent } from 'firebase/analytics';
import useBearStore from '../bearStore';
import Header from './Header/Header';
import { GlobalStyle } from './GlobalStyle';
import styled from 'styled-components';

// to test if analytics is working
// logEvent(analytics, 'test_event');

function App() {
  const setMusicians = useBearStore((state) => state.setMusicians);

  const getMusicians = async () => {
    onSnapshot(collection(db, 'musicians'), (snapshot) => {
      const fetchedMusicians = snapshot.docs.map((doc) => doc.data());

      setMusicians(fetchedMusicians as Musician[]);
    });
  };

  useEffect(() => {
    getMusicians();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Spacer />
      <Outlet />
    </>
  );
}

const Spacer = styled.div`
  height: 8vh;
  z-index: 98;
`;

export default App;
