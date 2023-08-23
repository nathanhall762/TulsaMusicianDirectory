import { useOutletContext } from 'react-router-dom';
import MusicianCard from './MusicianCard';
import Login from './login';
import { OutletContextProps } from '../types';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Musician } from '../types';

const MusicianApprovePage = () => {
  // const musicians: Musician[], user = useOutletContext();
  const [musicians, setPendingMusicians] = useState<Musician[]>([]);
  const { user } = useOutletContext<OutletContextProps>();

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

  //   if user is not admin, only show login component and message
  if (
    user?.user?.uid !==
    ('UeRplqnzeTTKZmFrZxSNKs6hlt62' || 'hbrLp0oqRCWkSmL9qAbfy4tGUdc2')
  ) {
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
