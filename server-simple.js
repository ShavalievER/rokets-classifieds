// Simplified server.js for debugging
const { createServer } = require('http');
const next = require('next');
const fs = require('fs');
const path = require('path');

console.log('='.repeat(50));
console.log('Starting Rokets classifieds (simplified)...');
console.log('='.repeat(50));

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
console.log(`Node.js version: ${nodeVersion}`);

if (majorVersion < 18) {
  console.error(`❌ Node.js ${nodeVersion} is not supported. Required: Node.js 18+`);
  process.exit(1);
}

// Check .next folder
const nextPath = path.join(__dirname, '.next');
console.log(`Checking .next folder: ${nextPath}`);
if (fs.existsSync(nextPath)) {
  console.log('✅ .next folder exists');
  const serverPath = path.join(nextPath, 'server');
  if (fs.existsSync(serverPath)) {
    console.log('✅ .next/server folder exists');
  } else {
    console.error('❌ .next/server folder NOT found');
  }
} else {
  console.error('❌ .next folder NOT found');
  console.error('Please ensure .next folder is present in the repository');
}

// Check node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');
console.log(`Checking node_modules: ${nodeModulesPath}`);
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules folder exists');
  const nextModulePath = path.join(nodeModulesPath, 'next');
  if (fs.existsSync(nextModulePath)) {
    console.log('✅ next module found');
  } else {
    console.error('❌ next module NOT found in node_modules');
  }
} else {
  console.error('❌ node_modules folder NOT found');
  console.error('Please run: npm install');
}

// Configuration
const dev = false; // Always production mode
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const port = process.env.PORT || 3001;

console.log(`Environment:`);
console.log(`  NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`  NEXT_PUBLIC_BASE_PATH: "${basePath}"`);
console.log(`  PORT: ${port}`);
console.log(`  Dev mode: ${dev}`);

// Initialize Next.js
console.log('Initializing Next.js...');
const app = next({ 
  dev: dev,
  conf: {
    basePath: basePath,
    assetPrefix: basePath
  }
});

const handle = app.getRequestHandler();

// Prepare and start server
console.log('Preparing Next.js app...');
app.prepare()
  .then(() => {
    console.log('✅ Next.js app prepared successfully');
    
    createServer((req, res) => {
      const url = req.url;
      console.log(`[${new Date().toISOString()}] ${req.method} ${url}`);
      handle(req, res);
    }).listen(port, (err) => {
      if (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
      }
      console.log('='.repeat(50));
      console.log(`✅ Rokets classifieds ready!`);
      console.log(`   URL: http://localhost:${port}${basePath}`);
      console.log('='.repeat(50));
    });
  })
  .catch((err) => {
    console.error('='.repeat(50));
    console.error('❌ Failed to prepare Next.js app');
    console.error('='.repeat(50));
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    
    // Additional diagnostics
    console.error('\nDiagnostics:');
    console.error(`  Current directory: ${__dirname}`);
    console.error(`  .next exists: ${fs.existsSync(nextPath)}`);
    console.error(`  node_modules exists: ${fs.existsSync(nodeModulesPath)}`);
    
    process.exit(1);
  });













