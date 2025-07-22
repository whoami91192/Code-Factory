// CSP Testing Utilities

/**
 * Test CSP functionality by attempting to create elements that should be blocked
 */
export function testCSP(): void {
  console.log('🔒 Testing Content Security Policy...');
  
  // Test 1: Try to create an inline script (should be blocked)
  try {
    const testScript = document.createElement('script');
    testScript.textContent = 'console.log("This should be blocked by CSP");';
    document.head.appendChild(testScript);
    console.log('❌ CSP Test Failed: Inline script was allowed');
  } catch (error) {
    console.log('✅ CSP Test Passed: Inline script was blocked');
  }
  
  // Test 2: Try to create an inline style (should be blocked)
  try {
    const testStyle = document.createElement('style');
    testStyle.textContent = 'body { background: red !important; }';
    document.head.appendChild(testStyle);
    console.log('❌ CSP Test Failed: Inline style was allowed');
  } catch (error) {
    console.log('✅ CSP Test Passed: Inline style was blocked');
  }
  
  // Test 3: Check if CSP meta tag exists
  const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (cspMeta) {
    console.log('✅ CSP meta tag found');
    console.log('CSP Content:', cspMeta.getAttribute('content'));
  } else {
    console.log('❌ CSP meta tag not found');
  }
  
  // Test 4: Check if nonce is present
  const nonce = sessionStorage.getItem('csp-nonce');
  if (nonce) {
    console.log('✅ CSP nonce found in session storage');
  } else {
    console.log('❌ CSP nonce not found in session storage');
  }
  
  // Test 5: Check security headers
  checkSecurityHeaders();
}

/**
 * Check if security headers are present
 */
async function checkSecurityHeaders(): Promise<void> {
  try {
    const response = await fetch(window.location.href, { method: 'HEAD' });
    
    const headers = {
      'X-Frame-Options': response.headers.get('X-Frame-Options'),
      'X-Content-Type-Options': response.headers.get('X-Content-Type-Options'),
      'X-XSS-Protection': response.headers.get('X-XSS-Protection'),
      'Referrer-Policy': response.headers.get('Referrer-Policy'),
      'Permissions-Policy': response.headers.get('Permissions-Policy'),
      'Cross-Origin-Embedder-Policy': response.headers.get('Cross-Origin-Embedder-Policy'),
      'Cross-Origin-Opener-Policy': response.headers.get('Cross-Origin-Opener-Policy'),
      'Cross-Origin-Resource-Policy': response.headers.get('Cross-Origin-Resource-Policy')
    };
    
    console.log('🔒 Security Headers Check:');
    Object.entries(headers).forEach(([header, value]) => {
      if (value) {
        console.log(`✅ ${header}: ${value}`);
      } else {
        console.log(`❌ ${header}: Not found`);
      }
    });
  } catch (error) {
    console.log('❌ Could not check security headers:', error);
  }
}

/**
 * Test CORS configuration
 */
export async function testCORS(): Promise<void> {
  console.log('🌐 Testing CORS Configuration...');
  
  try {
    // Test API endpoint
    const response = await fetch('/api/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      console.log('✅ API endpoint accessible from same origin');
    } else {
      console.log('❌ API endpoint not accessible');
    }
  } catch (error) {
    console.log('❌ CORS test failed:', error);
  }
}

/**
 * Run all security tests
 */
export function runSecurityTests(): void {
  console.log('🚀 Running Security Tests...');
  testCSP();
  testCORS();
}

// Auto-run tests in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    runSecurityTests();
  }, 2000); // Wait for CSP to initialize
} 