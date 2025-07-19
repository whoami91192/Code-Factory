# Vercel Deployment with Email Functionality

This guide will help you deploy your Cyber Security Portfolio to Vercel with working email functionality.

## Prerequisites

1. Vercel account
2. Gmail account with 2-Step Verification enabled
3. App Password generated for Gmail

## Step 1: Deploy Backend First

Since Vercel is primarily for frontend applications, you'll need to deploy the backend to a different service:

### Option A: Railway (Recommended)
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Select the `server/` folder
4. Add environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=your-gmail@gmail.com
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-domain.vercel.app
   ```
5. Deploy and copy the generated URL

### Option B: Render
1. Go to [Render](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the root directory to `server/`
5. Add the same environment variables as above
6. Deploy and copy the URL

## Step 2: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add environment variables:
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL (e.g., `https://your-app.railway.app/api`)

5. Deploy

## Step 3: Update CORS Settings

After getting your Vercel domain, update your backend's CORS settings:

1. Go to your backend hosting platform (Railway/Render)
2. Update the `CORS_ORIGIN` environment variable to include your Vercel domain:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
3. Redeploy the backend

## Step 4: Test the Contact Form

1. Visit your Vercel deployment
2. Go to the Contact page
3. Fill out the form and submit
4. Check `gianniskatsibris@gmail.com` for the email

## Environment Variables Summary

### Backend (Railway/Render):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM=your-gmail@gmail.com
NODE_ENV=production
CORS_ORIGIN=https://your-app.vercel.app
```

### Frontend (Vercel):
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Make sure `CORS_ORIGIN` includes your exact Vercel domain
   - Check that the API URL is correct in Vercel environment variables

2. **Email Not Sending:**
   - Verify your Gmail App Password is correct
   - Check that 2-Step Verification is enabled
   - Look at your backend logs for error messages

3. **Build Errors:**
   - Make sure you're deploying the `client/` folder to Vercel
   - Check that all dependencies are in `client/package.json`

## Alternative: Vercel Serverless Functions

If you prefer to keep everything on Vercel, you can create a serverless function:

1. Create `api/contact.js` in your project root:
```javascript
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'gianniskatsibris@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ success: false, message: 'Failed to send email' })
  }
}
```

2. Add environment variables to Vercel:
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`

3. Update the frontend to use `/api/contact` instead of the external API

This approach keeps everything on Vercel but has limitations with email sending due to Vercel's serverless nature. 