const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  htmlPath: path.join(__dirname, '../index.html'),
  baseUrl: 'https://www.jksecurestack.com'
};

// Test CSP configuration
function testCSP() {
  console.log('🔍 Testing CSP configuration...\n');
  
  try {
    // Check if HTML file exists
    if (!fs.existsSync(config.htmlPath)) {
      console.log('❌ HTML file not found!');
      return false;
    }
    
    console.log('✅ HTML file found');
    
    // Read HTML content
    const htmlContent = fs.readFileSync(config.htmlPath, 'utf8');
    
    // Check for CSP meta tag
    const cspMatch = htmlContent.match(/<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    
    if (!cspMatch) {
      console.log('❌ CSP meta tag not found');
      return false;
    }
    
    console.log('✅ CSP meta tag found');
    
    const cspContent = cspMatch[1];
    console.log(`📄 CSP Content: ${cspContent.substring(0, 100)}...`);
    
    // Check for essential directives
    const checks = [
      {
        name: 'default-src directive',
        pattern: /default-src\s+['"]self['"]/,
        required: true
      },
      {
        name: 'script-src directive',
        pattern: /script-src\s+['"]self['"]/,
        required: true
      },
      {
        name: 'script-src-elem directive',
        pattern: /script-src-elem\s+['"]self['"]/,
        required: true
      },
      {
        name: 'frame-src directive',
        pattern: /frame-src\s+['"]self['"]/,
        required: true
      },
      {
        name: 'nonce support',
        pattern: /'nonce-[^'"]*'/,
        required: true
      },
      {
        name: 'strict-dynamic',
        pattern: /'strict-dynamic'/,
        required: true
      }
    ];
    
    let allPassed = true;
    
    checks.forEach(check => {
      if (check.pattern.test(cspContent)) {
        console.log(`✅ ${check.name} - Found`);
      } else {
        if (check.required) {
          console.log(`❌ ${check.name} - Missing (Required)`);
          allPassed = false;
        } else {
          console.log(`⚠️ ${check.name} - Missing (Optional)`);
        }
      }
    });
    
    // Check for common CSP issues
    const issues = [];
    
    // Check for inline scripts in HTML
    const inlineScripts = htmlContent.match(/<script[^>]*>(?!\s*<\/script>)[\s\S]*?<\/script>/g);
    if (inlineScripts && inlineScripts.length > 0) {
      let hasNonInlineScripts = false;
      inlineScripts.forEach(script => {
        if (!script.includes('nonce=') && !script.includes('src=')) {
          issues.push('Found inline script without nonce');
        } else {
          hasNonInlineScripts = true;
        }
      });
      if (!hasNonInlineScripts) {
        console.log('⚠️ Found inline scripts - consider externalizing');
      }
    }
    
    // Check for frame-ancestors in meta tag (should be in headers only)
    if (cspContent.includes('frame-ancestors')) {
      issues.push('frame-ancestors should be in HTTP headers, not meta tag');
    }
    
    if (issues.length > 0) {
      console.log('\n⚠️ Issues found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    }
    
    console.log(`\n📊 CSP summary:`);
    console.log(`  - CSP length: ${cspContent.length} characters`);
    console.log(`  - Directives found: ${cspContent.split(';').length}`);
    console.log(`  - Status: ${allPassed ? '✅ PASS' : '❌ FAIL'}`);
    
    return allPassed;
    
  } catch (error) {
    console.error(`❌ Error testing CSP: ${error.message}`);
    return false;
  }
}

// Test external scripts
function testExternalScripts() {
  console.log('\n🔍 Testing external scripts...\n');
  
  try {
    const htmlContent = fs.readFileSync(config.htmlPath, 'utf8');
    
    // Check for external script references
    const externalScripts = [
      '/src/utils/gtm.js',
      '/src/utils/structured-data.js',
      '/src/utils/security.js'
    ];
    
    let allFound = true;
    
    externalScripts.forEach(script => {
      if (htmlContent.includes(script)) {
        console.log(`✅ External script found: ${script}`);
      } else {
        console.log(`❌ External script missing: ${script}`);
        allFound = false;
      }
    });
    
    // Check for inline scripts that should be externalized
    const inlineScriptPatterns = [
      /<script[^>]*>\s*\(function\(/,
      /<script[^>]*>\s*\{\s*"@context"/
    ];
    
    inlineScriptPatterns.forEach(pattern => {
      if (pattern.test(htmlContent)) {
        console.log('⚠️ Found inline script that should be externalized');
      }
    });
    
    return allFound;
    
  } catch (error) {
    console.error(`❌ Error testing external scripts: ${error.message}`);
    return false;
  }
}

// Main test function
function runTests() {
  console.log('🚀 Starting CSP compliance tests...\n');
  
  const cspPassed = testCSP();
  const scriptsPassed = testExternalScripts();
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 Test Results Summary:');
  console.log('='.repeat(50));
  console.log(`CSP Configuration: ${cspPassed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`External Scripts: ${scriptsPassed ? '✅ PASS' : '❌ FAIL'}`);
  
  if (cspPassed && scriptsPassed) {
    console.log('\n🎉 All tests passed! Your CSP configuration looks good.');
    console.log('\n🔗 Next steps:');
    console.log('1. Deploy the updated configuration');
    console.log('2. Test the live site for CSP violations');
    console.log('3. Monitor browser console for any remaining issues');
  } else {
    console.log('\n⚠️ Some tests failed. Please review the issues above.');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = { testCSP, testExternalScripts, runTests };
