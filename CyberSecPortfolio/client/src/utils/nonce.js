// Nonce generation utility for CSP
const crypto = require('crypto');

// Generate a random nonce for CSP
function generateNonce() {
  return crypto.randomBytes(16).toString('base64');
}

// Get nonce from environment or generate new one
function getNonce() {
  return process.env.CSP_NONCE || generateNonce();
}

// Create nonce attribute for scripts
function createNonceAttr() {
  return `nonce="${getNonce()}"`;
}

module.exports = {
  generateNonce,
  getNonce,
  createNonceAttr
};
