import MusicianCard from './MusicianCard/MusicianCard';
import Login from './Login';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Musician } from '../global';
import useBearStore from '../bearStore';

const MusicianApprovePage = () => {
  const [musicians, setPendingMusicians] = useState<Musician[]>([]);
  const user = useBearStore((state) => state.user);

  useEffect(() => {
    const pendingMusiciansCol = collection(db, 'pendingMusicians');

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(pendingMusiciansCol, (snapshot) => {
      const fetchedMusicians = snapshot.docs.map(
        (doc) => doc.data() as Musician
      );
      setPendingMusicians(fetchedMusicians);
    });

    // Unsubscribe from updates when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!user.isAdmin) {
    return (
      <div>
        <Login />
        <p>Only admins can approve musicians.</p>
      </div>
    );
  } else if (musicians.length) {
    return (
      <div>
        <Login />
        <div className='cardContainer'>
          {musicians.map((musician) => (
            <MusicianCard key={musician.name} musician={musician} />
          ))}
        </div>
      </div>
    );
  } else {
    <p>Loading...</p>;
  }
};

export default MusicianApprovePage;
