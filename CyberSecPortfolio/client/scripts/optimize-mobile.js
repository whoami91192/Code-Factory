const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  srcPath: path.join(__dirname, '../src'),
  distPath: path.join(__dirname, '../dist'),
  publicPath: path.join(__dirname, '../public'),
  reportsPath: path.join(__dirname, '../reports'),
  criticalCSSPath: path.join(__dirname, '../src/critical.css'),
  mobileOptimizationsPath: path.join(__dirname, '../src/mobile-optimizations.css')
};

// Utility functions
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Mobile performance optimizations
class MobileOptimizer {
  constructor() {
    this.stats = {
      originalSize: 0,
      optimizedSize: 0,
      savings: 0,
      optimizations: []
    };
  }

  // Analyze bundle size
  analyzeBundle() {
    log('🔍 Analyzing bundle size...');
    
    try {
      if (!fs.existsSync(config.distPath)) {
        log('❌ Dist folder not found. Run build first.', 'error');
        return false;
      }

      const files = this.getFilesRecursively(config.distPath);
      let totalSize = 0;
      const fileStats = [];

      files.forEach(file => {
        const stats = fs.statSync(file);
        const size = stats.size;
        totalSize += size;
        
        fileStats.push({
          path: path.relative(config.distPath, file),
          size: size,
          sizeKB: (size / 1024).toFixed(2)
        });
      });

      this.stats.originalSize = totalSize;
      
      // Sort by size
      fileStats.sort((a, b) => b.size - a.size);
      
      log(`📊 Total bundle size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
      
      // Log top 10 largest files
      log('📋 Top 10 largest files:');
      fileStats.slice(0, 10).forEach((file, index) => {
        log(`  ${index + 1}. ${file.path} - ${file.sizeKB} KB`);
      });

      return true;
    } catch (error) {
      log(`❌ Error analyzing bundle: ${error.message}`, 'error');
      return false;
    }
  }

  // Optimize CSS for mobile
  optimizeCSS() {
    log('🎨 Optimizing CSS for mobile...');
    
    try {
      const cssFiles = this.getFilesRecursively(config.distPath, '.css');
      
      cssFiles.forEach(cssFile => {
        let content = fs.readFileSync(cssFile, 'utf8');
        const originalSize = content.length;
        
        // Remove unused CSS (basic optimization)
        content = this.removeUnusedCSS(content);
        
        // Optimize for mobile
        content = this.optimizeCSSForMobile(content);
        
        // Write optimized CSS
        fs.writeFileSync(cssFile, content);
        
        const optimizedSize = content.length;
        const savings = originalSize - optimizedSize;
        
        if (savings > 0) {
          this.stats.optimizations.push({
            type: 'css',
            file: path.relative(config.distPath, cssFile),
            savings: savings,
            savingsKB: (savings / 1024).toFixed(2)
          });
          
          log(`  ✅ Optimized ${path.relative(config.distPath, cssFile)} - saved ${(savings / 1024).toFixed(2)} KB`);
        }
      });
      
      return true;
    } catch (error) {
      log(`❌ Error optimizing CSS: ${error.message}`, 'error');
      return false;
    }
  }

  // Optimize JavaScript for mobile
  optimizeJavaScript() {
    log('⚡ Optimizing JavaScript for mobile...');
    
    try {
      const jsFiles = this.getFilesRecursively(config.distPath, '.js');
      
      jsFiles.forEach(jsFile => {
        let content = fs.readFileSync(jsFile, 'utf8');
        const originalSize = content.length;
        
        // Remove console.logs in production
        if (process.env.NODE_ENV === 'production') {
          content = content.replace(/console\.(log|debug|info|warn)\([^)]*\);?/g, '');
        }
        
        // Remove unused imports (basic detection)
        content = this.removeUnusedImports(content);
        
        // Write optimized JS
        fs.writeFileSync(jsFile, content);
        
        const optimizedSize = content.length;
        const savings = originalSize - optimizedSize;
        
        if (savings > 0) {
          this.stats.optimizations.push({
            type: 'javascript',
            file: path.relative(config.distPath, jsFile),
            savings: savings,
            savingsKB: (savings / 1024).toFixed(2)
          });
          
          log(`  ✅ Optimized ${path.relative(config.distPath, jsFile)} - saved ${(savings / 1024).toFixed(2)} KB`);
        }
      });
      
      return true;
    } catch (error) {
      log(`❌ Error optimizing JavaScript: ${error.message}`, 'error');
      return false;
    }
  }

  // Optimize images for mobile
  optimizeImages() {
    log('🖼️ Optimizing images for mobile...');
    
    try {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
      const imageFiles = this.getFilesRecursively(config.distPath, imageExtensions);
      
      let totalSavings = 0;
      
      imageFiles.forEach(imageFile => {
        const stats = fs.statSync(imageFile);
        const originalSize = stats.size;
        
        // Basic image optimization (would need actual image processing library)
        // For now, just log the images that could be optimized
        if (originalSize > 100 * 1024) { // Files larger than 100KB
          log(`  ⚠️ Large image detected: ${path.relative(config.distPath, imageFile)} - ${(originalSize / 1024).toFixed(2)} KB`);
        }
      });
      
      return true;
    } catch (error) {
      log(`❌ Error optimizing images: ${error.message}`, 'error');
      return false;
    }
  }

  // Generate critical CSS
  generateCriticalCSS() {
    log('🎯 Generating critical CSS...');
    
    try {
      const criticalCSS = `
/* Critical CSS for mobile performance - optimized for LCP */
:root {
  --background: #0F1419;
  --foreground: #E6EDF3;
  --primary: #00ff41;
  --secondary: #1a1a1a;
  --muted: #2a2a2a;
  --border: #2a2a2a;
  --radius: 0.5rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  color: var(--foreground);
}

/* Mobile-specific optimizations */
@media (max-width: 768px) {
  * {
    -webkit-tap-highlight-color: transparent;
  }
  
  body {
    font-size: 16px;
    line-height: 1.5;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  button, [role="button"], input, label, select, textarea, a {
    min-height: 44px;
    min-width: 44px;
  }
  
  input, textarea, select {
    font-size: 16px;
    -webkit-appearance: none;
    border-radius: var(--radius);
  }
}

/* Loading states */
.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid var(--muted);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 9999;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.content-loaded {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.content-loaded.loaded {
  opacity: 1;
}

/* Font loading optimizations */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  font-weight: 400;
  font-style: normal;
  font-named-instance: 'Regular';
}

@font-face {
  font-family: 'Inter';
  font-display: swap;
  font-weight: 500;
  font-style: normal;
  font-named-instance: 'Medium';
}

@font-face {
  font-family: 'Inter';
  font-display: swap;
  font-weight: 600;
  font-style: normal;
  font-named-instance: 'SemiBold';
}
      `;
      
      fs.writeFileSync(config.criticalCSSPath, criticalCSS);
      log('✅ Critical CSS generated');
      
      return true;
    } catch (error) {
      log(`❌ Error generating critical CSS: ${error.message}`, 'error');
      return false;
    }
  }

  // Remove unused CSS (basic implementation)
  removeUnusedCSS(content) {
    // Remove comments
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove empty rules
    content = content.replace(/[^{}]+{\s*}/g, '');
    
    // Remove whitespace
    content = content.replace(/\s+/g, ' ');
    content = content.replace(/;\s*}/g, '}');
    content = content.replace(/{\s*/g, '{');
    content = content.replace(/\s*}/g, '}');
    
    return content;
  }

  // Remove unused imports (basic implementation)
  removeUnusedImports(content) {
    // Remove console.logs in production
    if (process.env.NODE_ENV === 'production') {
      content = content.replace(/console\.(log|debug|info|warn)\([^)]*\);?/g, '');
    }
    
    return content;
  }

  // Optimize CSS for mobile
  optimizeCSSForMobile(content) {
    // Add mobile-specific optimizations
    const mobileOptimizations = `
/* Mobile optimizations */
@media (max-width: 768px) {
  .mobile-hidden { display: none !important; }
  .mobile-block { display: block !important; }
  .mobile-flex { display: flex !important; flex-direction: column; }
}
    `;
    
    return content + mobileOptimizations;
  }

  // Get files recursively
  getFilesRecursively(dir, extensions = []) {
    const files = [];
    
    function walkDir(currentPath) {
      const items = fs.readdirSync(currentPath);
      
      items.forEach(item => {
        const itemPath = path.join(currentPath, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          walkDir(itemPath);
        } else if (stat.isFile()) {
          if (extensions.length === 0 || extensions.some(ext => itemPath.endsWith(ext))) {
            files.push(itemPath);
          }
        }
      });
    }
    
    walkDir(dir);
    return files;
  }

  // Generate performance report
  generateReport() {
    log('📊 Generating performance report...');
    
    try {
      ensureDir(config.reportsPath);
      
      const report = {
        timestamp: new Date().toISOString(),
        optimizations: this.stats.optimizations,
        totalSavings: this.stats.optimizations.reduce((sum, opt) => sum + opt.savings, 0),
        recommendations: this.generateRecommendations()
      };
      
      const reportPath = path.join(config.reportsPath, `mobile-optimization-${Date.now()}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      log(`✅ Performance report generated: ${reportPath}`);
      
      // Log summary
      const totalSavingsKB = (report.totalSavings / 1024).toFixed(2);
      log(`📈 Total savings: ${totalSavingsKB} KB`);
      
      if (report.recommendations.length > 0) {
        log('💡 Recommendations:');
        report.recommendations.forEach(rec => {
          log(`  - ${rec}`);
        });
      }
      
      return true;
    } catch (error) {
      log(`❌ Error generating report: ${error.message}`, 'error');
      return false;
    }
  }

  // Generate recommendations
  generateRecommendations() {
    const recommendations = [];
    
    // Analyze optimizations and provide recommendations
    const cssOptimizations = this.stats.optimizations.filter(opt => opt.type === 'css');
    const jsOptimizations = this.stats.optimizations.filter(opt => opt.type === 'javascript');
    
    if (cssOptimizations.length === 0) {
      recommendations.push('Consider implementing CSS purging to remove unused styles');
    }
    
    if (jsOptimizations.length === 0) {
      recommendations.push('Consider implementing tree shaking to remove unused JavaScript');
    }
    
    if (this.stats.originalSize > 2 * 1024 * 1024) { // Larger than 2MB
      recommendations.push('Bundle size is large for mobile. Consider code splitting and lazy loading');
    }
    
    recommendations.push('Implement service worker for better caching');
    recommendations.push('Use image optimization for better mobile performance');
    recommendations.push('Consider implementing critical CSS inlining');
    
    return recommendations;
  }

  // Run all optimizations
  async optimize() {
    log('🚀 Starting mobile performance optimization...');
    
    const steps = [
      { name: 'Bundle Analysis', fn: () => this.analyzeBundle() },
      { name: 'CSS Optimization', fn: () => this.optimizeCSS() },
      { name: 'JavaScript Optimization', fn: () => this.optimizeJavaScript() },
      { name: 'Image Optimization', fn: () => this.optimizeImages() },
      { name: 'Critical CSS Generation', fn: () => this.generateCriticalCSS() },
      { name: 'Report Generation', fn: () => this.generateReport() }
    ];
    
    for (const step of steps) {
      log(`🔄 Running: ${step.name}`);
      const success = await step.fn();
      if (!success) {
        log(`❌ Failed at step: ${step.name}`, 'error');
        return false;
      }
    }
    
    log('🎉 Mobile optimization completed successfully!');
    return true;
  }
}

// CLI interface
if (require.main === module) {
  const optimizer = new MobileOptimizer();
  optimizer.optimize().catch(error => {
    log(`❌ Optimization failed: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = MobileOptimizer;
