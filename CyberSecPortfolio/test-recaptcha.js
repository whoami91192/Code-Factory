// Test script for reCAPTCHA v3 implementation
const BASE_URL = 'http://localhost:5173' // Development server
// const BASE_URL = 'https://code-factory-gamma.vercel.app' // Production

async function testRecaptchaImplementation() {
  console.log('🧪 Testing reCAPTCHA v3 Implementation...\n')

  // Test 1: Contact form without reCAPTCHA token (development mode)
  console.log('1️⃣ Testing contact form without reCAPTCHA token...')
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'reCAPTCHA Test',
        message: 'Testing reCAPTCHA v3 implementation without token'
      })
    })
    
    const data = await response.json()
    console.log('✅ Status:', response.status)
    console.log('✅ Response:', data)
  } catch (error) {
    console.log('❌ Error:', error.message)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test 2: Contact form with fake reCAPTCHA token
  console.log('2️⃣ Testing contact form with fake reCAPTCHA token...')
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User 2',
        email: 'test2@example.com',
        subject: 'reCAPTCHA Test with Token',
        message: 'Testing reCAPTCHA v3 implementation with fake token',
        captchaToken: 'fake_token_for_testing'
      })
    })
    
    const data = await response.json()
    console.log('✅ Status:', response.status)
    console.log('✅ Response:', data)
  } catch (error) {
    console.log('❌ Error:', error.message)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test 3: Check if frontend is accessible
  console.log('3️⃣ Testing frontend accessibility...')
  try {
    const response = await fetch(BASE_URL)
    console.log('✅ Frontend Status:', response.status)
    console.log('✅ Frontend accessible:', response.ok)
  } catch (error) {
    console.log('❌ Frontend Error:', error.message)
  }

  console.log('\n🎯 reCAPTCHA v3 testing completed!')
  console.log('\n📝 Next steps:')
  console.log('1. Start the development server: cd client && npm run dev')
  console.log('2. Visit the contact form and check browser console')
  console.log('3. Verify "Protected by reCAPTCHA v3" indicator appears')
  console.log('4. Submit a test message and check server logs')
  console.log('5. Deploy to Vercel and test in production')
}

// Helper function to test with real reCAPTCHA token (for browser environment)
function testWithRealToken() {
  console.log('🔒 Testing with real reCAPTCHA token...')
  console.log('This test should be run in the browser console:')
  console.log(`
// Run this in browser console on your contact page:
grecaptcha.ready(function() {
  grecaptcha.execute('6LcLUIkrAAAAEHbhqGdvIi6YPy93ghOu1BO0N0E', {action: 'contact_form'})
    .then(function(token) {
      console.log('Generated token:', token);
      
      // Test API with real token
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Real Token Test',
          email: 'realtest@example.com',
          subject: 'Real reCAPTCHA Token Test',
          message: 'Testing with actual reCAPTCHA v3 token',
          captchaToken: token
        })
      })
      .then(response => response.json())
      .then(data => console.log('API Response:', data))
      .catch(error => console.error('Error:', error));
    });
});
  `)
}

// Run the tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testRecaptchaImplementation, testWithRealToken }
} else {
  testRecaptchaImplementation()
  testWithRealToken()
} 