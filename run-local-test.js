// Run server and test it
const { spawn } = require('child_process');
const http = require('http');

console.log('Starting server...');
process.env.NODE_ENV = 'production';
process.env.PORT = '3001';
process.env.NEXT_PUBLIC_BASE_PATH = '';

const server = spawn('node', ['server.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

server.stdout.on('data', (data) => {
  console.log(`[SERVER] ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`[SERVER ERROR] ${data}`);
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Wait a bit then test
setTimeout(() => {
  console.log('\nTesting server...');
  const req = http.get('http://localhost:3001', (res) => {
    console.log(`Status: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ Server works!');
      } else {
        console.log(`❌ Server error: ${res.statusCode}`);
        console.log('Response:', data.substring(0, 1000));
      }
      server.kill();
      process.exit(res.statusCode === 200 ? 0 : 1);
    });
  });
  
  req.on('error', (err) => {
    console.error('Request error:', err);
    server.kill();
    process.exit(1);
  });
  
  req.setTimeout(10000, () => {
    console.error('Request timeout');
    req.destroy();
    server.kill();
    process.exit(1);
  });
}, 15000);

