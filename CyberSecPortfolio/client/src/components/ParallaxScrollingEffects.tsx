import React, { useState, useEffect, useRef } from 'react';
import { Layers, Eye, Zap, Shield, Target } from 'lucide-react';

const ParallaxScrollingEffects: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollY(scrolled);
      
      // Calculate active layer based on scroll position
      const layerHeight = 300;
      const newActiveLayer = Math.floor(scrolled / layerHeight);
      setActiveLayer(Math.min(newActiveLayer, 4)); // Max 5 layers
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="cyber-card-glow p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
          <Layers className="inline-block mr-2 h-6 w-6" />
          Parallax Scrolling Effects
        </h2>
        <div className="text-sm text-cyber-secondary">
          Multi-layered Depth Experience
        </div>
      </div>

      {/* Parallax Container */}
      <div 
        ref={containerRef}
        className="relative h-96 mb-8 overflow-hidden rounded-lg"
        style={{ perspective: '1000px' }}
      >
        {/* Background Layers */}
        {parallaxLayers.map((layer, index) => {
          const IconComponent = layer.icon;
          const translateY = scrollY * layer.speed;
          const isActive = activeLayer === layer.id;
          
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
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyber-secondary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer Controls */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Layer Controls</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {parallaxLayers.map((layer) => {
            const IconComponent = layer.icon;
            const isActive = activeLayer === layer.id;
            
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`cyber-card p-4 text-center transition-all duration-300 ${
                  isActive ? 'scale-105 ring-2 ring-cyber-primary' : 'hover:scale-105'
                }`}
              >
                <IconComponent className={`h-8 w-8 mx-auto mb-2 ${layer.color}`} />
                <div className="text-sm font-bold">{layer.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Speed: {layer.speed}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll Depth Indicator */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Scroll Depth</h3>
        <div className="cyber-card p-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Scroll Position:</span>
                <span className="font-mono text-cyber-secondary">{Math.round(scrollY)}px</span>
              </div>
              <div className="w-full bg-cyber-light rounded-full h-3">
                <div 
                  className="bg-cyber-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((scrollY / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Active Layer:</span>
                <span className="font-mono text-cyber-warning">
                  {parallaxLayers[activeLayer]?.title || 'None'}
                </span>
              </div>
              <div className="w-full bg-cyber-light rounded-full h-3">
                <div 
                  className="bg-cyber-warning h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(activeLayer / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parallax Content Sections */}
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
            Vision layer manages surveillance and monitoring systems. This layer moves at high speed,
            providing real-time visual data and AI-powered recognition capabilities.
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
            representing the heart of the cybernetic interface and neural network operations.
          </p>
        </div>
      </div>

      {/* Scroll Instructions */}
      <div className="mt-8 text-center">
        <div className="cyber-card p-4">
          <h4 className="font-bold mb-2 text-cyber-secondary">Scroll to Experience Depth</h4>
          <p className="text-sm text-muted-foreground">
            Scroll up and down to see the parallax effect in action. Each layer moves at different speeds,
            creating a sense of depth and dimensionality in the interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParallaxScrollingEffects; 