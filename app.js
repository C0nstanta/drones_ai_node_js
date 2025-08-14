const path = require('path');

// Always run in production
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// IMPORTANT: run from the standalone folder so Next resolves static/public correctly
process.chdir(path.join(__dirname, '.next', 'standalone'));

// Start Next's standalone server
require('./.next/standalone/server.js');
