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

  useEffect(() => {
    let devtools = {
      open: false,
      orientation: null as string | null
    };

    const threshold = 160;

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

    // Enhanced keyboard detection
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Ctrl+Shift+I (Chrome/Firefox)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Ctrl+Shift+J (Chrome)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Ctrl+Shift+C (Chrome)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
      
      // Ctrl+Shift+U (Firefox)
      if (e.ctrlKey && e.shiftKey && e.key === 'U') {
        e.preventDefault();
        setShowWarning(true);
        setWarningCount(prev => prev + 1);
        return false;
      }
    };

    // Right-click detection
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowWarning(true);
      setWarningCount(prev => prev + 1);
      return false;
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Run detection periodically
    const detectionInterval = setInterval(detectDevTools, 1000);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      clearInterval(detectionInterval);
    };
  }, []);

  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  const handleContinueAnyway = () => {
    setShowWarning(false);
    // You could implement additional tracking here
  };

  if (showWarning) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4">
        <div className="bg-red-900 border-2 border-red-500 rounded-lg p-8 max-w-md mx-auto text-center shadow-2xl">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-red-100 text-2xl font-bold mb-4">
            Developer Tools Detected
          </h2>
          <p className="text-red-200 mb-6">
            The use of developer tools, automation bots, or inspection tools is restricted on this website for security reasons.
          </p>
          <div className="text-red-300 text-sm mb-6">
            <p>This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Browser Developer Tools (F12)</li>
              <li>View Source (Ctrl+U)</li>
              <li>Inspect Element</li>
              <li>Automation scripts</li>
              <li>Debugging tools</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCloseWarning}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Close Tools & Continue
            </button>
            <button
              onClick={handleContinueAnyway}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Continue Anyway
            </button>
          </div>
          {warningCount > 1 && (
            <p className="text-red-400 text-xs mt-4">
              Warning #{warningCount} - Repeated violations may result in access restrictions.
            </p>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DeveloperToolsProtection; 