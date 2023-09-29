import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/homepage';
import MusicianPage from './components/MusicianPage';
import MusicianForm from './components/MusicianAddForm';
import MusicianApproveForm from './components/MusicianApproveForm';
import MusicianApprovePage from './components/MusicianApprovePage';

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
      {
        path: '/approvemusician',
        element: <MusicianApprovePage />,
      },
      {
        path: '/approvemusician/:musicianId',
        element: <MusicianApproveForm />,
      },
    ],
  },
]);

export default router;
