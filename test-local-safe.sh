#!/bin/bash
# Quick local test script with diagnostics

echo "=========================================="
echo "Local Server Test (with diagnostics)"
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

# Start server with diagnostics
echo "Starting server with diagnostics on http://localhost:3001"
echo "Press Ctrl+C to stop"
echo "=========================================="
node server-safe.js













