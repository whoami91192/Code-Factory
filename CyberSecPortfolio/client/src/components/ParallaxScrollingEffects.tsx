import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Layers, Eye, Zap, Shield, Target } from 'lucide-react';

const ParallaxScrollingEffects: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastScrollY = useRef(0);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) return; // Skip if already scheduled

    animationFrameRef.current = requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      
      // Only update if scroll position changed significantly
      if (Math.abs(scrolled - lastScrollY.current) > 10) {
        setScrollY(scrolled);
        lastScrollY.current = scrolled;
        
        // Calculate active layer based on scroll position
        const layerHeight = 300;
        const newActiveLayer = Math.floor(scrolled / layerHeight);
        setActiveLayer(Math.min(newActiveLayer, 4)); // Max 5 layers
      }
      
      animationFrameRef.current = undefined;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  const parallaxLayers = [
    {
      id: 0,
      title: "Front Layer",
      icon: Target,
      color: "text-cyber-primary",
      bgColor: "bg-cyber-primary",
      speed: 0.1,
      description: "Interactive elements and controls"
    },
    {
      id: 1,
      title: "Security Layer",
      icon: Shield,
      color: "text-cyber-secondary",
      bgColor: "bg-cyber-secondary",
      speed: 0.2,
      description: "Defense systems and firewalls"
    },
    {
      id: 2,
      title: "Energy Layer",
      icon: Zap,
      color: "text-cyber-warning",
      bgColor: "bg-cyber-warning",
      speed: 0.3,
      description: "Power grid and energy management"
    },
    {
      id: 3,
      title: "Vision Layer",
      icon: Eye,
      color: "text-cyber-accent",
      bgColor: "bg-cyber-accent",
      speed: 0.4,
      description: "Surveillance and monitoring systems"
    },
    {
      id: 4,
      title: "Core Layer",
      icon: Layers,
      color: "text-cyber-danger",
      bgColor: "bg-cyber-danger",
      speed: 0.5,
      description: "Central processing and AI core"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Parallax Layers */}
      <div className="relative h-full">
        {parallaxLayers.map((layer, index) => {
          const IconComponent = layer.icon;
          const isActive = activeLayer === layer.id;
          const translateY = scrollY * layer.speed;
          
          return (
            <div
              key={layer.id}
              className={`absolute inset-0 transition-all duration-500 ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{
                transform: `translateY(${translateY}px) translateZ(${-index * 50}px)`,
                zIndex: 5 - index
              }}
            >
              <div className={`h-full w-full ${layer.bgColor} bg-opacity-20 backdrop-blur-sm border border-${layer.bgColor.replace('bg-', '')} rounded-lg flex items-center justify-center`}>
                <div className="text-center">
                  <IconComponent className={`h-16 w-16 mx-auto mb-4 ${layer.color} ${isActive ? 'animate-pulse' : ''}`} />
                  <div className={`text-xl font-cyber font-bold ${layer.color}`}>
                    {layer.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 max-w-xs">
                    {layer.description}
                  </div>
                  {isActive && (
                    <div className="mt-4">
                      <div className="text-xs font-mono text-cyber-secondary">
                        LAYER {layer.id + 1} ACTIVE
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-4 h-4 bg-cyber-primary rounded-full animate-pulse"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              animationDelay: '0s'
            }}
          />
          <div 
            className="absolute top-40 right-20 w-6 h-6 bg-cyber-secondary rounded-full animate-pulse"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute bottom-20 left-1/2 w-3 h-3 bg-cyber-accent rounded-full animate-pulse"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              animationDelay: '2s'
            }}
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="space-y-8">
          {/* Section 1 */}
          <div 
            className="cyber-card p-6"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              opacity: Math.max(0.3, 1 - scrollY * 0.001)
            }}
          >
            <h4 className="text-xl font-bold mb-4 text-cyber-primary">Front Layer Interface</h4>
            <p className="text-muted-foreground">
              The front layer contains interactive elements and user controls. This layer moves the slowest,
              creating a sense of depth and immersion as you scroll through the interface.
            </p>
          </div>

          {/* Section 2 */}
          <div 
            className="cyber-card p-6"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0.3, 1 - (scrollY - 200) * 0.001)
            }}
          >
            <h4 className="text-xl font-bold mb-4 text-cyber-secondary">Security Systems</h4>
            <p className="text-muted-foreground">
              Security layer houses defense mechanisms and firewall systems. This layer moves at medium speed,
              providing visual feedback for security status and threat detection.
            </p>
          </div>

          {/* Section 3 */}
          <div 
            className="cyber-card p-6"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0.3, 1 - (scrollY - 400) * 0.001)
            }}
          >
            <h4 className="text-xl font-bold mb-4 text-cyber-warning">Energy Management</h4>
            <p className="text-muted-foreground">
              Energy layer controls power distribution and grid management. This layer moves faster,
              creating dynamic energy flow visualizations and power consumption metrics.
            </p>
          </div>

          {/* Section 4 */}
          <div 
            className="cyber-card p-6"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
              opacity: Math.max(0.3, 1 - (scrollY - 600) * 0.001)
            }}
          >
            <h4 className="text-xl font-bold mb-4 text-cyber-accent">Vision Systems</h4>
            <p className="text-muted-foreground">
              Vision layer provides surveillance and monitoring capabilities. This layer moves at high speed,
              creating dynamic visual feedback and real-time monitoring displays.
            </p>
          </div>

          {/* Section 5 */}
          <div 
            className="cyber-card p-6"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              opacity: Math.max(0.3, 1 - (scrollY - 800) * 0.001)
            }}
          >
            <h4 className="text-xl font-bold mb-4 text-cyber-danger">Core Processing</h4>
            <p className="text-muted-foreground">
              Core layer contains central processing units and AI systems. This layer moves the fastest,
              creating intense visual effects and representing the computational power of the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxScrollingEffects; 