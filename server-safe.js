// Safe server that starts BEFORE loading Next.js
const http = require('http');

const port = process.env.PORT || 3001;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

console.log('='.repeat(50));
console.log('SAFE SERVER STARTING');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Base path:', basePath || '(none)');

// Configuration
const USE_NEXTJS_HANDLER = false; // Disabled - causes process crashes (with protection)

// Track state
let serverState = {
  started: new Date().toISOString(),
  nextJsLoaded: false,
  nextAppCreated: false,
  prepareStarted: false,
  prepareCompleted: false,
  prepareSuccess: false,
  errors: []
};

// Create HTTP server FIRST (before loading Next.js)
const server = http.createServer((req, res) => {
  try {
    // Always show diagnostics first
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Safe Server</title>
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
  <h1>✅ Safe Server is Running!</h1>
  <p>Timestamp: ${new Date().toISOString()}</p>
  <p>Request: ${req.method} ${req.url}</p>
  
  <div class="section">
    <h2>Server State:</h2>
    <ul>
      <li>Started: ${serverState.started}</li>
      <li>Next.js Loaded: ${serverState.nextJsLoaded ? '✅' : '❌'}</li>
      <li>Next.js App Created: ${serverState.nextAppCreated ? '✅' : '❌'}</li>
      <li>Prepare Started: ${serverState.prepareStarted ? '✅' : '❌'}</li>
      <li>Prepare Completed: ${serverState.prepareCompleted ? '✅' : '❌'}</li>
      <li>Prepare Success: ${serverState.prepareSuccess ? '✅' : '❌'}</li>
    </ul>
  </div>
  
  ${serverState.errors.length > 0 ? `
    <div class="section">
      <h2 class="error">Errors:</h2>
      <ul>
        ${serverState.errors.map(e => `<li class="error">${e}</li>`).join('')}
      </ul>
    </div>
  ` : ''}
  
  ${serverState.prepareSuccess && serverState.nextApp ? `
    <div class="section">
      <p class="success">✅ Next.js is ready!</p>
      <p><strong>Handler Status:</strong> Disabled (causes process crashes)</p>
      <p><strong>Problem:</strong> Even with maximum error protection (domain, setTimeout, try-catch), handler causes Internal Server Error.</p>
      <p><strong>Possible Causes:</strong></p>
      <ul>
        <li>Memory limits (LVE limits on shared hosting)</li>
        <li>Next.js trying to load something that causes system-level crash</li>
        <li>Corrupted .next files</li>
        <li>System restrictions on shared hosting</li>
      </ul>
      <p><strong>Solutions to Try:</strong></p>
      <ol>
        <li><strong>Check logs:</strong> cPanel → Error Log or File Manager → logs/nodejs/</li>
        <li><strong>Contact Verpex support:</strong> Ask about memory limits and Next.js handler crashes</li>
        <li><strong>Rebuild project:</strong> Run <code>npm run build</code> locally and upload .next folder</li>
        <li><strong>Try server.js:</strong> It has improved error handling (may show error instead of crashing)</li>
      </ol>
    </div>
  ` : ''}
</body>
</html>
    `;
    
    // Handler is disabled - it causes process crashes that can't be caught
    // Even with domain, setTimeout, and all error handling, the process dies
    // This suggests a system-level issue (memory limits, or Next.js internals)
    
    if (USE_NEXTJS_HANDLER && serverState.prepareSuccess && serverState.nextApp && serverState.handle) {
      serverState.errors.push('Handler is disabled - causes process crashes. prepare() works, but handler causes Internal Server Error.');
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    console.error('Error in request handler:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${err.message}\n\nStack: ${err.stack}`);
  }
});

// Start server FIRST
server.listen(port, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('✅ SAFE SERVER RUNNING');
  console.log(`   Port: ${port}`);
  console.log(`   URL: http://0.0.0.0:${port}`);
  console.log('='.repeat(50));
  
  // NOW try to load Next.js (after server is running)
  setTimeout(() => {
    try {
      console.log('Attempting to load Next.js...');
      const next = require('next');
      serverState.nextJsLoaded = true;
      console.log('✅ Next.js module loaded');
      
      const nextFunction = next.default || next;
      const app = nextFunction({
        dev: false,
        conf: {
          basePath: basePath,
          assetPrefix: basePath
        }
      });
      
      serverState.nextApp = app;
      serverState.nextAppCreated = true;
      // Don't get handler immediately - get it after prepare()
      console.log('✅ Next.js app created');
      
      // Prepare
      serverState.prepareStarted = true;
      console.log('Preparing Next.js app...');
      
      app.prepare()
        .then(() => {
          serverState.prepareCompleted = true;
          serverState.prepareSuccess = true;
          console.log('✅ Next.js app prepared successfully');
          
          // Get handler AFTER prepare() completes
          try {
            serverState.handle = app.getRequestHandler();
            console.log('✅ Next.js handler obtained');
          } catch (err) {
            console.error('❌ Failed to get handler:', err);
            serverState.errors.push(`Failed to get handler: ${err.message}`);
          }
        })
        .catch((err) => {
          serverState.prepareCompleted = true;
          serverState.prepareSuccess = false;
          serverState.errors.push(`Prepare failed: ${err.message}`);
          console.error('❌ Next.js prepare failed:', err.message);
        });
    } catch (err) {
      serverState.errors.push(`Load error: ${err.message}`);
      console.error('❌ Failed to load Next.js:', err);
    }
  }, 1000);
});

server.on('error', (err) => {
  console.error('❌ SERVER ERROR:', err);
  serverState.errors.push(`Server error: ${err.message}`);
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  serverState.errors.push(`Uncaught exception: ${err.message}`);
  // Don't exit - keep server running
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:', reason);
  serverState.errors.push(`Unhandled rejection: ${String(reason)}`);
});

