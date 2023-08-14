import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import '../css/App.css';
import { db } from '../firebase';
import MusicianPage, { Musician } from './MusicianPage';
import 'font-awesome/css/font-awesome.min.css';



function App() {
  const [musicians, setMusicians] = useState<Musician[]>([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'musicians'));
    // console.log(querySnapshot.docs);
    const fetchedMusicians: Musician[] = querySnapshot.docs.map((doc) => doc.data() as Musician);
    setMusicians(fetchedMusicians);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {musicians.length ? (
        musicians.map((musician, index) => (
          <MusicianPage key={index} musician={musician} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;


