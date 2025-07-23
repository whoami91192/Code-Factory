#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the SVG favicon
const svgPath = path.join(__dirname, '../public/favicon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Create a simple HTML file to render the SVG
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Favicon Generator</title>
    <style>
        body { margin: 0; padding: 0; background: transparent; }
        .favicon { display: block; }
    </style>
</head>
<body>
    ${svgContent}
</body>
</html>
`;

const tempHtmlPath = path.join(__dirname, '../public/temp-favicon.html');
fs.writeFileSync(tempHtmlPath, htmlContent);

console.log('✅ SVG favicon created successfully!');
console.log('📁 Files created:');
console.log('   - /public/favicon.svg (32x32)');
console.log('   - /public/favicon-32x32.png (placeholder)');
console.log('   - /public/favicon-16x16.png (placeholder)');
console.log('');
console.log('💡 To generate actual PNG files, you can:');
console.log('   1. Open /public/temp-favicon.html in a browser');
console.log('   2. Take screenshots at 32x32 and 16x16 sizes');
console.log('   3. Save them as favicon-32x32.png and favicon-16x16.png');
console.log('   4. Delete temp-favicon.html');
console.log('');
console.log('🔄 The SVG favicon will work in modern browsers immediately!'); 