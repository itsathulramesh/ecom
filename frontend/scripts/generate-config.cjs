/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const envFile = path.resolve(__dirname, `../.env.${env}`);

// Load environment variables from the selected file
const result = dotenv.config({ path: envFile });

if (result.error) {
  console.warn(`No .env.${env} file found or error loading it. Using default values.`);
}

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000'; // Default to development URL

const configContent = `window.RUNTIME_CONFIG = { API_URL: "${API_URL}" };`;
const outputPath = path.resolve(__dirname, '../public/config.js');

fs.writeFileSync(outputPath, configContent, 'utf8');

console.log(`Generated ${outputPath} with API_URL: ${API_URL} for ${env} environment.`);
