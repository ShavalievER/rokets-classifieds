// Static file server for Verpex
// Serves files from the 'out' folder (Next.js static export)
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 3001;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const outDir = path.join(__dirname, 'out');

console.log('='.repeat(50));
console.log('STATIC FILE SERVER STARTING');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Base path:', basePath || '(none)');
console.log('Out directory:', outDir);

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.error('❌ ERROR: out/ directory not found!');
  console.error('Please run: npm run build (with output: export in next.config.ts)');
  process.exit(1);
}

console.log('✅ out/ directory found');

// MIME types
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function serveFile(filePath, res) {
  try {
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Try index.html in directory
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        serveFile(indexPath, res);
        return;
      }
      // Return 404 if no index.html
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('404 - Directory listing not available');
      return;
    }

    const content = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': content.length,
    });
    res.end(content);
  } catch (err) {
    console.error('Error serving file:', filePath, err);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('500 - Internal Server Error');
  }
}

const server = http.createServer((req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Remove base path if set
    if (basePath && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length) || '/';
    }

    // Normalize path
    if (pathname === '/') {
      pathname = '/index.html';
    }

    // Remove leading slash and resolve path
    const safePath = pathname.slice(1) || 'index.html';
    const filePath = path.join(outDir, safePath);

    // Security: prevent directory traversal
    const resolvedPath = path.resolve(filePath);
    const resolvedOutDir = path.resolve(outDir);
    
    if (!resolvedPath.startsWith(resolvedOutDir)) {
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('403 - Forbidden');
      return;
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Try with .html extension (for Next.js routes)
      const htmlPath = filePath + '.html';
      if (fs.existsSync(htmlPath)) {
        serveFile(htmlPath, res);
        return;
      }
      
      // Try 404.html
      const notFoundPath = path.join(outDir, '404.html');
      if (fs.existsSync(notFoundPath)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        const content = fs.readFileSync(notFoundPath);
        res.end(content);
        return;
      }
      
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('404 - File Not Found');
      return;
    }

    serveFile(filePath, res);
  } catch (err) {
    console.error('Error handling request:', err);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('500 - Internal Server Error');
  }
});

server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
  console.log('='.repeat(50));
  console.log('✅ STATIC SERVER RUNNING');
  console.log(`   Port: ${port}`);
  console.log(`   URL: http://0.0.0.0:${port}`);
  console.log(`   Serving from: ${outDir}`);
  console.log('='.repeat(50));
});

server.on('error', (err) => {
  console.error('❌ SERVER ERROR:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION:', reason);
});

