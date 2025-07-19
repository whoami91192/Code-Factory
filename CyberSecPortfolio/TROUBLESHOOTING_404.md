# 🔧 Troubleshooting 404 Error - API Function Not Found

## 🚨 Current Error:
```
POST https://code-factory-651d.vercel.app/api/contact 404 (Not Found)
```

## ✅ Quick Fix Steps:

### 1. **Force Redeploy on Vercel**
1. Go to: https://vercel.com/dashboard
2. Find project: `code-factory-651d`
3. Go to **Deployments** tab
4. Click **"Redeploy"** on the latest deployment
5. Wait for deployment to complete

### 2. **Check Functions Tab**
1. In your Vercel project
2. Go to **Functions** tab
3. Look for `api/contact.js`
4. If not there, wait 2-3 minutes and refresh

### 3. **Verify Repository Structure**
Make sure your repository has this structure:
```
your-repo/
├── api/
│   ├── contact.js
│   └── package.json
├── client/
│   └── ... (your frontend files)
└── vercel.json
```

### 4. **Check Environment Variables**
1. Go to **Settings** → **Environment Variables**
2. Verify these are set:
   - `SMTP_USER`: gianniskatsibris@gmail.com
   - `SMTP_PASS`: mfyv psfc shes hyga
   - `SMTP_FROM`: gianniskatsibris@gmail.com

## 🔍 If Still Not Working:

### Option A: Manual Function Creation
1. Go to Vercel Dashboard → Functions
2. Click "Create Function"
3. Name: `contact`
4. Copy the code from `api/contact.js`

### Option B: Check Build Logs
1. Go to **Deployments** → Latest deployment
2. Click on the deployment
3. Check **Build Logs** for errors
4. Look for any API function deployment messages

### Option C: Alternative API Structure
If the above doesn't work, try this structure:
```
api/
└── contact/
    └── index.js  (rename contact.js to index.js)
```

## 🎯 Success Indicators:
- ✅ Function appears in **Functions** tab
- ✅ No 404 errors in browser console
- ✅ Contact form submits successfully
- ✅ Email arrives at gianniskatsibris@gmail.com

## 🚨 Common Issues:

1. **Function not deployed**: Force redeploy
2. **Wrong file structure**: Check repository layout
3. **Missing dependencies**: Verify package.json in api/ folder
4. **Environment variables**: Check Vercel settings

## 📞 Need Immediate Help?

If still getting 404:
1. Check Vercel build logs
2. Verify all files are committed to GitHub
3. Try creating the function manually in Vercel dashboard 