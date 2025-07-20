# 🔧 reCAPTCHA Fix Guide

## 🚨 Problem: "ERROR for site owner: Invalid key type"

Το πρόβλημα είναι ότι τα κλειδιά που χρησιμοποιούμε είναι για λάθος τύπο reCAPTCHA.

## 🔧 Solution: Create New reCAPTCHA v2 Keys

### Step 1: Go to Google reCAPTCHA Admin Console
1. Επισκεφθείτε: https://www.google.com/recaptcha/admin
2. Συνδεθείτε με το Google account σας

### Step 2: Create New Site
1. Κάντε κλικ στο **"Create"** button
2. Συμπληρώστε τα πεδία:
   - **Label**: `CyberSec Portfolio Contact Form`
   - **reCAPTCHA type**: Επιλέξτε **"reCAPTCHA v2"**
   - **Subtype**: Επιλέξτε **"I'm not a robot" Checkbox**

### Step 3: Add Domains
1. Στο **"Domains"** section, προσθέστε:
   - `localhost` (για development)
   - `code-factory-gamma.vercel.app` (για production)
   - `*.vercel.app` (για Vercel previews)

### Step 4: Accept Terms
1. Επιλέξτε τα checkboxes για τους όρους
2. Κάντε κλικ στο **"Submit"**

### Step 5: Get Your Keys
Μετά την δημιουργία, θα λάβετε:

```
Site Key: 6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Secret Key: 6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔄 Update Configuration

### Frontend (Contact.tsx)
```typescript
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey="YOUR_NEW_SITE_KEY_HERE"
  onChange={handleCaptchaChange}
  theme="dark"
  size="normal"
  className="recaptcha-container"
/>
```

### Backend (contact.js)
```javascript
body: new URLSearchParams({
  secret: 'YOUR_NEW_SECRET_KEY_HERE',
  response: captchaToken,
  remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
})
```

## 🧪 Test the Fix

1. **Update the keys** στο Contact.tsx και contact.js
2. **Restart the development server**
3. **Test the form** - το reCAPTCHA θα πρέπει να εμφανίζεται σωστά
4. **Remove the test component** από το Contact.tsx

## 🔍 Common Issues

### Issue 1: "Invalid key type"
- **Cause**: Χρησιμοποιείτε v3 keys για v2 component
- **Solution**: Δημιουργήστε νέα v2 keys

### Issue 2: "Invalid domain"
- **Cause**: Το domain δεν είναι στο allowed list
- **Solution**: Προσθέστε το domain στο reCAPTCHA admin

### Issue 3: "Network error"
- **Cause**: Πρόβλημα με το network
- **Solution**: Ελέγξτε το internet connection

## 📋 Quick Checklist

- [ ] Δημιουργήσατε νέα reCAPTCHA v2 keys
- [ ] Ενημερώσατε το site key στο Contact.tsx
- [ ] Ενημερώσατε το secret key στο contact.js
- [ ] Προσθέσατε τα domains στο admin console
- [ ] Tested το form locally
- [ ] Tested το form στο production

## 🎯 Expected Result

Μετά το fix, το reCAPTCHA θα πρέπει να:
- ✅ Εμφανίζεται σωστά με dark theme
- ✅ Λειτουργεί με ένα click
- ✅ Επιστρέφει valid token
- ✅ Επιτρέπει την αποστολή του form

---

**Note**: Μην ξεχάσετε να αφαιρέσετε το `RecaptchaTest` component μετά το testing! 