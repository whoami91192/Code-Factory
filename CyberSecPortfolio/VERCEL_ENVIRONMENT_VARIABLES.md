# 🔧 Vercel Environment Variables Setup

## 📧 Email Configuration Required

### **Environment Variables για το Contact Form:**

#### **1. SMTP Configuration:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

#### **2. Security Configuration:**
```
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
```

#### **3. Client Configuration:**
```
CLIENT_URL=https://code-factory-651d.vercel.app
VITE_API_URL=https://code-factory-651d.vercel.app/api
```

#### **4. Server Configuration:**
```
NODE_ENV=production
LOG_LEVEL=info
```

#### **5. Rate Limiting:**
```
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SLOW_DOWN_DELAY_MS=500
SLOW_DOWN_DELAY_AFTER=50
```

## 🚀 How to Add Environment Variables in Vercel:

### **Step 1: Go to Vercel Dashboard**
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" tab
4. Click "Environment Variables"

### **Step 2: Add Each Variable**
Click "Add New" and add each variable:

#### **SMTP_HOST:**
- **Name:** `SMTP_HOST`
- **Value:** `smtp.gmail.com`
- **Environment:** Production, Preview, Development

#### **SMTP_PORT:**
- **Name:** `SMTP_PORT`
- **Value:** `587`
- **Environment:** Production, Preview, Development

#### **SMTP_USER:**
- **Name:** `SMTP_USER`
- **Value:** `your-email@gmail.com` (το Gmail σου)
- **Environment:** Production, Preview, Development

#### **SMTP_PASS:**
- **Name:** `SMTP_PASS`
- **Value:** `your-app-password` (το App Password σου)
- **Environment:** Production, Preview, Development

#### **SMTP_FROM:**
- **Name:** `SMTP_FROM`
- **Value:** `your-email@gmail.com` (το Gmail σου)
- **Environment:** Production, Preview, Development

#### **JWT_SECRET:**
- **Name:** `JWT_SECRET`
- **Value:** `your-super-secret-jwt-key-change-in-production`
- **Environment:** Production, Preview, Development

#### **JWT_EXPIRES_IN:**
- **Name:** `JWT_EXPIRES_IN`
- **Value:** `24h`
- **Environment:** Production, Preview, Development

#### **CLIENT_URL:**
- **Name:** `CLIENT_URL`
- **Value:** `https://code-factory-651d.vercel.app`
- **Environment:** Production, Preview, Development

#### **VITE_API_URL:**
- **Name:** `VITE_API_URL`
- **Value:** `https://code-factory-651d.vercel.app/api`
- **Environment:** Production, Preview, Development

#### **NODE_ENV:**
- **Name:** `NODE_ENV`
- **Value:** `production`
- **Environment:** Production, Preview, Development

#### **LOG_LEVEL:**
- **Name:** `LOG_LEVEL`
- **Value:** `info`
- **Environment:** Production, Preview, Development

#### **RATE_LIMIT_WINDOW_MS:**
- **Name:** `RATE_LIMIT_WINDOW_MS`
- **Value:** `900000`
- **Environment:** Production, Preview, Development

#### **RATE_LIMIT_MAX_REQUESTS:**
- **Name:** `RATE_LIMIT_MAX_REQUESTS`
- **Value:** `100`
- **Environment:** Production, Preview, Development

#### **SLOW_DOWN_DELAY_MS:**
- **Name:** `SLOW_DOWN_DELAY_MS`
- **Value:** `500`
- **Environment:** Production, Preview, Development

#### **SLOW_DOWN_DELAY_AFTER:**
- **Name:** `SLOW_DOWN_DELAY_AFTER`
- **Value:** `50`
- **Environment:** Production, Preview, Development

## 🔐 Gmail App Password Setup:

### **Step 1: Enable 2-Step Verification**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security"
3. Enable "2-Step Verification" if not already enabled

### **Step 2: Generate App Password**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security"
3. Click "App passwords"
4. Select "Mail" from dropdown
5. Click "Generate"
6. Copy the 16-character password

### **Step 3: Use App Password**
- **SMTP_PASS:** Use the generated 16-character app password
- **NOT your regular Gmail password**

## 📋 Complete Environment Variables List:

```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM=your-email@gmail.com

# Security Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Client Configuration
CLIENT_URL=https://code-factory-651d.vercel.app
VITE_API_URL=https://code-factory-651d.vercel.app/api

# Server Configuration
NODE_ENV=production
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SLOW_DOWN_DELAY_MS=500
SLOW_DOWN_DELAY_AFTER=50
```

## 🎯 What Each Variable Does:

### **SMTP Variables:**
- **SMTP_HOST:** Gmail SMTP server
- **SMTP_PORT:** SMTP port (587 for TLS)
- **SMTP_USER:** Your Gmail address
- **SMTP_PASS:** Your Gmail app password
- **SMTP_FROM:** Sender email address

### **Security Variables:**
- **JWT_SECRET:** Secret key for JWT tokens
- **JWT_EXPIRES_IN:** JWT token expiration time

### **Client Variables:**
- **CLIENT_URL:** Your Vercel app URL
- **VITE_API_URL:** API endpoint URL

### **Server Variables:**
- **NODE_ENV:** Environment (production)
- **LOG_LEVEL:** Logging level

### **Rate Limiting:**
- **RATE_LIMIT_WINDOW_MS:** Rate limit window (15 minutes)
- **RATE_LIMIT_MAX_REQUESTS:** Max requests per window
- **SLOW_DOWN_DELAY_MS:** Slow down delay
- **SLOW_DOWN_DELAY_AFTER:** Slow down after requests

## ✅ After Adding Variables:

### **Step 1: Redeploy**
1. Go to "Deployments" tab
2. Click "Redeploy" on latest deployment
3. Select "Redeploy with Existing Build Cache"

### **Step 2: Test Contact Form**
1. Go to your website
2. Navigate to Contact page
3. Fill out contact form
4. Submit and check if email is received

### **Step 3: Check Logs**
1. Go to "Functions" tab
2. Check `/api/contact` function logs
3. Verify no errors

## 🚨 Important Notes:

### **Security:**
- ✅ **Never commit** environment variables to Git
- ✅ **Use App Password** for Gmail, not regular password
- ✅ **Change JWT_SECRET** to a unique value
- ✅ **Use HTTPS** URLs in production

### **Gmail Setup:**
- ✅ **Enable 2-Step Verification** first
- ✅ **Generate App Password** for mail
- ✅ **Use 16-character** app password
- ✅ **Test email** before going live

### **Vercel Configuration:**
- ✅ **Add to all environments** (Production, Preview, Development)
- ✅ **Redeploy** after adding variables
- ✅ **Check function logs** for errors

## 📧 Expected Results:

### **Contact Form:**
- ✅ **Form Submission:** Works without errors
- ✅ **Email Delivery:** Email received at gianniskatsibris@gmail.com
- ✅ **Cyber Theme:** Email has cyber security styling
- ✅ **No Rate Limiting:** Form works smoothly

### **API Endpoint:**
- ✅ **CORS:** Works from your domain
- ✅ **Validation:** Required fields checked
- ✅ **Error Handling:** Proper error messages
- ✅ **Logging:** Function logs available

**Add these environment variables and your contact form will work perfectly!** 🚀✨ 