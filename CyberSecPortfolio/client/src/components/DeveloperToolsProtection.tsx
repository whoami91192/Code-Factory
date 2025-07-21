import { useEffect, useState } from 'react';

interface DeveloperToolsProtectionProps {
  children: React.ReactNode;
}

// Extend Window interface to include Firebug
declare global {
  interface Window {
    Firebug?: {
      chrome?: {
        isInitialized?: boolean;
      };
    };
  }
}

const DeveloperToolsProtection: React.FC<DeveloperToolsProtectionProps> = ({ children }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    let devtools = {
      open: false,
      orientation: null as string | null
    };

    const threshold = 80; // Much more sensitive threshold

    const emitEvent = (isOpen: boolean, orientation?: string) => {
      window.dispatchEvent(new CustomEvent('devtoolschange', {
        detail: {
          isOpen,
          orientation
        }
      }));
    };

    const main = ({emitEvents = true} = {}) => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      const orientation = widthThreshold ? 'vertical' : 'horizontal';

      if (
        !(heightThreshold && widthThreshold) &&
        ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
      ) {
        if ((!devtools.open || devtools.orientation !== orientation) && emitEvents) {
          emitEvent(true, orientation);
        }

        devtools.open = true;
        devtools.orientation = orientation;
      } else {
        if (devtools.open && emitEvents) {
          emitEvent(false, undefined);
        }

        devtools.open = false;
        devtools.orientation = null;
      }
    };

    main({emitEvents: true});
    setInterval(main, 500);

    // Additional detection methods
    const detectDevTools = () => {
      // Method 1: Console.log timing
      const start = performance.now();
      console.log('%c', 'color: transparent');
      const end = performance.now();
      
      if (end - start > 100) {
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
      }

      // Method 2: Debugger detection
      const debuggerCheck = () => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) {
          setShowWarning(true);
          setWarningCount(prev => prev + 1);
        }
      };

      // Method 3: Element size detection
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.top = '-9999px';
      element.style.left = '-9999px';
      element.style.width = '100px';
      element.style.height = '100px';
      element.style.overflow = 'scroll';
      document.body.appendChild(element);
      
      const scrollWidth = element.offsetWidth - element.clientWidth;
      const scrollHeight = element.offsetHeight - element.clientHeight;
      
      document.body.removeChild(element);
      
      if (scrollWidth > 0 || scrollHeight > 0) {
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
      }
    };

    // Listen for devtools events
    window.addEventListener('devtoolschange', (e: any) => {
      if (e.detail.isOpen) {
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
      }
    });

    // Ultra-aggressive keyboard detection
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block ALL function keys
      if (e.key.startsWith('F') && e.key.length <= 3) {
        e.preventDefault();
        e.stopPropagation();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Block ALL Ctrl combinations
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Block ALL Shift combinations
      if (e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Block ALL Alt combinations
      if (e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Block specific developer tools keys
      const blockedKeys = ['F12', 'F5', 'F11', 'F9', 'F8', 'F7', 'I', 'J', 'C', 'U', 'S', 'R'];
      if (blockedKeys.includes(e.key.toUpperCase())) {
        e.preventDefault();
        e.stopPropagation();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
    };

    // Ultra-aggressive mouse protection
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowWarning(true);
      setWarningCount(prev => prev + 1);
      return false;
    };
    
    // Block all mouse events that could be used for inspection
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2) { // Right click
        e.preventDefault();
        e.stopPropagation();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
    };
    
    // Block wheel events with Ctrl (zoom)
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
    };
    
    // Block copy/paste
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowWarning(true);
      setWarningCount(prev => prev + 1);
      return false;
    };
    
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowWarning(true);
      setWarningCount(prev => prev + 1);
      return false;
    };
    
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowWarning(true);
      setWarningCount(prev => prev + 1);
      return false;
    };

    // Add all event listeners with capture phase
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('wheel', handleWheel, true);
    document.addEventListener('copy', handleCopy, true);
    document.addEventListener('paste', handlePaste, true);
    document.addEventListener('cut', handleCut, true);
    
    // Run detection more frequently
    const detectionInterval = setInterval(detectDevTools, 300);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('mousedown', handleMouseDown, true);
      document.removeEventListener('wheel', handleWheel, true);
      document.removeEventListener('copy', handleCopy, true);
      document.removeEventListener('paste', handlePaste, true);
      document.removeEventListener('cut', handleCut, true);
      clearInterval(detectionInterval);
    };
  }, []);

  const handleCloseWarning = () => {
    setShowWarning(false);
    // Reset warning count after successful close
    if (warningCount > 5) {
      setWarningCount(0);
    }
  };

  const handleContinueAnyway = () => {
    setShowWarning(false);
    // Increment warning count for continued violations
    setWarningCount(prev => prev + 1);
    
    // Block access after too many violations
    if (warningCount > 10) {
      setIsBlocked(true);
    }
  };

  if (isBlocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center p-4">
        <div className="bg-black border-4 border-red-600 rounded-lg p-8 max-w-lg mx-auto text-center shadow-2xl">
          <div className="text-red-500 text-8xl mb-6">🚫</div>
          <h1 className="text-red-500 text-3xl font-bold mb-6 text-shadow-lg">
            ACCESS BLOCKED
          </h1>
          <p className="text-white text-lg mb-6">
            <strong>PERMANENT ACCESS RESTRICTION</strong><br/>
            Multiple security violations detected. Access to this website has been permanently blocked.
          </p>
          <div className="bg-red-900 p-4 rounded-lg mb-6">
            <p className="text-red-200 text-sm">
              Violations: {warningCount} attempts to access developer tools<br/>
              Blocked: {new Date().toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => window.location.href = 'about:blank'}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors"
          >
            EXIT SITE
          </button>
        </div>
      </div>
    );
  }

  if (showWarning) {
    const warningLevel = warningCount > 5 ? 'CRITICAL' : warningCount > 2 ? 'WARNING' : 'NOTICE';
    const warningColor = warningCount > 5 ? 'red' : warningCount > 2 ? 'orange' : 'yellow';
    
    return (
      <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center p-4">
        <div className={`bg-black border-4 border-${warningColor}-500 rounded-lg p-8 max-w-2xl mx-auto text-center shadow-2xl animate-pulse`}>
          <div className={`text-${warningColor}-500 text-8xl mb-6`}>🚨</div>
          <h1 className={`text-${warningColor}-500 text-3xl font-bold mb-6 text-shadow-lg`}>
            {warningLevel} - DEVELOPER TOOLS DETECTED
          </h1>
          <p className="text-white text-lg mb-6">
            <strong>SECURITY VIOLATION DETECTED!</strong><br/>
            The use of developer tools, automation bots, or inspection tools is <strong>STRICTLY FORBIDDEN</strong>.
          </p>
          <div className="bg-gray-900 p-6 rounded-lg mb-6 border-l-4 border-red-500">
            <h3 className={`text-${warningColor}-400 text-xl font-bold mb-4`}>BLOCKED ACTIVITIES:</h3>
            <ul className="text-gray-300 text-left space-y-2">
              <li>🔒 Browser Developer Tools (F12)</li>
              <li>🔒 View Source (Ctrl+U)</li>
              <li>🔒 Inspect Element (Ctrl+Shift+I)</li>
              <li>🔒 Console Access (Ctrl+Shift+J)</li>
              <li>🔒 Automation Scripts & Bots</li>
              <li>🔒 Debugging Tools</li>
              <li>🔒 Network Inspection</li>
              <li>🔒 Code Analysis Tools</li>
            </ul>
          </div>
          <div className="text-red-400 text-lg mb-6">
            <strong>Warning #{warningCount}</strong> - Repeated violations will result in permanent access restrictions.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCloseWarning}
              className={`bg-${warningColor}-600 hover:bg-${warningColor}-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105`}
            >
              🔒 CLOSE TOOLS & CONTINUE
            </button>
            <button
              onClick={handleContinueAnyway}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 border-2 border-red-500"
            >
              ⚠️ CONTINUE ANYWAY
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DeveloperToolsProtection; 