import { useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const SpeedInsightsDebug: React.FC = () => {
  useEffect(() => {
    // Debug logging
    console.log('🔍 Speed Insights Debug Component Mounted');
    console.log('📦 SpeedInsights component:', SpeedInsights);
    
    // Check if Speed Insights script is loaded
    const speedInsightsScript = document.querySelector('script[src*="va.vercel-scripts.com"]');
    console.log('📜 Speed Insights script found:', !!speedInsightsScript);
    
    // Check for Speed Insights in window object
    if (typeof window !== 'undefined') {
      console.log('🌐 Window object available');
      // @ts-ignore
      console.log('📊 Vercel Speed Insights in window:', !!window.__VERCEL_SPEED_INSIGHTS__);
    }
    
    // Monitor for Speed Insights network requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0];
      if (typeof url === 'string' && url.includes('vercel')) {
        console.log('🚀 Speed Insights network request:', url);
      }
      return originalFetch.apply(this, args);
    };
    
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <div style={{ display: 'none' }}>
      <SpeedInsights />
    </div>
  );
};

export default SpeedInsightsDebug; 