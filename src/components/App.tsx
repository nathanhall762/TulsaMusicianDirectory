import { Outlet, useLoaderData } from 'react-router-dom';
// import { logEvent } from 'firebase/analytics';
import useBearStore from '../bearStore';
import Header from './Header/Header';
import { GlobalStyle } from './GlobalStyle';
import styled from 'styled-components';
import { Musician } from '../global';
import { getMusicians, addMusicianPending } from '../cloudFunctions';

// to test if analytics is working
// logEvent(analytics, 'test_event');

function App() {
  const setMusicians = useBearStore((state) => state.setMusicians);
  const musicianData = useLoaderData() as Musician[];

  const clickFunction = async () => {
    try {
      const response = await addMusicianPending({
        formData: { testing: 'true' },
        profileImage: 'asdfja',
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  setMusicians(musicianData);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Spacer className='spacer' />
      <Outlet />
      <button onClick={clickFunction}>
        click me rihght herer lasdhflaskdflksajf
      </button>
    </>
  );
}

const Spacer = styled.div`
  height: 8vh;
  z-index: 98;
`;

export async function musicianDataLoader() {
  const response = await getMusicians({});
  const musicianData = response.data.musicianData;

  return musicianData;
}

export default App;
