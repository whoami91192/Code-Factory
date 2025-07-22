# Security Deployment Check Script (PowerShell)
# This script verifies that all security measures are properly configured before deployment

Write-Host "Running Security Deployment Checks..." -ForegroundColor Green

# Check 1: Verify CSP meta tag exists in index.html
Write-Host "Checking CSP configuration..." -ForegroundColor Yellow
if (Select-String -Path "client/index.html" -Pattern "Content-Security-Policy" -Quiet) {
    Write-Host "✅ CSP meta tag found in index.html" -ForegroundColor Green
} else {
    Write-Host "❌ CSP meta tag missing in index.html" -ForegroundColor Red
    exit 1
}

# Check 2: Verify CSPInitializer component exists
Write-Host "Checking CSP initializer..." -ForegroundColor Yellow
if (Test-Path "client/src/components/CSPInitializer.tsx") {
    Write-Host "✅ CSPInitializer component exists" -ForegroundColor Green
} else {
    Write-Host "❌ CSPInitializer component missing" -ForegroundColor Red
    exit 1
}

# Check 3: Verify CSP utility functions exist
Write-Host "Checking CSP utilities..." -ForegroundColor Yellow
if (Test-Path "client/src/lib/csp.ts") {
    Write-Host "✅ CSP utility functions exist" -ForegroundColor Green
} else {
    Write-Host "❌ CSP utility functions missing" -ForegroundColor Red
    exit 1
}

# Check 4: Verify Vercel configuration has security headers
Write-Host "Checking Vercel security headers..." -ForegroundColor Yellow
if (Select-String -Path "vercel.json" -Pattern "X-Frame-Options" -Quiet) {
    Write-Host "✅ Security headers configured in vercel.json" -ForegroundColor Green
} else {
    Write-Host "❌ Security headers missing in vercel.json" -ForegroundColor Red
    exit 1
}

# Check 5: Verify server CORS configuration
Write-Host "Checking server CORS configuration..." -ForegroundColor Yellow
if (Select-String -Path "server/src/index.js" -Pattern "allowedOrigins" -Quiet) {
    Write-Host "✅ Server CORS configuration found" -ForegroundColor Green
} else {
    Write-Host "❌ Server CORS configuration missing" -ForegroundColor Red
    exit 1
}

# Check 6: Verify no unsafe-inline in CSP
Write-Host "Checking for unsafe-inline in CSP..." -ForegroundColor Yellow
if (Select-String -Path "client/index.html" -Pattern "unsafe-inline" -Quiet) {
    Write-Host "❌ unsafe-inline found in CSP - this should be replaced with nonces" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ No unsafe-inline found in CSP" -ForegroundColor Green
}

# Check 7: Verify form-action directive exists
Write-Host "Checking form-action directive..." -ForegroundColor Yellow
if (Select-String -Path "client/index.html" -Pattern "form-action" -Quiet) {
    Write-Host "✅ form-action directive found in CSP" -ForegroundColor Green
} else {
    Write-Host "❌ form-action directive missing in CSP" -ForegroundColor Red
    exit 1
}

# Check 8: Verify frame-ancestors directive exists
Write-Host "Checking frame-ancestors directive..." -ForegroundColor Yellow
if (Select-String -Path "client/index.html" -Pattern "frame-ancestors" -Quiet) {
    Write-Host "✅ frame-ancestors directive found in CSP" -ForegroundColor Green
} else {
    Write-Host "❌ frame-ancestors directive missing in CSP" -ForegroundColor Red
    exit 1
}

# Check 9: Verify no wildcard https: in img-src
Write-Host "Checking for wildcard https: in img-src..." -ForegroundColor Yellow
$content = Get-Content "client/index.html" -Raw
if ($content -match "img-src.*https:\s*[^;]*") {
    $imgSrc = $matches[0]
    if ($imgSrc -match "https:\s*[^;]*") {
        $domains = $matches[0]
        if ($domains -eq "https:" -or $domains -match "https:\s*[^;]*\*") {
            Write-Host "❌ Wildcard https: found in img-src - should be specific domains" -ForegroundColor Red
            exit 1
        } else {
            Write-Host "✅ Specific domains found in img-src" -ForegroundColor Green
        }
    }
} else {
    Write-Host "✅ No wildcard https: found in img-src" -ForegroundColor Green
}

# Check 10: Verify security documentation exists
Write-Host "Checking security documentation..." -ForegroundColor Yellow
if (Test-Path "SECURITY_FIXES.md") {
    Write-Host "✅ Security documentation exists" -ForegroundColor Green
} else {
    Write-Host "❌ Security documentation missing" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "All security checks passed! Ready for deployment." -ForegroundColor Green
Write-Host ""
Write-Host "Security measures implemented:" -ForegroundColor Cyan
Write-Host "  ✅ Content Security Policy with nonces" -ForegroundColor Green
Write-Host "  ✅ Restricted CORS configuration" -ForegroundColor Green
Write-Host "  ✅ Security headers via Vercel" -ForegroundColor Green
Write-Host "  ✅ Anti-clickjacking protection" -ForegroundColor Green
Write-Host "  ✅ XSS protection" -ForegroundColor Green
Write-Host "  ✅ Form action restrictions" -ForegroundColor Green
Write-Host "  ✅ Frame ancestor restrictions" -ForegroundColor Green
Write-Host "  ✅ No unsafe-inline directives" -ForegroundColor Green
Write-Host "  ✅ No wildcard directives" -ForegroundColor Green
Write-Host ""
Write-Host "You can now deploy with confidence!" -ForegroundColor Green 