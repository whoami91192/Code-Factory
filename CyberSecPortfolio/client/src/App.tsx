import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from './components/ui/toaster'
import Layout from './components/Layout'

import CookieConsent from './components/CookieConsent'
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

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for view source
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      // Prevent F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Prevent Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      // Prevent Ctrl+Shift+C (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
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
    </ThemeProvider>
  )
}

export default App 