import fs from 'node:fs/promises';
import express from 'express';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction?: ', isProduction);
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/ssr-manifest.json', 'utf-8')
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
// check for DEV mode or PROD mode and render accordingly
if (!isProduction) {
  // <--- DEV mode --->
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');

      // Always read fresh template in development
      let template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;

      const rendered = await render(url, ssrManifest);

      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
} else {
  // <--- PRODUCTION mode --->
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');

      const template = templateHtml;
      const render = (await import('./dist/server/entry-server.js')).render;

      const rendered = await render(url, ssrManifest);

      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '');

      res.set('Cache-Control', 'public, max-age=600, s-maxage=1200 ');

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
}

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
