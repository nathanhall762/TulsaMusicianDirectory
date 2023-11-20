import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type * as express from 'express';
import { routes } from './router';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

export async function render(request: express.Request) {
  // static handler for data fetching
  const { query, dataRoutes } = createStaticHandler(routes);
  // convert express request into fetch request
  const remixRequest = createFetchRequest(request);
  // performs route matching and loading
  // context value contains all of the information required to render the HTML document for the request
  const context = await query(remixRequest);

  if (context instanceof Response) {
    // redirect case
    // handle if redirect exists
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>
  );
}

// converts express request into fetch request format
// needed for static handler to generate handler context
function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get('host')}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
}
