import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import '../css/App.css';
import { db } from '../firebase';

function App() {
  const [count, setCount] = useState(0);
  const [bandName, setBandName] = useState('');

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'musicians'));
    // console.log(querySnapshot.docs);
    querySnapshot.docs.map((doc) => {
      console.log(doc.data().name)
      const name = doc.data().name;
      setBandName(name);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
      <p>
        {bandName ? bandName : 'Loading'}
      </p>
    </>
  );
}

export default App;


