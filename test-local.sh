#!/bin/bash
# Quick local test script

echo "=========================================="
echo "Local Server Test"
echo "=========================================="

# Check Node.js version
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build if .next doesn't exist
if [ ! -d ".next" ]; then
  echo "Building project..."
  npm run build
fi

# Set environment
export NODE_ENV=production
export PORT=3001
export NEXT_PUBLIC_BASE_PATH=""

# Start server
echo "Starting server on http://localhost:3001"
echo "Press Ctrl+C to stop"
echo "=========================================="
node server.js













