# Cybersecurity News Feed Setup

This document explains how to set up automatic daily updates for the Latest Security News section that fetches fresh content from The Hacker News.

## Overview

The news system consists of:
- **API Endpoint** (`/api/news.js`): Fetches and caches cybersecurity news from The Hacker News RSS feed
- **Frontend Component** (`NewsTable.tsx`): Displays the news with real-time updates
- **Update Script** (`update-news-cache.js`): Can be run as a scheduled task for daily updates

## Features

✅ **Real-time RSS Feed**: Fetches latest news from The Hacker News  
✅ **Cybersecurity Filtering**: Automatically filters for security-related content  
✅ **Smart Categorization**: Categorizes news by type (Malware, Vulnerabilities, etc.)  
✅ **Caching System**: 6-hour cache to avoid rate limits  
✅ **Auto-refresh**: Frontend refreshes every 6 hours  
✅ **Error Handling**: Graceful fallbacks and retry mechanisms  
✅ **Clickable News**: Click any news item to open the full article  

## Setup Instructions

### 1. Install Dependencies

```bash
cd api
npm install axios xml2js
```

### 2. Test the API

```bash
# Test RSS feed connectivity
node test-news.js

# Test news update script
node update-news-cache.js
```

### 3. Deploy to Vercel

The API endpoint will be automatically deployed to Vercel when you push to your repository.

### 4. Set Up Daily Updates (Optional)

#### Option A: Using Vercel Cron Jobs (Recommended)

Add this to your `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/news",
      "schedule": "0 6 * * *"
    }
  ]
}
```

This will trigger the news API every day at 6 AM UTC.

#### Option B: Using Windows Task Scheduler

1. Open Task Scheduler
2. Create a new Basic Task
3. Set trigger to "Daily" at your preferred time
4. Set action to "Start a program"
5. Program: `node`
6. Arguments: `update-news-cache.js`
7. Start in: `C:\path\to\your\api\folder`

#### Option C: Using Linux Cron

Add this line to your crontab (`crontab -e`):

```bash
# Update news every day at 6 AM
0 6 * * * cd /path/to/your/api && node update-news-cache.js
```

## API Endpoints

### GET `/api/news`

Returns the latest cybersecurity news from The Hacker News.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Iran-Linked DCHSpy Android Malware...",
      "description": "New Android malware discovered...",
      "category": "Malware / Threat",
      "date": "Jul 21, 2025",
      "link": "https://thehackernews.com/...",
      "author": "The Hacker News",
      "publishedAt": "2025-07-21T..."
    }
  ],
  "source": "The Hacker News",
  "lastUpdated": "2025-07-21T18:50:28.520Z",
  "cacheInfo": {
    "cached": true,
    "cacheAge": 3600000,
    "expiresAt": 1626885028520
  }
}
```

## News Categories

The system automatically categorizes news into:

- **Malware / Threat**: Viruses, ransomware, spyware
- **Vulnerability / Exploit**: CVEs, zero-days, exploits
- **Cyber Attack / Breach**: Data breaches, hacks, attacks
- **Surveillance / Espionage**: Government surveillance, APTs
- **Cloud Security / AI Security**: Cloud vulnerabilities, AI threats
- **Mobile Security**: Android, iOS security issues
- **Network Security**: Firewall, traffic analysis
- **Compliance / Regulation**: GDPR, regulations, standards
- **Cybersecurity / General**: Other security news

## Configuration

### Cache Duration

Edit `CACHE_DURATION` in `news.js` to change how long news is cached (default: 6 hours).

### Keywords

Modify `CYBERSECURITY_KEYWORDS` array in `news.js` to adjust what content is considered cybersecurity-related.

### News Limit

Change the `.slice(0, 10)` in `news.js` to show more or fewer news items.

## Monitoring

### Check API Status

Visit `/api/news` in your browser to see the current news data and cache status.

### Logs

The API logs important events:
- RSS feed fetch attempts
- Cache hits/misses
- Error messages
- Number of items processed

### Error Handling

The system includes multiple fallback mechanisms:
- Returns cached data if RSS fetch fails
- Graceful error messages for users
- Automatic retry on frontend
- 6-hour cache prevents excessive API calls

## Troubleshooting

### Common Issues

1. **No news showing**: Check if RSS feed is accessible
2. **Old news**: Cache might be expired, try manual refresh
3. **API errors**: Check network connectivity and RSS feed status

### Debug Commands

```bash
# Test RSS feed directly
curl https://feeds.feedburner.com/TheHackerNews

# Test API endpoint
curl https://your-domain.vercel.app/api/news

# Run update script manually
node update-news-cache.js
```

## Performance

- **Cache Duration**: 6 hours (configurable)
- **API Response Time**: ~200-500ms (cached)
- **RSS Fetch Time**: ~2-5 seconds (uncached)
- **Memory Usage**: Minimal (in-memory cache)
- **Rate Limiting**: Respects RSS feed limits

## Security Considerations

- Uses proper User-Agent headers
- Implements request timeouts
- Validates RSS feed structure
- Sanitizes news content
- CORS headers for frontend access

## Future Enhancements

Potential improvements:
- Database storage for persistent cache
- Multiple news sources
- User preferences for news categories
- Email notifications for critical security news
- News sentiment analysis
- Related news suggestions 