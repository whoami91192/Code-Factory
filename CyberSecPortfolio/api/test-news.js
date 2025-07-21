const axios = require('axios');
const xml2js = require('xml2js');

// Test the RSS feed fetching functionality
async function testNewsAPI() {
  console.log('🧪 Testing News API...\n');

  try {
    // Test 1: Fetch RSS feed directly
    console.log('1. Testing RSS feed fetch...');
    const response = await axios.get('https://feeds.feedburner.com/TheHackersNews', {
      timeout: 10000,
      headers: {
        'User-Agent': 'CyberSecPortfolio/1.0 (News Aggregator)'
      }
    });
    console.log('✅ RSS feed fetch successful');
    console.log(`   Status: ${response.status}`);
    console.log(`   Content length: ${response.data.length} characters\n`);

    // Test 2: Parse XML
    console.log('2. Testing XML parsing...');
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);
    
    if (result.rss && result.rss.channel && result.rss.channel.item) {
      const items = Array.isArray(result.rss.channel.item) 
        ? result.rss.channel.item 
        : [result.rss.channel.item];
      
      console.log('✅ XML parsing successful');
      console.log(`   Total items: ${items.length}`);
      console.log(`   Channel title: ${result.rss.channel.title}`);
      console.log(`   First item title: ${items[0].title?.substring(0, 100)}...\n`);
    } else {
      throw new Error('Invalid RSS structure');
    }

    // Test 3: Test cybersecurity filtering
    console.log('3. Testing cybersecurity filtering...');
    const cybersecurityKeywords = [
      'security', 'cyber', 'hack', 'malware', 'virus', 'ransomware', 'phishing',
      'vulnerability', 'exploit', 'breach', 'attack', 'threat', 'firewall'
    ];

    const items = Array.isArray(result.rss.channel.item) 
      ? result.rss.channel.item 
      : [result.rss.channel.item];

    const cybersecurityNews = items.filter(item => {
      const text = (item.title + ' ' + (item.description || '')).toLowerCase();
      return cybersecurityKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    });

    console.log('✅ Cybersecurity filtering successful');
    console.log(`   Cybersecurity news found: ${cybersecurityNews.length}/${items.length}`);
    
    if (cybersecurityNews.length > 0) {
      console.log('   Sample cybersecurity news:');
      cybersecurityNews.slice(0, 3).forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.title?.substring(0, 80)}...`);
      });
    }

    console.log('\n🎉 All tests passed! The news API should work correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Response status:', error.response.status);
      console.error('   Response headers:', error.response.headers);
    }
  }
}

// Run the test
testNewsAPI(); 