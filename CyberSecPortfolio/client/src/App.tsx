import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ThemeProvider } from './contexts/ThemeContext'
import SpeedInsightsDebug from './components/SpeedInsightsDebug'
import { Toaster } from './components/ui/toaster'
import Layout from './components/Layout'
import MobileOptimizedLayout from './components/MobileOptimizedLayout'
import GoogleAnalytics from './components/GoogleAnalytics'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'
import CSPInitializer from './components/CSPInitializer'
import { runSecurityTests } from './utils/csp-test'
import CookieConsent from './components/CookieConsent'
import DeveloperToolsProtection from './components/DeveloperToolsProtection'

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Tools = lazy(() => import('./pages/Tools'))
const Contact = lazy(() => import('./pages/Contact'))
const RansomwareCalculator = lazy(() => import('./pages/RansomwareCalculator'))
const Terms = lazy(() => import('./pages/Terms'))
const Login = lazy(() => import('./pages/Login'))

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-green mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
)

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
                <Route path="/" element={<MobileOptimizedLayout />}>
                  <Route index element={
                    <Suspense fallback={<PageLoader />}>
                      <Home />
                    </Suspense>
                  } />
                  <Route path="about" element={
                    <Suspense fallback={<PageLoader />}>
                      <About />
                    </Suspense>
                  } />
                  <Route path="projects" element={
                    <Suspense fallback={<PageLoader />}>
                      <Projects />
                    </Suspense>
                  } />
                  <Route path="tools" element={
                    <Suspense fallback={<PageLoader />}>
                      <Tools />
                    </Suspense>
                  } />
                  <Route path="contact" element={
                    <Suspense fallback={<PageLoader />}>
                      <Contact />
                    </Suspense>
                  } />
                  <Route path="ransomware-calculator" element={
                    <Suspense fallback={<PageLoader />}>
                      <RansomwareCalculator />
                    </Suspense>
                  } />
                  <Route path="terms" element={
                    <Suspense fallback={<PageLoader />}>
                      <Terms />
                    </Suspense>
                  } />
                  <Route path="login" element={
                    <Suspense fallback={<PageLoader />}>
                      <Login />
                    </Suspense>
                  } />
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