import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Zap, Eye, Shield, AlertTriangle } from 'lucide-react';

const HolographicGlitchEffects: React.FC = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [activeGlitch, setActiveGlitch] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let glitchLines: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      alpha: number;
    }> = [];

    const createGlitchLine = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 200 + 50,
        height: Math.random() * 3 + 1,
        color: ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.5 + 0.3
      };
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 20, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isGlitching) {
        // Add new glitch lines
        if (Math.random() > 0.7) {
          glitchLines.push(createGlitchLine());
        }

        // Update and draw glitch lines
        glitchLines = glitchLines.filter(line => {
          line.alpha -= 0.02;
          if (line.alpha > 0) {
            ctx.globalAlpha = line.alpha;
            ctx.fillStyle = line.color;
            ctx.fillRect(line.x, line.y, line.width, line.height);
            return true;
          }
          return false;
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup
    };
  }, [isGlitching]);

  const triggerGlitch = (type: string) => {
    setIsGlitching(true);
    setActiveGlitch(type);
    
    setTimeout(() => {
      setIsGlitching(false);
      setActiveGlitch(null);
    }, 2000);
  };

  return (
    <div className="cyber-card-glow p-6 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
            <Monitor className="inline-block mr-2 h-6 w-6" />
            Holographic Glitch Effects
          </h2>
          <div className="text-sm text-cyber-secondary">
            Cyberpunk Visual Distortion
          </div>
        </div>

        {/* Holographic Display Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Holographic Monitor 1 */}
          <div 
            className={`cyber-card p-6 text-center transition-all duration-500 ${
              activeGlitch === 'monitor1' ? 'animate-pulse scale-105' : ''
            }`}
            style={{
              boxShadow: activeGlitch === 'monitor1' 
                ? '0 0 20px #00FFFF, 0 0 40px #00FFFF' 
                : undefined
            }}
          >
            <div className="relative">
              <Monitor className="h-16 w-16 mx-auto mb-4 text-cyber-secondary" />
              {activeGlitch === 'monitor1' && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-pulse" />
              )}
            </div>
            <div className="font-bold mb-2">Security Monitor</div>
            <div className="text-sm text-muted-foreground mb-4">
              Real-time surveillance feed
            </div>
            <button
              onClick={() => triggerGlitch('monitor1')}
              className="cyber-button text-sm"
            >
              Trigger Glitch
            </button>
          </div>

          {/* Holographic Monitor 2 */}
          <div 
            className={`cyber-card p-6 text-center transition-all duration-500 ${
              activeGlitch === 'monitor2' ? 'animate-pulse scale-105' : ''
            }`}
            style={{
              boxShadow: activeGlitch === 'monitor2' 
                ? '0 0 20px #FF00FF, 0 0 40px #FF00FF' 
                : undefined
            }}
          >
            <div className="relative">
              <Zap className="h-16 w-16 mx-auto mb-4 text-cyber-primary" />
              {activeGlitch === 'monitor2' && (
                <div className="absolute inset-0 bg-gradient-to-r from-magenta-400 to-purple-500 opacity-20 animate-pulse" />
              )}
            </div>
            <div className="font-bold mb-2">Energy Grid</div>
            <div className="text-sm text-muted-foreground mb-4">
              Power distribution system
            </div>
            <button
              onClick={() => triggerGlitch('monitor2')}
              className="cyber-button text-sm"
            >
              Trigger Glitch
            </button>
          </div>

          {/* Holographic Monitor 3 */}
          <div 
            className={`cyber-card p-6 text-center transition-all duration-500 ${
              activeGlitch === 'monitor3' ? 'animate-pulse scale-105' : ''
            }`}
            style={{
              boxShadow: activeGlitch === 'monitor3' 
                ? '0 0 20px #FFFF00, 0 0 40px #FFFF00' 
                : undefined
            }}
          >
            <div className="relative">
              <Eye className="h-16 w-16 mx-auto mb-4 text-cyber-warning" />
              {activeGlitch === 'monitor3' && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 animate-pulse" />
              )}
            </div>
            <div className="font-bold mb-2">Vision Scanner</div>
            <div className="text-sm text-muted-foreground mb-4">
              AI recognition system
            </div>
            <button
              onClick={() => triggerGlitch('monitor3')}
              className="cyber-button text-sm"
            >
              Trigger Glitch
            </button>
          </div>
        </div>

        {/* Holographic Text Display */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Holographic Text</h3>
          <div className="cyber-card p-6 text-center">
            <div 
              className={`text-3xl font-cyber font-bold transition-all duration-500 ${
                isGlitching 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 animate-pulse' 
                  : 'text-cyber-primary'
              }`}
              style={{
                filter: isGlitching ? 'blur(0.5px)' : 'blur(0px)',
                textShadow: isGlitching 
                  ? '0 0 10px #00FFFF, 0 0 20px #00FFFF' 
                  : undefined
              }}
            >
              HOLOGRAPHIC INTERFACE
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {isGlitching ? 'GLITCH DETECTED' : 'System Online'}
            </div>
          </div>
        </div>

        {/* Glitch Effects Panel */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="cyber-card p-4">
            <h4 className="font-bold mb-4 text-cyber-primary">Glitch Types</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm">RGB Shift</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-magenta-400 rounded-full animate-pulse" />
                <span className="text-sm">Digital Noise</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-sm">Scan Lines</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Data Corruption</span>
              </div>
            </div>
          </div>

          <div className="cyber-card p-4">
            <h4 className="font-bold mb-4 text-cyber-primary">System Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Glitch Level:</span>
                <span className={`font-mono ${isGlitching ? 'text-cyber-warning' : 'text-cyber-secondary'}`}>
                  {isGlitching ? 'HIGH' : 'LOW'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Hologram Stability:</span>
                <span className={`font-mono ${isGlitching ? 'text-cyber-danger' : 'text-cyber-primary'}`}>
                  {isGlitching ? 'UNSTABLE' : 'STABLE'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Signal Quality:</span>
                <span className={`font-mono ${isGlitching ? 'text-cyber-warning' : 'text-cyber-accent'}`}>
                  {isGlitching ? 'POOR' : 'EXCELLENT'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Holographic Progress Bars */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">System Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Hologram Integrity</span>
                <span className="font-mono">{isGlitching ? '67%' : '98%'}</span>
              </div>
              <div className="w-full bg-cyber-light rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isGlitching 
                      ? 'bg-gradient-to-r from-red-400 to-yellow-400 animate-pulse' 
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  }`}
                  style={{ width: isGlitching ? '67%' : '98%' }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Signal Strength</span>
                <span className="font-mono">{isGlitching ? '45%' : '95%'}</span>
              </div>
              <div className="w-full bg-cyber-light rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isGlitching 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse' 
                      : 'bg-gradient-to-r from-green-400 to-cyan-400'
                  }`}
                  style={{ width: isGlitching ? '45%' : '95%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Override */}
        <div className="text-center">
          <button
            onClick={() => triggerGlitch('emergency')}
            className="cyber-button-danger text-lg px-8 py-4"
          >
            <AlertTriangle className="inline-block mr-2 h-6 w-6" />
            EMERGENCY GLITCH OVERRIDE
          </button>
        </div>
      </div>
    </div>
  );
};

export default HolographicGlitchEffects; 