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

// Force production mode for deployment
const dev = false; // Always use production mode on server
// For subdomain deployment (demo.rokets.delivery), basePath should be empty
// For path deployment (rokets.delivery/demo), set basePath to '/demo'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const port = process.env.PORT || 3001;

console.log(`Starting Rokets classifieds...`);
console.log(`Node.js version: ${nodeVersion}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`Port: ${port}`);
console.log(`Base path: ${basePath || '(none)'}`);
console.log(`Dev mode: ${dev}`);

const app = next({ 
  dev: dev, // Force production mode
  conf: {
    basePath: basePath,
    assetPrefix: basePath
  }
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('✅ Next.js app prepared successfully');
  createServer((req, res) => {
    // Log request for debugging
    const url = req.url;
    console.log(`[${new Date().toISOString()}] ${req.method} ${url}`);
    
    // Handle request
    handle(req, res);
  }).listen(port, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log(`✅ Rokets classifieds ready on http://localhost:${port}${basePath}`);
    console.log(`📝 Environment variables:`);
    console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
    console.log(`   NEXT_PUBLIC_BASE_PATH: "${process.env.NEXT_PUBLIC_BASE_PATH || ''}"`);
    console.log(`   PORT: ${port}`);
  });
}).catch((err) => {
  console.error('❌ Failed to prepare Next.js app:', err);
  console.error('Error details:', err.stack);
  console.error('Error message:', err.message);
  
  // Additional diagnostics
  const fs = require('fs');
  const path = require('path');
  const nextPath = path.join(__dirname, '.next');
  console.error(`Checking .next folder: ${nextPath}`);
  if (fs.existsSync(nextPath)) {
    console.error('✅ .next folder exists');
    const serverPath = path.join(nextPath, 'server');
    if (fs.existsSync(serverPath)) {
      console.error('✅ .next/server folder exists');
    } else {
      console.error('❌ .next/server folder NOT found');
    }
  } else {
    console.error('❌ .next folder NOT found');
  }
  
  process.exit(1);
});

