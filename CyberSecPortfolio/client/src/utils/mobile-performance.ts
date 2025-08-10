// Mobile Performance Optimization Utilities
export interface DeviceCapabilities {
  isMobile: boolean
  isTablet: boolean
  isLowEnd: boolean
  supportsTouch: boolean
  reducedMotion: boolean
  connectionSpeed: 'slow' | 'fast' | 'unknown'
}

// Detect device capabilities
export const getDeviceCapabilities = (): DeviceCapabilities => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /mobile|android|iphone|ipad|phone|blackberry|opera mini|windows phone/i.test(userAgent)
  const isTablet = /tablet|ipad/i.test(userAgent)
  
  // Check for low-end devices
  const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true
  
  // Check touch support
  const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  // Check reduced motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Check connection speed (if available)
  let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown'
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      connectionSpeed = 'slow'
    } else if (connection.effectiveType === '3g' || connection.effectiveType === '4g') {
      connectionSpeed = 'fast'
    }
  }
  
  return {
    isMobile,
    isTablet,
    isLowEnd,
    supportsTouch,
    reducedMotion,
    connectionSpeed
  }
}

// Performance optimization flags
export const getPerformanceFlags = () => {
  const capabilities = getDeviceCapabilities()
  
  return {
    // Disable heavy effects on mobile/low-end devices
    enableHeavyEffects: !capabilities.isMobile && !capabilities.isLowEnd,
    
    // Disable complex animations on mobile
    enableComplexAnimations: !capabilities.isMobile,
    
    // Use simplified interactions on mobile
    useSimplifiedInteractions: capabilities.isMobile,
    
    // Reduce visual complexity on mobile
    reduceVisualComplexity: capabilities.isMobile,
    
    // Optimize for touch devices
    optimizeForTouch: capabilities.supportsTouch,
    
    // Respect reduced motion preference
    respectReducedMotion: capabilities.reducedMotion
  }
}

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    })
  }
  return null
}

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${end - start}ms`)
  } else {
    fn()
  }
}

// Mobile-specific event optimizations
export const optimizeEventHandling = (element: HTMLElement, eventType: string, handler: EventListener) => {
  const capabilities = getDeviceCapabilities()
  
  if (capabilities.isMobile) {
    // Use passive listeners for better scroll performance
    const options = eventType === 'scroll' || eventType === 'touchmove' ? { passive: true } : {}
    element.addEventListener(eventType, handler, options)
  } else {
    element.addEventListener(eventType, handler)
  }
  
  return () => element.removeEventListener(eventType, handler)
}
