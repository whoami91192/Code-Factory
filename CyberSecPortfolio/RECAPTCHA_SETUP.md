# reCAPTCHA Setup Guide

## 🔒 reCAPTCHA Integration for Contact Form

This guide explains how reCAPTCHA has been integrated into the contact form to protect against malicious users and spam.

## 📋 Configuration Details

### Frontend Configuration
- **Site Key**: `6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E`
- **Theme**: Dark theme to match the cyberpunk design
- **Position**: Centered above the submit button
- **Required**: Users must complete reCAPTCHA before submitting

### Backend Configuration
- **Secret Key**: `6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1`
- **Verification**: Token is validated with Google's API before sending emails
- **IP Tracking**: User's IP address is included in verification request

## 🛠️ Implementation Details

### Frontend (React)
```typescript
// Contact.tsx
import ReCAPTCHA from 'react-google-recaptcha'

const [captchaToken, setCaptchaToken] = useState<string | null>(null)

// reCAPTCHA component
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey="6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E"
  onChange={handleCaptchaChange}
  theme="dark"
  className="recaptcha-container"
/>

// Form validation
if (!captchaToken) {
  alert('Please complete the reCAPTCHA verification before submitting.')
  return
}
```

### Backend (API)
```javascript
// contact.js
// Validate reCAPTCHA token
if (!captchaToken) {
  return res.status(400).json({
    success: false,
    message: 'reCAPTCHA verification is required'
  })
}

// Verify with Google
const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    secret: '6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1',
    response: captchaToken,
    remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
  })
})
```

## 🎨 Styling

### CSS Customization
```css
/* reCAPTCHA Styles */
.recaptcha-container {
  transform: scale(0.9);
  transform-origin: center;
}

.recaptcha-container > div {
  border-radius: 8px;
  overflow: hidden;
}

/* Dark theme for reCAPTCHA */
.grecaptcha-badge {
  visibility: hidden !important;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .recaptcha-container {
    transform: scale(0.8);
  }
}
```

## 🔧 Features

### ✅ Security Features
- **Token Validation**: Each submission is verified with Google's API
- **IP Tracking**: User's IP is logged for security monitoring
- **Rate Limiting**: Built-in protection against automated submissions
- **Spam Protection**: Filters out bot-generated messages

### ✅ User Experience
- **Dark Theme**: Matches the cyberpunk aesthetic
- **Responsive Design**: Scales appropriately on mobile devices
- **Clear Feedback**: Users know when reCAPTCHA is required
- **Smooth Integration**: Seamless part of the contact form

### ✅ Admin Benefits
- **Verification Logging**: All successful verifications are logged
- **Email Notifications**: Admin emails include reCAPTCHA status
- **Error Handling**: Detailed error messages for troubleshooting
- **Security Monitoring**: IP addresses and verification results tracked

## 🚀 Usage Flow

1. **User fills out form** with name, email, subject, and message
2. **User completes reCAPTCHA** by clicking the checkbox
3. **Frontend validates** that reCAPTCHA is completed
4. **Form submission** includes the reCAPTCHA token
5. **Backend verifies** the token with Google's API
6. **If valid**: Emails are sent and user gets confirmation
7. **If invalid**: Error message is returned to user

## 🔍 Monitoring

### Success Indicators
- ✅ reCAPTCHA verification: PASSED (in admin emails)
- ✅ Token validation successful
- ✅ IP address logged for security

### Error Handling
- ❌ Missing reCAPTCHA token
- ❌ Invalid or expired token
- ❌ Google API verification failed
- ❌ Network errors during verification

## 📊 Analytics

The reCAPTCHA integration provides:
- **Success Rate**: Percentage of successful verifications
- **Error Tracking**: Types of verification failures
- **IP Analysis**: Geographic distribution of submissions
- **Spam Detection**: Automated vs human submissions

## 🔐 Security Best Practices

1. **Secret Key Protection**: Never expose the secret key in frontend code
2. **Token Validation**: Always verify tokens server-side
3. **IP Logging**: Track IP addresses for security monitoring
4. **Error Handling**: Provide appropriate error messages without exposing internals
5. **Rate Limiting**: Consider additional rate limiting for the API endpoint

## 🎯 Benefits

### For Users
- **Trust**: Knows the form is protected against spam
- **Simplicity**: Single-click verification process
- **Reliability**: Ensures messages are delivered

### For Admin
- **Spam Reduction**: Significantly reduces automated submissions
- **Security**: Protects against malicious attacks
- **Quality**: Ensures only human users can submit messages
- **Monitoring**: Detailed logs for security analysis

---

**Note**: This reCAPTCHA setup provides enterprise-level protection while maintaining a smooth user experience that fits the cyberpunk theme of the portfolio. 