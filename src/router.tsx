import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/homepage';
import MusicianPage from './components/MusicianPage';
import MusicianForm from './components/MusicianAddForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/:musicianId',
        element: <MusicianPage />,
      },
      {
        path: '/addmusician',
        element: <MusicianForm />,
      },
    ],
  },
]);

export default router;
