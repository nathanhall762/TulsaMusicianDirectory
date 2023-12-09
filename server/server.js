import fs from 'node:fs/promises';
import express from 'express';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || (isProduction ? 4173 : 5173);
const base = process.env.BASE || '/';

console.log('isProduction?: ', isProduction);

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

// Create http server
const app = express();
let vite;

let render;
if (!isProduction) {
  // <--- DEV mode --->
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  // <--- PRODUCTION mode --->
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(
    base,
    sirv('./dist/client', {
      setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
      },
    })
  );
  render = (await import('../dist/server/entry.server.js')).render;
}

app.use('*', async (req, res) => {
  try {
    let template;

    if (!isProduction) {
      const url = req.originalUrl.replace(base, '');

      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = await vite
        .ssrLoadModule('src/entry.server.tsx')
        .then((m) => m.render);
    } else {
      template = templateHtml;
    }

    const appHtml = await render(req);
    const html = template.replace('<!--app-html-->', appHtml);
    // res.setHeader('Content-Type', 'text/html');

    // caching????
    res.set('Cache-Control', 'public, max-age=6000, s-maxage=12000');
    return res.status(200).end(html);
  } catch (e) {
    if (!isProduction) {
      vite.ssrFixStacktrace(e);
    }
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
