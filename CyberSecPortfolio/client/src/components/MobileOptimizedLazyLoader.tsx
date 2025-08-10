import { Suspense, lazy, ComponentType, ReactNode } from 'react'
import { getDeviceCapabilities, getPerformanceFlags } from '../utils/mobile-performance'

interface MobileOptimizedLazyLoaderProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: ReactNode
  mobileFallback?: ReactNode
  props?: any
}

const MobileOptimizedLazyLoader = ({ 
  component, 
  fallback, 
  mobileFallback,
  props 
}: MobileOptimizedLazyLoaderProps) => {
  const capabilities = getDeviceCapabilities()
  const performanceFlags = getPerformanceFlags()
  
  // Default fallback
  const defaultFallback = (
    <div className="min-h-[200px] flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-green mx-auto mb-4"></div>
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  )

  // Mobile fallback
  const mobileFallbackComponent = mobileFallback || (
    <div className="min-h-[200px] flex items-center justify-center bg-background">
      <div className="text-center p-4">
        <div className="w-16 h-16 bg-cyber-card rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-cyber-green text-2xl">📱</span>
        </div>
        <p className="text-muted-foreground text-sm">Mobile Optimized View</p>
        <p className="text-xs text-muted-foreground mt-2">This component is optimized for mobile performance</p>
      </div>
    </div>
  )

  // If on mobile and heavy effects are disabled, show mobile fallback
  if (capabilities.isMobile && !performanceFlags.enableHeavyEffects) {
    return <>{mobileFallbackComponent}</>
  }

  // If on tablet and low-end device, show mobile fallback
  if (capabilities.isTablet && capabilities.isLowEnd) {
    return <>{mobileFallbackComponent}</>
  }

  // Otherwise, lazy load the component
  const LazyComponent = lazy(component)

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export default MobileOptimizedLazyLoader
