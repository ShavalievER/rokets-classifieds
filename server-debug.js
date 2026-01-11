const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3001;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

console.log('='.repeat(50));
console.log('DEBUG SERVER STARTING');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Base path:', basePath || '(none)');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');

// Track handler state
let handlerState = {
  nextApp: null,
  handle: null,
  prepareStarted: false,
  prepareCompleted: false,
  prepareSuccess: false,
  handlerAttempts: 0,
  handlerSuccesses: 0,
  handlerErrors: [],
  lastError: null
};

// Create HTTP server FIRST (before Next.js)
const server = createServer((req, res) => {
  const requestId = Date.now();
  const url = req.url;
  
  console.log(`[${new Date().toISOString()}] Request #${requestId}: ${req.method} ${url}`);
  
  // If Next.js is not ready, show diagnostic page
  if (!handlerState.prepareSuccess || !handlerState.handle) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Debug Server - Next.js Loading</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #4CAF50; }
    .error { color: #f44336; }
    .success { color: #4CAF50; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 12px; }
    .section { margin: 20px 0; padding: 15px; background: #2a2a2a; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>🔧 Debug Server - Next.js Loading</h1>
  <p>Request: ${req.method} ${url}</p>
  <p>Request ID: ${requestId}</p>
  
  <div class="section">
    <h2>Next.js State:</h2>
    <ul>
      <li>Prepare Started: ${handlerState.prepareStarted ? '✅' : '❌'}</li>
      <li>Prepare Completed: ${handlerState.prepareCompleted ? '✅' : '❌'}</li>
      <li>Prepare Success: ${handlerState.prepareSuccess ? '✅' : '❌'}</li>
      <li>Handler Available: ${handlerState.handle ? '✅' : '❌'}</li>
    </ul>
  </div>
  
  ${handlerState.lastError ? `
    <div class="section">
      <h2 class="error">Last Error:</h2>
      <pre>${handlerState.lastError}</pre>
    </div>
  ` : ''}
  
  ${handlerState.handlerErrors.length > 0 ? `
    <div class="section">
      <h2 class="error">Handler Errors (${handlerState.handlerErrors.length}):</h2>
      <ul>
        ${handlerState.handlerErrors.slice(-5).map(e => `<li class="error">${e}</li>`).join('')}
      </ul>
    </div>
  ` : ''}
  
  <p>Waiting for Next.js to prepare...</p>
  <p><small>This page will refresh automatically when Next.js is ready, or you can refresh manually.</small></p>
  
  <script>
    setTimeout(() => location.reload(), 3000);
  </script>
</body>
</html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  
  // Next.js is ready - try handler with MAXIMUM protection
  handlerState.handlerAttempts++;
  console.log(`[Request #${requestId}] Attempting handler (attempt #${handlerState.handlerAttempts})...`);
  
  // Wrap handler call in multiple layers of protection
  try {
    // Layer 1: Domain error handling
    const domain = require('domain');
    const d = domain.create();
    
    d.on('error', (err) => {
      handlerState.handlerErrors.push(`Domain error on request #${requestId}: ${err.message}`);
      handlerState.lastError = `Domain error: ${err.message}\n\nStack: ${err.stack}`;
      console.error(`[Request #${requestId}] Domain error:`, err);
      
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Handler Domain Error</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 11px; }
  </style>
</head>
<body>
  <h1>❌ Handler Domain Error</h1>
  <p><strong>Request:</strong> ${req.method} ${url}</p>
  <p><strong>Error:</strong> ${err.message}</p>
  <pre>${err.stack}</pre>
  <p><strong>Handler Attempts:</strong> ${handlerState.handlerAttempts}</p>
  <p><strong>Handler Successes:</strong> ${handlerState.handlerSuccesses}</p>
</body>
</html>
        `);
      }
    });
    
    // Layer 2: Timeout protection
    const handlerTimeout = setTimeout(() => {
      handlerState.handlerErrors.push(`Handler timeout on request #${requestId} after 10 seconds`);
      handlerState.lastError = `Handler timeout after 10 seconds`;
      console.error(`[Request #${requestId}] Handler timeout`);
      
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Handler Timeout</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #f44336; }
  </style>
</head>
<body>
  <h1>❌ Handler Timeout</h1>
  <p>Handler did not respond within 10 seconds.</p>
  <p><strong>Request:</strong> ${req.method} ${url}</p>
  <p><strong>Handler Attempts:</strong> ${handlerState.handlerAttempts}</p>
</body>
</html>
        `);
      }
    }, 10000);
    
    // Layer 3: Try-catch around handler call
    d.run(() => {
      try {
        const handlePromise = handlerState.handle(req, res);
        
        if (handlePromise && typeof handlePromise.catch === 'function') {
          handlePromise
            .then(() => {
              clearTimeout(handlerTimeout);
              handlerState.handlerSuccesses++;
              console.log(`[Request #${requestId}] Handler completed successfully`);
            })
            .catch((err) => {
              clearTimeout(handlerTimeout);
              handlerState.handlerErrors.push(`Handler promise error on request #${requestId}: ${err.message}`);
              handlerState.lastError = `Handler promise error: ${err.message}\n\nStack: ${err.stack}`;
              console.error(`[Request #${requestId}] Handler promise error:`, err);
              
              if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Handler Promise Error</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 11px; }
  </style>
</head>
<body>
  <h1>❌ Handler Promise Error</h1>
  <p><strong>Request:</strong> ${req.method} ${url}</p>
  <p><strong>Error:</strong> ${err.message}</p>
  <pre>${err.stack}</pre>
  <p><strong>Handler Attempts:</strong> ${handlerState.handlerAttempts}</p>
  <p><strong>Handler Successes:</strong> ${handlerState.handlerSuccesses}</p>
</body>
</html>
                `);
              }
            });
        } else {
          clearTimeout(handlerTimeout);
          handlerState.handlerSuccesses++;
          console.log(`[Request #${requestId}] Handler completed (sync)`);
        }
      } catch (err) {
        clearTimeout(handlerTimeout);
        handlerState.handlerErrors.push(`Handler sync error on request #${requestId}: ${err.message}`);
        handlerState.lastError = `Handler sync error: ${err.message}\n\nStack: ${err.stack}`;
        console.error(`[Request #${requestId}] Handler sync error:`, err);
        
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Handler Sync Error</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 11px; }
  </style>
</head>
<body>
  <h1>❌ Handler Sync Error</h1>
  <p><strong>Request:</strong> ${req.method} ${url}</p>
  <p><strong>Error:</strong> ${err.message}</p>
  <pre>${err.stack}</pre>
  <p><strong>Handler Attempts:</strong> ${handlerState.handlerAttempts}</p>
  <p><strong>Handler Successes:</strong> ${handlerState.handlerSuccesses}</p>
</body>
</html>
          `);
        }
      }
    });
  } catch (err) {
    handlerState.handlerErrors.push(`Outer catch error on request #${requestId}: ${err.message}`);
    handlerState.lastError = `Outer catch error: ${err.message}\n\nStack: ${err.stack}`;
    console.error(`[Request #${requestId}] Outer catch error:`, err);
    
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Outer Catch Error</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 11px; }
  </style>
</head>
<body>
  <h1>❌ Outer Catch Error</h1>
  <p><strong>Request:</strong> ${req.method} ${url}</p>
  <p><strong>Error:</strong> ${err.message}</p>
  <pre>${err.stack}</pre>
</body>
</html>
      `);
    }
  }
});

// Start server FIRST
server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
  console.log('='.repeat(50));
  console.log('✅ DEBUG SERVER RUNNING');
  console.log(`   Port: ${port}`);
  console.log(`   URL: http://0.0.0.0:${port}`);
  console.log('='.repeat(50));
  
  // Load Next.js AFTER server is running
  setTimeout(() => {
    try {
      console.log('Loading Next.js...');
      handlerState.prepareStarted = true;
      
      const app = next({
        dev: false,
        conf: {
          basePath: basePath,
          assetPrefix: basePath
        }
      });
      
      handlerState.nextApp = app;
      console.log('✅ Next.js app created');
      
      console.log('Preparing Next.js app...');
      app.prepare()
        .then(() => {
          handlerState.prepareCompleted = true;
          handlerState.prepareSuccess = true;
          handlerState.handle = app.getRequestHandler();
          console.log('✅ Next.js app prepared successfully');
          console.log('✅ Handler obtained');
        })
        .catch((err) => {
          handlerState.prepareCompleted = true;
          handlerState.prepareSuccess = false;
          handlerState.lastError = `Prepare failed: ${err.message}\n\nStack: ${err.stack}`;
          console.error('❌ Next.js prepare failed:', err);
          console.error('Stack:', err.stack);
        });
    } catch (err) {
      handlerState.lastError = `Load error: ${err.message}\n\nStack: ${err.stack}`;
      console.error('❌ Failed to load Next.js:', err);
    }
  }, 1000);
});

// Error handlers
process.on('uncaughtException', (err) => {
  handlerState.lastError = `Uncaught exception: ${err.message}\n\nStack: ${err.stack}`;
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  console.error('Stack:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  handlerState.lastError = `Unhandled rejection: ${String(reason)}`;
  console.error('❌ UNHANDLED REJECTION:', reason);
});













