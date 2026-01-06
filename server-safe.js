// Safe server that starts BEFORE loading Next.js
const http = require('http');
const os = require('os');
const v8 = require('v8');

const port = process.env.PORT || 3001;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

console.log('='.repeat(50));
console.log('SAFE SERVER STARTING');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Base path:', basePath || '(none)');

// System diagnostics (with error handling)
let systemInfo = {};
try {
  systemInfo = {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    uptime: process.uptime(),
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      external: Math.round(process.memoryUsage().external / 1024 / 1024) + ' MB'
    },
    v8Heap: (() => {
      try {
        return {
          total: Math.round(v8.getHeapStatistics().total_heap_size / 1024 / 1024) + ' MB',
          used: Math.round(v8.getHeapStatistics().used_heap_size / 1024 / 1024) + ' MB',
          available: Math.round(v8.getHeapStatistics().total_available_size / 1024 / 1024) + ' MB',
          limit: Math.round(v8.getHeapStatistics().heap_size_limit / 1024 / 1024) + ' MB'
        };
      } catch (e) {
        return { error: 'v8.getHeapStatistics() failed: ' + e.message };
      }
    })(),
    os: (() => {
      try {
        return {
          totalmem: Math.round(os.totalmem() / 1024 / 1024) + ' MB',
          freemem: Math.round(os.freemem() / 1024 / 1024) + ' MB',
          cpus: os.cpus().length
        };
      } catch (e) {
        return { error: 'os info failed: ' + e.message };
      }
    })(),
    env: {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      PORT: port,
      NEXT_PUBLIC_BASE_PATH: basePath || 'not set'
    }
  };
  console.log('System Info:', JSON.stringify(systemInfo, null, 2));
} catch (e) {
  console.error('Failed to initialize systemInfo:', e);
  systemInfo = { error: 'Failed to initialize: ' + e.message };
}

// Configuration
const USE_NEXTJS_HANDLER = true; // Enable with monitoring (with protection)

// Track state
let serverState = {
  started: new Date().toISOString(),
  nextJsLoaded: false,
  nextAppCreated: false,
  prepareStarted: false,
  prepareCompleted: false,
  prepareSuccess: false,
  errors: [],
  memorySnapshots: [],
  requestCount: 0,
  handlerAttempts: 0,
  handlerCrashes: 0
};

// Memory monitoring
function takeMemorySnapshot(label) {
  try {
    const mem = process.memoryUsage();
    let v8Heap = null;
    try {
      v8Heap = v8.getHeapStatistics();
    } catch (e) {
      console.error(`Failed to get v8 heap stats for ${label}:`, e);
    }
    
    const snapshot = {
      label,
      timestamp: new Date().toISOString(),
      memory: {
        rss: Math.round(mem.rss / 1024 / 1024) + ' MB',
        heapTotal: Math.round(mem.heapTotal / 1024 / 1024) + ' MB',
        heapUsed: Math.round(mem.heapUsed / 1024 / 1024) + ' MB',
        external: Math.round(mem.external / 1024 / 1024) + ' MB'
      },
      v8Heap: v8Heap ? {
        total: Math.round(v8Heap.total_heap_size / 1024 / 1024) + ' MB',
        used: Math.round(v8Heap.used_heap_size / 1024 / 1024) + ' MB',
        limit: Math.round(v8Heap.heap_size_limit / 1024 / 1024) + ' MB'
      } : { error: 'v8.getHeapStatistics() failed' }
    };
    
    if (serverState && serverState.memorySnapshots) {
      serverState.memorySnapshots.push(snapshot);
      // Keep only last 20 snapshots
      if (serverState.memorySnapshots.length > 20) {
        serverState.memorySnapshots = serverState.memorySnapshots.slice(-20);
      }
    }
    
    console.log(`Memory snapshot [${label}]:`, JSON.stringify(snapshot, null, 2));
    return snapshot;
  } catch (e) {
    console.error(`Failed to take memory snapshot [${label}]:`, e);
    return { label, timestamp: new Date().toISOString(), error: e.message };
  }
}

