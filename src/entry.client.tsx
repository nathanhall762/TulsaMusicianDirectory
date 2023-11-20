import React from 'react';
import ReactDOM from 'react-dom/client';
import { routes } from './router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/index.css';

const browserRouter = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById('app')!,
  <React.StrictMode>
    <RouterProvider router={browserRouter} fallbackElement={null} />
  </React.StrictMode>
);
