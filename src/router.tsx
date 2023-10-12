import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/Homepage';
import MusicianPage from './components/MusicianPage/MusicianPage';
import MusicianForm from './components/MusicianAddForm';
import MusicianApproveForm from './components/MusicianApproveForm';
import MusicianApprovePage from './components/MusicianApprovePage';
import About from './components/About';
import Discover from './components/Discover';
import ErrorElement from './components/ErrorElement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/about', element: <About /> },
      { path: '/discover', element: <Discover /> },
      {
        path: '/404',
        element: <ErrorElement />,
      },
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
