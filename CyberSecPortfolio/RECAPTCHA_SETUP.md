# reCAPTCHA v3 Setup Guide

## 🔒 reCAPTCHA v3 Integration for Contact Form

This guide explains how reCAPTCHA v3 has been integrated into the contact form to protect against malicious users and spam without interrupting the user experience.

## 📋 Configuration Details

### Frontend Configuration
- **Site Key**: `6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E`
- **Type**: reCAPTCHA v3 (Invisible)
- **Action**: `contact_submit`
- **User Experience**: No user interaction required

### Backend Configuration
- **Secret Key**: `6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1`
- **Score Threshold**: 0.5 (configurable)
- **Verification**: Token is validated with Google's API before sending emails
- **IP Tracking**: User's IP address is included in verification request

## 🛠️ Implementation Details

### Frontend (React)
```typescript
// Contact.tsx
// Load reCAPTCHA v3 script
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://www.google.com/recaptcha/api.js?render=6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}, [])

// Execute reCAPTCHA v3
const executeRecaptcha = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E', {
        action: 'contact_submit'
      }).then((token: string) => {
        resolve(token)
      }).catch((error: any) => {
        reject(error)
      })
    })
  })
}

// In form submission
const token = await executeRecaptcha()
```

### Backend (API)
```javascript
// contact.js
// Verify reCAPTCHA v3 token
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

const recaptchaResult = await recaptchaResponse.json()

// Check score (0.0 = bot, 1.0 = human)
const score = recaptchaResult.score || 0
if (score < 0.5) {
  return res.status(400).json({
    success: false,
    message: 'Security verification failed. Please try again.',
    recaptchaScore: score
  })
}
```

## 🎨 User Experience

### ✅ Advantages of reCAPTCHA v3
- **No User Interaction**: Runs invisibly in the background
- **Better Conversion**: No friction for legitimate users
- **Adaptive**: Learns from user behavior on your site
- **Contextual**: Provides different scores for different actions
- **Analytics**: Detailed insights in Google Admin Console

### 🎯 Score Interpretation
- **1.0**: Very likely a good interaction
- **0.5**: Neutral (default threshold)
- **0.0**: Very likely a bot

## 🔧 Features

### ✅ Security Features
- **Score-based Protection**: Adaptive threshold system
- **Action-based Analysis**: Different scores for different actions
- **IP Tracking**: User's IP is logged for security monitoring
- **Token Expiry**: Tokens expire after 2 minutes
- **Background Monitoring**: Continuous protection without user friction

### ✅ User Experience
- **Invisible Protection**: No checkboxes or challenges
- **Fast Execution**: Runs automatically on form submission
- **No Interruption**: Seamless user experience
- **Mobile Friendly**: Works perfectly on all devices

### ✅ Admin Benefits
- **Score Logging**: All verification scores are logged
- **Email Notifications**: Admin emails include reCAPTCHA score
- **Analytics Dashboard**: Detailed insights in Google Console
- **Adaptive Learning**: System improves over time

## 🚀 Usage Flow

1. **User fills out form** with name, email, subject, and message
2. **User clicks submit** button
3. **reCAPTCHA v3 executes** invisibly in the background
4. **Token is generated** based on user behavior analysis
5. **Form submission** includes the reCAPTCHA token
6. **Backend verifies** the token and checks the score
7. **If score ≥ 0.5**: Emails are sent and user gets confirmation
8. **If score < 0.5**: Error message is returned to user

## 🔍 Monitoring

### Success Indicators
- ✅ reCAPTCHA v3 verification: PASSED (Score: X.XX) (in admin emails)
- ✅ Token validation successful
- ✅ Score above threshold
- ✅ IP address logged for security

### Error Handling
- ❌ Missing reCAPTCHA token
- ❌ Invalid or expired token
- ❌ Score below threshold
- ❌ Google API verification failed
- ❌ Network errors during verification

## 📊 Analytics

The reCAPTCHA v3 integration provides:
- **Score Distribution**: Histogram of verification scores
- **Action Analysis**: Performance by action type
- **Geographic Data**: Score distribution by location
- **Time-based Analysis**: Score trends over time
- **Bot Detection**: Automated vs human traffic patterns

## 🔐 Security Best Practices

1. **Score Threshold**: Start with 0.5, adjust based on your traffic
2. **Action Names**: Use descriptive action names for better analysis
3. **Token Validation**: Always verify tokens server-side
4. **IP Logging**: Track IP addresses for security monitoring
5. **Error Handling**: Provide appropriate error messages without exposing internals
6. **Monitoring**: Regularly check Google Admin Console for insights

## 🎯 Benefits

### For Users
- **Seamless Experience**: No interruptions or challenges
- **Fast**: No additional steps required
- **Trust**: Knows the form is protected against spam
- **Reliability**: Ensures messages are delivered

### For Admin
- **Better Conversion**: No friction for legitimate users
- **Advanced Protection**: Score-based adaptive system
- **Detailed Analytics**: Comprehensive insights in Google Console
- **Learning System**: Improves over time with more data
- **Quality Traffic**: Ensures only human users can submit messages

## 🔧 Configuration Options

### Score Thresholds
```javascript
// Conservative (more strict)
if (score < 0.7) { /* reject */ }

// Default (balanced)
if (score < 0.5) { /* reject */ }

// Liberal (less strict)
if (score < 0.3) { /* reject */ }
```

### Action Names
```javascript
// Different actions for different contexts
grecaptcha.execute(siteKey, { action: 'contact_submit' })
grecaptcha.execute(siteKey, { action: 'login_attempt' })
grecaptcha.execute(siteKey, { action: 'purchase_action' })
```

---

**Note**: reCAPTCHA v3 provides enterprise-level protection while maintaining the best possible user experience. The system learns from your traffic patterns and becomes more effective over time. 