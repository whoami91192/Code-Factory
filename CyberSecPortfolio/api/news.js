const axios = require('axios');
const xml2js = require('xml2js');

// Cache for storing news data
let newsCache = {
  data: null,
  timestamp: null,
  expiresAt: null
};

// Cache duration: 6 hours (to avoid hitting rate limits)
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

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

// Function to fetch and parse RSS feed
async function fetchNewsFromRSS() {
  try {
    console.log('Fetching news from The Hacker News RSS feed...');
    
    const response = await axios.get(HACKER_NEWS_RSS, {
      timeout: 10000,
      headers: {
        'User-Agent': 'CyberSecPortfolio/1.0 (News Aggregator)'
      }
    });

    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);

    if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
      throw new Error('Invalid RSS feed structure');
    }

    const items = Array.isArray(result.rss.channel.item) 
      ? result.rss.channel.item 
      : [result.rss.channel.item];

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

    return cybersecurityNews;
  } catch (error) {
    console.error('Error fetching news from RSS:', error.message);
    throw error;
  }
}

// Function to get cached news or fetch new data
async function getNewsData() {
  const now = Date.now();
  
  // Check if cache is valid
  if (newsCache.data && newsCache.expiresAt && now < newsCache.expiresAt) {
    console.log('Returning cached news data');
    return newsCache.data;
  }

  try {
    // Fetch fresh data
    const newsData = await fetchNewsFromRSS();
    
    // Update cache
    newsCache = {
      data: newsData,
      timestamp: now,
      expiresAt: now + CACHE_DURATION
    };

    console.log(`Fetched ${newsData.length} cybersecurity news items`);
    return newsData;
  } catch (error) {
    // If fetch fails and we have cached data, return it even if expired
    if (newsCache.data) {
      console.log('Fetch failed, returning expired cache data');
      return newsCache.data;
    }
    throw error;
  }
}

// Main handler function
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  try {
    const newsData = await getNewsData();
    
    res.status(200).json({
      success: true,
      data: newsData,
      source: 'The Hacker News',
      lastUpdated: new Date().toISOString(),
      cacheInfo: {
        cached: newsCache.timestamp !== null,
        cacheAge: newsCache.timestamp ? Date.now() - newsCache.timestamp : null,
        expiresAt: newsCache.expiresAt
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 