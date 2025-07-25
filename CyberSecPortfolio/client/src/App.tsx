import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ThemeProvider } from './contexts/ThemeContext'
import SpeedInsightsDebug from './components/SpeedInsightsDebug'
import { Toaster } from './components/ui/toaster'
import Layout from './components/Layout'
import GoogleAnalytics from './components/GoogleAnalytics'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'
import CSPInitializer from './components/CSPInitializer'
import { runSecurityTests } from './utils/csp-test'


import CookieConsent from './components/CookieConsent'
import DeveloperToolsProtection from './components/DeveloperToolsProtection'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Tools from './pages/Tools'
import Contact from './pages/Contact'
import RansomwareCalculator from './pages/RansomwareCalculator'
import Terms from './pages/Terms'
import Login from './pages/Login'

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    // Check if user has made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted' || cookieConsent === 'declined') {
      setCookiesAccepted(true);
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('selectstart', handleSelectStart);

    // Cleanup
    return () => {
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  // Run security tests in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        runSecurityTests();
      }, 3000); // Wait for CSP to initialize
    }
  }, []);

  const handleCookieAccept = () => {
    setCookiesAccepted(true);
  };

  const handleCookieDecline = () => {
    // Allow entry but with limited cookies
    setCookiesAccepted(true);
  };



  return (
    <ThemeProvider>
      <DeveloperToolsProtection>
        <CSPInitializer />
        <div className="min-h-screen bg-background text-foreground">
          {cookiesAccepted ? (
            <>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="tools" element={<Tools />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="ransomware-calculator" element={<RansomwareCalculator />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="login" element={<Login />} />
                </Route>
              </Routes>
              <Toaster />
              {/* Only show Analytics if cookies were accepted */}
              {localStorage.getItem('cookieConsent') === 'accepted' && (
                <>
                  <Analytics />
                  <GoogleAnalytics />
                </>
              )}
              {/* Speed Insights - Always load for performance monitoring */}
              <SpeedInsights />
              {/* Speed Insights Debug Component */}
              <SpeedInsightsDebug />
              {/* Service Worker Registration for PWA */}
              <ServiceWorkerRegistration />
            </>
          ) : (
            <CookieConsent onAccept={handleCookieAccept} onDecline={handleCookieDecline} />
          )}
        </div>
      </DeveloperToolsProtection>
    </ThemeProvider>
  )
}

export default App 