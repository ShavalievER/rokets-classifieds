// Diagnostic server - outputs diagnostics via HTTP response
const { createServer } = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3001;

// Collect diagnostics
const diagnostics = {
  timestamp: new Date().toISOString(),
  nodeVersion: process.version,
  nodeMajor: parseInt(process.version.slice(1).split('.')[0]),
  currentDir: __dirname,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'not set',
    PORT: port,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || 'not set'
  },
  files: {},
  errors: []
};

// Check files
const nextPath = path.join(__dirname, '.next');
const serverPath = path.join(nextPath, 'server');
const nodeModulesPath = path.join(__dirname, 'node_modules');
const nextModulePath = path.join(nodeModulesPath, 'next');
const packageJsonPath = path.join(__dirname, 'package.json');

diagnostics.files['.next'] = {
  exists: fs.existsSync(nextPath),
  path: nextPath
};

if (diagnostics.files['.next'].exists) {
  diagnostics.files['.next/server'] = {
    exists: fs.existsSync(serverPath),
    path: serverPath
  };
  
  // Check server files
  if (diagnostics.files['.next/server'].exists) {
    try {
      const serverFiles = fs.readdirSync(serverPath);
      diagnostics.files['.next/server'].files = serverFiles.slice(0, 10); // First 10 files
      diagnostics.files['.next/server'].fileCount = serverFiles.length;
    } catch (e) {
      diagnostics.errors.push(`Cannot read .next/server: ${e.message}`);
    }
  }
}

diagnostics.files['node_modules'] = {
  exists: fs.existsSync(nodeModulesPath),
  path: nodeModulesPath
};

if (diagnostics.files['node_modules'].exists) {
  diagnostics.files['node_modules/next'] = {
    exists: fs.existsSync(nextModulePath),
    path: nextModulePath
  };
}

diagnostics.files['package.json'] = {
  exists: fs.existsSync(packageJsonPath),
  path: packageJsonPath
};

// Try to load Next.js
let nextLoadError = null;
let nextModule = null;
try {
  nextModule = require('next');
  // Check how Next.js is exported (CommonJS vs ESM)
  const nextFunction = nextModule.default || nextModule;
  diagnostics.next = {
    loaded: true,
    version: nextModule ? 'loaded' : 'not loaded',
    hasDefault: !!nextModule.default,
    isFunction: typeof nextFunction === 'function'
  };
} catch (e) {
  nextLoadError = e;
  diagnostics.next = {
    loaded: false,
    error: e.message,
    stack: e.stack
  };
  diagnostics.errors.push(`Cannot load next module: ${e.message}`);
}

// Try to initialize Next.js
let nextApp = null;
let nextInitError = null;
if (nextModule) {
  try {
    const dev = false;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    
    // Try both default and direct export
    const nextFunction = nextModule.default || nextModule;
    
    if (typeof nextFunction !== 'function') {
      throw new Error(`Next.js export is not a function. Type: ${typeof nextFunction}, has default: ${!!nextModule.default}`);
    }
    
    nextApp = nextFunction({
      dev: dev,
      conf: {
        basePath: basePath,
        assetPrefix: basePath
      }
    });
    
    diagnostics.nextApp = {
      created: true
    };
  } catch (e) {
    nextInitError = e;
    diagnostics.nextApp = {
      created: false,
      error: e.message,
      stack: e.stack
    };
    diagnostics.errors.push(`Cannot create Next.js app: ${e.message}`);
  }
}

