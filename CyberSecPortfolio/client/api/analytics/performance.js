export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ 
      error: 'Method not allowed', 
      message: 'Only POST requests are supported',
      allowedMethods: ['POST']
    });
    return;
  }

  try {
    // Get performance data from request body
    const performanceData = req.body;
    
    // Basic validation
    if (!performanceData) {
      res.status(400).json({ 
        error: 'Bad request', 
        message: 'Performance data is required' 
      });
      return;
    }

    // Log performance data (in production, you'd save to database)
    console.log('Performance Analytics Data:', {
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer,
      data: performanceData
    });
    
    // Send to Google Analytics via Measurement Protocol (optional)
    // You can add GA4 Measurement Protocol here if needed
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Performance data received successfully',
      timestamp: new Date().toISOString(),
      dataPoints: Object.keys(performanceData).length
    });
    
  } catch (error) {
    console.error('Error processing performance data:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process performance data',
      timestamp: new Date().toISOString()
    });
  }
} 