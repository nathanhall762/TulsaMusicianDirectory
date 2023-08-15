import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import '../css/App.css';
import { db } from '../firebase';
import MusicianPage, { Musician } from './MusicianPage';
import 'font-awesome/css/font-awesome.min.css';
import MusicianCard from './MusicianCard';
// import ImageUpload from './ImageUpload';
import MusicianForm from './MusicianAddForm';

function App() {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [cardSelected, setCardSelected] = useState('');

  console.log(cardSelected);

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
