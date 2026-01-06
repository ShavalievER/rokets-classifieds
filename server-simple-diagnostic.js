// Ultra-simple diagnostic server - guaranteed to work
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3001;

console.log('='.repeat(50));
console.log('STARTING SIMPLE DIAGNOSTIC SERVER');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Current directory:', __dirname);

// Collect diagnostics step by step
const diagnostics = {
  timestamp: new Date().toISOString(),
  nodeVersion: process.version,
  currentDir: __dirname,
  port: port,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'not set',
    PORT: port,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || 'not set'
  },
  checks: [],
  errors: []
};

// Check 1: Files
try {
  const nextPath = path.join(__dirname, '.next');
  diagnostics.checks.push({
    name: '.next folder',
    exists: fs.existsSync(nextPath),
    path: nextPath
  });
  
  if (fs.existsSync(nextPath)) {
    const serverPath = path.join(nextPath, 'server');
    diagnostics.checks.push({
      name: '.next/server folder',
      exists: fs.existsSync(serverPath),
      path: serverPath
    });
  }
} catch (e) {
  diagnostics.errors.push(`File check error: ${e.message}`);
}

try {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  diagnostics.checks.push({
    name: 'node_modules folder',
    exists: fs.existsSync(nodeModulesPath),
    path: nodeModulesPath
  });
  
  if (fs.existsSync(nodeModulesPath)) {
    const nextModulePath = path.join(nodeModulesPath, 'next');
    diagnostics.checks.push({
      name: 'node_modules/next',
      exists: fs.existsSync(nextModulePath),
      path: nextModulePath
    });
  }
} catch (e) {
  diagnostics.errors.push(`Node modules check error: ${e.message}`);
}

// Check 2: Try to load Next.js
let nextModule = null;
try {
  console.log('Attempting to load Next.js module...');
  nextModule = require('next');
  diagnostics.checks.push({
    name: 'Next.js module',
    loaded: true,
    type: typeof nextModule,
    hasDefault: !!nextModule.default
  });
  console.log('✅ Next.js module loaded');
} catch (e) {
  diagnostics.errors.push(`Cannot load Next.js: ${e.message}`);
  diagnostics.checks.push({
    name: 'Next.js module',
    loaded: false,
    error: e.message
  });
  console.error('❌ Failed to load Next.js:', e.message);
}

// Check 3: Try to create Next.js app
let nextApp = null;
if (nextModule) {
  try {
    console.log('Attempting to create Next.js app...');
    const nextFunction = nextModule.default || nextModule;
    
    if (typeof nextFunction !== 'function') {
      throw new Error(`Next.js export is not a function. Type: ${typeof nextFunction}`);
    }
    
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    nextApp = nextFunction({
      dev: false,
      conf: {
        basePath: basePath,
        assetPrefix: basePath
      }
    });
    
    diagnostics.checks.push({
      name: 'Next.js app',
      created: true
    });
    console.log('✅ Next.js app created');
    
    // Try to prepare (async, non-blocking)
    nextApp.prepare()
      .then(() => {
        console.log('✅ Next.js app prepared successfully');
        diagnostics.checks.push({
          name: 'Next.js prepare',
          success: true
        });
      })
      .catch((err) => {
        console.error('❌ Next.js prepare failed:', err.message);
        diagnostics.errors.push(`Next.js prepare failed: ${err.message}`);
        diagnostics.checks.push({
          name: 'Next.js prepare',
          success: false,
          error: err.message
        });
      });
  } catch (e) {
    diagnostics.errors.push(`Cannot create Next.js app: ${e.message}`);
    diagnostics.checks.push({
      name: 'Next.js app',
      created: false,
      error: e.message
    });
    console.error('❌ Failed to create Next.js app:', e.message);
  }
}

// Create HTTP server
console.log('Creating HTTP server...');
const server = http.createServer((req, res) => {
  // Update timestamp
  diagnostics.timestamp = new Date().toISOString();
  
  // If Next.js is ready, try to use it
  if (nextApp && diagnostics.checks.find(c => c.name === 'Next.js prepare' && c.success)) {
    try {
      const handle = nextApp.getRequestHandler();
      handle(req, res);
      return;
    } catch (e) {
      console.error('Error using Next.js handler:', e.message);
      // Fall through to show diagnostics
    }
  }
  
  // Show diagnostics
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Rokets Diagnostic</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #4CAF50; }
    .success { color: #4CAF50; }
    .error { color: #f44336; }
    .check { margin: 10px 0; padding: 10px; background: #2a2a2a; border-left: 3px solid #4CAF50; }
    .check.error { border-left-color: #f44336; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>🚀 Rokets Simple Diagnostic</h1>
  <p class="success">✅ Server is running!</p>
  <p>Timestamp: ${diagnostics.timestamp}</p>
  
  <h2>Checks:</h2>
  ${diagnostics.checks.map(check => `
    <div class="check ${check.exists === false || check.loaded === false || check.created === false || check.success === false ? 'error' : ''}">
      <strong>${check.name}:</strong> 
      ${check.exists !== undefined ? (check.exists ? '✅ EXISTS' : '❌ NOT FOUND') : ''}
      ${check.loaded !== undefined ? (check.loaded ? '✅ LOADED' : '❌ NOT LOADED') : ''}
      ${check.created !== undefined ? (check.created ? '✅ CREATED' : '❌ NOT CREATED') : ''}
      ${check.success !== undefined ? (check.success ? '✅ SUCCESS' : '❌ FAILED') : ''}
      ${check.path ? `<br><small>Path: <code>${check.path}</code></small>` : ''}
      ${check.error ? `<br><small class="error">Error: ${check.error}</small>` : ''}
    </div>
  `).join('')}
  
  ${diagnostics.errors.length > 0 ? `
    <h2 class="error">Errors:</h2>
    <ul>
      ${diagnostics.errors.map(err => `<li class="error">${err}</li>`).join('')}
    </ul>
  ` : ''}
  
  <h2>Full Diagnostics (JSON):</h2>
  <pre>${JSON.stringify(diagnostics, null, 2)}</pre>
</body>
</html>
  `;
  
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

// Start server
console.log('Starting server...');
server.listen(port, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('✅ SIMPLE DIAGNOSTIC SERVER RUNNING');
  console.log(`   Port: ${port}`);
  console.log(`   URL: http://0.0.0.0:${port}`);
  console.log('='.repeat(50));
});

server.on('error', (err) => {
  console.error('❌ SERVER ERROR:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:', reason);
  process.exit(1);
});

