const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const port = process.env.PORT || 3001;

const app = next({ 
  dev,
  conf: {
    basePath: basePath,
    assetPrefix: basePath
  }
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Rokets classifieds ready on http://localhost:${port}${basePath}`);
  });
});

