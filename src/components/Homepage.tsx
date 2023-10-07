import { Link } from 'react-router-dom';
import useBearStore from '../bearStore';
import CardContainer from './MusicianCard/CardContainer';

const HomePage = () => {
  const user = useBearStore((state) => state.user);

  return (
    <div>
      {/* <Header /> */}
      <CardContainer />
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
};

export default HomePage;
