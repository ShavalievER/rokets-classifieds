// Минимальный тест для проверки работы Node.js
console.log('='.repeat(50));
console.log('MINIMAL TEST SERVER STARTED');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Current directory:', __dirname);
console.log('Port:', process.env.PORT || 3001);
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('NEXT_PUBLIC_BASE_PATH:', process.env.NEXT_PUBLIC_BASE_PATH || 'not set');

const http = require('http');
const fs = require('fs');
const path = require('path');

// Check files
console.log('\nChecking files:');
const nextPath = path.join(__dirname, '.next');
console.log('.next exists:', fs.existsSync(nextPath));
if (fs.existsSync(nextPath)) {
  const serverPath = path.join(nextPath, 'server');
  console.log('.next/server exists:', fs.existsSync(serverPath));
}

const nodeModulesPath = path.join(__dirname, 'node_modules');
console.log('node_modules exists:', fs.existsSync(nodeModulesPath));
if (fs.existsSync(nodeModulesPath)) {
  const nextModulePath = path.join(nodeModulesPath, 'next');
  console.log('node_modules/next exists:', fs.existsSync(nextModulePath));
}

const port = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  console.log('Request received:', req.method, req.url);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head><title>Test Server</title></head>
    <body>
      <h1>✅ Test server is working!</h1>
      <p>Node.js version: ${process.version}</p>
      <p>Port: ${port}</p>
      <p>Current directory: ${__dirname}</p>
      <p>Request: ${req.method} ${req.url}</p>
    </body>
    </html>
  `);
});

server.listen(port, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('✅ TEST SERVER RUNNING');
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













