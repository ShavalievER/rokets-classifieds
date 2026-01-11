// Local development server for dynamic version
// Runs on port 3005 (static version uses 3000)
const { createServer } = require('http');
const next = require('next');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error(`❌ Node.js ${nodeVersion} is not supported. Required: Node.js 18+`);
  process.exit(1);
}

// Local development settings
const dev = true; // Development mode for local debugging
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const port = process.env.PORT || 3005; // Port 3005 for dynamic version

console.log('='.repeat(50));
console.log('LOCAL DYNAMIC SERVER (Non-Static)');
console.log('='.repeat(50));
console.log(`Node.js version: ${nodeVersion}`);
console.log(`Port: ${port}`);
console.log(`Base path: ${basePath || '(none)'}`);
console.log(`Dev mode: ${dev ? '✅ ON' : '❌ OFF'}`);
console.log(`URL: http://localhost:${port}`);
console.log('='.repeat(50));

const app = next({ 
  dev: dev,
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
    
    // Handle request with comprehensive error catching
    try {
      const handlePromise = handle(req, res);
      
      // Handle promise errors
      if (handlePromise && typeof handlePromise.catch === 'function') {
        handlePromise.catch((error) => {
          console.error('Error in Next.js handler promise:', error);
          console.error('Stack:', error.stack);
          
          if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Server Error</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 11px; }
  </style>
</head>
<body>
  <h1>❌ Server Error</h1>
  <p><strong>Error:</strong> ${error.message}</p>
  <pre>${error.stack}</pre>
</body>
</html>
            `);
          }
        });
      }
    } catch (error) {
      console.error('Error in request handler (sync):', error);
      console.error('Stack:', error.stack);
      
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Server Error</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 11px; }
  </style>
</head>
<body>
  <h1>❌ Server Error (Sync)</h1>
  <p><strong>Error:</strong> ${error.message}</p>
  <pre>${error.stack}</pre>
</body>
</html>
        `);
      }
    }
  }).listen(port, 'localhost', (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log('='.repeat(50));
    console.log(`✅ Dynamic server ready on http://localhost:${port}${basePath}`);
    console.log('='.repeat(50));
    console.log('Press Ctrl+C to stop');
  });
}).catch((err) => {
  console.error('❌ Failed to prepare Next.js app:', err);
  console.error('Error details:', err.stack);
  console.error('Error message:', err.message);
  process.exit(1);
});

// Catch all unhandled errors
process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  console.error('Stack:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:', reason);
  console.error('Promise:', promise);
});










