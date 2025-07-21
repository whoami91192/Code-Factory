# reCAPTCHA v3 Implementation Guide

## Overview

This project now includes Google reCAPTCHA v3 for enhanced security on the contact form. reCAPTCHA v3 provides continuous monitoring and scoring of user interactions without interrupting the user experience.

## Implementation Details

### 1. Frontend Integration

#### HTML Setup
- Added reCAPTCHA v3 script to `client/index.html`
- Updated Content Security Policy to allow Google domains
- Site Key: `6LcLUIkrAAAAEHbhqGdvIi6YPy93ghOu1BO0N0E`

#### React Hook (`useRecaptcha.ts`)
- Custom hook for managing reCAPTCHA v3 token generation
- Handles loading states and error management
- Provides `executeRecaptcha` function for token generation

#### Contact Form Integration
- Added reCAPTCHA token generation before form submission
- Security indicators and loading states
- Error handling for reCAPTCHA failures

### 2. Backend Verification

#### API Endpoint (`api/contact.js`)
- Validates reCAPTCHA tokens with Google's verify API
- Uses secret key from environment variables
- Implements score-based filtering (threshold: 0.1)
- Fallback for development mode

### 3. Security Features

- **Score-based filtering**: Users with low scores (indicating bot behavior) are rejected
- **Environment-based configuration**: Secret keys stored securely in Vercel environment
- **Rate limiting**: Existing rate limiting enhanced with reCAPTCHA
- **Development mode**: Optional reCAPTCHA skipping for development

## Vercel Environment Setup

### Required Environment Variables

Add these in your Vercel dashboard under Settings > Environment Variables:

```bash
# reCAPTCHA Secret Key
RECAPTCHA_SECRET_KEY=6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1

# Optional: Skip reCAPTCHA in development
SKIP_RECAPTCHA=false
```

### Vercel CLI Setup (Alternative)

```bash
# Add secret key to Vercel
vercel secrets add recaptcha-secret-key 6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1

# Deploy with environment variables
vercel --prod
```

## Google reCAPTCHA Configuration

### Site Settings
1. Visit [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)
2. Verify your site configuration:
   - **Site Key**: `6LcLUIkrAAAAEHbhqGdvIi6YPy93ghOu1BO0N0E`
   - **Secret Key**: `6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1`
   - **Type**: reCAPTCHA v3
   - **Domains**: 
     - `code-factory-gamma.vercel.app`
     - `localhost` (for development)

### Security Settings
- **Score Threshold**: 0.1 (very permissive for testing)
- **Actions**: `contact_form`
- **Challenge**: Never (v3 doesn't use challenges)

## Testing the Implementation

### 1. Development Testing

```bash
cd client
npm run dev
```

1. Navigate to the contact form
2. Check browser console for reCAPTCHA logs
3. Verify "Protected by reCAPTCHA v3" indicator appears
4. Submit a test message

### 2. Production Testing

1. Deploy to Vercel
2. Test with various user behaviors
3. Monitor score distributions in server logs
4. Adjust threshold if needed

### 3. Debugging

#### Frontend Debugging
```javascript
// Check if reCAPTCHA is loaded
console.log('reCAPTCHA available:', !!window.grecaptcha);

// Check site key
console.log('Site key configured:', RECAPTCHA_SITE_KEY);
```

#### Backend Debugging
```javascript
// Enable detailed reCAPTCHA logging
console.log('reCAPTCHA verification result:', {
  success: recaptchaResult.success,
  score: recaptchaResult.score,
  action: recaptchaResult.action,
  hostname: recaptchaResult.hostname,
  errors: recaptchaResult['error-codes']
});
```

## Security Best Practices

### 1. Score Thresholds
- **0.9-1.0**: Very likely human
- **0.7-0.8**: Likely human
- **0.3-0.6**: Suspicious (investigate)
- **0.0-0.2**: Very likely bot

### 2. Production Recommendations
- Set threshold to 0.5 for production
- Monitor score distributions
- Implement adaptive thresholds
- Add secondary verification for borderline scores

### 3. Error Handling
- Graceful degradation when reCAPTCHA fails
- Clear user feedback for security errors
- Fallback mechanisms for accessibility

## Troubleshooting

### Common Issues

1. **"reCAPTCHA not loaded"**
   - Check CSP headers
   - Verify script inclusion
   - Check network connectivity
   - Use `debug-recaptcha.html` to test independently

2. **"Invalid site key"**
   - Verify domain configuration
   - Check environment variables
   - Confirm key format

3. **Low scores for legitimate users**
   - Lower threshold temporarily
   - Check user behavior patterns
   - Consider browser/device factors

4. **High false positive rate**
   - Adjust threshold upward
   - Implement manual review process
   - Add user feedback mechanism

5. **"reCAPTCHA v3 verification: NOT VERIFIED" in production**
   - Check if frontend is generating tokens properly
   - Verify reCAPTCHA script is loading
   - Use browser dev tools to inspect network requests
   - Check console logs for reCAPTCHA errors
   - Test with `debug-recaptcha.html` file

### Debugging Steps

1. **Check reCAPTCHA Loading:**
   ```javascript
   // In browser console
   console.log('grecaptcha available:', typeof grecaptcha !== 'undefined');
   console.log('ready function:', typeof grecaptcha?.ready);
   console.log('execute function:', typeof grecaptcha?.execute);
   ```

2. **Test Token Generation:**
   ```javascript
   // In browser console (after reCAPTCHA loads)
   grecaptcha.ready(() => {
     grecaptcha.execute('6LcLUIkrAAAAEHbhqGdvIi6YPy93ghOu1BO0N0E', {action: 'test'})
       .then(token => console.log('Token generated:', token))
       .catch(error => console.error('Token generation failed:', error));
   });
   ```

3. **Use Debug File:**
   - Open `debug-recaptcha.html` in your browser
   - Check status and generate tokens
   - Test API integration directly

### Debug Commands

```bash
# Check Vercel environment
vercel env ls

# View deployment logs
vercel logs --follow

# Test API endpoint directly
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message","captchaToken":"test_token"}'
```

## Monitoring and Analytics

### 1. Score Distribution
Monitor reCAPTCHA scores to understand your traffic:
- Track average scores
- Identify unusual patterns
- Adjust thresholds based on data

### 2. Success Rates
- Monitor form submission success rates
- Track reCAPTCHA failure rates
- Alert on unusual patterns

### 3. User Experience
- Monitor form abandonment rates
- Track user feedback on security measures
- A/B test threshold values

## Future Enhancements

1. **Adaptive Thresholds**: Automatically adjust based on traffic patterns
2. **Machine Learning**: Use additional signals for bot detection
3. **Behavioral Analysis**: Implement mouse/keyboard pattern analysis
4. **Multi-factor**: Combine with other security measures
5. **Analytics Dashboard**: Real-time monitoring of security metrics

## Support and Maintenance

- Review Google reCAPTCHA documentation regularly
- Monitor for API changes
- Update thresholds based on performance data
- Regular security audits and testing

---

**Note**: This implementation prioritizes security while maintaining a smooth user experience. The invisible nature of reCAPTCHA v3 ensures legitimate users are not interrupted while bots are effectively filtered out. 