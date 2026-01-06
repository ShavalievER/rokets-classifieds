// Ultra-simple error catcher - shows any error that occurs
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3001;

console.log('='.repeat(50));
console.log('ERROR CATCHER SERVER STARTING');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Current directory:', __dirname);

let lastError = null;
let errorCount = 0;
let nextApp = null;
let prepareStatus = {
  started: false,
  completed: false,
  success: false,
  error: null,
  startTime: null,
  endTime: null
};

// Catch all errors
process.on('uncaughtException', (err) => {
  errorCount++;
  lastError = {
    type: 'uncaughtException',
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  };
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  console.error('Stack:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  errorCount++;
  lastError = {
    type: 'unhandledRejection',
    reason: reason?.toString(),
    stack: reason?.stack,
    timestamp: new Date().toISOString()
  };
  console.error('❌ UNHANDLED REJECTION:', reason);
});

// Create simple server that always shows diagnostics
const server = http.createServer((req, res) => {
  try {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Error Catcher</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #4CAF50; }
    .error { color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>🚀 Error Catcher Server</h1>
  <p class="success">✅ Server is running!</p>
  <p>Timestamp: ${new Date().toISOString()}</p>
  <p>Request: ${req.method} ${req.url}</p>
  
  <h2>Process Info:</h2>
  <ul>
    <li>Node.js version: ${process.version}</li>
    <li>Port: ${port}</li>
    <li>Current directory: ${__dirname}</li>
    <li>Error count: ${errorCount}</li>
  </ul>
  
  ${lastError ? `
    <h2 class="error">Last Error:</h2>
    <div class="error">
      <p><strong>Type:</strong> ${lastError.type}</p>
      <p><strong>Message:</strong> ${lastError.message || lastError.reason}</p>
      <p><strong>Timestamp:</strong> ${lastError.timestamp}</p>
      ${lastError.stack ? `<pre>${lastError.stack}</pre>` : ''}
    </div>
  ` : '<p>No errors detected</p>'}
  
  <h2>Try to load Next.js:</h2>
  <p>Attempting to load Next.js module...</p>
  
  ${(() => {
    try {
      const next = require('next');
      return '<p class="success">✅ Next.js module loaded</p>';
    } catch (e) {
      return `<p class="error">❌ Failed to load Next.js: ${e.message}</p><pre>${e.stack}</pre>`;
    }
  })()}
  
  ${(() => {
    try {
      const next = require('next');
      const nextFunction = next.default || next;
      if (typeof nextFunction !== 'function') {
        return '<p class="error">❌ Next.js export is not a function</p>';
      }
      
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const app = nextFunction({
        dev: false,
        conf: {
          basePath: basePath,
          assetPrefix: basePath
        }
      });
      
      return '<p class="success">✅ Next.js app created</p>';
    } catch (e) {
      return `<p class="error">❌ Failed to create Next.js app: ${e.message}</p><pre>${e.stack}</pre>`;
    }
  })()}
  
  <h2>Next.js prepare() Status:</h2>
  ${prepareStatus.started ? `
    <p>Status: ${prepareStatus.completed ? (prepareStatus.success ? '<span class="success">✅ SUCCESS</span>' : '<span class="error">❌ FAILED</span>') : '<span>⏳ IN PROGRESS...</span>'}</p>
    ${prepareStatus.startTime ? `<p>Started: ${prepareStatus.startTime}</p>` : ''}
    ${prepareStatus.endTime ? `<p>Completed: ${prepareStatus.endTime}</p>` : ''}
    ${prepareStatus.error ? `<p class="error">Error: ${prepareStatus.error}</p>` : ''}
  ` : '<p>Not started yet. Will start automatically...</p>'}
</body>
</html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    // Even if HTML generation fails, try to send error
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error generating page: ${err.message}\n\nStack: ${err.stack}`);
  }
});

// Try to prepare Next.js in background
function tryPrepareNext() {
  if (prepareStatus.started) {
    return; // Already started
  }
  
  try {
    const next = require('next');
    const nextFunction = next.default || next;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    
    if (typeof nextFunction !== 'function') {
      prepareStatus.error = 'Next.js export is not a function';
      prepareStatus.completed = true;
      return;
    }
    
    nextApp = nextFunction({
      dev: false,
      conf: {
        basePath: basePath,
        assetPrefix: basePath
      }
    });
    
    prepareStatus.started = true;
    prepareStatus.startTime = new Date().toISOString();
    console.log('Starting Next.js prepare()...');
    
    nextApp.prepare()
      .then(() => {
        prepareStatus.completed = true;
        prepareStatus.success = true;
        prepareStatus.endTime = new Date().toISOString();
        console.log('✅ Next.js prepare() completed successfully');
      })
      .catch((err) => {
        prepareStatus.completed = true;
        prepareStatus.success = false;
        prepareStatus.error = err.message;
        prepareStatus.endTime = new Date().toISOString();
        console.error('❌ Next.js prepare() failed:', err.message);
        console.error('Stack:', err.stack);
        lastError = {
          type: 'prepareError',
          message: err.message,
          stack: err.stack,
          timestamp: new Date().toISOString()
        };
      });
  } catch (e) {
    prepareStatus.started = true;
    prepareStatus.completed = true;
    prepareStatus.success = false;
    prepareStatus.error = e.message;
    prepareStatus.endTime = new Date().toISOString();
    console.error('❌ Failed to start prepare():', e.message);
  }
}

server.listen(port, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('✅ ERROR CATCHER SERVER RUNNING');
  console.log(`   Port: ${port}`);
  console.log(`   URL: http://0.0.0.0:${port}`);
  console.log('='.repeat(50));
  
  // Start prepare() in background
  setTimeout(() => {
    tryPrepareNext();
  }, 1000);
});

server.on('error', (err) => {
  console.error('❌ SERVER ERROR:', err);
  lastError = {
    type: 'serverError',
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  };
});

