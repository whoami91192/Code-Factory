const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  sitemapPath: path.join(__dirname, '../public/sitemap.xml'),
  baseUrl: 'https://www.jksecurestack.com',
  pages: [
    {
      path: '/',
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      path: '/about',
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      path: '/projects',
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      path: '/tools',
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      path: '/contact',
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      path: '/ransomware-calculator',
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      path: '/terms',
      changefreq: 'yearly',
      priority: '0.3'
    }
  ]
};

// Generate current date in YYYY-MM-DD format
function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Generate sitemap XML
function generateSitemap() {
  const currentDate = getCurrentDate();
  const urls = config.pages.map(page => {
    return `  <!-- ${page.path.replace('/', '') || 'Homepage'} Page -->
  <url>
    <loc>${config.baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('\n\n  ');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${urls}

</urlset>`;

  return sitemap;
}

// Update sitemap
function updateSitemap() {
  try {
    const sitemapContent = generateSitemap();
    fs.writeFileSync(config.sitemapPath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap updated successfully at ${config.sitemapPath}`);
    console.log(`📅 Last modified: ${getCurrentDate()}`);
    console.log(`🔗 Sitemap URL: ${config.baseUrl}/sitemap.xml`);
  } catch (error) {
    console.error(`❌ Error updating sitemap: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateSitemap();
}

module.exports = { updateSitemap, generateSitemap }; 