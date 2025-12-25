import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AerialFireworkProps {
  startX: number;
  delay?: number;
  color?: 'gold' | 'red' | 'blue' | 'green' | 'purple' | 'white' | 'pink' | 'cyan' | 'orange';
}

const colorPalettes = {
  gold: ['#FFD700', '#FFA500', '#FFCC00'],
  red: ['#FF4444', '#FF6B6B', '#FF1744'],
  blue: ['#42A5F5', '#64B5F6', '#90CAF9'],
  green: ['#66BB6A', '#81C784', '#A5D6A7'],
  purple: ['#AB47BC', '#BA68C8', '#CE93D8'],
  white: ['#FFFFFF', '#F5F5F5', '#EEEEEE'],
  pink: ['#F48FB1', '#F06292', '#EC407A'],
  cyan: ['#4DD0E1', '#26C6DA', '#00BCD4'],
  orange: ['#FFA726', '#FF9800', '#FB8C00'],
};

const AerialFirework = ({ startX, delay = 0, color = 'gold' }: AerialFireworkProps) => {
  const [phase, setPhase] = useState<'idle' | 'launch' | 'explode'>('idle');
  const [explodePos, setExplodePos] = useState({ x: startX, y: 25 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  const colors = colorPalettes[color];

  // Optimized particles - minimal for performance
  const particles = useMemo(() => {
    const main: { angle: number; dist: number; size: number; color: string }[] = [];
    
    // Single ring with fewer particles
    const count = 10;
    for (let i = 0; i < count; i++) {
      main.push({
        angle: (360 / count) * i,
        dist: 120 + Math.random() * 40,
        size: 5 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    return main;
  }, [colors]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const launchFirework = useCallback(() => {
    const targetY = 15 + Math.random() * 15;
    const targetX = startX + (Math.random() * 10 - 5);
    
    setExplodePos({ x: targetX, y: targetY });
    setPhase('launch');
    
    const explodeTimeout = setTimeout(() => {
      setPhase('explode');
      
      const resetTimeout = setTimeout(() => {
        setPhase('idle');
      }, 1800);
      
      timeoutsRef.current.push(resetTimeout);
    }, 700);
    
    timeoutsRef.current.push(explodeTimeout);
  }, [startX]);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      launchFirework();
    }, delay);
    
    timeoutsRef.current.push(initialDelay);
    
    const interval = setInterval(() => {
      launchFirework();
    }, 6000 + Math.random() * 2000);
    
    return () => {
      clearInterval(interval);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [delay, launchFirework]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 4 }}>
      <AnimatePresence mode="wait">
        {phase === 'launch' && (
          <motion.div
            initial={{ x: `${startX}vw`, y: '100vh' }}
            animate={{ x: `${explodePos.x}vw`, y: `${explodePos.y}vh` }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.3, 1] }}
            className="absolute"
            style={{ 
              transform: 'translateX(-50%)',
              willChange: 'transform',
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: `radial-gradient(circle, #FFFFFF 0%, ${colors[0]} 70%)`,
                boxShadow: `0 0 8px 3px ${colors[0]}`,
              }}
            />
            <div 
              className="absolute w-0.5 left-[3px] top-2"
              style={{
                height: 50,
                background: `linear-gradient(to bottom, ${colors[0]}AA, transparent)`,
              }}
            />
          </motion.div>
        )}

        {phase === 'explode' && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute"
            style={{
              left: `${explodePos.x}vw`,
              top: `${explodePos.y}vh`,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform',
            }}
          >
            {/* Initial flash - brighter */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute w-24 h-24 -left-12 -top-12 rounded-full"
              style={{
                background: `radial-gradient(circle, #FFFFFF 0%, ${colors[0]} 35%, ${colors[0]}88 55%, transparent 75%)`,
                boxShadow: `0 0 50px 25px ${colors[0]}`,
              }}
            />

            {/* Main particles - brighter with enhanced glow */}
            {particles.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const endX = Math.cos(rad) * p.dist;
              const endY = Math.sin(rad) * p.dist + 30;
              
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
                  animate={{ 
                    x: endX, 
                    y: endY,
                    scale: 0.3,
                    opacity: 0,
                  }}
                  transition={{ 
                    duration: 1.5,
                    ease: [0.2, 0.5, 0.3, 1],
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: p.size * 1.3,
                    height: p.size * 1.3,
                    background: `radial-gradient(circle, #FFF 30%, ${p.color} 70%)`,
                    boxShadow: `0 0 ${p.size * 5}px ${p.size}px ${p.color}, 0 0 ${p.size * 8}px ${p.color}`,
                    left: -p.size * 0.65,
                    top: -p.size * 0.65,
                    willChange: 'transform, opacity',
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AerialFirework;