// Take initial snapshot
takeMemorySnapshot('Server Start');

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
      <li>Requests: ${serverState.requestCount}</li>
      <li>Handler Attempts: ${serverState.handlerAttempts}</li>
      <li>Handler Crashes: ${serverState.handlerCrashes}</li>
      <li>Next.js Loaded: ${serverState.nextJsLoaded ? '✅' : '❌'}</li>
      <li>Next.js App Created: ${serverState.nextAppCreated ? '✅' : '❌'}</li>
      <li>Prepare Started: ${serverState.prepareStarted ? '✅' : '❌'}</li>
      <li>Prepare Completed: ${serverState.prepareCompleted ? '✅' : '❌'}</li>
      <li>Prepare Success: ${serverState.prepareSuccess ? '✅' : '❌'}</li>
    </ul>
  </div>
  
  <div class="section">
    <h2>System Information:</h2>
    <pre>${JSON.stringify(systemInfo, null, 2)}</pre>
  </div>
  
  <div class="section">
    <h2>Current Memory Usage:</h2>
    <pre>${JSON.stringify((() => {
      const mem = process.memoryUsage();
      const v8Heap = v8.getHeapStatistics();
      return {
        timestamp: new Date().toISOString(),
        memory: {
          rss: Math.round(mem.rss / 1024 / 1024) + ' MB',
          heapTotal: Math.round(mem.heapTotal / 1024 / 1024) + ' MB',
          heapUsed: Math.round(mem.heapUsed / 1024 / 1024) + ' MB',
          external: Math.round(mem.external / 1024 / 1024) + ' MB'
        },
        v8Heap: {
          total: Math.round(v8Heap.total_heap_size / 1024 / 1024) + ' MB',
          used: Math.round(v8Heap.used_heap_size / 1024 / 1024) + ' MB',
          limit: Math.round(v8Heap.heap_size_limit / 1024 / 1024) + ' MB'
        }
      };
    })(), null, 2)}</pre>
  </div>
  
  ${serverState.memorySnapshots.length > 0 ? `
    <div class="section">
      <h2>Memory Snapshots (last ${Math.min(10, serverState.memorySnapshots.length)}):</h2>
      <pre>${JSON.stringify(serverState.memorySnapshots.slice(-10), null, 2)}</pre>
    </div>
  ` : ''}
  
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
    
    // Try handler with comprehensive monitoring
    if (USE_NEXTJS_HANDLER && serverState.prepareSuccess && serverState.nextApp && serverState.handle) {
      serverState.handlerAttempts++;
      console.log(`[Request #${requestId}] Attempting to use handler (attempt #${serverState.handlerAttempts})...`);
      
      takeMemorySnapshot(`Before Handler Call #${serverState.handlerAttempts}`);
      
      try {
        // Try to call handler with timeout
        const handlerTimeout = setTimeout(() => {
          console.error(`[Request #${requestId}] Handler timeout after 5 seconds`);
          serverState.errors.push(`Handler timeout on request #${requestId}`);
          if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('Handler timeout');
          }
        }, 5000);
        
        const handlePromise = serverState.handle(req, res);
        
        if (handlePromise && typeof handlePromise.catch === 'function') {
          handlePromise
            .then(() => {
              clearTimeout(handlerTimeout);
              takeMemorySnapshot(`After Handler Success #${serverState.handlerAttempts}`);
              console.log(`[Request #${requestId}] Handler completed successfully`);
            })
            .catch((err) => {
              clearTimeout(handlerTimeout);
              takeMemorySnapshot(`After Handler Error #${serverState.handlerAttempts}`);
              console.error(`[Request #${requestId}] Handler promise error:`, err);
              serverState.errors.push(`Handler error on request #${requestId}: ${err.message}`);
              
              if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`Handler error: ${err.message}\n\n${err.stack}`);
              }
            });
        } else {
          clearTimeout(handlerTimeout);
          takeMemorySnapshot(`After Handler Sync #${serverState.handlerAttempts}`);
        }
        
        return; // Let Next.js handle
      } catch (err) {
        serverState.handlerCrashes++;
        takeMemorySnapshot(`After Handler Crash #${serverState.handlerAttempts}`);
        console.error(`[Request #${requestId}] Handler sync error:`, err);
        serverState.errors.push(`Handler crash on request #${requestId}: ${err.message}`);
        serverState.errors.push(`Handler crash stack: ${err.stack}`);
        
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`Handler crash: ${err.message}\n\n${err.stack}`);
        }
        return;
      }
    }
    
    const requestDuration = Date.now() - requestStart;
    takeMemorySnapshot(`Request #${requestId} End (${requestDuration}ms)`);
    console.log(`[Request #${requestId}] Completed in ${requestDuration}ms`);
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    const requestDuration = Date.now() - requestStart;
    takeMemorySnapshot(`Request #${requestId} Error (${requestDuration}ms)`);
    console.error(`[Request #${requestId}] Error in request handler:`, err);
    console.error('Stack:', err.stack);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${err.message}\n\nStack: ${err.stack}`);
  }
});

// Start server FIRST
server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
  console.log('='.repeat(50));
  console.log('✅ SAFE SERVER RUNNING');
  console.log(`   Port: ${port}`);
  console.log(`   URL: http://0.0.0.0:${port}`);
  console.log('='.repeat(50));
  
  // NOW try to load Next.js (after server is running)
  setTimeout(() => {
    try {
      console.log('Attempting to load Next.js...');
      takeMemorySnapshot('Before Next.js Load');
      const next = require('next');
      serverState.nextJsLoaded = true;
      takeMemorySnapshot('After Next.js Load');
      console.log('✅ Next.js module loaded');
      
      const nextFunction = next.default || next;
      const app = nextFunction({
        dev: false,
        conf: {
          basePath: basePath,
          assetPrefix: basePath
        }
      });
      
      takeMemorySnapshot('Before App Creation');
      serverState.nextApp = app;
      serverState.nextAppCreated = true;
      takeMemorySnapshot('After App Creation');
      console.log('✅ Next.js app created');
      
      // Prepare
      serverState.prepareStarted = true;
      takeMemorySnapshot('Before Prepare');
      console.log('Preparing Next.js app...');
      
      app.prepare()
        .then(() => {
          takeMemorySnapshot('After Prepare Success');
          serverState.prepareCompleted = true;
          serverState.prepareSuccess = true;
          console.log('✅ Next.js app prepared successfully');
          
          // Get handler AFTER prepare() completes
          try {
            takeMemorySnapshot('Before Get Handler');
            serverState.handle = app.getRequestHandler();
            takeMemorySnapshot('After Get Handler');
            console.log('✅ Next.js handler obtained');
          } catch (err) {
            console.error('❌ Failed to get handler:', err);
            serverState.errors.push(`Failed to get handler: ${err.message}`);
            takeMemorySnapshot('After Get Handler Error');
          }
        })
        .catch((err) => {
          takeMemorySnapshot('After Prepare Error');
          serverState.prepareCompleted = true;
          serverState.prepareSuccess = false;
          serverState.errors.push(`Prepare failed: ${err.message}`);
          console.error('❌ Next.js prepare failed:', err.message);
          console.error('Stack:', err.stack);
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
  console.error('Stack:', err.stack);
  if (serverState) {
    serverState.errors.push(`Uncaught exception: ${err.message}`);
    serverState.errors.push(`Stack: ${err.stack}`);
  }
  // Don't exit immediately - try to log error
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:', reason);
  console.error('Promise:', promise);
  if (serverState) {
    serverState.errors.push(`Unhandled rejection: ${String(reason)}`);
  }
});

