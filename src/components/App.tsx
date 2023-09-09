import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, analytics } from '../firebase';
import { Musician, OutletContextProps } from '../types';
import 'font-awesome/css/font-awesome.min.css';
import '../css/App.css';
import { logEvent } from 'firebase/analytics';
import { UserData } from '../types';

// to test if analytics is working
logEvent(analytics, 'test_event');

function App() {
  const [user, setUser] = useState<UserData | void>();
  const [musicians, setMusicians] = useState<Musician[]>([]);

  const getData = async () => {
    onSnapshot(collection(db, 'musicians'), (doc) => {
      const fetchedMusicians: Musician[] = doc.docs.map(
        (doc) => doc.data() as Musician
      );
      setMusicians(fetchedMusicians);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Outlet
        context={{ musicians, user, setUser } satisfies OutletContextProps}
      ></Outlet>
    </>
  );
}

export default App;
