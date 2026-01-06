// Server that skips prepare() to test if the issue is in prepare()
const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3001;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

console.log('='.repeat(50));
console.log('Starting server WITHOUT prepare()');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Base path:', basePath || '(none)');

// Create Next.js app
const app = next({
  dev: false,
  conf: {
    basePath: basePath,
    assetPrefix: basePath
  }
});

const handle = app.getRequestHandler();

// Start server WITHOUT calling prepare()
// This will cause errors when handling requests, but will show if the server itself works
createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Try to handle request
  // This will fail if prepare() wasn't called, but we'll see the error
  try {
    handle(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Error</title></head>
      <body>
        <h1>Server is running, but prepare() was not called</h1>
        <p>This means the server itself works, but Next.js needs prepare() to be called.</p>
        <p>Error: ${error.message}</p>
        <pre>${error.stack}</pre>
      </body>
      </html>
    `);
  }
}).listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log('='.repeat(50));
  console.log('✅ SERVER RUNNING (without prepare())');
  console.log(`   Port: ${port}`);
  console.log(`   URL: http://0.0.0.0:${port}`);
  console.log('   Note: Requests will fail because prepare() was not called');
  console.log('   This is just to test if the server itself works');
  console.log('='.repeat(50));
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:', reason);
});

