import { useEffect } from 'react';
import { generateNonce, updateCSPNonce } from '../lib/csp';

const CSPInitializer: React.FC = () => {
  useEffect(() => {
    // Generate a new nonce for this session
    const nonce = generateNonce();
    
    // Update the CSP meta tag with the new nonce
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (cspMeta) {
      const content = cspMeta.getAttribute('content') || '';
      const updatedContent = content.replace(/REPLACE_WITH_NONCE/g, nonce);
      cspMeta.setAttribute('content', updatedContent);
    }
    
    // Store nonce in session storage for use by other components
    sessionStorage.setItem('csp-nonce', nonce);
    
    // Add nonce to any existing script or style tags
    const scripts = document.querySelectorAll('script:not([src])');
    const styles = document.querySelectorAll('style');
    
    scripts.forEach(script => {
      if (!script.hasAttribute('nonce')) {
        script.setAttribute('nonce', nonce);
      }
    });
    
    styles.forEach(style => {
      if (!style.hasAttribute('nonce')) {
        style.setAttribute('nonce', nonce);
      }
    });
  }, []);

  return null; // This component doesn't render anything
};

export default CSPInitializer; 