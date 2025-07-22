export default async function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests for performance data
  if (req.method !== 'POST') {
    res.status(405).json({ 
      error: 'Method not allowed', 
      message: 'This endpoint only accepts POST requests',
      allowedMethods: ['POST'],
      timestamp: new Date().toISOString()
    });
    return;
  }

  try {
    // Validate request body
    if (!req.body) {
      res.status(400).json({ 
        error: 'Bad request', 
        message: 'Request body is required',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Get performance data from request body
    const {
      metric,
      value,
      timestamp,
      url,
      userAgent,
      connection
    } = req.body;

    // Basic validation
    if (!metric || typeof value !== 'number') {
      res.status(400).json({ 
        error: 'Invalid data', 
        message: 'Metric name and numeric value are required',
        received: { metric, value, type: typeof value },
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Validate metric types
    const validMetrics = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB', 'TTI', 'TBT'];
    if (!validMetrics.includes(metric)) {
      res.status(400).json({ 
        error: 'Invalid metric', 
        message: `Metric must be one of: ${validMetrics.join(', ')}`,
        received: metric,
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Log performance data with enhanced details
    const enhancedData = {
      metric,
      value: Math.round(value * 100) / 100, // Round to 2 decimal places
      timestamp: timestamp || Date.now(),
      url: url || 'unknown',
      userAgent: userAgent ? userAgent.substring(0, 100) : 'unknown', // Truncate for security
      connection: connection || 'unknown',
      receivedAt: new Date().toISOString(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown'
    };

    // Log to console (in production, you'd save to database)
    console.log('📊 Performance Analytics Data:', enhancedData);

    // Here you could:
    // 1. Save to database (Supabase, MongoDB, etc.)
    // 2. Send to external analytics (Google Analytics, DataDog, etc.)
    // 3. Trigger alerts for poor performance
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));

    // Return success response with analytics
    res.status(200).json({ 
      success: true, 
      message: 'Performance data received and processed successfully',
      data: {
        metric: enhancedData.metric,
        value: enhancedData.value,
        status: getPerformanceStatus(metric, value),
        receivedAt: enhancedData.receivedAt
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error processing performance data:', error);
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process performance data',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to determine performance status
function getPerformanceStatus(metric, value) {
  const thresholds = {
    LCP: { good: 2500, poor: 4000 },      // Largest Contentful Paint (ms)
    FID: { good: 100, poor: 300 },       // First Input Delay (ms)  
    CLS: { good: 0.1, poor: 0.25 },      // Cumulative Layout Shift
    FCP: { good: 1800, poor: 3000 },     // First Contentful Paint (ms)
    TTFB: { good: 600, poor: 1500 },     // Time to First Byte (ms)
    TTI: { good: 3800, poor: 7300 },     // Time to Interactive (ms)
    TBT: { good: 200, poor: 600 }        // Total Blocking Time (ms)
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
} 