const fs = require('fs');
const path = require('path');

class SEOOptimizer {
  constructor() {
    this.domain = 'https://your-domain.com'; // Replace with your domain
    this.issues = [];
    this.suggestions = [];
  }

  // Analyze the entire project for SEO issues
  async analyzeProject() {
    console.log('🔍 Starting SEO Analysis...\n');

    await this.checkMetaTags();
    await this.checkImages();
    await this.checkLinks();
    await this.checkPerformance();
    await this.checkAccessibility();
    await this.checkContent();
    await this.checkTechnicalSEO();

    this.generateReport();
  }

  // Check meta tags optimization
  async checkMetaTags() {
    console.log('📋 Checking Meta Tags...');
    
    const indexHtmlPath = path.join(__dirname, '../index.html');
    if (fs.existsSync(indexHtmlPath)) {
      const content = fs.readFileSync(indexHtmlPath, 'utf8');
      
      // Check for essential meta tags
      const checks = [
        { name: 'Title Tag', regex: /<title>.*<\/title>/, required: true },
        { name: 'Meta Description', regex: /<meta[^>]*name="description"[^>]*>/, required: true },
        { name: 'Meta Keywords', regex: /<meta[^>]*name="keywords"[^>]*>/, required: false },
        { name: 'Open Graph Title', regex: /<meta[^>]*property="og:title"[^>]*>/, required: true },
        { name: 'Open Graph Description', regex: /<meta[^>]*property="og:description"[^>]*>/, required: true },
        { name: 'Open Graph Image', regex: /<meta[^>]*property="og:image"[^>]*>/, required: true },
        { name: 'Twitter Card', regex: /<meta[^>]*name="twitter:card"[^>]*>/, required: true },
        { name: 'Canonical URL', regex: /<link[^>]*rel="canonical"[^>]*>/, required: true },
        { name: 'Robots Meta', regex: /<meta[^>]*name="robots"[^>]*>/, required: true },
        { name: 'Viewport Meta', regex: /<meta[^>]*name="viewport"[^>]*>/, required: true }
      ];

      checks.forEach(check => {
        if (check.required && !check.regex.test(content)) {
          this.issues.push(`❌ Missing required ${check.name}`);
        } else if (!check.required && !check.regex.test(content)) {
          this.suggestions.push(`💡 Consider adding ${check.name}`);
        }
      });

      // Check title length
      const titleMatch = content.match(/<title>(.*?)<\/title>/);
      if (titleMatch) {
        const titleLength = titleMatch[1].length;
        if (titleLength < 30) {
          this.suggestions.push(`💡 Title is too short (${titleLength} chars). Aim for 50-60 characters.`);
        } else if (titleLength > 60) {
          this.suggestions.push(`💡 Title is too long (${titleLength} chars). Keep under 60 characters.`);
        }
      }

      // Check description length
      const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/);
      if (descMatch) {
        const descLength = descMatch[1].length;
        if (descLength < 120) {
          this.suggestions.push(`💡 Description is too short (${descLength} chars). Aim for 150-160 characters.`);
        } else if (descLength > 160) {
          this.suggestions.push(`💡 Description is too long (${descLength} chars). Keep under 160 characters.`);
        }
      }
    }
  }

  // Check image optimization
  async checkImages() {
    console.log('🖼️ Checking Images...');
    
    const publicDir = path.join(__dirname, '../public');
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file));
      
      // Check for essential images
      const requiredImages = [
        'favicon.ico',
        'favicon-32x32.png',
        'favicon-16x16.png',
        'apple-touch-icon.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'og-image.jpg',
        'twitter-image.jpg'
      ];

      requiredImages.forEach(image => {
        if (!imageFiles.includes(image)) {
          this.suggestions.push(`💡 Consider adding ${image} for better social media sharing`);
        }
      });

      // Check image sizes
      imageFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const stats = fs.statSync(filePath);
        const sizeInMB = stats.size / (1024 * 1024);
        
        if (sizeInMB > 1) {
          this.suggestions.push(`💡 Consider optimizing ${file} (${sizeInMB.toFixed(2)}MB)`);
        }
      });
    }
  }

  // Check internal and external links
  async checkLinks() {
    console.log('🔗 Checking Links...');
    
    // This would require parsing the actual React components
    // For now, we'll check the sitemap
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      const urlMatches = content.match(/<loc>(.*?)<\/loc>/g);
      
      if (urlMatches) {
        console.log(`✅ Found ${urlMatches.length} URLs in sitemap`);
        
        // Check if all URLs use the correct domain
        urlMatches.forEach(match => {
          const url = match.replace(/<\/?loc>/g, '');
          if (!url.includes(this.domain.replace('https://', ''))) {
            this.issues.push(`❌ URL in sitemap uses wrong domain: ${url}`);
          }
        });
      }
    }
  }

  // Check performance-related files
  async checkPerformance() {
    console.log('⚡ Checking Performance...');
    
    // Check for compression files
    const distDir = path.join(__dirname, '../dist');
    if (fs.existsSync(distDir)) {
      const files = fs.readdirSync(distDir);
      const hasGzip = files.some(file => file.endsWith('.gz'));
      const hasBrotli = files.some(file => file.endsWith('.br'));
      
      if (!hasGzip) {
        this.suggestions.push('💡 Consider enabling gzip compression');
      }
      if (!hasBrotli) {
        this.suggestions.push('💡 Consider enabling Brotli compression');
      }
    }

    // Check for service worker
    const swPath = path.join(__dirname, '../public/sw.js');
    if (!fs.existsSync(swPath)) {
      this.suggestions.push('💡 Consider adding a service worker for better performance');
    }
  }

  // Check accessibility
  async checkAccessibility() {
    console.log('♿ Checking Accessibility...');
    
    // Check for alt text in images (basic check)
    const indexHtmlPath = path.join(__dirname, '../index.html');
    if (fs.existsSync(indexHtmlPath)) {
      const content = fs.readFileSync(indexHtmlPath, 'utf8');
      const imgTags = content.match(/<img[^>]*>/g);
      
      if (imgTags) {
        imgTags.forEach(img => {
          if (!img.includes('alt=')) {
            this.suggestions.push('💡 Add alt attributes to images for accessibility');
          }
        });
      }
    }
  }

  // Check content quality
  async checkContent() {
    console.log('📝 Checking Content...');
    
    // Check for keyword density and content length
    const indexHtmlPath = path.join(__dirname, '../index.html');
    if (fs.existsSync(indexHtmlPath)) {
      const content = fs.readFileSync(indexHtmlPath, 'utf8');
      
      // Remove HTML tags for text analysis
      const textContent = content.replace(/<[^>]*>/g, ' ');
      const wordCount = textContent.split(/\s+/).length;
      
      if (wordCount < 300) {
        this.suggestions.push(`💡 Consider adding more content (currently ${wordCount} words)`);
      }
      
      // Check for target keywords
      const targetKeywords = [
        'cyber security',
        'penetration testing',
        'security audit',
        'john katsimpris',
        'cybersecurity',
        'ethical hacking'
      ];
      
      targetKeywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matches = textContent.match(regex);
        if (!matches || matches.length < 2) {
          this.suggestions.push(`💡 Consider including "${keyword}" more prominently`);
        }
      });
    }
  }

  // Check technical SEO
  async checkTechnicalSEO() {
    console.log('🔧 Checking Technical SEO...');
    
    // Check robots.txt
    const robotsPath = path.join(__dirname, '../public/robots.txt');
    if (!fs.existsSync(robotsPath)) {
      this.issues.push('❌ Missing robots.txt file');
    } else {
      const content = fs.readFileSync(robotsPath, 'utf8');
      if (!content.includes('Sitemap:')) {
        this.suggestions.push('💡 Add sitemap reference to robots.txt');
      }
    }

    // Check sitemap
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      this.issues.push('❌ Missing sitemap.xml file');
    }

    // Check manifest.json
    const manifestPath = path.join(__dirname, '../public/manifest.json');
    if (!fs.existsSync(manifestPath)) {
      this.suggestions.push('💡 Consider adding manifest.json for PWA');
    }

    // Check for security headers
    const indexHtmlPath = path.join(__dirname, '../index.html');
    if (fs.existsSync(indexHtmlPath)) {
      const content = fs.readFileSync(indexHtmlPath, 'utf8');
      
      const securityHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Content-Security-Policy'
      ];
      
      securityHeaders.forEach(header => {
        if (!content.includes(header)) {
          this.suggestions.push(`💡 Consider adding ${header} security header`);
        }
      });
    }
  }

  // Generate comprehensive report
  generateReport() {
    console.log('\n📊 SEO Analysis Report');
    console.log('='.repeat(50));
    
    if (this.issues.length === 0 && this.suggestions.length === 0) {
      console.log('✅ Excellent! No SEO issues found.');
      return;
    }

    if (this.issues.length > 0) {
      console.log('\n❌ Critical Issues:');
      this.issues.forEach(issue => console.log(`  ${issue}`));
    }

    if (this.suggestions.length > 0) {
      console.log('\n💡 Suggestions for Improvement:');
      this.suggestions.forEach(suggestion => console.log(`  ${suggestion}`));
    }

    console.log('\n📈 SEO Score:', this.calculateSEOScore());
    console.log('\n🎯 Next Steps:');
    console.log('  1. Fix critical issues first');
    console.log('  2. Implement high-priority suggestions');
    console.log('  3. Test with Google Search Console');
    console.log('  4. Monitor Core Web Vitals');
    console.log('  5. Regular content updates');
  }

  // Calculate SEO score
  calculateSEOScore() {
    const totalChecks = 20; // Approximate number of checks
    const issues = this.issues.length;
    const suggestions = this.suggestions.length;
    
    let score = 100;
    score -= issues * 10; // Each issue costs 10 points
    score -= suggestions * 2; // Each suggestion costs 2 points
    
    score = Math.max(0, Math.min(100, score));
    
    if (score >= 90) return `${score}/100 - Excellent`;
    if (score >= 80) return `${score}/100 - Good`;
    if (score >= 70) return `${score}/100 - Fair`;
    return `${score}/100 - Needs Improvement`;
  }

  // Optimize images
  async optimizeImages() {
    console.log('🖼️ Image optimization would require additional tools like sharp or imagemin');
    console.log('💡 Consider using: npm install sharp imagemin imagemin-webp');
  }

  // Generate sitemap
  async generateSitemap() {
    console.log('🗺️ Generating sitemap...');
    // This would parse your React routes and generate a sitemap
    console.log('💡 Use the existing update-sitemap.js script');
  }

  // Validate structured data
  async validateStructuredData() {
    console.log('🔍 Structured data validation would require Google\'s Rich Results Test');
    console.log('💡 Visit: https://search.google.com/test/rich-results');
  }
}

// Command line interface
if (require.main === module) {
  const optimizer = new SEOOptimizer();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    optimizer.analyzeProject();
  } else if (args[0] === 'analyze') {
    optimizer.analyzeProject();
  } else if (args[0] === 'optimize-images') {
    optimizer.optimizeImages();
  } else if (args[0] === 'generate-sitemap') {
    optimizer.generateSitemap();
  } else if (args[0] === 'validate-structured-data') {
    optimizer.validateStructuredData();
  } else {
    console.log(`
SEO Optimizer - Usage:

1. Full analysis:
   node seo-optimizer.js analyze

2. Image optimization:
   node seo-optimizer.js optimize-images

3. Generate sitemap:
   node seo-optimizer.js generate-sitemap

4. Validate structured data:
   node seo-optimizer.js validate-structured-data

5. Show help:
   node seo-optimizer.js help
    `);
  }
}

module.exports = SEOOptimizer; 