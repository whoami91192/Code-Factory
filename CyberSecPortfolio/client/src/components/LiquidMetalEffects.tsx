import React, { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Eye, Target } from 'lucide-react';

const LiquidMetalEffects: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [morphingElement, setMorphingElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    // Create liquid metal particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${200 + Math.random() * 60}, 70%, 50%)`
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 20, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(0, 128, 255, ${0.3 * (1 - distance / 100)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup
    };
  }, []);

  const triggerMorphing = (elementType: string) => {
    setIsAnimating(true);
    setMorphingElement(elementType);
    
    setTimeout(() => {
      setIsAnimating(false);
      setMorphingElement(null);
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
            <Zap className="inline-block mr-2 h-6 w-6" />
            Liquid Metal Effects
          </h2>
          <div className="text-sm text-cyber-secondary">
            T-1000 Style Morphing
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Morphing Buttons */}
          <button
            onClick={() => triggerMorphing('shield')}
            className={`relative overflow-hidden cyber-card p-6 text-center transition-all duration-500 ${
              morphingElement === 'shield' ? 'scale-110 rotate-3' : 'hover:scale-105'
            }`}
            style={{
              background: morphingElement === 'shield' 
                ? 'linear-gradient(45deg, #0080FF, #00E676, #9C27B0)' 
                : undefined,
              transform: morphingElement === 'shield' ? 'skew(-5deg)' : undefined
            }}
          >
            <Shield className={`h-12 w-12 mx-auto mb-3 transition-all duration-500 ${
              morphingElement === 'shield' ? 'animate-pulse text-white' : 'text-cyber-secondary'
            }`} />
            <div className="font-bold">Shield Defense</div>
            {morphingElement === 'shield' && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => triggerMorphing('eye')}
            className={`relative overflow-hidden cyber-card p-6 text-center transition-all duration-500 ${
              morphingElement === 'eye' ? 'scale-110 -rotate-3' : 'hover:scale-105'
            }`}
            style={{
              background: morphingElement === 'eye' 
                ? 'linear-gradient(45deg, #00E676, #FFB300, #FF1744)' 
                : undefined,
              transform: morphingElement === 'eye' ? 'skew(5deg)' : undefined
            }}
          >
            <Eye className={`h-12 w-12 mx-auto mb-3 transition-all duration-500 ${
              morphingElement === 'eye' ? 'animate-bounce text-white' : 'text-cyber-primary'
            }`} />
            <div className="font-bold">Vision Scanner</div>
            {morphingElement === 'eye' && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-500 opacity-20 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => triggerMorphing('target')}
            className={`relative overflow-hidden cyber-card p-6 text-center transition-all duration-500 ${
              morphingElement === 'target' ? 'scale-110 rotate-6' : 'hover:scale-105'
            }`}
            style={{
              background: morphingElement === 'target' 
                ? 'linear-gradient(45deg, #FF1744, #9C27B0, #0080FF)' 
                : undefined,
              transform: morphingElement === 'target' ? 'skew(-3deg)' : undefined
            }}
          >
            <Target className={`h-12 w-12 mx-auto mb-3 transition-all duration-500 ${
              morphingElement === 'target' ? 'animate-spin text-white' : 'text-cyber-warning'
            }`} />
            <div className="font-bold">Target Lock</div>
            {morphingElement === 'target' && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-purple-500 opacity-20 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => triggerMorphing('zap')}
            className={`relative overflow-hidden cyber-card p-6 text-center transition-all duration-500 ${
              morphingElement === 'zap' ? 'scale-110 -rotate-6' : 'hover:scale-105'
            }`}
            style={{
              background: morphingElement === 'zap' 
                ? 'linear-gradient(45deg, #FFB300, #00E676, #FF1744)' 
                : undefined,
              transform: morphingElement === 'zap' ? 'skew(3deg)' : undefined
            }}
          >
            <Zap className={`h-12 w-12 mx-auto mb-3 transition-all duration-500 ${
              morphingElement === 'zap' ? 'animate-ping text-white' : 'text-cyber-accent'
            }`} />
            <div className="font-bold">Energy Pulse</div>
            {morphingElement === 'zap' && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-500 opacity-20 animate-pulse" />
            )}
          </button>
        </div>

        {/* Liquid Text Effect */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Liquid Text Effect</h3>
          <div className="relative overflow-hidden">
            <div 
              className={`text-4xl font-cyber font-bold transition-all duration-1000 ${
                isAnimating ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' : 'text-cyber-primary'
              }`}
              style={{
                filter: isAnimating ? 'blur(0.5px)' : 'blur(0px)',
                transform: isAnimating ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              MORPHING INTERFACE
            </div>
            {isAnimating && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 animate-pulse" />
            )}
          </div>
        </div>

        {/* Morphing Progress Bar */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Morphing Progress</h3>
          <div className="cyber-card p-4">
            <div className="w-full bg-cyber-light rounded-full h-4 overflow-hidden">
              <div 
                className={`h-4 rounded-full transition-all duration-2000 ${
                  isAnimating 
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse' 
                    : 'bg-cyber-primary'
                }`}
                style={{ 
                  width: isAnimating ? '100%' : '75%',
                  transform: isAnimating ? 'skew(-10deg)' : 'skew(0deg)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidMetalEffects; 