import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import App from './components/App';
const DiscoverPage = lazy(() => import('./components/DiscoverPage'));
const ErrorElement = lazy(() => import('./components/ErrorElement'));
const MusicianForm = lazy(() => import('./components/MusicianAddForm'));
const About = lazy(() => import('./components/About'));
const DirectoryPage = lazy(() => import('./components/DirectoryPage'));
const MusicianPage = lazy(
  () => import('./components/MusicianPage/MusicianPage')
);
const MusicianApproveForm = lazy(
  () => import('./components/MusicianApproveForm')
);
const MusicianApprovePage = lazy(
  () => import('./components/MusicianApprovePage')
);

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <DirectoryPage />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
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
        path: '/404',
        element: <ErrorElement />,
      },
      {
        path: '/:musicianId',
        element: (
          <Suspense>
            <MusicianPage />
          </Suspense>
        ),
      },
      {
        path: '/addmusician',
        element: (
          <Suspense>
            <MusicianForm />
          </Suspense>
        ),
      },
      {
        path: '/approvemusician',
        element: (
          <Suspense>
            <MusicianApprovePage />
          </Suspense>
        ),
      },
      {
        path: '/approvemusician/:musicianId',
        element: (
          <Suspense>
            <MusicianApproveForm />
          </Suspense>
        ),
      },
    ],
  },
]);

export default browserRouter;
