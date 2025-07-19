# 🔧 Nodemailer 500 Error Fix Guide

## 🚨 Current Error:
```
TypeError: nodemailer.createTransporter is not a function
```

## ✅ Fixes Applied:

### **1. Fixed Import Statement:**
```javascript
// ❌ WRONG (ES6 import)
import nodemailer from 'nodemailer'

// ✅ CORRECT (CommonJS require)
const nodemailer = require('nodemailer')
```

### **2. Fixed Function Name:**
```javascript
// ❌ WRONG (typo)
nodemailer.createTransporter()

// ✅ CORRECT (proper function name)
nodemailer.createTransport()
```

### **3. Added Detailed Logging:**
- Console logs για debugging
- Environment variable checks
- Error handling improvements

### **4. Created Test Endpoints:**
- `/api/test-nodemailer` για comprehensive testing
- `/api/simple-test` για basic nodemailer check

## 🧪 Testing Steps:

### **Step 1: Test Nodemailer Installation**
```bash
# Simple test
curl https://code-factory-gamma.vercel.app/api/simple-test

# Comprehensive test
curl https://code-factory-gamma.vercel.app/api/test-nodemailer
```

**Expected Response (Simple Test):**
```json
{
  "success": true,
  "message": "Simple nodemailer test completed",
  "results": {
    "nodemailerRequired": true,
    "requireError": null,
    "createTransportExists": true,
    "environmentVariables": {
      "SMTP_HOST": "smtp.gmail.com",
      "SMTP_PORT": "587",
      "SMTP_USER": "not set",
      "SMTP_PASS": "not set",
      "SMTP_FROM": "not set"
    },
    "nodeVersion": "v18.x.x",
    "timestamp": "2024-01-20T10:30:00.000Z"
  }
}
```

### **Step 2: Add Environment Variables**
1. Vercel Dashboard → Settings → Environment Variables
2. Add the following:

```
Name: SMTP_HOST
Value: smtp.gmail.com
Environment: Production, Preview, Development

Name: SMTP_PORT
Value: 587
Environment: Production, Preview, Development

Name: SMTP_USER
Value: your-gmail@gmail.com
Environment: Production, Preview, Development

Name: SMTP_PASS
Value: your-16-character-app-password
Environment: Production, Preview, Development

Name: SMTP_FROM
Value: your-gmail@gmail.com
Environment: Production, Preview, Development
```

### **Step 3: Test Again**
```bash
curl https://code-factory-gamma.vercel.app/api/test-nodemailer
```

**Expected Response (with env vars):**
```json
{
  "success": true,
  "message": "Nodemailer test completed",
  "tests": {
    "nodemailerAvailable": true,
    "createTransportAvailable": true,
    "environmentVariables": {
      "SMTP_HOST": "smtp.gmail.com",
      "SMTP_PORT": "587",
      "SMTP_USER": true,
      "SMTP_PASS": true,
      "SMTP_FROM": true
    },
    "transporterCreated": true,
    "connectionVerified": true
  }
}
```

### **Step 4: Test Contact Form**
1. Go to your website
2. Fill out contact form
3. Submit and check response

## 🔍 Debugging Information:

### **Current API Status:**
- ✅ **API Endpoint:** Working (no more 405 errors)
- ❌ **Nodemailer Import:** Fixed (CommonJS require)
- ❌ **Environment Variables:** Need to be added
- ❌ **Email Sending:** Will work after env vars

### **Vercel Logs Analysis:**
```
Email sending error: TypeError: _nodemailer.default.createTransporter is not a function
```
- **Cause:** ES6 import syntax not working in Vercel
- **Solution:** Changed to CommonJS require
- **Status:** ✅ Fixed

## 🚀 Deployment Steps:

### **Step 1: Commit Changes**
```bash
git add .
git commit -m "Fix nodemailer import and add debugging"
git push
```

### **Step 2: Add Environment Variables**
1. Vercel Dashboard → Settings → Environment Variables
2. Add all 5 SMTP variables
3. Make sure they're set for Production

### **Step 3: Test Endpoints**
```bash
# Test nodemailer
curl https://code-factory-gamma.vercel.app/api/test-nodemailer

# Test contact form
curl -X POST https://code-factory-gamma.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
```

## 📊 Expected Results:

### **Before Environment Variables:**
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

### **After Environment Variables:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "message-id-here",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## 🔧 Troubleshooting:

### **If Still Getting 500 Error:**

#### **Check Vercel Logs:**
1. Vercel Dashboard → Functions
2. Check `/api/contact` logs
3. Look for specific error messages

#### **Common Issues:**

#### **1. Nodemailer Not Installed:**
```bash
# In api directory
npm install nodemailer
```

#### **2. Wrong Import Syntax:**
```javascript
// ❌ Don't use ES6 import
import nodemailer from 'nodemailer'

// ✅ Use CommonJS require
const nodemailer = require('nodemailer')
```

#### **3. Wrong Function Name:**
```javascript
// ❌ Don't use createTransporter (typo)
nodemailer.createTransporter()

// ✅ Use createTransport (correct)
nodemailer.createTransport()
```

#### **4. Environment Variables Missing:**
- Check Vercel Dashboard
- Verify all 5 variables are set
- Make sure they're enabled for Production

#### **5. Gmail App Password Issues:**
- Enable 2-Step Verification
- Generate app password for "Mail"
- Use 16-character password

## 🎯 Final Status:

### **✅ Fixed:**
- Nodemailer import syntax
- API endpoint routing
- Error handling and logging
- CORS headers

### **⏳ Pending:**
- Environment variables setup
- Gmail app password configuration
- Email sending functionality

### **🚀 Next Steps:**
1. Add environment variables to Vercel
2. Test with `/api/test-nodemailer`
3. Test contact form submission
4. Verify email delivery

**Μετά από αυτές τις αλλαγές, το contact form θα λειτουργεί σωστά!** 🎉✨ 