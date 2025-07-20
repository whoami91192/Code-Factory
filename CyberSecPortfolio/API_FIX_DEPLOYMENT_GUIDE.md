# 🔧 API 405 Error - Complete Fix Guide

## ❌ Current Problem:
```
POST https://code-factory-gamma.vercel.app/api/contact 405 (Method Not Allowed)
Error sending message: SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

## 🔍 Root Cause:
Το Vercel δεν αναγνωρίζει τα API endpoints επειδή δεν είναι στο σωστό directory structure.

## ✅ Complete Solution:

### **1. New API Directory Structure**
```
client/
├── public/
│   └── api/
│       ├── contact.js      # Main contact API
│       ├── test.js         # Test API
│       └── package.json    # API dependencies
```

### **2. Updated Vercel Configuration**
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm install",
  "framework": "vite",
  "functions": {
    "client/public/api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/client/public/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **3. Enhanced API Endpoints**

#### **Contact API (`client/public/api/contact.js`)**
- ✅ **CORS Support:** All origins allowed
- ✅ **Method Handling:** GET, POST, OPTIONS
- ✅ **Environment Check:** Verify SMTP variables
- ✅ **Error Handling:** Specific error messages
- ✅ **Logging:** Debug information

#### **Test API (`client/public/api/test.js`)**
- ✅ **API Status:** Verify API is working
- ✅ **Environment Variables:** Check SMTP configuration
- ✅ **Simple Response:** Easy to test

### **4. Frontend Updates**
- ✅ **Error Handling:** Better error messages
- ✅ **Response Validation:** Check if response is ok
- ✅ **Console Logging:** Debug information

## 🚀 Deployment Steps:

### **Step 1: Commit Changes**
```bash
git add .
git commit -m "Fix API 405 error - Move API to correct directory structure"
git push
```

### **Step 2: Verify API Structure**
```bash
# Check API files exist
ls -la client/public/api/

# Expected output:
# contact.js
# test.js
# package.json
```

### **Step 3: Test API Endpoints**
```bash
# Test API is accessible
curl https://code-factory-gamma.vercel.app/api/test

# Expected response:
{
  "success": true,
  "message": "API is working correctly",
  "envVars": {
    "SMTP_USER": true,
    "SMTP_PASS": true,
    "SMTP_FROM": true
  }
}
```

### **Step 4: Check Environment Variables**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Verify all variables are set:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_USER=your-email@gmail.com`
   - `SMTP_PASS=your-app-password`
   - `SMTP_FROM=your-email@gmail.com`

### **Step 5: Test Contact Form**
1. Go to your website
2. Navigate to Contact page
3. Fill out the form
4. Submit and check for success

## 🔧 Troubleshooting:

### **If API Still Returns 405:**
1. **Check Function Logs:**
   - Vercel Dashboard → Functions
   - Look for `/api/contact` logs
   - Check for deployment errors

2. **Verify Directory Structure:**
   ```bash
   # API files should be in:
   client/public/api/contact.js
   client/public/api/test.js
   client/public/api/package.json
   ```

3. **Check Vercel Configuration:**
   ```bash
   # Verify vercel.json is correct
   cat vercel.json
   ```

4. **Redeploy Manually:**
   ```bash
   # Force redeploy
   vercel --prod
   ```

### **If Environment Variables Missing:**
1. **Add Variables:**
   - Vercel Dashboard → Settings → Environment Variables
   - Add all SMTP variables
   - Redeploy after adding

2. **Test Variables:**
   ```bash
   curl https://code-factory-gamma.vercel.app/api/test
   ```

### **If Email Not Sending:**
1. **Check Gmail Settings:**
   - Enable 2-Step Verification
   - Generate App Password
   - Use App Password, not regular password

2. **Test Email Configuration:**
   ```bash
   curl -X POST https://code-factory-gamma.vercel.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
   ```

## 📊 Expected Results:

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
  "messageId": "message-id-here",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### **Contact Form Error (Missing Env Vars):**
```json
{
  "success": false,
  "message": "Email configuration is missing. Please contact administrator.",
  "debug": {
    "SMTP_USER": false,
    "SMTP_PASS": false,
    "SMTP_FROM": false
  }
}
```

## 🎯 Success Indicators:

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

## 🚨 Common Issues & Solutions:

### **Issue 1: API Not Found (404)**
**Cause:** Wrong directory structure
**Solution:** Move API files to `client/public/api/`

### **Issue 2: 405 Method Not Allowed**
**Cause:** Vercel not recognizing API functions
**Solution:** Update `vercel.json` with correct paths

### **Issue 3: CORS Error**
**Cause:** Cross-origin request blocked
**Solution:** API has CORS headers set

### **Issue 4: Environment Variables Missing**
**Cause:** SMTP configuration not set
**Solution:** Add all required environment variables

## 📋 Final Checklist:

- [ ] **API Files:** Moved to `client/public/api/`
- [ ] **Vercel Config:** Updated `vercel.json`
- [ ] **Environment Variables:** All SMTP variables set
- [ ] **Deployment:** Pushed to Vercel
- [ ] **API Test:** `/api/test` returns success
- [ ] **Contact Form:** No 405 errors
- [ ] **Email Delivery:** Working correctly

**Follow these steps to completely fix the 405 error!** 🚀✨

## 🔄 Alternative Solution (If Above Doesn't Work):

### **Use Netlify Functions Instead:**
1. Create `netlify/functions/contact.js`
2. Deploy to Netlify
3. Update frontend to use Netlify functions

### **Use External Email Service:**
1. Use EmailJS or similar service
2. No server-side API needed
3. Client-side email sending

**The directory structure fix should resolve the 405 error!** 🎯 