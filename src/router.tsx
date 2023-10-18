import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import DiscoverPage from './components/DiscoverPage';
import MusicianPage from './components/MusicianPage/MusicianPage';
import MusicianForm from './components/MusicianAddForm';
import MusicianApproveForm from './components/MusicianApproveForm';
import MusicianApprovePage from './components/MusicianApprovePage';
import About from './components/About';
import ErrorElement from './components/ErrorElement';
import DirectoryPage from './components/DirectoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <DirectoryPage /> },
      { path: '/about', element: <About /> },
      { path: '/discover', element: <DiscoverPage /> },
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
