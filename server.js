const { createServer } = require('http');
const next = require('next');

// Проверка версии Node.js
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error(`❌ Node.js ${nodeVersion} is not supported. Required: Node.js 18+`);
  console.error(`Please update Node.js version in Verpex cPanel → Setup Node.js App`);
  process.exit(1);
}

const dev = process.env.NODE_ENV !== 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const port = process.env.PORT || 3001;

console.log(`Starting Rokets classifieds...`);
console.log(`Node.js version: ${nodeVersion}`);
console.log(`Port: ${port}`);
console.log(`Base path: ${basePath || '(none)'}`);

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
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log(`✅ Rokets classifieds ready on http://localhost:${port}${basePath}`);
  });
}).catch((err) => {
  console.error('Failed to prepare Next.js app:', err);
  process.exit(1);
});

