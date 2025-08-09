import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Hand, Move, RotateCw, ZoomIn, MousePointer, Fingerprint } from 'lucide-react';

const GestureBasedNavigation: React.FC = () => {
  const [gestureType, setGestureType] = useState<string | null>(null);
  const [gestureData, setGestureData] = useState({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    velocity: 0
  });
  const [isTracking, setIsTracking] = useState(false);
  const [gestureHistory, setGestureHistory] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastGestureTime = useRef(0);
  const gestureThrottle = 100; // 100ms throttle

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let startX = 0;
    let startY = 0;
    let startTime = 0;

    // Throttled gesture handler
    const handleGesture = useCallback((type: string, data?: any) => {
      const now = Date.now();
      if (now - lastGestureTime.current < gestureThrottle) return;
      lastGestureTime.current = now;

      setGestureType(type);
      if (data) {
        setGestureData(data);
      }
      addToHistory(type);
    }, []);

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
      setIsTracking(true);
      handleGesture('touch-start');
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const time = Date.now() - startTime;
        const velocity = distance / time;

        const data = {
          x: touch.clientX,
          y: touch.clientY,
          scale: 1,
          rotation: 0,
          velocity
        };

        setGestureData(data);

        // Determine gesture type based on movement
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 50) {
            handleGesture('swipe-right', data);
          } else if (deltaX < -50) {
            handleGesture('swipe-left', data);
          }
        } else {
          if (deltaY > 50) {
            handleGesture('swipe-down', data);
          } else if (deltaY < -50) {
            handleGesture('swipe-up', data);
          }
        }
      } else if (e.touches.length === 2) {
        // Pinch gesture
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const data = {
          ...gestureData,
          scale: distance / 100
        };
        
        handleGesture('pinch', data);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsTracking(false);
      handleGesture('touch-end');
      
      // Add tap gesture if no significant movement
      if (gestureData.velocity < 0.1) {
        handleGesture('tap');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      startTime = Date.now();
      setIsTracking(true);
      handleGesture('mouse-down');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTracking) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const time = Date.now() - startTime;
        const velocity = distance / time;

        const data = {
          x: e.clientX,
          y: e.clientY,
          scale: 1,
          rotation: 0,
          velocity
        };

        setGestureData(data);

        if (distance > 50) {
          handleGesture('drag', data);
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsTracking(false);
      handleGesture('mouse-up');
      
      if (gestureData.velocity < 0.1) {
        handleGesture('click');
      }
    };

    // Add event listeners with passive option where possible
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gestureData.velocity]);

  const addToHistory = (gesture: string) => {
    setGestureHistory(prev => [gesture, ...prev.slice(0, 9)]);
  };

  const clearHistory = () => {
    setGestureHistory([]);
  };

  return (
    <div className="cyber-card-glow p-6 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
            <Hand className="inline-block mr-2 h-6 w-6" />
            Gesture-Based Navigation
          </h2>
          <div className="text-sm text-cyber-secondary">
            Touch & Mouse Gestures
          </div>
        </div>

        {/* Gesture Display */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Gesture */}
          <div className="cyber-card p-6">
            <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Current Gesture</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-mono text-cyber-primary">{gestureType || 'None'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Position:</span>
                <span className="font-mono text-cyber-primary">
                  ({gestureData.x}, {gestureData.y})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Velocity:</span>
                <span className="font-mono text-cyber-primary">
                  {gestureData.velocity.toFixed(2)} px/ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Scale:</span>
                <span className="font-mono text-cyber-primary">
                  {gestureData.scale.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Gesture History */}
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-cyber-secondary">Gesture History</h3>
              <button
                onClick={clearHistory}
                className="text-xs text-cyber-accent hover:text-cyber-primary transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {gestureHistory.map((gesture, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-cyber-light rounded"
                >
                  <span className="text-sm font-mono text-cyber-primary">{gesture}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              ))}
              {gestureHistory.length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  No gestures recorded
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gesture Instructions */}
        <div className="mt-6 cyber-card p-6">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Supported Gestures</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <Move className="h-8 w-8 mx-auto mb-2 text-cyber-primary" />
              <div className="text-sm font-bold">Swipe</div>
              <div className="text-xs text-muted-foreground">Up, Down, Left, Right</div>
            </div>
            <div className="text-center">
              <ZoomIn className="h-8 w-8 mx-auto mb-2 text-cyber-secondary" />
              <div className="text-sm font-bold">Pinch</div>
              <div className="text-xs text-muted-foreground">Zoom in/out</div>
            </div>
            <div className="text-center">
              <RotateCw className="h-8 w-8 mx-auto mb-2 text-cyber-warning" />
              <div className="text-sm font-bold">Rotate</div>
              <div className="text-xs text-muted-foreground">Two-finger rotation</div>
            </div>
            <div className="text-center">
              <MousePointer className="h-8 w-8 mx-auto mb-2 text-cyber-accent" />
              <div className="text-sm font-bold">Tap/Click</div>
              <div className="text-xs text-muted-foreground">Single tap/click</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestureBasedNavigation; 