# reCAPTCHA v3 Implementation Guide

This document explains how reCAPTCHA v3 is implemented in this Cyber Security Portfolio project.

## Overview

reCAPTCHA v3 runs in the background and provides a score (0.0 to 1.0) based on user interactions. A score of 1.0 is very likely a good interaction, while 0.0 is very likely a bot.

## Implementation Details

### Frontend (React + Vite)

1. **Environment Variables**: The site key is stored in `client/.env`:
   ```
   VITE_RECAPTCHA_SITE_KEY=6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E
   ```

2. **Script Loading**: The reCAPTCHA script is dynamically loaded in the Contact component:
   ```typescript
   useEffect(() => {
     const script = document.createElement('script')
     script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`
     script.async = true
     script.defer = true
     document.head.appendChild(script)
   }, [])
   ```

3. **Token Generation**: Before form submission, a token is generated:
   ```typescript
   const executeRecaptcha = async (): Promise<string> => {
     return new Promise((resolve, reject) => {
       window.grecaptcha.ready(() => {
         window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
           action: 'contact_submit'
         }).then((token: string) => {
           resolve(token)
         })
       })
     })
   }
   ```

### Backend (API)

1. **Environment Variables**: The secret key is stored in `api/.env`:
   ```
   RECAPTCHA_SECRET_KEY=6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1
   ```

2. **Token Verification**: The API verifies the token with Google:
   ```javascript
   const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
     },
     body: new URLSearchParams({
       secret: process.env.RECAPTCHA_SECRET_KEY,
       response: captchaToken,
       remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
     })
   })
   ```

3. **Score Validation**: The API checks if the score is above the threshold (0.5):
   ```javascript
   const score = recaptchaResult.score || 0
   if (score < 0.5) {
     return res.status(400).json({
       success: false,
       message: 'Security verification failed. Please try again.'
     })
   }
   ```

## Security Features

1. **Environment Variables**: Both keys are stored in environment files and not committed to version control
2. **Error Handling**: Comprehensive error handling for network issues and API failures
3. **Score Threshold**: Configurable threshold (currently 0.5) to balance security and user experience
4. **IP Tracking**: Remote IP is included in verification requests
5. **Logging**: Detailed logging for debugging and monitoring

## Testing

A test component (`RecaptchaTest.tsx`) is available to verify reCAPTCHA functionality:
- Tests token generation
- Displays environment variable status
- Shows error messages if something goes wrong

## Configuration

### Score Threshold
The score threshold can be adjusted in `api/contact.js`:
- **0.0-0.3**: Very strict (may block legitimate users)
- **0.3-0.7**: Balanced (recommended)
- **0.7-1.0**: Very lenient (may allow some bots)

### Actions
Different actions can be used for different forms:
- `contact_submit`: Contact form submission
- `test_action`: Testing purposes
- `login`: Login forms
- `signup`: Registration forms

## Troubleshooting

### Common Issues

1. **"reCAPTCHA not loaded"**: Check if the script is loading correctly
2. **"Security verification failed"**: Check the score threshold or token validity
3. **"Missing environment variables"**: Ensure `.env` files are created and contain the correct keys

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify environment variables are loaded correctly
3. Test token generation with the test component
4. Check API logs for verification details
5. Verify domain is registered in Google reCAPTCHA console

## Best Practices

1. **Never expose the secret key** in client-side code
2. **Use environment variables** for all sensitive configuration
3. **Implement proper error handling** for all reCAPTCHA operations
4. **Monitor scores** to adjust thresholds as needed
5. **Test thoroughly** in different environments
6. **Keep keys secure** and rotate them if compromised

## Google reCAPTCHA Console

- **Site Key**: `6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E`
- **Secret Key**: `6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1`
- **Type**: reCAPTCHA v3
- **Domain**: Configured for your domain

Visit the [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin) to:
- Monitor usage and analytics
- Adjust security settings
- View detailed logs
- Manage domains and keys 