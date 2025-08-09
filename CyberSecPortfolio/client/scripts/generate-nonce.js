const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const config = {
  htmlPath: path.join(__dirname, '../index.html'),
  outputPath: path.join(__dirname, '../index.html'),
  nonceLength: 16
};

// Generate a random nonce
function generateNonce() {
  return crypto.randomBytes(config.nonceLength).toString('base64');
}

// Replace nonce placeholders in HTML
function replaceNonces(htmlContent, nonce) {
  return htmlContent.replace(/REPLACE_WITH_NONCE/g, nonce);
}

// Main function
function generateAndReplaceNonces() {
  try {
    console.log('🔐 Generating CSP nonces...');
    
    // Generate nonce
    const nonce = generateNonce();
    console.log(`✅ Generated nonce: ${nonce}`);
    
    // Read HTML file
    const htmlContent = fs.readFileSync(config.htmlPath, 'utf8');
    
    // Replace nonce placeholders
    const updatedHtml = replaceNonces(htmlContent, nonce);
    
    // Write updated HTML
    fs.writeFileSync(config.outputPath, updatedHtml, 'utf8');
    
    console.log('✅ Nonces replaced successfully');
    console.log(`📄 Updated file: ${config.outputPath}`);
    
    return nonce;
  } catch (error) {
    console.error('❌ Error generating nonces:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateAndReplaceNonces();
}

module.exports = { generateNonce, generateAndReplaceNonces };
