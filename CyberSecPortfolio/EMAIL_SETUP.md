# Email Setup for Contact Form

This guide will help you set up the email functionality so that contact form submissions are sent to `gianniskatsibris@gmail.com`.

## Prerequisites

1. A Gmail account
2. 2-Step Verification enabled on your Gmail account
3. An App Password generated for the application

## Step 1: Enable 2-Step Verification

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

## Step 2: Generate an App Password

1. In your Google Account settings, go to Security
2. Find "App passwords" (you'll only see this if 2-Step Verification is enabled)
3. Click "App passwords"
4. Select "Mail" as the app and "Other" as the device
5. Click "Generate"
6. Copy the 16-character password that appears

## Step 3: Configure Environment Variables

Create a `.env` file in the `server/` directory with the following content:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM=your-gmail@gmail.com

# Other configurations...
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

**Important Notes:**
- Replace `your-gmail@gmail.com` with your actual Gmail address
- Replace `your-16-character-app-password` with the App Password you generated
- Replace `your-vercel-domain.vercel.app` with your actual Vercel domain

## Step 4: Deploy to Vercel

### For the Frontend (Client):
1. Deploy the `client/` folder to Vercel
2. Set the following environment variables in Vercel:
   - `VITE_API_URL`: Your backend API URL

### For the Backend (Server):
1. Deploy the `server/` folder to a hosting service that supports Node.js (like Railway, Render, or Heroku)
2. Set all the environment variables from your `.env` file in your hosting platform

## Step 5: Update API URL

After deploying the backend, update the frontend to use the correct API URL:

1. In your Vercel dashboard, go to your frontend project
2. Add an environment variable:
   - Name: `VITE_API_URL`
   - Value: Your backend URL (e.g., `https://your-backend.railway.app/api`)

## Step 6: Test the Contact Form

1. Visit your deployed website
2. Go to the Contact page
3. Fill out the form and submit
4. Check your email at `gianniskatsibris@gmail.com` for the message

## Troubleshooting

### Common Issues:

1. **"Authentication failed" error:**
   - Make sure you're using an App Password, not your regular Gmail password
   - Ensure 2-Step Verification is enabled

2. **"Connection timeout" error:**
   - Check that your hosting provider allows outbound SMTP connections
   - Verify the SMTP settings are correct

3. **CORS errors:**
   - Make sure the `CORS_ORIGIN` environment variable includes your frontend domain
   - Check that the API URL is correct in your frontend configuration

4. **"Rate limit exceeded" error:**
   - Gmail has sending limits. For production use, consider using a service like SendGrid or Mailgun

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables in production
- Consider using a dedicated email service for production applications
- Regularly rotate your App Passwords

## Alternative Email Services

For production use, consider these alternatives to Gmail:

1. **SendGrid** - Popular email service with generous free tier
2. **Mailgun** - Developer-friendly email service
3. **AWS SES** - Cost-effective for high volume
4. **Resend** - Modern email API

To use an alternative service, update the SMTP configuration in `server/src/index.js` with the appropriate settings. 