import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { UserCredential } from 'firebase/auth';
import MusicianPage, { Musician } from './MusicianPage';
import MusicianCard from './MusicianCard';
import MusicianForm from './MusicianAddForm';
import Login from './login';
import 'font-awesome/css/font-awesome.min.css';
import '../css/App.css';

function App() {
  const [user, setUser] = useState<UserCredential | void>();
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [cardSelected, setCardSelected] = useState<string>('');
  const [addMusicianSelected, setAddMusicianSelected] =
    useState<boolean>(false);

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
  }
  if (addMusicianSelected) {
    return <MusicianForm setAddMusicianSelected={setAddMusicianSelected} />;
  } else {
    return (
      <>
        <Login user={user} setUser={setUser} />
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
        <button
          className='addButton'
          onClick={() => setAddMusicianSelected(true)}
        >
          Add Musician
        </button>
      </>
    );
  }
}

export default App;
