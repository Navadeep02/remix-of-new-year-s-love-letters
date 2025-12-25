import { useState, useEffect, useCallback, memo } from 'react';

interface Particle {
  id: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
}

interface FireworkState {
  id: number;
  x: number;
  targetY: number;
  color: string;
  phase: 'launch' | 'explode' | 'done';
  particles: Particle[];
}

const COLORS = [
  '#FFD700', '#FF6B6B', '#4ECDC4', '#A855F7', '#22C55E', '#FF69B4', '#FFFFFF'
];

// Memoized particle for performance
const Particle = memo(({ p, color }: { p: Particle; color: string }) => (
  <div
    className="absolute rounded-full"
    style={{
      width: p.size,
      height: p.size,
      background: p.color,
      boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
      animation: `particleBurst 1.2s ease-out forwards`,
      '--angle': `${p.angle}rad`,
      '--speed': p.speed,
      willChange: 'transform, opacity',
    } as React.CSSProperties}
  />
));
Particle.displayName = 'Particle';

const FireworksDisplay = () => {
  const [fireworks, setFireworks] = useState<FireworkState[]>([]);

  const createParticles = useCallback((count: number, color: string): Particle[] => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / count,
      speed: 3 + Math.random() * 2,
      color: i % 4 === 0 ? '#FFFFFF' : color,
      size: 3 + Math.random() * 2,
    }));
  }, []);

  const launchFirework = useCallback(() => {
    const newFw: FireworkState = {
      id: Date.now() + Math.random(),
      x: 100 + Math.random() * (window.innerWidth - 200),
      targetY: 100 + Math.random() * (window.innerHeight * 0.3),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      phase: 'launch',
      particles: [],
    };

    setFireworks((prev) => {
      if (prev.length >= 2) return prev;
      return [...prev, newFw];
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        launchFirework();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [launchFirework]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    fireworks.forEach((fw) => {
      if (fw.phase === 'launch') {
        const timer = setTimeout(() => {
          setFireworks((prev) =>
            prev.map((f) =>
              f.id === fw.id
                ? { ...f, phase: 'explode', particles: createParticles(24, fw.color) }
                : f
            )
          );
        }, 800);
        timers.push(timer);
      } else if (fw.phase === 'explode') {
        const timer = setTimeout(() => {
          setFireworks((prev) => prev.filter((f) => f.id !== fw.id));
        }, 1400);
        timers.push(timer);
      }
    });
    
    return () => timers.forEach(clearTimeout);
  }, [fireworks, createParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[8] overflow-hidden">
      <style>{`
        @keyframes rocketLaunch {
          from { transform: translateY(0); opacity: 0.8; }
          to { transform: translateY(calc(-1 * var(--target-y))); opacity: 1; }
        }
        @keyframes flashBurst {
          from { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          to { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        @keyframes particleBurst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { 
            transform: translate(
              calc(cos(var(--angle)) * var(--speed) * 40px),
              calc(sin(var(--angle)) * var(--speed) * 40px + 20px)
            ) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
      
      {fireworks.map((fw) => (
        <div key={fw.id}>
          {fw.phase === 'launch' && (
            <div
              className="absolute"
              style={{
                left: fw.x,
                bottom: 0,
                animation: `rocketLaunch 0.8s ease-out forwards`,
                '--target-y': `${window.innerHeight - fw.targetY}px`,
                willChange: 'transform',
              } as React.CSSProperties}
            >
              <div
                className="w-2 h-4 rounded-full"
                style={{
                  background: `linear-gradient(to top, ${fw.color}, white)`,
                  boxShadow: `0 0 10px ${fw.color}`,
                }}
              />
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 w-1 rounded-full"
                style={{
                  height: 30,
                  background: `linear-gradient(to bottom, ${fw.color}, transparent)`,
                }}
              />
            </div>
          )}

          {fw.phase === 'explode' && (
            <div
              className="absolute"
              style={{ left: fw.x, top: fw.targetY }}
            >
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 50,
                  height: 50,
                  background: `radial-gradient(circle, white 0%, ${fw.color} 50%, transparent 100%)`,
                  animation: 'flashBurst 0.25s ease-out forwards',
                }}
              />
              {fw.particles.map((p) => (
                <Particle key={p.id} p={p} color={fw.color} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FireworksDisplay;
