import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import { Suspense, lazy } from 'react';
import App, { musicianDataLoader } from './components/App';
// import DiscoverPage from './components/DiscoverTool/DiscoverPage';
const DiscoverPage = lazy(
  () => import('./components/DiscoverTool/DiscoverPage')
);
import ErrorElement from './components/ErrorElement';
import MusicianForm from './components/MusicianAddForm';
import About from './components/About';
import DirectoryPage from './components/DirectoryPage';
import MusicianPage from './components/MusicianPage/MusicianPage';
import MusicianApprovePage from './components/MusicianApprovePage';
import MusicianApproveForm from './components/MusicianApproveForm';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    loader: musicianDataLoader,
    children: [
      {
        index: true,
        element: <DirectoryPage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/discover',
        element: (
          <Suspense>
            <DiscoverPage />
          </Suspense>
        ),
      },
      {
        path: '/callback',
        element: (
          <Suspense>
            <DiscoverPage />
          </Suspense>
        ),
      },
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
];

export { routes };
