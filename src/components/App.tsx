import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import MusicianPage, { Musician } from './MusicianPage';
import MusicianCard from './MusicianCard';
import MusicianForm from './MusicianAddForm';
import 'font-awesome/css/font-awesome.min.css';
import '../css/App.css';

function App() {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [cardSelected, setCardSelected] = useState('');

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

  const musician = musicians.find((x) => cardSelected === x.name);

  if (musician) {
    return (
      <MusicianPage
        musician={musician}
        setCardSelected={setCardSelected}
      ></MusicianPage>
    );
  } else {
    return (
      <>
        <div className='cardContainer'>
          {musicians.length ? (
            musicians.map((musician) => (
              <MusicianCard
                key={musician.name}
                musician={musician}
                setCardSelected={setCardSelected}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <MusicianForm />
      </>
    );
  }
}

export default App;
