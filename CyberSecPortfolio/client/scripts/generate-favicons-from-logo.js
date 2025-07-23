#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎨 Setting up favicon from your logo.png file...');

// Check if logo.png exists
const logoPath = path.join(__dirname, '../public/logo.png');
if (!fs.existsSync(logoPath)) {
  console.error('❌ logo.png not found in public directory');
  process.exit(1);
}

console.log('✅ Found logo.png in public directory');

// Create a simple HTML file to display the logo for favicon generation
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Logo to Favicon Converter</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            background: #f0f0f0; 
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .logo-display {
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            border: 2px dashed #ccc;
            border-radius: 5px;
        }
        .favicon-preview {
            display: inline-block;
            margin: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background: white;
        }
        .instructions {
            background: #e8f4fd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        h1 { color: #333; }
        h2 { color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Logo to Favicon Converter</h1>
        
        <div class="instructions">
            <h2>📋 Instructions:</h2>
            <ol>
                <li>Right-click on each favicon preview below</li>
                <li>Select "Save image as..."</li>
                <li>Save with the exact filename shown</li>
                <li>Place the files in the <code>public</code> directory</li>
            </ol>
        </div>
        
        <div class="logo-display">
            <h2>Your Original Logo:</h2>
            <img src="logo.png" alt="JK Logo" style="max-width: 200px; height: auto;">
        </div>
        
        <h2>📱 Favicon Previews (Right-click to save):</h2>
        
        <div class="favicon-preview">
            <h3>favicon-32x32.png</h3>
            <img src="logo.png" alt="32x32 Favicon" style="width: 32px; height: 32px; object-fit: contain;">
        </div>
        
        <div class="favicon-preview">
            <h3>favicon-16x16.png</h3>
            <img src="logo.png" alt="16x16 Favicon" style="width: 16px; height: 16px; object-fit: contain;">
        </div>
        
        <div class="favicon-preview">
            <h3>apple-touch-icon.png (180x180)</h3>
            <img src="logo.png" alt="Apple Touch Icon" style="width: 60px; height: 60px; object-fit: contain;">
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <h3>✅ Current Status:</h3>
            <ul>
                <li>✅ SVG favicon created (favicon.svg)</li>
                <li>⏳ PNG favicons need to be saved from above</li>
                <li>⏳ HTML favicon references are ready</li>
            </ul>
        </div>
    </div>
</body>
</html>
`;

const converterPath = path.join(__dirname, '../public/logo-to-favicon.html');
fs.writeFileSync(converterPath, htmlContent);

console.log('✅ Created logo-to-favicon.html converter');
console.log('');
console.log('📁 Files ready:');
console.log('   ✅ /public/logo.png (your original logo)');
console.log('   ✅ /public/favicon.svg (SVG version)');
console.log('   ✅ /public/logo-to-favicon.html (converter tool)');
console.log('');
console.log('🔄 Next steps:');
console.log('   1. Open http://localhost:5173/logo-to-favicon.html in your browser');
console.log('   2. Right-click each favicon preview and save with correct filename');
console.log('   3. Place saved files in the public directory');
console.log('   4. Restart your dev server to see the new favicon');
console.log('');
console.log('🎯 Your favicon will now display your exact JK logo in browser tabs!'); 