// Create HTTP server that shows diagnostics
let serverReady = false;
const server = createServer((req, res) => {
  // Update diagnostics timestamp
  diagnostics.timestamp = new Date().toISOString();
  
  // If Next.js is ready, try to use it
  if (nextApp && diagnostics.nextApp && diagnostics.nextApp.prepared) {
    const handle = nextApp.getRequestHandler();
    handle(req, res);
    return;
  }
  
  // Otherwise, show diagnostics
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Rokets Diagnostic</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
    h1 { color: #4CAF50; }
    h2 { color: #2196F3; margin-top: 30px; }
    .success { color: #4CAF50; }
    .error { color: #f44336; }
    .warning { color: #ff9800; }
    pre { background: #2a2a2a; padding: 15px; border-radius: 5px; overflow-x: auto; }
    .section { margin: 20px 0; padding: 15px; background: #2a2a2a; border-radius: 5px; }
    .file-check { margin: 10px 0; padding: 10px; background: #1a1a1a; border-left: 3px solid #4CAF50; }
    .file-check.error { border-left-color: #f44336; }
    .file-check.warning { border-left-color: #ff9800; }
  </style>
</head>
<body>
  <h1>🚀 Rokets Diagnostic Server</h1>
  <p class="success">✅ Server is running!</p>
  <p>Timestamp: ${diagnostics.timestamp}</p>
  
  <div class="section">
    <h2>Node.js Information</h2>
    <p>Version: <span class="success">${diagnostics.nodeVersion}</span></p>
    <p>Major Version: <span class="${diagnostics.nodeMajor >= 18 ? 'success' : 'error'}">${diagnostics.nodeMajor}</span> ${diagnostics.nodeMajor >= 18 ? '✅' : '❌ (Need 18+)'}</p>
    <p>Current Directory: <code>${diagnostics.currentDir}</code></p>
  </div>
  
  <div class="section">
    <h2>Environment Variables</h2>
    <pre>${JSON.stringify(diagnostics.env, null, 2)}</pre>
  </div>
  
  <div class="section">
    <h2>File System Checks</h2>
    ${Object.entries(diagnostics.files).map(([key, info]) => `
      <div class="file-check ${info.exists ? 'success' : 'error'}">
        <strong>${key}:</strong> ${info.exists ? '✅ EXISTS' : '❌ NOT FOUND'}
        <br><small>Path: <code>${info.path}</code></small>
        ${info.files ? `<br><small>Files (first 10): ${info.files.join(', ')}</small>` : ''}
        ${info.fileCount ? `<br><small>Total files: ${info.fileCount}</small>` : ''}
      </div>
    `).join('')}
  </div>
  
  <div class="section">
    <h2>Next.js Module</h2>
    ${diagnostics.next.loaded ? 
      `<p class="success">✅ Next.js module loaded</p>` : 
      `<p class="error">❌ Next.js module NOT loaded</p>
       <p class="error">Error: ${diagnostics.next.error}</p>
       <pre>${diagnostics.next.stack || ''}</pre>`
    }
  </div>
  
  <div class="section">
    <h2>Next.js App</h2>
    ${diagnostics.nextApp ? (
      diagnostics.nextApp.created ? 
        `<p class="success">✅ Next.js app created</p>
         ${diagnostics.nextApp.prepared ? 
           `<p class="success">✅ Next.js app prepared - Ready to serve!</p>` : 
           diagnostics.nextApp.error ?
             `<p class="error">❌ Next.js app prepare failed</p>
              <p class="error">Error: ${diagnostics.nextApp.error}</p>
              <pre>${diagnostics.nextApp.stack || ''}</pre>` :
             `<p class="warning">⏳ Next.js app preparing... (refresh page)</p>`
         }` :
        `<p class="error">❌ Next.js app NOT created</p>
         <p class="error">Error: ${diagnostics.nextApp.error}</p>
         <pre>${diagnostics.nextApp.stack || ''}</pre>`
    ) : (
      `<p class="warning">⚠️ Next.js app not initialized (module not loaded)</p>`
    )}
  </div>
  
  ${diagnostics.errors.length > 0 ? `
    <div class="section">
      <h2 class="error">Errors</h2>
      <ul>
        ${diagnostics.errors.map(err => `<li class="error">${err}</li>`).join('')}
      </ul>
    </div>
  ` : ''}
  
  <div class="section">
    <h2>Full Diagnostics (JSON)</h2>
    <pre>${JSON.stringify(diagnostics, null, 2)}</pre>
  </div>
  
  <p style="margin-top: 30px; color: #888;">
    <small>Refresh this page to see updated diagnostics. If Next.js is ready, it will serve the actual site.</small>
  </p>
</body>
</html>
  `;
  
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

// Start server and prepare Next.js
async function startServer() {
  // If Next.js app was created, prepare it first
  if (nextApp) {
    try {
      console.log('Preparing Next.js app...');
      await nextApp.prepare();
      diagnostics.nextApp.prepared = true;
      diagnostics.nextApp.status = 'ready';
      console.log('✅ Next.js app prepared successfully');
    } catch (err) {
      diagnostics.nextApp.prepared = false;
      diagnostics.nextApp.error = err.message;
      diagnostics.nextApp.stack = err.stack;
      diagnostics.errors.push(`Next.js prepare failed: ${err.message}`);
      console.error('❌ Failed to prepare Next.js app:', err.message);
    }
  }
  
  // Start HTTP server
  server.listen(port, '0.0.0.0', () => {
    serverReady = true;
    console.log('='.repeat(50));
    console.log('✅ DIAGNOSTIC SERVER RUNNING');
    console.log(`   Port: ${port}`);
    console.log(`   URL: http://0.0.0.0:${port}`);
    if (nextApp && diagnostics.nextApp && diagnostics.nextApp.prepared) {
      console.log('   Next.js is ready - serving actual site');
    } else {
      console.log('   Showing diagnostics page');
    }
    console.log('='.repeat(50));
  });
}

// Start the server
startServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
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

