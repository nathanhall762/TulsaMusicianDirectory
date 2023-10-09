import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, analytics } from '../firebase';
import { Musician } from '../types';
import 'font-awesome/css/font-awesome.min.css';
import { logEvent } from 'firebase/analytics';
import useBearStore from '../bearStore';
// import Header from './Header';
import { GlobalStyle } from './GlobalStyle';

// to test if analytics is working
logEvent(analytics, 'test_event');

function App() {
  const setMusicians = useBearStore((state) => state.setMusicians);

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, 'musicians'), (doc) => {
        const fetchedMusicians: Musician[] = doc.docs.map(
          (doc) => doc.data() as Musician
        );
        setMusicians(fetchedMusicians);
      });
    })();
  }, [setMusicians]);

  return (
    <>
      <GlobalStyle />
      {/* <Header /> */}
      <Outlet />
    </>
  );
}

export default App;
