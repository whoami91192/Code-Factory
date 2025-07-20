# 🚀 Vercel Email Setup - Code Factory Portfolio

## ✅ What's Ready:
- ✅ Frontend deployed on Vercel: `code-factory-651d.vercel.app`
- ✅ Contact form component updated
- ✅ Serverless function created: `api/contact.js`
- ✅ Package.json for dependencies

## 🔧 What You Need to Do:

### Step 1: Add Environment Variables to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Find your project: `code-factory-651d`

2. **Add Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Add these variables:

```
Name: SMTP_USER
Value: gianniskatsibris@gmail.com
Environment: Production

Name: SMTP_PASS  
Value: mfyv psfc shes hyga
Environment: Production

Name: SMTP_FROM
Value: gianniskatsibris@gmail.com
Environment: Production
```

### Step 2: Deploy the API Function

1. **Push to GitHub**
   - Commit and push the new `api/` folder and `vercel.json` to your repository
   - Vercel will automatically detect and deploy the API function

2. **Force Redeploy**
   - Go to your Vercel project → **Deployments** tab
   - Click **"Redeploy"** on the latest deployment
   - This ensures the API function is deployed

3. **Verify Deployment**
   - Go to your Vercel project → **Functions** tab
   - You should see `api/contact.js` listed
   - If not visible, wait a few minutes and refresh

### Step 3: Test the Contact Form

1. **Visit your site**: https://code-factory-651d.vercel.app
2. **Go to Contact page**
3. **Fill out the form**:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test message from the contact form
4. **Click "Send Message"**
5. **Check your email**: gianniskatsibris@gmail.com

## 🎯 Expected Result:

You should receive an email with:
- 🔒 Cyber security themed styling
- 👤 Sender details (name, email, subject)
- 💬 The message content
- ⏰ Timestamp
- 🌐 IP address of sender

## 🔍 Troubleshooting:

### If emails don't send:
1. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Functions → api/contact
   - Check for error messages

2. **Verify Environment Variables**:
   - Make sure all 3 variables are set correctly
   - Check that they're set for "Production" environment

3. **Check Gmail Settings**:
   - Ensure 2-Step Verification is enabled
   - Verify App Password is correct: `mfyv psfc shes hyga`

### If you get CORS errors:
- The function already includes CORS headers for your domain
- Make sure you're testing from the correct domain

### If the function doesn't deploy:
- Check that the `api/` folder is in your repository root
- Verify `package.json` is in the `api/` folder
- Check Vercel build logs

## 📧 Email Format Preview:

The email you'll receive will look like this:

```
🚨 NEW CONTACT FORM SUBMISSION 🚨
Cyber Security Portfolio Alert

👤 SENDER: [User's Name]
📧 EMAIL: [user@email.com]  
📋 SUBJECT: [Subject]
💬 MESSAGE:
[User's message here]

🔐 This message was sent from your Cyber Security Portfolio
⏰ Timestamp: [Date/Time]
🌐 IP: [User's IP]
```

## 🎉 Success Indicators:

✅ Environment variables are set in Vercel
✅ API function appears in Functions tab
✅ Contact form submits without errors
✅ Email arrives at gianniskatsibris@gmail.com
✅ Email has cyber security theme styling

## 🚨 Important Notes:

- **Never commit** the App Password to your repository
- **Keep the App Password secure** - don't share it
- **Monitor Vercel usage** - serverless functions have limits
- **Consider rate limiting** for production use

## Need Help?

If something doesn't work:
1. Check Vercel Function logs first
2. Verify all environment variables are set
3. Test with a simple message first
4. Check your spam folder for emails 