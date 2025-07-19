# 🔧 Vercel Deployment Fix - Framework Settings

## ❌ Current Problem:
```
Error: Function Runtimes must have a valid version, for example 'now-php@1.0.0'
```

## 🔍 Root Cause:
Το πρόβλημα είναι στις ρυθμίσεις του Vercel. Υπάρχει διαφορά μεταξύ Production Overrides και Project Settings.

## ✅ Complete Solution:

### **1. Fixed vercel.json Configuration**
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

### **2. Simplified API Endpoints**
- ✅ **Removed nodemailer dependency** (causing runtime issues)
- ✅ **Simplified CORS headers**
- ✅ **Basic functionality** (we'll add email later)
- ✅ **Clean error handling**

### **3. Vercel Framework Settings**
Στις ρυθμίσεις του Vercel, βεβαιώσου ότι έχεις:

#### **Project Settings:**
- **Framework Preset:** Vite ✅
- **Build Command:** `cd client && npm run build` ✅
- **Output Directory:** `client/dist` ✅
- **Install Command:** `cd client && npm install` ✅

#### **Production Overrides:**
- **Build Command:** `cd client && npm install && npm run build` ❌
- Αυτό πρέπει να αλλάξει σε: `cd client && npm run build` ✅

## 🚀 Deployment Steps:

### **Step 1: Update Vercel Settings**
1. Πήγαινε στο Vercel Dashboard
2. Settings → General → Framework Settings
3. **Override** το Build Command:
   - Από: `cd client && npm install && npm run build`
   - Σε: `cd client && npm run build`
4. **Save** τις αλλαγές

### **Step 2: Commit Changes**
```bash
git add .
git commit -m "Fix Vercel deployment - Simplified API and framework settings"
git push
```

### **Step 3: Verify API Structure**
```bash
# Check API files exist
ls -la api/

# Expected output:
# contact.js
# test.js
# package.json
```

### **Step 4: Test API Endpoints**
```bash
# Test API is accessible
curl https://code-factory-gamma.vercel.app/api/test

# Expected response:
{
  "success": true,
  "message": "API is working correctly",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### **Step 5: Test Contact Form**
1. Πήγαινε στο website
2. Navigate to Contact page
3. Fill out the form
4. Submit and check for success

## 🔧 Troubleshooting:

### **If Still Getting Runtime Error:**
1. **Check Vercel Settings:**
   - Framework Preset: Vite
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `cd client && npm install`

2. **Remove Production Overrides:**
   - Disable all overrides
   - Let Vercel use project settings

3. **Check API Dependencies:**
   - Removed nodemailer (causing issues)
   - Simplified API endpoints

### **If API Still Returns 405:**
1. **Verify API Files:**
   ```bash
   # API files should be in root /api/ directory
   api/contact.js
   api/test.js
   api/package.json
   ```

2. **Check Vercel Configuration:**
   ```bash
   # Verify vercel.json is correct
   cat vercel.json
   ```

3. **Redeploy Manually:**
   ```bash
   # Force redeploy
   vercel --prod
   ```

## 📊 Expected Results:

### **API Test Endpoint:**
```json
{
  "success": true,
  "message": "API is working correctly",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### **Contact Form Success:**
```json
{
  "success": true,
  "message": "Message received successfully",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Test message"
  },
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## 🎯 Success Indicators:

### **Deployment Working:**
- ✅ **Build Success:** No runtime errors
- ✅ **API Accessible:** `/api/test` returns success
- ✅ **Contact Form:** No 405 errors
- ✅ **Framework Settings:** Match project configuration

### **Next Steps (After Fix):**
- ✅ **Add Email Functionality:** Once API works
- ✅ **Add Environment Variables:** SMTP configuration
- ✅ **Test Email Sending:** Verify email delivery

## 🚨 Common Issues & Solutions:

### **Issue 1: Function Runtime Error**
**Cause:** Invalid runtime configuration
**Solution:** Remove custom runtime settings from vercel.json

### **Issue 2: Build Command Mismatch**
**Cause:** Production overrides different from project settings
**Solution:** Update Vercel settings to match project configuration

### **Issue 3: API Not Found**
**Cause:** Wrong directory structure
**Solution:** API files in root `/api/` directory

### **Issue 4: CORS Error**
**Cause:** Cross-origin request blocked
**Solution:** API has CORS headers set

## 📋 Final Checklist:

- [ ] **Vercel Settings:** Framework preset = Vite
- [ ] **Build Command:** `cd client && npm run build`
- [ ] **Output Directory:** `client/dist`
- [ ] **Install Command:** `cd client && npm install`
- [ ] **API Files:** In root `/api/` directory
- [ ] **vercel.json:** Simplified configuration
- [ ] **Deployment:** No runtime errors
- [ ] **API Test:** `/api/test` returns success
- [ ] **Contact Form:** No 405 errors

## 🔄 Alternative Solution (If Still Fails):

### **Use Netlify Instead:**
1. Create `netlify.toml` configuration
2. Deploy to Netlify
3. Use Netlify functions for API

### **Use External Email Service:**
1. Use EmailJS or similar service
2. No server-side API needed
3. Client-side email sending

**The framework settings fix should resolve the deployment issues!** 🚀✨

## 🎯 Key Changes Made:

1. **Simplified vercel.json:** Removed problematic runtime settings
2. **Fixed Build Command:** Matches Vercel project settings
3. **Simplified API:** Removed nodemailer dependency
4. **Clean Structure:** API files in correct location

**Follow these steps to fix the deployment!** 🚀 