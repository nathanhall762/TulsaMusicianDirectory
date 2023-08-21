import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Musician, OutletContextProps } from '../types';
import { UserCredential } from 'firebase/auth';
import 'font-awesome/css/font-awesome.min.css';
import '../css/App.css';
import { helloWorld } from '../cloudFunctions';

function App() {
  const [user, setUser] = useState<UserCredential | void>();
  const [musicians, setMusicians] = useState<Musician[]>([]);

  const getData = async () => {
    onSnapshot(collection(db, 'musicians'), (doc) => {
      const fetchedMusicians: Musician[] = doc.docs.map(
        (doc) => doc.data() as Musician
      );
      setMusicians(fetchedMusicians);
    });
  };

  helloWorld().then((result) => {
    console.log(result);
  });

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
