import { Link, useOutletContext } from 'react-router-dom';
import MusicianCard from './MusicianCard';
import Login from './login';
import { OutletContextProps } from '../types';

const HomePage = () => {
  // const musicians: Musician[], user = useOutletContext();
  const { musicians, user } = useOutletContext<OutletContextProps>();

  if (musicians.length) {
    return (
      <div>
        <Login />
        <div className='cardContainer'>
          {musicians.map((musician) => (
            <MusicianCard key={musician.name} musician={musician} />
          ))}
        </div>
        <div className='buttonBox'>
          {/* show button link to MusicianApprovePage if user is admin */}
          {user?.user?.uid ===
          ('UeRplqnzeTTKZmFrZxSNKs6hlt62' || 'hbrLp0oqRCWkSmL9qAbfy4tGUdc2')
            ? <Link to={'/approvemusician'}>
            <button className='addButton'>Approve Musician</button>
          </Link>
          : null}
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
