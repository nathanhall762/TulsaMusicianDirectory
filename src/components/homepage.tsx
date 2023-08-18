import { Link } from 'react-router-dom';
import MusicianCard from './MusicianCard';
import Login from './login';
import { OutletContextProps } from '../types';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
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
        {/* show add muscian button only if logged in */}
        {user ? (
          <Link to={'/addmusician'}>
            <button>Add Musician</button>
          </Link>
        ) : null}
      </div>
    );
  } else {
    <p>Loading...</p>;
  }
};

export default HomePage;
