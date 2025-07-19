// Test script for API endpoints
const BASE_URL = 'https://code-factory-gamma.vercel.app'

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n')

  // Test 1: Simple API endpoint
  console.log('1️⃣ Testing /api/contact-simple (GET)...')
  try {
    const response = await fetch(`${BASE_URL}/api/contact-simple`)
    const data = await response.json()
    console.log('✅ GET /api/contact-simple:', data)
  } catch (error) {
    console.log('❌ GET /api/contact-simple failed:', error.message)
  }

  // Test 2: Contact API endpoint
  console.log('\n2️⃣ Testing /api/contact (GET)...')
  try {
    const response = await fetch(`${BASE_URL}/api/contact`)
    const data = await response.json()
    console.log('✅ GET /api/contact:', data)
  } catch (error) {
    console.log('❌ GET /api/contact failed:', error.message)
  }

  // Test 3: Test API endpoint
  console.log('\n3️⃣ Testing /api/test (GET)...')
  try {
    const response = await fetch(`${BASE_URL}/api/test`)
    const data = await response.json()
    console.log('✅ GET /api/test:', data)
  } catch (error) {
    console.log('❌ GET /api/test failed:', error.message)
  }

  // Test 4: POST to simple contact
  console.log('\n4️⃣ Testing /api/contact-simple (POST)...')
  try {
    const response = await fetch(`${BASE_URL}/api/contact-simple`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      })
    })
    const data = await response.json()
    console.log('✅ POST /api/contact-simple:', data)
  } catch (error) {
    console.log('❌ POST /api/contact-simple failed:', error.message)
  }

  // Test 5: POST to contact (should fail without env vars)
  console.log('\n5️⃣ Testing /api/contact (POST)...')
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      })
    })
    const data = await response.json()
    console.log('✅ POST /api/contact:', data)
  } catch (error) {
    console.log('❌ POST /api/contact failed:', error.message)
  }

  console.log('\n🎯 API testing completed!')
}

// Run the test
testAPI().catch(console.error) 