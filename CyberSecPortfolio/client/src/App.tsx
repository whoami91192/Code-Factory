import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from './components/ui/toaster'
import Layout from './components/Layout'

import CookieConsent from './components/CookieConsent'
import DeveloperToolsProtection from './components/DeveloperToolsProtection'
import UltraStrictProtection from './components/UltraStrictProtection'
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
    // Check if cookies are accepted
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted') {
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

  const handleCookieAccept = () => {
    setCookiesAccepted(true);
  };

  const handleCookieDecline = () => {
    // Redirect to a blank page or show message
    window.location.href = 'about:blank';
  };

  return (
    <ThemeProvider>
      <UltraStrictProtection>
        <DeveloperToolsProtection>
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
              </>
            ) : (
              <CookieConsent onAccept={handleCookieAccept} onDecline={handleCookieDecline} />
            )}
          </div>
        </DeveloperToolsProtection>
      </UltraStrictProtection>
    </ThemeProvider>
  )
}

export default App 