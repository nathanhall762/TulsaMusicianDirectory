import MusicianCard from './MusicianCard/MusicianCard';
import Login from './Login';
import { useState, useEffect } from 'react';
import { getPendingMusicians } from '../cloudFunctions';
import { Musician } from '../global';
import useBearStore from '../bearStore';

const MusicianApprovePage = () => {
  const [pendingMusicians, setPendingMusicians] = useState<Musician[]>([]);
  const user = useBearStore((state) => state.user);

  const getPendingCollection = async () => {
    const response = await getPendingMusicians();
    const pendingMusicians = response.data.musicianData;
    console.log('got musicians');

    setPendingMusicians(pendingMusicians);
  };

  useEffect(() => {
    getPendingCollection();
  }, []);

  if (!user?.isAdmin) {
    return (
      <div>
        <Login />
        <p>Only admins can approve musicians.</p>
      </div>
    );
  } else if (pendingMusicians.length) {
    return (
      <div>
        <Login />
        <button onClick={getPendingCollection}>
          click here to update pending musicians
        </button>
        <div className='cardContainer'>
          {pendingMusicians.map((musician) => (
            <MusicianCard
              key={musician.name}
              musician={musician}
              isPending={true}
            />
          ))}
        </div>
      </div>
    );
  } else {
    <p>Loading...</p>;
  }
};

export default MusicianApprovePage;
