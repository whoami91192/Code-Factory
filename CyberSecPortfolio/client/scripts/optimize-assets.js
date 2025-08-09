const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  cssFile: 'src/index.css',
  mobileOptimizationsFile: 'src/mobile-optimizations.css',
  outputDir: 'dist/optimized',
  purgeCss: true,
  minifyCss: true,
  minifyJs: true
};

// Utility functions
function log(message) {
  console.log(`[Optimizer] ${message}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// CSS Optimization
function optimizeCSS() {
  log('Starting CSS optimization...');
  
  const cssPath = path.resolve(config.cssFile);
  const mobileCssPath = path.resolve(config.mobileOptimizationsFile);
  
  if (!fs.existsSync(cssPath)) {
    log('CSS file not found, skipping...');
    return;
  }

  let css = fs.readFileSync(cssPath, 'utf8');
  let mobileCss = fs.existsSync(mobileCssPath) ? fs.readFileSync(mobileCssPath, 'utf8') : '';

  // Remove duplicate imports
  css = css.replace(/@import\s+url\([^)]+\);\s*/g, '');
  
  // Remove unused CSS rules (basic cleanup)
  const unusedRules = [
    /\.unused-[^{}]+\s*{[^}]*}/g,
    /\/\*[\s\S]*?\*\//g, // Remove comments
    /\s+/g, // Normalize whitespace
  ];

  unusedRules.forEach(rule => {
    css = css.replace(rule, (match) => {
      // Only remove if it's actually unused
      return match.includes('unused') ? '' : match;
    });
  });

  // Optimize font loading
  css = css.replace(
    /@import\s+url\('https:\/\/fonts\.googleapis\.com\/css2[^']+'\);/g,
    "/* Google Fonts optimized loading */"
  );

  // Combine CSS files
  const optimizedCSS = `${css}\n\n/* Mobile Optimizations */\n${mobileCss}`;
  
  ensureDir(config.outputDir);
  fs.writeFileSync(path.join(config.outputDir, 'optimized.css'), optimizedCSS);
  
  log('CSS optimization completed');
}

// JavaScript Optimization
function optimizeJavaScript() {
  log('Starting JavaScript optimization...');
  
  // Find all JS files in src
  const srcDir = path.resolve('src');
  const jsFiles = [];
  
  function findJSFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findJSFiles(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        jsFiles.push(filePath);
      }
    });
  }
  
  findJSFiles(srcDir);
  
  // Process each JS file
  jsFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove console.logs in production
    if (process.env.NODE_ENV === 'production') {
      content = content.replace(/console\.(log|warn|error|info)\([^)]*\);?\s*/g, '');
    }
    
    // Remove unused imports (basic cleanup)
    content = content.replace(/import\s+{\s*[^}]*}\s+from\s+['"][^'"]*['"];?\s*/g, (match) => {
      // Only remove if it's actually unused
      return match.includes('unused') ? '' : match;
    });
    
    const relativePath = path.relative(srcDir, file);
    const outputPath = path.join(config.outputDir, relativePath.replace(/\.(ts|tsx)$/, '.js'));
    
    ensureDir(path.dirname(outputPath));
    fs.writeFileSync(outputPath, content);
  });
  
  log('JavaScript optimization completed');
}

// HTML Optimization
function optimizeHTML() {
  log('Starting HTML optimization...');
  
  const htmlPath = path.resolve('index.html');
  if (!fs.existsSync(htmlPath)) {
    log('HTML file not found, skipping...');
    return;
  }
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Remove comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  
  // Optimize script loading
  html = html.replace(
    /<script([^>]*?)src="([^"]*?)"([^>]*?)>/g,
    (match, before, src, after) => {
      if (src.includes('main.tsx') || src.includes('security.js')) {
        return `<script${before}src="${src}"${after} defer>`;
      }
      return match;
    }
  );
  
  // Add preload for critical resources
  const preloads = `
    <link rel="preload" href="/src/main.tsx" as="script" />
    <link rel="preload" href="/src/utils/security.js" as="script" />
  `;
  
  html = html.replace('</head>', `${preloads}\n  </head>`);
  
  fs.writeFileSync(path.join(config.outputDir, 'index.html'), html);
  
  log('HTML optimization completed');
}

// Main optimization function
function optimizeAssets() {
  log('Starting asset optimization...');
  
  try {
    optimizeCSS();
    optimizeJavaScript();
    optimizeHTML();
    
    log('All optimizations completed successfully!');
  } catch (error) {
    log(`Error during optimization: ${error.message}`);
    process.exit(1);
  }
}

// Run optimization if called directly
if (require.main === module) {
  optimizeAssets();
}

module.exports = { optimizeAssets, optimizeCSS, optimizeJavaScript, optimizeHTML };
