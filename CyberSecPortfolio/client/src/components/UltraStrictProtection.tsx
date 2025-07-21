import { useEffect, useState } from 'react';

interface UltraStrictProtectionProps {
  children: React.ReactNode;
}

// Extend Window interface for browser-specific properties
declare global {
  interface Window {
    chrome?: {
      webstore?: any;
    };
    safari?: {
      pushNotification?: any;
    };
  }
  
  interface Console {
    firebug?: any;
    exception?: any;
  }
}

const UltraStrictProtection: React.FC<UltraStrictProtectionProps> = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [violationCount, setViolationCount] = useState(0);

  useEffect(() => {
    // Ultra-aggressive protection system
    let detectionInterval: NodeJS.Timeout;
    let lastCheck = Date.now();

    // Function to completely block access
    const blockAccess = () => {
      setIsBlocked(true);
      setViolationCount(prev => prev + 1);
      
      // Redirect to blank page after 5 seconds
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 5000);
    };

    // Ultra-sensitive detection
    const ultraDetection = () => {
      const now = Date.now();
      
      // Check window dimensions every 100ms
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      
      // Ultra-sensitive thresholds
      if (widthDiff > 50 || heightDiff > 50) {
        blockAccess();
        return;
      }
      
      // Check for console access
      try {
        const start = performance.now();
        console.log('%c', 'color: transparent');
        const end = performance.now();
        
        if (end - start > 20) { // Very sensitive timing
          blockAccess();
          return;
        }
      } catch (e) {
        // Console might be blocked, continue checking
      }
      
      // Check for debugger
      try {
        const start = performance.now();
        debugger;
        const end = performance.now();
        
        if (end - start > 20) {
          blockAccess();
          return;
        }
      } catch (e) {
        // Debugger might be blocked
      }
      
      // Check for Firebug
      if (window.console && (window.console.firebug || window.console.exception)) {
        blockAccess();
        return;
      }
      
      // Check for Chrome DevTools
      if (window.chrome && window.chrome.webstore) {
        blockAccess();
        return;
      }
      
      // Check for Safari DevTools
      if (window.safari && window.safari.pushNotification) {
        blockAccess();
        return;
      }
      
      // Check for element inspection
      const testElement = document.createElement('div');
      testElement.style.position = 'absolute';
      testElement.style.top = '-9999px';
      testElement.style.left = '-9999px';
      testElement.style.width = '100px';
      testElement.style.height = '100px';
      testElement.style.overflow = 'scroll';
      document.body.appendChild(testElement);
      
      const scrollWidth = testElement.offsetWidth - testElement.clientWidth;
      const scrollHeight = testElement.offsetHeight - testElement.clientHeight;
      
      document.body.removeChild(testElement);
      
      if (scrollWidth > 0 || scrollHeight > 0) {
        blockAccess();
        return;
      }
      
      // Check for performance timing anomalies
      if (performance.now() - lastCheck > 200) {
        // Suspicious timing gap
        setViolationCount(prev => prev + 1);
        if (violationCount > 3) {
          blockAccess();
        }
      }
      
      lastCheck = performance.now();
    };

    // Block all keyboard events
    const blockAllKeys = (e: KeyboardEvent) => {
      // Block ALL function keys
      if (e.key.startsWith('F')) {
        e.preventDefault();
        e.stopPropagation();
        blockAccess();
        return false;
      }
      
      // Block ALL modifier key combinations
      if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        blockAccess();
        return false;
      }
      
      // Block specific developer tools keys
      const blockedKeys = ['F12', 'F5', 'F11', 'F9', 'F8', 'F7', 'I', 'J', 'C', 'U', 'S', 'R', 'D'];
      if (blockedKeys.includes(e.key.toUpperCase())) {
        e.preventDefault();
        e.stopPropagation();
        blockAccess();
        return false;
      }
    };

    // Block all mouse events
    const blockAllMouse = (e: MouseEvent) => {
      if (e.button === 2) { // Right click
        e.preventDefault();
        e.stopPropagation();
        blockAccess();
        return false;
      }
      
      // Block middle click
      if (e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
        blockAccess();
        return false;
      }
    };

    // Block all context menus
    const blockContextMenu = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      blockAccess();
      return false;
    };

    // Block all copy/paste
    const blockClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      blockAccess();
      return false;
    };

    // Block all drag and drop
    const blockDrag = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      blockAccess();
      return false;
    };

    // Block all wheel events with modifiers
    const blockWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.shiftKey || e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        blockAccess();
        return false;
      }
    };

    // Block all text selection
    const blockSelection = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Add all event listeners with capture phase
    document.addEventListener('keydown', blockAllKeys, true);
    document.addEventListener('keyup', blockAllKeys, true);
    document.addEventListener('keypress', blockAllKeys, true);
    document.addEventListener('mousedown', blockAllMouse, true);
    document.addEventListener('mouseup', blockAllMouse, true);
    document.addEventListener('click', blockAllMouse, true);
    document.addEventListener('contextmenu', blockContextMenu, true);
    document.addEventListener('copy', blockClipboard, true);
    document.addEventListener('paste', blockClipboard, true);
    document.addEventListener('cut', blockClipboard, true);
    document.addEventListener('dragstart', blockDrag, true);
    document.addEventListener('dragend', blockDrag, true);
    document.addEventListener('wheel', blockWheel, true);
    document.addEventListener('selectstart', blockSelection, true);
    document.addEventListener('select', blockSelection, true);

    // Run ultra-detection every 100ms
    detectionInterval = setInterval(ultraDetection, 100);

    // Block access on page load if suspicious
    window.addEventListener('load', () => {
      setTimeout(ultraDetection, 1000);
    });

    // Block access on beforeunload if dev tools are open
    window.addEventListener('beforeunload', (e) => {
      if (violationCount > 0) {
        e.preventDefault();
        e.returnValue = 'Security violation detected. Access blocked.';
        return e.returnValue;
      }
    });

    // Cleanup
    return () => {
      clearInterval(detectionInterval);
      document.removeEventListener('keydown', blockAllKeys, true);
      document.removeEventListener('keyup', blockAllKeys, true);
      document.removeEventListener('keypress', blockAllKeys, true);
      document.removeEventListener('mousedown', blockAllMouse, true);
      document.removeEventListener('mouseup', blockAllMouse, true);
      document.removeEventListener('click', blockAllMouse, true);
      document.removeEventListener('contextmenu', blockContextMenu, true);
      document.removeEventListener('copy', blockClipboard, true);
      document.removeEventListener('paste', blockClipboard, true);
      document.removeEventListener('cut', blockClipboard, true);
      document.removeEventListener('dragstart', blockDrag, true);
      document.removeEventListener('dragend', blockDrag, true);
      document.removeEventListener('wheel', blockWheel, true);
      document.removeEventListener('selectstart', blockSelection, true);
      document.removeEventListener('select', blockSelection, true);
    };
  }, [violationCount]);

  if (isBlocked) {
    return (
      <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
        <div className="bg-black border-4 border-red-600 rounded-lg p-12 max-w-2xl mx-auto text-center">
          <div className="text-red-500 text-9xl mb-8">🚫</div>
          <h1 className="text-red-500 text-4xl font-bold mb-8 text-shadow-lg">
            ACCESS PERMANENTLY BLOCKED
          </h1>
          <p className="text-white text-xl mb-8">
            <strong>CRITICAL SECURITY VIOLATION DETECTED</strong><br/>
            Multiple attempts to access developer tools or automation tools detected.
          </p>
          <div className="bg-red-900 p-6 rounded-lg mb-8">
            <p className="text-red-200 text-lg">
              Violations: {violationCount} security breaches<br/>
              Blocked: {new Date().toLocaleString()}<br/>
              IP: [REDACTED] | User Agent: [REDACTED]
            </p>
          </div>
          <div className="text-red-400 text-lg mb-8">
            This incident has been logged and reported to security systems.
          </div>
          <button
            onClick={() => window.location.href = 'about:blank'}
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg font-bold text-xl transition-colors"
          >
            FORCED EXIT
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default UltraStrictProtection; 