# 🚀 Deployment Steps for Code Factory Portfolio

## Your Configuration:
- **Email**: gianniskatsibris@gmail.com
- **App Password**: mfyv psfc shes hyga
- **Vercel Domain**: code-factory-651d.vercel.app

## Step 1: Deploy Backend to Railway

### 1.1 Go to Railway
- Visit: https://railway.app/
- Sign in with GitHub
- Click "New Project"
- Select "Deploy from GitHub repo"

### 1.2 Configure Project
- Select your repository
- Set **Root Directory** to: `server/`
- Click "Deploy"

### 1.3 Add Environment Variables
In Railway dashboard, go to your project → Variables tab and add:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=gianniskatsibris@gmail.com
SMTP_PASS=mfyv psfc shes hyga
SMTP_FROM=gianniskatsibris@gmail.com
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://code-factory-651d.vercel.app
JWT_SECRET=cyber-portfolio-jwt-secret-2024
JWT_EXPIRES_IN=24h
CLIENT_URL=https://code-factory-651d.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 1.4 Get Backend URL
- After deployment, copy the generated URL
- It will look like: `https://your-app-name.railway.app`

## Step 2: Update Vercel Frontend

### 2.1 Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Find your project: `code-factory-651d`

### 2.2 Add Environment Variable
- Go to Settings → Environment Variables
- Add new variable:
  - **Name**: `VITE_API_URL`
  - **Value**: `https://your-backend-url.railway.app/api`
  - **Environment**: Production

### 2.3 Redeploy
- Go to Deployments tab
- Click "Redeploy" on the latest deployment

## Step 3: Test Contact Form

### 3.1 Visit Your Site
- Go to: https://code-factory-651d.vercel.app
- Navigate to Contact page

### 3.2 Test Form
- Fill out the contact form
- Click "Send Message"
- Check gianniskatsibris@gmail.com for the email

## Alternative: Deploy to Render

If Railway doesn't work, use Render:

### 1. Go to Render
- Visit: https://render.com/
- Sign up with GitHub
- Click "New +" → "Web Service"

### 2. Configure Service
- **Name**: cyber-portfolio-backend
- **Root Directory**: server/
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3. Add Environment Variables
Same as Railway above

## Troubleshooting

### If emails don't send:
1. Check Railway/Render logs for errors
2. Verify App Password is correct
3. Make sure 2-Step Verification is enabled on Gmail

### If CORS errors:
1. Verify CORS_ORIGIN includes your exact Vercel domain
2. Check that backend URL is correct in Vercel environment variables

### If build fails:
1. Make sure all dependencies are in server/package.json
2. Check that the root directory is set to `server/`

## Success Indicators

✅ Backend deploys without errors
✅ Contact form submits without console errors
✅ Email arrives at gianniskatsibris@gmail.com
✅ Email has proper formatting with sender details

## Need Help?

If you encounter issues:
1. Check the deployment logs
2. Verify all environment variables are set correctly
3. Make sure the App Password hasn't expired 