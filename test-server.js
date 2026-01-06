// Test script to verify server works locally
const http = require('http');

console.log('Testing server on http://localhost:3001...');

const req = http.get('http://localhost:3001', (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Server is working!');
      console.log(`Response length: ${data.length} bytes`);
      if (data.includes('Rokets') || data.includes('Next.js')) {
        console.log('✅ Response contains expected content');
      }
    } else {
      console.log(`❌ Server returned status ${res.statusCode}`);
      console.log('Response:', data.substring(0, 500));
    }
    process.exit(res.statusCode === 200 ? 0 : 1);
  });
});

req.on('error', (err) => {
  console.error('❌ Request failed:', err.message);
  console.error('Make sure server is running on port 3001');
  process.exit(1);
});

req.setTimeout(5000, () => {
  console.error('❌ Request timeout');
  req.destroy();
  process.exit(1);
});

