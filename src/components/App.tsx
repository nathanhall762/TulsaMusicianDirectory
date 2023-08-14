import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import '../css/App.css';
import { db } from '../firebase';
import MusicianPage, { Musician } from './MusicianPage';
import 'font-awesome/css/font-awesome.min.css';
import MusicianCard from './MusicianCard';

function App() {
  const [musicians, setMusicians] = useState<Musician[]>([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'musicians'));
    // console.log(querySnapshot.docs);
    const fetchedMusicians: Musician[] = querySnapshot.docs.map(
      (doc) => doc.data() as Musician
    );
    console.log(fetchedMusicians)
    setMusicians(fetchedMusicians);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {musicians.length ? (
        musicians.map((musician) => (
          <MusicianCard key={musician.name} musician={musician} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
