import React, { useState, useEffect, useRef } from 'react';
import { MousePointer, Target, Zap, Eye, Shield } from 'lucide-react';

const MagneticCursorEffects: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = (elementId: string) => {
    setIsHovering(elementId);
  };

  const handleMouseLeave = () => {
    setIsHovering(null);
  };

  const getMagneticOffset = (elementId: string) => {
    if (isHovering !== elementId) return { x: 0, y: 0 };

    const element = document.getElementById(elementId);
    if (!element) return { x: 0, y: 0 };

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;

    return {
      x: deltaX * 0.1,
      y: deltaY * 0.1
    };
  };

  return (
    <div className="cyber-card-glow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
          <MousePointer className="inline-block mr-2 h-6 w-6" />
          Magnetic Cursor Effects
        </h2>
        <div className="text-sm text-cyber-secondary">
          Interactive Magnetic Elements
        </div>
      </div>

      {/* Magnetic Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Magnetic Button 1 */}
        <div
          id="magnetic-1"
          className="cyber-card p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            transform: `translate(${getMagneticOffset('magnetic-1').x}px, ${getMagneticOffset('magnetic-1').y}px)`
          }}
          onMouseEnter={() => handleMouseEnter('magnetic-1')}
          onMouseLeave={handleMouseLeave}
        >
          <Target className="h-12 w-12 mx-auto mb-3 text-cyber-secondary" />
          <div className="font-bold">Target Lock</div>
          <div className="text-sm text-muted-foreground mt-2">
            Magnetic attraction effect
          </div>
        </div>

        {/* Magnetic Button 2 */}
        <div
          id="magnetic-2"
          className="cyber-card p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            transform: `translate(${getMagneticOffset('magnetic-2').x}px, ${getMagneticOffset('magnetic-2').y}px)`
          }}
          onMouseEnter={() => handleMouseEnter('magnetic-2')}
          onMouseLeave={handleMouseLeave}
        >
          <Zap className="h-12 w-12 mx-auto mb-3 text-cyber-primary" />
          <div className="font-bold">Energy Field</div>
          <div className="text-sm text-muted-foreground mt-2">
            Dynamic magnetic field
          </div>
        </div>

        {/* Magnetic Button 3 */}
        <div
          id="magnetic-3"
          className="cyber-card p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            transform: `translate(${getMagneticOffset('magnetic-3').x}px, ${getMagneticOffset('magnetic-3').y}px)`
          }}
          onMouseEnter={() => handleMouseEnter('magnetic-3')}
          onMouseLeave={handleMouseLeave}
        >
          <Eye className="h-12 w-12 mx-auto mb-3 text-cyber-warning" />
          <div className="font-bold">Vision Scanner</div>
          <div className="text-sm text-muted-foreground mt-2">
            Magnetic eye tracking
          </div>
        </div>

        {/* Magnetic Button 4 */}
        <div
          id="magnetic-4"
          className="cyber-card p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            transform: `translate(${getMagneticOffset('magnetic-4').x}px, ${getMagneticOffset('magnetic-4').y}px)`
          }}
          onMouseEnter={() => handleMouseEnter('magnetic-4')}
          onMouseLeave={handleMouseLeave}
        >
          <Shield className="h-12 w-12 mx-auto mb-3 text-cyber-accent" />
          <div className="font-bold">Shield Defense</div>
          <div className="text-sm text-muted-foreground mt-2">
            Magnetic shield effect
          </div>
        </div>
      </div>

      {/* Interactive Magnetic Circle */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Magnetic Circle</h3>
        <div
          id="magnetic-circle"
          className="w-32 h-32 mx-auto cyber-card rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
          style={{
            transform: `translate(${getMagneticOffset('magnetic-circle').x}px, ${getMagneticOffset('magnetic-circle').y}px) scale(${isHovering === 'magnetic-circle' ? 1.2 : 1})`,
            background: isHovering === 'magnetic-circle' 
              ? 'linear-gradient(45deg, #0080FF, #00E676)' 
              : undefined
          }}
          onMouseEnter={() => handleMouseEnter('magnetic-circle')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-center">
            <div className="text-2xl font-cyber font-bold">M</div>
            <div className="text-xs">MAGNETIC</div>
          </div>
        </div>
      </div>

      {/* Magnetic Sliders */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="cyber-card p-4">
          <h4 className="font-bold mb-4 text-cyber-primary">Magnetic Strength</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm">Attraction Force</label>
              <div className="w-full bg-cyber-light rounded-full h-3 mt-2">
                <div 
                  className="bg-cyber-secondary h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: isHovering ? '85%' : '60%',
                    transform: isHovering ? 'scaleY(1.2)' : 'scaleY(1)'
                  }}
                />
              </div>
            </div>
            <div>
              <label className="text-sm">Magnetic Field</label>
              <div className="w-full bg-cyber-light rounded-full h-3 mt-2">
                <div 
                  className="bg-cyber-primary h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: isHovering ? '95%' : '70%',
                    transform: isHovering ? 'scaleY(1.2)' : 'scaleY(1)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="cyber-card p-4">
          <h4 className="font-bold mb-4 text-cyber-primary">Cursor Tracking</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>X Position:</span>
              <span className="font-mono text-cyber-secondary">{mousePosition.x}px</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Y Position:</span>
              <span className="font-mono text-cyber-primary">{mousePosition.y}px</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Active Element:</span>
              <span className="font-mono text-cyber-warning">
                {isHovering ? isHovering.toUpperCase() : 'NONE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Magnetic Particles Effect */}
      <div className="text-center">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Magnetic Particles</h3>
        <div className="relative h-32 cyber-card overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-cyber font-bold text-cyber-primary">MAGNETIC</div>
              <div className="text-sm text-muted-foreground">Particle System</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: `scale(${isHovering ? 1.5 : 1})`,
          opacity: isHovering ? 0.8 : 0.3
        }}
      >
        <div className="w-5 h-5 border-2 border-cyber-primary rounded-full animate-ping" />
        <div className="w-3 h-3 bg-cyber-secondary rounded-full absolute top-1 left-1" />
      </div>
    </div>
  );
};

export default MagneticCursorEffects; 