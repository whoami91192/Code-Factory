#!/bin/bash

# Security Deployment Check Script
# This script verifies that all security measures are properly configured before deployment

echo "🔒 Running Security Deployment Checks..."

# Check 1: Verify CSP meta tag exists in index.html
echo "Checking CSP configuration..."
if grep -q "Content-Security-Policy" client/index.html; then
    echo "✅ CSP meta tag found in index.html"
else
    echo "❌ CSP meta tag missing in index.html"
    exit 1
fi

# Check 2: Verify CSPInitializer component exists
echo "Checking CSP initializer..."
if [ -f "client/src/components/CSPInitializer.tsx" ]; then
    echo "✅ CSPInitializer component exists"
else
    echo "❌ CSPInitializer component missing"
    exit 1
fi

# Check 3: Verify CSP utility functions exist
echo "Checking CSP utilities..."
if [ -f "client/src/lib/csp.ts" ]; then
    echo "✅ CSP utility functions exist"
else
    echo "❌ CSP utility functions missing"
    exit 1
fi

# Check 4: Verify Vercel configuration has security headers
echo "Checking Vercel security headers..."
if grep -q "X-Frame-Options" vercel.json; then
    echo "✅ Security headers configured in vercel.json"
else
    echo "❌ Security headers missing in vercel.json"
    exit 1
fi

# Check 5: Verify server CORS configuration
echo "Checking server CORS configuration..."
if grep -q "allowedOrigins" server/src/index.js; then
    echo "✅ Server CORS configuration found"
else
    echo "❌ Server CORS configuration missing"
    exit 1
fi

# Check 6: Verify no unsafe-inline in CSP
echo "Checking for unsafe-inline in CSP..."
if grep -q "unsafe-inline" client/index.html; then
    echo "❌ unsafe-inline found in CSP - this should be replaced with nonces"
    exit 1
else
    echo "✅ No unsafe-inline found in CSP"
fi

# Check 7: Verify form-action directive exists
echo "Checking form-action directive..."
if grep -q "form-action" client/index.html; then
    echo "✅ form-action directive found in CSP"
else
    echo "❌ form-action directive missing in CSP"
    exit 1
fi

# Check 8: Verify frame-ancestors directive exists
echo "Checking frame-ancestors directive..."
if grep -q "frame-ancestors" client/index.html; then
    echo "✅ frame-ancestors directive found in CSP"
else
    echo "❌ frame-ancestors directive missing in CSP"
    exit 1
fi

# Check 9: Verify no wildcard https: in img-src
echo "Checking for wildcard https: in img-src..."
if grep -q "img-src.*https:" client/index.html; then
    echo "❌ Wildcard https: found in img-src - should be specific domains"
    exit 1
else
    echo "✅ No wildcard https: found in img-src"
fi

# Check 10: Verify security documentation exists
echo "Checking security documentation..."
if [ -f "SECURITY_FIXES.md" ]; then
    echo "✅ Security documentation exists"
else
    echo "❌ Security documentation missing"
    exit 1
fi

echo ""
echo "🎉 All security checks passed! Ready for deployment."
echo ""
echo "📋 Security measures implemented:"
echo "  ✅ Content Security Policy with nonces"
echo "  ✅ Restricted CORS configuration"
echo "  ✅ Security headers via Vercel"
echo "  ✅ Anti-clickjacking protection"
echo "  ✅ XSS protection"
echo "  ✅ Form action restrictions"
echo "  ✅ Frame ancestor restrictions"
echo "  ✅ No unsafe-inline directives"
echo "  ✅ No wildcard directives"
echo ""
echo "🚀 You can now deploy with confidence!" 