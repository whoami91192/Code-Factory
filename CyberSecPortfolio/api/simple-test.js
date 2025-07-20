export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    console.log('=== SIMPLE NODEMAILER TEST ===')
    
    // Test 1: Try to require nodemailer
    let nodemailer = null
    let requireError = null
    
    try {
      nodemailer = require('nodemailer')
      console.log('✅ Nodemailer required successfully')
    } catch (error) {
      requireError = error.message
      console.error('❌ Nodemailer require failed:', error.message)
    }
    
    // Test 2: Check if createTransport exists
    let createTransportExists = false
    if (nodemailer) {
      createTransportExists = typeof nodemailer.createTransport === 'function'
      console.log('createTransport is function:', createTransportExists)
    }
    
    // Test 3: Check environment variables
    const envVars = {
      SMTP_HOST: process.env.SMTP_HOST || 'not set',
      SMTP_PORT: process.env.SMTP_PORT || 'not set',
      SMTP_USER: process.env.SMTP_USER ? 'set' : 'not set',
      SMTP_PASS: process.env.SMTP_PASS ? 'set' : 'not set',
      SMTP_FROM: process.env.SMTP_FROM ? 'set' : 'not set'
    }
    
    console.log('Environment variables:', envVars)
    
    res.status(200).json({
      success: true,
      message: 'Simple nodemailer test completed',
      results: {
        nodemailerRequired: !!nodemailer,
        requireError: requireError,
        createTransportExists: createTransportExists,
        environmentVariables: envVars,
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('Test error:', error)
    res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
} 