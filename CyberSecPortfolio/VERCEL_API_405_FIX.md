# 🔧 Vercel API 405 Error - Returning HTML Instead of JSON

## ❌ Current Problem:
```
Status Code: 405 Method Not Allowed
Content-Type: text/html; charset=utf-8
Content-Disposition: inline; filename="index.html"
```

Το Vercel επιστρέφει `index.html` αντί για JSON response, που σημαίνει ότι δεν αναγνωρίζει τα API endpoints.

## 🔍 Root Cause Analysis:

### **Problem 1: Vercel Not Recognizing API Functions**
- Το Vercel επιστρέφει frontend HTML αντί για API response
- `Content-Type: text/html` δείχνει ότι σερβίρει το frontend
- `filename="index.html"` επιβεβαιώνει ότι επιστρέφει το build output

### **Problem 2: API Directory Structure**
- Το Vercel δεν αναγνωρίζει το `/api/` directory ως serverless functions
- Τα API files υπάρχουν αλλά δεν λειτουργούν

### **Problem 3: Configuration Issues**
- Το `vercel.json` μπορεί να μην είναι σωστό
- Runtime configuration issues

## ✅ Complete Solution:

### **1. Verify API Files Exist**
```bash
# Check API directory structure
ls -la api/

# Expected output:
# contact.js
# test.js
# hello.js
# package.json
```

### **2. Simplified vercel.json**
```json
{
  "framework": "vite",
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm install",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **3. Simple API Endpoints**
```javascript
// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello from API!',
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  })
}

// api/contact.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true,
      message: 'Contact API is working',
      timestamp: new Date().toISOString()
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: `Method ${req.method} not allowed. Use POST for sending messages.`
    })
  }

  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Message received successfully',
      data: { name, email, subject, message },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}
```

## 🚀 Testing Steps:

### **Step 1: Test Simple API**
```bash
# Test hello endpoint
curl https://code-factory-gamma.vercel.app/api/hello

# Expected response:
{
  "message": "Hello from API!",
  "method": "GET",
  "url": "/api/hello",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### **Step 2: Test Contact API**
```bash
# Test GET request
curl https://code-factory-gamma.vercel.app/api/contact

# Expected response:
{
  "success": true,
  "message": "Contact API is working",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### **Step 3: Test POST Request**
```bash
# Test POST request
curl -X POST https://code-factory-gamma.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'

# Expected response:
{
  "success": true,
  "message": "Message received successfully",
  "data": {
    "name": "Test",
    "email": "test@test.com",
    "subject": "Test",
    "message": "Test"
  },
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## 🔧 Troubleshooting:

### **If Still Getting HTML Response:**

#### **Option 1: Check Vercel Functions**
1. Go to Vercel Dashboard
2. Functions tab
3. Check if `/api/hello` function exists
4. Look for deployment errors

#### **Option 2: Force Redeploy**
```bash
# Commit and push changes
git add .
git commit -m "Fix API 405 error - Simplified endpoints"
git push

# Or use Vercel CLI
vercel --prod
```

#### **Option 3: Check Build Logs**
1. Go to Vercel Dashboard
2. Deployments tab
3. Check latest deployment logs
4. Look for API function errors

#### **Option 4: Alternative Directory Structure**
```bash
# Try moving API to different location
mkdir -p functions
mv api/* functions/
```

### **If API Functions Not Deploying:**

#### **Check .vercelignore**
```bash
# Make sure API directory is not ignored
cat .vercelignore

# Should NOT contain:
# api/
# /api/
```

#### **Check Package.json**
```json
{
  "name": "cybersec-portfolio-api",
  "version": "1.0.0",
  "description": "API endpoints for Cyber Security Portfolio",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["api", "vercel", "serverless"],
  "author": "Ioannis Katsimpris",
  "license": "MIT"
}
```

## 📊 Expected Results:

### **Success Indicators:**
- ✅ **Content-Type:** `application/json`
- ✅ **Status Code:** 200 OK
- ✅ **Response:** Valid JSON
- ✅ **No HTML:** Not returning index.html

### **Failure Indicators:**
- ❌ **Content-Type:** `text/html`
- ❌ **Status Code:** 405 Method Not Allowed
- ❌ **Response:** HTML content
- ❌ **Filename:** `index.html`

## 🚨 Alternative Solutions:

### **Solution 1: Use Netlify Functions**
```bash
# Create netlify/functions/contact.js
mkdir -p netlify/functions
# Move API files there
```

### **Solution 2: Use External Email Service**
```javascript
// Use EmailJS instead of server-side API
import emailjs from 'emailjs-com'

const sendEmail = (data) => {
  return emailjs.send(
    'service_id',
    'template_id',
    data,
    'user_id'
  )
}
```

### **Solution 3: Use Vercel Edge Functions**
```javascript
// api/contact.js
export const config = {
  runtime: 'edge'
}

export default function handler(req) {
  return new Response(JSON.stringify({
    success: true,
    message: 'Edge function working'
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
```

## 📋 Final Checklist:

- [ ] **API Files:** Exist in `/api/` directory
- [ ] **vercel.json:** Correct configuration
- [ ] **Build Success:** No deployment errors
- [ ] **Functions Tab:** API functions visible
- [ ] **Test Endpoints:** Return JSON, not HTML
- [ ] **CORS Headers:** Properly set
- [ ] **Error Handling:** Graceful failures

## 🎯 Quick Fix Commands:

```bash
# 1. Commit changes
git add .
git commit -m "Fix API 405 error - Simplified endpoints"
git push

# 2. Test API
curl https://code-factory-gamma.vercel.app/api/hello

# 3. Check deployment
# Go to Vercel Dashboard → Deployments

# 4. Check functions
# Go to Vercel Dashboard → Functions
```

**The key is to ensure Vercel recognizes the API functions and doesn't serve HTML instead of JSON!** 🚀✨ 