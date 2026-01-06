// Server that uses Next.js but shows diagnostics and errors
const http = require('http');
const next = require('next');

const port = process.env.PORT || 3001;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

console.log('='.repeat(50));
console.log('Starting server with Next.js...');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Base path:', basePath || '(none)');

// Track errors
let requestErrors = [];
let prepareStatus = {
  started: false,
  completed: false,
  success: false,
  error: null,
  startTime: null,
  endTime: null
};

// Create Next.js app
let nextApp = null;
try {
  const nextFunction = next.default || next;
  nextApp = nextFunction({
    dev: false,
    conf: {
      basePath: basePath,
      assetPrefix: basePath
    }
  });
  console.log('✅ Next.js app created');
} catch (e) {
  console.error('❌ Failed to create Next.js app:', e);
  process.exit(1);
}

// Prepare Next.js
prepareStatus.started = true;
prepareStatus.startTime = new Date().toISOString();
console.log('Preparing Next.js app...');

nextApp.prepare()
  .then(() => {
    prepareStatus.completed = true;
    prepareStatus.success = true;
    prepareStatus.endTime = new Date().toISOString();
    console.log('✅ Next.js app prepared successfully');
  })
  .catch((err) => {
    prepareStatus.completed = true;
    prepareStatus.success = false;
    prepareStatus.error = err.message;
    prepareStatus.endTime = new Date().toISOString();
    console.error('❌ Next.js prepare failed:', err.message);
    console.error('Stack:', err.stack);
  });

// Create HTTP server
const server = http.createServer((req, res) => {
  // If prepare() is not ready, show diagnostics
  if (!prepareStatus.completed || !prepareStatus.success) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Next.js Preparing...</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #4CAF50; }
    .error { color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>⏳ Next.js is preparing...</h1>
  <p>Status: ${prepareStatus.completed ? (prepareStatus.success ? '✅ SUCCESS' : '❌ FAILED') : '⏳ IN PROGRESS...'}</p>
  ${prepareStatus.error ? `<p class="error">Error: ${prepareStatus.error}</p>` : ''}
  <p>Please wait and refresh the page.</p>
</body>
</html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  
  // Try to handle request with Next.js
  try {
    const handle = nextApp.getRequestHandler();
    
    // Handle request with error catching
    handle(req, res).catch((err) => {
      console.error('Error in Next.js handler:', err);
      console.error('Stack:', err.stack);
      
      // Track error
      requestErrors.push({
        url: req.url,
        method: req.method,
        error: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 10 errors
      if (requestErrors.length > 10) {
        requestErrors = requestErrors.slice(-10);
      }
      
      // Show error page with diagnostics
      if (!res.headersSent) {
        const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Next.js Error</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #f44336; }
    .error { color: #f44336; }
    .success { color: #4CAF50; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 12px; }
    .section { margin: 20px 0; padding: 15px; background: #2a2a2a; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>❌ Next.js Request Error</h1>
  
  <div class="section">
    <h2>Current Error:</h2>
    <p><strong>URL:</strong> ${req.method} ${req.url}</p>
    <p><strong>Error:</strong> ${err.message}</p>
    <pre>${err.stack}</pre>
  </div>
  
  <div class="section">
    <h2>Prepare Status:</h2>
    <p>Status: <span class="success">✅ SUCCESS</span></p>
    <p>Started: ${prepareStatus.startTime}</p>
    <p>Completed: ${prepareStatus.endTime}</p>
  </div>
  
  ${requestErrors.length > 0 ? `
    <div class="section">
      <h2>Recent Errors (last ${requestErrors.length}):</h2>
      <ul>
        ${requestErrors.map(e => `
          <li>
            <strong>${e.method} ${e.url}</strong> (${e.timestamp})<br>
            <small class="error">${e.error}</small>
          </li>
        `).join('')}
      </ul>
    </div>
  ` : ''}
  
  <div class="section">
    <p><a href="/" style="color: #4CAF50;">Try again</a></p>
  </div>
</body>
</html>
        `;
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
      }
    });
  } catch (err) {
    console.error('Error setting up handler:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${err.message}\n\nStack: ${err.stack}`);
  }
});

server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log('='.repeat(50));
  console.log('✅ SERVER WITH NEXT.JS RUNNING');
  console.log(`   Port: ${port}`);
  console.log(`   URL: http://0.0.0.0:${port}`);
  console.log('='.repeat(50));
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:', reason);
});

