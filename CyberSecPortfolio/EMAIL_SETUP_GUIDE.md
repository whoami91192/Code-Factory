# 📧 Email Setup Guide - Environment Variables

## ✅ Current Status:
Το API τώρα λειτουργεί σωστά! Βλέπουμε:
- ✅ **Response status: 200** (επιτυχία)
- ✅ **Response result: {success: true, message: 'Message received successfully'}**

## 🔧 Next Step: Add Email Functionality

### **1. Environment Variables Needed:**
Πρέπει να προσθέσεις τα εξής στο Vercel Dashboard:

#### **SMTP Configuration:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-gmail@gmail.com
```

### **2. Gmail Setup Steps:**

#### **Step 1: Enable 2-Step Verification**
1. Πήγαινε στο [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification
3. Enable 2-Step Verification

#### **Step 2: Generate App Password**
1. Security → App passwords
2. Select app: "Mail"
3. Select device: "Other (Custom name)"
4. Enter name: "CyberSec Portfolio"
5. Click "Generate"
6. **Copy the 16-character password**

#### **Step 3: Add Environment Variables**
1. Πήγαινε στο Vercel Dashboard
2. Settings → Environment Variables
3. Add the following:

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

### **3. Test Email Functionality:**

#### **Test API Endpoint:**
```bash
curl -X POST https://code-factory-gamma.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test Email","message":"This is a test message"}'
```

#### **Expected Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "message-id-here",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### **4. Email Features:**

#### **Email to You:**
- **To:** gianniskatsibris@gmail.com
- **Subject:** 🔒 Portfolio Contact: [User Subject]
- **Content:** Cyber security themed HTML email
- **Includes:** Sender info, message, timestamp, IP address

#### **Email Content:**
```html
🚨 NEW CONTACT FORM SUBMISSION 🚨
👤 SENDER: [User Name]
📧 EMAIL: [User Email]
📋 SUBJECT: [User Subject]
💬 MESSAGE: [User Message]
⏰ TIMESTAMP: [Date/Time]
🌐 IP: [User IP Address]
```

### **5. Error Handling:**

#### **Missing Environment Variables:**
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

#### **Authentication Error:**
```json
{
  "success": false,
  "message": "Email authentication failed. Please check credentials."
}
```

#### **Connection Error:**
```json
{
  "success": false,
  "message": "Email server connection failed. Please try again later."
}
```

## 🚀 Deployment Steps:

### **Step 1: Add Environment Variables**
1. Vercel Dashboard → Settings → Environment Variables
2. Add all 5 SMTP variables
3. Make sure they're set for all environments

### **Step 2: Redeploy**
```bash
git add .
git commit -m "Add email functionality with nodemailer"
git push
```

### **Step 3: Test**
1. Go to your website
2. Fill out contact form
3. Submit and check for email

## 📊 Success Indicators:

### **API Response:**
- ✅ **Status:** 200 OK
- ✅ **Message:** "Email sent successfully"
- ✅ **MessageId:** Valid email ID

### **Email Received:**
- ✅ **Inbox:** Check gianniskatsibris@gmail.com
- ✅ **Subject:** 🔒 Portfolio Contact: [Subject]
- ✅ **Content:** Cyber security themed email
- ✅ **Sender Info:** User details included

## 🔧 Troubleshooting:

### **If Email Not Sending:**

#### **Check Environment Variables:**
1. Vercel Dashboard → Settings → Environment Variables
2. Verify all 5 variables are set
3. Check they're enabled for Production

#### **Check Gmail Settings:**
1. Verify 2-Step Verification is enabled
2. Confirm app password is correct
3. Check if Gmail is blocking the connection

#### **Check Vercel Logs:**
1. Vercel Dashboard → Functions
2. Check `/api/contact` logs
3. Look for specific error messages

### **Common Issues:**

#### **EAUTH Error:**
- Wrong app password
- 2-Step Verification not enabled
- Use app password, not regular password

#### **ECONNECTION Error:**
- Network issues
- Gmail server problems
- Try again later

#### **ETIMEDOUT Error:**
- Slow connection
- Gmail server busy
- Try again later

## 🎯 Final Result:

Μετά από αυτές τις αλλαγές:
- ✅ **Contact Form:** Sends real emails
- ✅ **Email to You:** Receive notifications
- ✅ **Cyber Security Theme:** Professional styling
- ✅ **Error Handling:** Clear error messages
- ✅ **Logging:** Debug information

**Το contact form θα στέλνει πραγματικά emails!** 🚀✨ 