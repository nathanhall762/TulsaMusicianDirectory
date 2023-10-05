import { Link } from 'react-router-dom';
import MusicianCard from './MusicianCard/MusicianCard';
import useBearStore from '../bearStore';

const HomePage = () => {
  const user = useBearStore((state) => state.user);
  const musicians = useBearStore((state) => state.musicians);

  const sortedMusicians = [...musicians].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (musicians.length) {
    return (
      <div>
        {/* <Header /> */}
        <div className='cardContainer'>
          {sortedMusicians.map((musician) => (
            <MusicianCard key={musician.name} musician={musician} />
          ))}
        </div>
        <div className='buttonBox'>
          {/* show button link to MusicianApprovePage if user is admin */}
          {user.isAdmin ? (
            <Link to={'/approvemusician'}>
              <button className='addButton'>Approve Musician</button>
            </Link>
          ) : null}
          {/* show add musician button only if logged in */}
          {user.userCredential ? (
            <Link to={'/addmusician'}>
              <button className='addButton'>Add Musician</button>
            </Link>
          ) : null}
        </div>
      </div>
    );
  } else {
    <p>Loading...</p>;
  }
};

export default HomePage;
