const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://your-domain.com'; // Replace with your actual domain
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// Pages configuration
const pages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'Homepage'
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'About Page'
  },
  {
    path: '/projects',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Projects Page'
  },
  {
    path: '/tools',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Tools Page'
  },
  {
    path: '/contact',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Contact Page'
  },
  {
    path: '/ransomware-calculator',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Ransomware Calculator'
  },
  {
    path: '/terms',
    priority: '0.3',
    changefreq: 'yearly',
    title: 'Terms Page'
  }
];

// Generate sitemap XML
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  pages.forEach(page => {
    sitemap += `  <!-- ${page.title} -->
  <url>
    <loc>${DOMAIN}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>

`;
  });

  sitemap += '</urlset>';

  return sitemap;
}

// Update sitemap file
function updateSitemap() {
  try {
    const sitemapContent = generateSitemap();
    fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');
    console.log('✅ Sitemap updated successfully!');
    console.log(`📅 Last updated: ${new Date().toISOString().split('T')[0]}`);
    console.log(`🌐 Domain: ${DOMAIN}`);
    console.log(`📄 Pages: ${pages.length}`);
  } catch (error) {
    console.error('❌ Error updating sitemap:', error);
  }
}

// Add new page to sitemap
function addPage(pagePath, priority = '0.5', changefreq = 'monthly', title = '') {
  const newPage = {
    path: pagePath,
    priority,
    changefreq,
    title: title || pagePath
  };
  
  // Check if page already exists
  const existingPage = pages.find(p => p.path === pagePath);
  if (existingPage) {
    console.log(`⚠️ Page ${pagePath} already exists in sitemap`);
    return;
  }
  
  pages.push(newPage);
  updateSitemap();
  console.log(`✅ Added new page: ${pagePath}`);
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Update sitemap with current date
    updateSitemap();
  } else if (args[0] === 'add' && args[1]) {
    // Add new page
    const pagePath = args[1];
    const priority = args[2] || '0.5';
    const changefreq = args[3] || 'monthly';
    const title = args[4] || pagePath;
    
    addPage(pagePath, priority, changefreq, title);
  } else if (args[0] === 'help') {
    console.log(`
Sitemap Updater - Usage:

1. Update sitemap with current date:
   node update-sitemap.js

2. Add new page:
   node update-sitemap.js add /new-page 0.7 weekly "New Page Title"

3. Show help:
   node update-sitemap.js help

Priority levels:
- 1.0: Homepage
- 0.9: Important pages (Projects)
- 0.8: Secondary pages (About, Tools)
- 0.7: Contact pages
- 0.6: Utility pages
- 0.3: Legal pages

Change frequency:
- always: Always changes
- hourly: Changes hourly
- daily: Changes daily
- weekly: Changes weekly
- monthly: Changes monthly
- yearly: Changes yearly
- never: Never changes
    `);
  } else {
    console.log('❌ Invalid arguments. Use "help" for usage information.');
  }
}

module.exports = {
  updateSitemap,
  addPage,
  generateSitemap
}; 