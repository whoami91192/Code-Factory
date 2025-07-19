const nodemailer = require('nodemailer')

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    console.log('=== TESTING NODEMAILER ===')
    
    // Test 1: Check if nodemailer is available
    console.log('Nodemailer available:', !!nodemailer)
    console.log('Nodemailer type:', typeof nodemailer)
    console.log('createTransport available:', !!nodemailer.createTransport)
    
    // Test 2: Check environment variables
    const envVars = {
      SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
      SMTP_PORT: process.env.SMTP_PORT || '587',
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      SMTP_FROM: !!process.env.SMTP_FROM
    }
    
    console.log('Environment variables:', envVars)
    
    // Test 3: Try to create transporter
    let transporter = null
         try {
       transporter = nodemailer.createTransport({
         host: envVars.SMTP_HOST,
         port: parseInt(envVars.SMTP_PORT),
         secure: false,
         auth: {
           user: process.env.SMTP_USER,
           pass: process.env.SMTP_PASS
         }
       })
       console.log('Transporter created successfully')
     } catch (transporterError) {
       console.error('Transporter creation failed:', transporterError.message)
     }
    
    // Test 4: Try to verify connection
    let verifyResult = null
    if (transporter) {
      try {
        verifyResult = await transporter.verify()
        console.log('Connection verified:', verifyResult)
      } catch (verifyError) {
        console.error('Connection verification failed:', verifyError.message)
      }
    }
    
    res.status(200).json({
      success: true,
      message: 'Nodemailer test completed',
             tests: {
         nodemailerAvailable: !!nodemailer,
         createTransportAvailable: !!nodemailer.createTransport,
         environmentVariables: envVars,
         transporterCreated: !!transporter,
         connectionVerified: verifyResult
       },
      timestamp: new Date().toISOString()
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