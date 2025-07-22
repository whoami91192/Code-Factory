import { useEffect } from 'react';

interface PerformanceMonitorProps {
  onMetrics?: (metrics: PerformanceMetrics) => void;
  enableReporting?: boolean;
}

interface PerformanceMetrics {
  LCP: number;
  FID: number;
  CLS: number;
  FCP: number;
  TTFB: number;
  TTI: number;
  TBT: number;
  timestamp: number;
}

// Extend PerformanceEntry for first-input events
interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  target?: EventTarget;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetrics,
  enableReporting = false
}) => {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      monitorCoreWebVitals();
      monitorAdditionalMetrics();
    }
  }, [onMetrics, enableReporting]);

  const monitorCoreWebVitals = () => {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcp = lastEntry.startTime;
      
      if (enableReporting) {
        reportMetric('LCP', lcp);
      }
      
      onMetrics?.({ LCP: lcp } as PerformanceMetrics);
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const firstInputEntry = entry as FirstInputEntry;
        const fid = firstInputEntry.processingStart - firstInputEntry.startTime;
        
        if (enableReporting) {
          reportMetric('FID', fid);
        }
        
        onMetrics?.({ FID: fid } as PerformanceMetrics);
      });
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      if (enableReporting) {
        reportMetric('CLS', clsValue);
      }
      
      onMetrics?.({ CLS: clsValue } as PerformanceMetrics);
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries[0].startTime;
      
      if (enableReporting) {
        reportMetric('FCP', fcp);
      }
      
      onMetrics?.({ FCP: fcp } as PerformanceMetrics);
    });
    
    fcpObserver.observe({ entryTypes: ['paint'] });
  };

  const monitorAdditionalMetrics = () => {
    // Time to First Byte (TTFB)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      
      if (enableReporting) {
        reportMetric('TTFB', ttfb);
      }
      
      onMetrics?.({ TTFB: ttfb } as PerformanceMetrics);
    }

    // Time to Interactive (TTI) - estimated
    const domContentLoaded = navigationEntry?.domContentLoadedEventEnd || 0;
    const loadEvent = navigationEntry?.loadEventEnd || 0;
    const tti = Math.max(domContentLoaded, loadEvent);
    
    if (enableReporting) {
      reportMetric('TTI', tti);
    }
    
    onMetrics?.({ TTI: tti } as PerformanceMetrics);

    // Total Blocking Time (TBT) - estimated
    const longTasks = performance.getEntriesByType('longtask');
    const tbt = longTasks.reduce((total, task) => {
      return total + Math.max(0, task.duration - 50);
    }, 0);
    
    if (enableReporting) {
      reportMetric('TBT', tbt);
    }
    
    onMetrics?.({ TBT: tbt } as PerformanceMetrics);
  };

  const reportMetric = (metricName: string, value: number) => {
    // Report to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metricName,
        value: Math.round(value),
        non_interaction: true,
      });
    }

    // Report to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${metricName}:`, value);
    }

    // Send to your analytics endpoint
    sendToAnalytics(metricName, value);
  };

  const sendToAnalytics = async (metricName: string, value: number) => {
    try {
      const payload = {
        metric: metricName,
        value: value,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection?.effectiveType || 'unknown'
      };

      // Send to your analytics endpoint
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      // Also log locally in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Performance Analytics sent:', payload);
      }
    } catch (error) {
      console.error('Failed to send performance metrics:', error);
      // Don't throw - fail silently to not break the app
    }
  };

  const getPerformanceScore = (metrics: Partial<PerformanceMetrics>): number => {
    let score = 100;
    
    // LCP scoring (0-2500ms is good)
    if (metrics.LCP && metrics.LCP > 2500) {
      score -= Math.min(30, (metrics.LCP - 2500) / 100);
    }
    
    // FID scoring (0-100ms is good)
    if (metrics.FID && metrics.FID > 100) {
      score -= Math.min(30, (metrics.FID - 100) / 10);
    }
    
    // CLS scoring (0-0.1 is good)
    if (metrics.CLS && metrics.CLS > 0.1) {
      score -= Math.min(30, metrics.CLS * 300);
    }
    
    // TTFB scoring (0-600ms is good)
    if (metrics.TTFB && metrics.TTFB > 600) {
      score -= Math.min(10, (metrics.TTFB - 600) / 100);
    }
    
    return Math.max(0, Math.round(score));
  };

  return null;
};

export default PerformanceMonitor; 