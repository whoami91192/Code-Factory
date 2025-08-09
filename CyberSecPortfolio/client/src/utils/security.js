(function() {
  'use strict';
  
  // Mobile browser detection
  function isMobileBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    return isMobile || isSafari || isIOS;
  }
  
  // Skip protection on mobile browsers
  if (isMobileBrowser()) {
    return;
  }
  
  // Enhanced developer tools detection
  let devtools = {
    open: false,
    orientation: null
  };
  
  const threshold = 200; // Increased threshold
  
  const emitEvent = (isOpen, orientation) => {
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
      (widthThreshold || heightThreshold)
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
  
  // Keyboard shortcuts detection (desktop only)
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      showDevToolsWarning();
      return false;
    }
    
    // Ctrl+Shift+I (Chrome/Firefox)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      showDevToolsWarning();
      return false;
    }
    
    // Ctrl+Shift+J (Chrome)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      showDevToolsWarning();
      return false;
    }
    
    // Ctrl+Shift+C (Chrome)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      showDevToolsWarning();
      return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      showDevToolsWarning();
      return false;
    }
    
    // Ctrl+Shift+U (Firefox)
    if (e.ctrlKey && e.shiftKey && e.key === 'U') {
      e.preventDefault();
      showDevToolsWarning();
      return false;
    }
  });
  
  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Right-click detection (desktop only)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showDevToolsWarning();
    return false;
  });
  
  // Show warning message
  function showDevToolsWarning() {
    if (document.getElementById('devtools-warning')) return;
    
    const warning = document.createElement('div');
    warning.id = 'devtools-warning';
    warning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.95);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      color: white;
    `;
    
    warning.innerHTML = `
      <div style="
        background: #1a1a1a;
        border: 2px solid #ff4444;
        border-radius: 10px;
        padding: 30px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 0 30px rgba(255, 68, 68, 0.3);
      ">
        <h2 style="color: #ff4444; margin-bottom: 20px;">⚠️ Developer Tools Detected</h2>
        <p style="margin-bottom: 20px; line-height: 1.6;">
          The use of developer tools, automation bots, or inspection tools is restricted on this website for security reasons.
        </p>
        <p style="font-size: 14px; color: #ccc; margin-bottom: 20px;">
          This includes: Browser Developer Tools (F12), View Source (Ctrl+U), Inspect Element, Automation scripts, and Debugging tools.
        </p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: #ff4444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        ">
          Close Tools & Continue
        </button>
      </div>
    `;
    
    document.body.appendChild(warning);
  }
  
  // Listen for devtools events
  window.addEventListener('devtoolschange', function(e) {
    if (e.detail.isOpen) {
      showDevToolsWarning();
    }
  });
  
})();
