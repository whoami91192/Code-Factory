const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  robotsPath: path.join(__dirname, '../public/robots.txt'),
  sitemapPath: path.join(__dirname, '../public/sitemap.xml'),
  baseUrl: 'https://www.jksecurestack.com'
};

// Test robots.txt file
function testRobotsTxt() {
  console.log('🔍 Testing robots.txt configuration...\n');
  
  try {
    // Check if robots.txt exists
    if (!fs.existsSync(config.robotsPath)) {
      console.log('❌ robots.txt file not found!');
      return false;
    }
    
    console.log('✅ robots.txt file found');
    
    // Read robots.txt content
    const robotsContent = fs.readFileSync(config.robotsPath, 'utf8');
    
    // Check for essential directives
    const checks = [
      {
        name: 'User-agent directive',
        pattern: /User-agent:\s*\*/,
        required: true
      },
      {
        name: 'Allow directive',
        pattern: /Allow:\s*\//,
        required: true
      },
      {
        name: 'Sitemap directive',
        pattern: /Sitemap:\s*https:\/\/www\.jksecurestack\.com\/sitemap\.xml/,
        required: true
      },
      {
        name: 'Disallow for API',
        pattern: /Disallow:\s*\/api\//,
        required: true
      },
      {
        name: 'Crawl-delay',
        pattern: /Crawl-delay:\s*\d+/,
        required: false
      }
    ];
    
    let allPassed = true;
    
    checks.forEach(check => {
      if (check.pattern.test(robotsContent)) {
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
    
    // Check sitemap reference
    if (robotsContent.includes('sitemap.xml')) {
      console.log('✅ Sitemap reference - Found');
    } else {
      console.log('❌ Sitemap reference - Missing');
      allPassed = false;
    }
    
    // Check for common issues
    const issues = [];
    
    if (robotsContent.includes('<!doctype html>') || robotsContent.includes('<html>')) {
      issues.push('robots.txt contains HTML content (should be plain text)');
      allPassed = false;
    }
    
    if (robotsContent.length > 10000) {
      issues.push('robots.txt is unusually large (over 10KB)');
    }
    
    if (issues.length > 0) {
      console.log('\n⚠️ Issues found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    }
    
    console.log(`\n📊 robots.txt summary:`);
    console.log(`  - File size: ${(robotsContent.length / 1024).toFixed(2)} KB`);
    console.log(`  - Lines: ${robotsContent.split('\n').length}`);
    console.log(`  - Status: ${allPassed ? '✅ PASS' : '❌ FAIL'}`);
    
    return allPassed;
    
  } catch (error) {
    console.error(`❌ Error testing robots.txt: ${error.message}`);
    return false;
  }
}

// Test sitemap
function testSitemap() {
  console.log('\n🔍 Testing sitemap configuration...\n');
  
  try {
    if (!fs.existsSync(config.sitemapPath)) {
      console.log('❌ sitemap.xml file not found!');
      return false;
    }
    
    console.log('✅ sitemap.xml file found');
    
    const sitemapContent = fs.readFileSync(config.sitemapPath, 'utf8');
    
    // Check for XML declaration
    if (sitemapContent.includes('<?xml version="1.0"')) {
      console.log('✅ XML declaration - Found');
    } else {
      console.log('❌ XML declaration - Missing');
      return false;
    }
    
    // Check for urlset element
    if (sitemapContent.includes('<urlset')) {
      console.log('✅ urlset element - Found');
    } else {
      console.log('❌ urlset element - Missing');
      return false;
    }
    
    // Count URLs
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    console.log(`✅ URLs found: ${urlCount}`);
    
    // Check for required elements in each URL
    const requiredElements = ['<loc>', '<lastmod>', '<changefreq>', '<priority>'];
    const missingElements = [];
    
    requiredElements.forEach(element => {
      if (!sitemapContent.includes(element)) {
        missingElements.push(element);
      }
    });
    
    if (missingElements.length > 0) {
      console.log(`❌ Missing required elements: ${missingElements.join(', ')}`);
      return false;
    } else {
      console.log('✅ All required elements - Found');
    }
    
    console.log(`\n📊 sitemap.xml summary:`);
    console.log(`  - File size: ${(sitemapContent.length / 1024).toFixed(2)} KB`);
    console.log(`  - URLs: ${urlCount}`);
    console.log(`  - Status: ✅ PASS`);
    
    return true;
    
  } catch (error) {
    console.error(`❌ Error testing sitemap: ${error.message}`);
    return false;
  }
}

// Main test function
function runTests() {
  console.log('🚀 Starting SEO configuration tests...\n');
  
  const robotsPassed = testRobotsTxt();
  const sitemapPassed = testSitemap();
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 Test Results Summary:');
  console.log('='.repeat(50));
  console.log(`robots.txt: ${robotsPassed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`sitemap.xml: ${sitemapPassed ? '✅ PASS' : '❌ FAIL'}`);
  
  if (robotsPassed && sitemapPassed) {
    console.log('\n🎉 All tests passed! Your SEO configuration looks good.');
    console.log(`\n🔗 Test your robots.txt at: ${config.baseUrl}/robots.txt`);
    console.log(`🔗 Test your sitemap at: ${config.baseUrl}/sitemap.xml`);
  } else {
    console.log('\n⚠️ Some tests failed. Please review the issues above.');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = { testRobotsTxt, testSitemap, runTests };
