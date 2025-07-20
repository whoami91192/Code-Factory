# 🔧 Contact Form 405 Error - Troubleshooting Guide

## ❌ Current Error:
```
Failed to load resource: the server responded with a status of 405 ()
Error sending message: SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

## 🔍 Error Analysis:

### **405 Error (Method Not Allowed):**
- Το server δεν αναγνωρίζει το POST request
- Το API endpoint μπορεί να μην είναι σωστά ρυθμισμένο
- Το Vercel μπορεί να μην αναγνωρίζει το API function

### **Unexpected end of JSON input:**
- Η απάντηση δεν είναι έγκυρο JSON
- Το server επιστρέφει empty response ή error page

## ✅ Solutions Applied:

### **1. Enhanced API Endpoint (`api/contact.js`)**
```javascript
// Better CORS handling
const allowedOrigins = [
  'https://code-factory-651d.vercel.app',
  'http://localhost:3000',
  'http://localhost:4173'
]

// GET endpoint for testing
if (req.method === 'GET') {
  return res.status(200).json({ 
    success: true,
    message: 'Contact API is working',
    timestamp: new Date().toISOString()
  })
}

// Better error handling
if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
  return res.status(500).json({
    success: false,
    message: 'Email configuration is missing. Please contact administrator.'
  })
}
```

### **2. Test API Endpoint (`api/test.js`)**
```javascript
export default async function handler(req, res) {
  res.status(200).json({
    success: true,
    message: 'API is working correctly',
    timestamp: new Date().toISOString(),
    envVars: {
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      SMTP_FROM: !!process.env.SMTP_FROM
    }
  })
}
```

### **3. Enhanced Frontend Error Handling**
```javascript
// Better error handling in Contact.tsx
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}

// Specific error messages
if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
  alert('Network error. Please check your connection and try again.')
} else if (error.message.includes('HTTP error')) {
  alert('Server error. Please try again later.')
}
```

## 🚀 Testing Steps:

### **Step 1: Test API Endpoint**
```bash
# Test the API directly
curl https://code-factory-651d.vercel.app/api/test
```

### **Step 2: Test Contact API**
```bash
# Test GET request
curl https://code-factory-651d.vercel.app/api/contact

# Test POST request
curl -X POST https://code-factory-651d.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test message"}'
```

### **Step 3: Check Environment Variables**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Verify all SMTP variables are set:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`

### **Step 4: Check Function Logs**
1. Go to Vercel Dashboard
2. Functions tab
3. Check `/api/contact` function logs
4. Look for errors or missing environment variables

## 🔧 Debugging Commands:

### **Check API Status:**
```bash
# Test if API is accessible
curl -I https://code-factory-651d.vercel.app/api/contact
```

### **Check Environment Variables:**
```bash
# Test environment variables
curl https://code-factory-651d.vercel.app/api/test
```

### **Test Email Configuration:**
```bash
# Test with minimal data
curl -X POST https://code-factory-651d.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
```

## 📋 Troubleshooting Checklist:

### **API Endpoint Issues:**
- [ ] **API Accessible:** `/api/contact` responds
- [ ] **CORS Configured:** Frontend can access API
- [ ] **Method Allowed:** POST requests accepted
- [ ] **JSON Response:** Valid JSON returned

### **Environment Variables:**
- [ ] **SMTP_HOST:** Set to `smtp.gmail.com`
- [ ] **SMTP_PORT:** Set to `587`
- [ ] **SMTP_USER:** Your Gmail address
- [ ] **SMTP_PASS:** Your Gmail app password
- [ ] **SMTP_FROM:** Your Gmail address

### **Gmail Configuration:**
- [ ] **2-Step Verification:** Enabled
- [ ] **App Password:** Generated for Mail
- [ ] **Less Secure Apps:** Not needed with app password

### **Vercel Configuration:**
- [ ] **Function Deployed:** API functions uploaded
- [ ] **Environment Variables:** Set in all environments
- [ ] **Build Success:** No build errors
- [ ] **Function Logs:** No runtime errors

## 🚨 Common Issues & Solutions:

### **Issue 1: 405 Method Not Allowed**
**Cause:** API function not deployed or misconfigured
**Solution:** 
1. Check Vercel function logs
2. Redeploy the project
3. Verify API function exists

### **Issue 2: CORS Error**
**Cause:** Cross-origin request blocked
**Solution:**
1. Check CORS headers in API
2. Verify allowed origins
3. Test with different origins

### **Issue 3: Environment Variables Missing**
**Cause:** SMTP configuration not set
**Solution:**
1. Add all required environment variables
2. Redeploy after adding variables
3. Test with `/api/test` endpoint

### **Issue 4: Gmail Authentication Failed**
**Cause:** Wrong password or app password
**Solution:**
1. Generate new app password
2. Enable 2-step verification
3. Use app password, not regular password

## 🎯 Expected Results:

### **API Test Endpoint:**
```json
{
  "success": true,
  "message": "API is working correctly",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "envVars": {
    "SMTP_USER": true,
    "SMTP_PASS": true,
    "SMTP_FROM": true
  }
}
```

### **Contact Form Success:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "message-id-here"
}
```

### **Contact Form Error:**
```json
{
  "success": false,
  "message": "Specific error message",
  "error": "Detailed error (development only)"
}
```

## 🚀 Quick Fixes:

### **Fix 1: Redeploy Project**
```bash
git add .
git commit -m "Fix contact form API - Enhanced error handling"
git push
```

### **Fix 2: Check Environment Variables**
1. Vercel Dashboard → Settings → Environment Variables
2. Add missing variables
3. Redeploy

### **Fix 3: Test API Manually**
```bash
curl https://code-factory-651d.vercel.app/api/test
```

### **Fix 4: Check Function Logs**
1. Vercel Dashboard → Functions
2. Check `/api/contact` logs
3. Look for specific errors

## 📊 Success Indicators:

### **API Working:**
- ✅ **Test Endpoint:** `/api/test` returns success
- ✅ **Contact Endpoint:** `/api/contact` accepts POST
- ✅ **CORS:** No cross-origin errors
- ✅ **Environment:** All variables set

### **Contact Form Working:**
- ✅ **Form Submission:** No 405 errors
- ✅ **Email Delivery:** Email received
- ✅ **Success Message:** User sees confirmation
- ✅ **Error Handling:** Clear error messages

**Follow these steps to resolve the 405 error!** 🚀✨ 