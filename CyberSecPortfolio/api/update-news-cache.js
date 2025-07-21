const axios = require('axios');
const xml2js = require('xml2js');

// The Hacker News RSS feed URL
const HACKER_NEWS_RSS = 'https://feeds.feedburner.com/TheHackersNews';

// Keywords to filter cybersecurity-related news
const CYBERSECURITY_KEYWORDS = [
  'security', 'cyber', 'hack', 'malware', 'virus', 'ransomware', 'phishing',
  'vulnerability', 'exploit', 'breach', 'attack', 'threat', 'firewall',
  'encryption', 'authentication', 'penetration', 'pentest', 'incident',
  'response', 'forensics', 'compliance', 'gdpr', 'iso', 'nist', 'mitre',
  'apt', 'zero-day', 'cve', 'cwe', 'owasp', 'siem', 'soar', 'edr', 'xdr',
  'endpoint', 'network', 'cloud', 'iot', 'ai', 'machine learning', 'ml',
  'blockchain', 'cryptocurrency', 'defi', 'web3', 'metaverse', 'quantum'
];

// Function to check if a news item is cybersecurity-related
function isCybersecurityRelated(title, description = '') {
  const text = (title + ' ' + description).toLowerCase();
  return CYBERSECURITY_KEYWORDS.some(keyword => 
    text.includes(keyword.toLowerCase())
  );
}

// Function to categorize news based on content
function categorizeNews(title, description = '') {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('malware') || text.includes('virus') || text.includes('ransomware')) {
    return 'Malware / Threat';
  }
  if (text.includes('vulnerability') || text.includes('exploit') || text.includes('cve')) {
    return 'Vulnerability / Exploit';
  }
  if (text.includes('breach') || text.includes('attack') || text.includes('hack')) {
    return 'Cyber Attack / Breach';
  }
  if (text.includes('surveillance') || text.includes('spy') || text.includes('espionage')) {
    return 'Surveillance / Espionage';
  }
  if (text.includes('cloud') || text.includes('ai') || text.includes('machine learning')) {
    return 'Cloud Security / AI Security';
  }
  if (text.includes('mobile') || text.includes('android') || text.includes('ios')) {
    return 'Mobile Security';
  }
  if (text.includes('network') || text.includes('firewall') || text.includes('traffic')) {
    return 'Network Security';
  }
  if (text.includes('compliance') || text.includes('gdpr') || text.includes('regulation')) {
    return 'Compliance / Regulation';
  }
  
  return 'Cybersecurity / General';
}

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Function to fetch and process news
async function updateNewsCache() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Starting news cache update...`);

  try {
    // Fetch RSS feed
    console.log('Fetching RSS feed from The Hacker News...');
    const response = await axios.get(HACKER_NEWS_RSS, {
      timeout: 15000,
      headers: {
        'User-Agent': 'CyberSecPortfolio/1.0 (News Aggregator)'
      }
    });

    // Parse XML
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);

    if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
      throw new Error('Invalid RSS feed structure');
    }

    const items = Array.isArray(result.rss.channel.item) 
      ? result.rss.channel.item 
      : [result.rss.channel.item];

    console.log(`Found ${items.length} total news items`);

    // Filter and process cybersecurity-related news
    const cybersecurityNews = items
      .filter(item => isCybersecurityRelated(item.title, item.description))
      .map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: item.description || '',
        category: categorizeNews(item.title, item.description),
        date: formatDate(item.pubDate),
        link: item.link,
        author: item['dc:creator'] || 'The Hacker News',
        publishedAt: item.pubDate
      }))
      .slice(0, 10); // Limit to 10 most recent items

    console.log(`Filtered to ${cybersecurityNews.length} cybersecurity news items`);

    // Log sample news items
    if (cybersecurityNews.length > 0) {
      console.log('\nSample cybersecurity news:');
      cybersecurityNews.slice(0, 3).forEach((item, index) => {
        console.log(`${index + 1}. [${item.category}] ${item.title.substring(0, 80)}...`);
      });
    }

    // In a real implementation, you would save this to a database or file
    // For now, we'll just log the success
    console.log('\n✅ News cache update completed successfully!');
    console.log(`📊 Statistics:`);
    console.log(`   - Total items processed: ${items.length}`);
    console.log(`   - Cybersecurity items found: ${cybersecurityNews.length}`);
    console.log(`   - Cache updated at: ${timestamp}`);

    return {
      success: true,
      timestamp,
      totalItems: items.length,
      cybersecurityItems: cybersecurityNews.length,
      data: cybersecurityNews
    };

  } catch (error) {
    console.error('❌ News cache update failed:', error.message);
    return {
      success: false,
      timestamp,
      error: error.message
    };
  }
}

// If this script is run directly (not imported)
if (require.main === module) {
  updateNewsCache()
    .then(result => {
      if (result.success) {
        console.log('\n🎉 News cache update completed successfully!');
        process.exit(0);
      } else {
        console.error('\n💥 News cache update failed!');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = { updateNewsCache }; 