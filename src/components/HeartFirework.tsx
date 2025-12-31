import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartFireworkProps {
  startX: number;
  delay?: number;
  color?: string;
}

const HeartFirework = ({ startX, delay = 0, color = '#FF69B4' }: HeartFireworkProps) => {
  const [phase, setPhase] = useState<'idle' | 'launch' | 'explode'>('idle');
  const [explodePos, setExplodePos] = useState({ x: startX, y: 25 });
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Generate heart-shaped particle positions
  const heartParticles = useMemo(() => {
    const particles: { x: number; y: number; size: number }[] = [];
    
    // Heart parametric equation - fewer points
    for (let t = 0; t < Math.PI * 2; t += 0.5) {
      const scale = 6;
      const x = scale * 16 * Math.pow(Math.sin(t), 3);
      const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      particles.push({
        x,
        y,
        size: 4,
      });
    }
    
    return particles;
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const launchFirework = useCallback(() => {
    const targetY = 20 + Math.random() * 10;
    const targetX = startX + (Math.random() * 8 - 4);
    
    setExplodePos({ x: targetX, y: targetY });
    setPhase('launch');
    
    const explodeTimeout = setTimeout(() => {
      setPhase('explode');
      
      const resetTimeout = setTimeout(() => {
        setPhase('idle');
      }, 2000);
      
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
    }, 12000 + Math.random() * 4000);
    
    return () => {
      clearInterval(interval);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [delay, launchFirework]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      <AnimatePresence mode="wait">
        {phase === 'launch' && (
          <motion.div
            initial={{ x: `${startX}vw`, y: '100vh' }}
            animate={{ x: `${explodePos.x}vw`, y: `${explodePos.y}vh` }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.3, 1] }}
            className="absolute"
            style={{ transform: 'translateX(-50%)', willChange: 'transform' }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: `radial-gradient(circle, #FFFFFF 0%, ${color} 70%)`,
                boxShadow: `0 0 10px 4px ${color}`,
              }}
            />
            <div 
              className="absolute w-0.5 left-[3px] top-2"
              style={{
                height: 50,
                background: `linear-gradient(to bottom, ${color}AA, transparent)`,
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
            {/* Initial flash - enhanced */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute w-28 h-28 -left-14 -top-14 rounded-full"
              style={{
                background: `radial-gradient(circle, #FFFFFF 0%, ${color} 40%, ${color}66 60%, transparent 80%)`,
                boxShadow: `0 0 60px 30px ${color}`,
              }}
            />

            {/* Heart-shaped particles with enhanced glow */}
            {heartParticles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ 
                  x: p.x, 
                  y: p.y,
                  scale: [0, 1.5, 1.2],
                  opacity: [1, 1, 0],
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.02,
                  ease: [0.2, 0.5, 0.3, 1],
                }}
                className="absolute rounded-full"
                style={{
                  width: p.size * 1.5,
                  height: p.size * 1.5,
                  background: `radial-gradient(circle, #FFF 30%, ${color} 70%)`,
                  boxShadow: `0 0 ${p.size * 6}px ${p.size * 2}px ${color}, 0 0 ${p.size * 10}px ${color}`,
                  left: -p.size * 0.75,
                  top: -p.size * 0.75,
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeartFirework;
