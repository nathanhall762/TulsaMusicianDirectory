import { Link, useOutletContext } from 'react-router-dom';
import MusicianCard from './MusicianCard';
import Login from './Header';
import { OutletContextProps } from '../types';

const HomePage = () => {
  // const musicians: Musician[], user = useOutletContext();
  const { musicians, user } = useOutletContext<OutletContextProps>();

  const sortedMusicians = [...musicians].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (musicians.length) {
    return (
      <div>
        <Login />
        <div className='cardContainer'>
          {sortedMusicians.map((musician) => (
            <MusicianCard key={musician.name} musician={musician} />
          ))}
        </div>
        <div className='buttonBox'>
          {/* show button link to MusicianApprovePage if user is admin */}
          {user?.isAdmin ? (
            <Link to={'/approvemusician'}>
              <button className='addButton'>Approve Musician</button>
            </Link>
          ) : null}
          {/* show add musician button only if logged in */}
          {user ? (
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
