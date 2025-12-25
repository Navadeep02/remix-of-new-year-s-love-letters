import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LanternProps {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  size: number;
  duration: number;
}

const Lantern = ({ startX, startY, delay, size, duration }: LanternProps) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        x: startX, 
        y: startY,
        opacity: 0,
        scale: 0.3
      }}
      animate={{ 
        y: [startY, startY - 800],
        x: [startX, startX + Math.sin(startX) * 50],
        opacity: [0, 1, 1, 0.8, 0],
        scale: [0.3, 1, 1, 0.9, 0.7]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
      style={{ width: size, height: size * 1.3 }}
    >
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full animate-lantern-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,200,100,0.6) 0%, rgba(255,150,50,0.3) 40%, transparent 70%)',
          transform: 'scale(2.5)',
          filter: 'blur(15px)',
        }}
      />
      
      {/* Secondary glow */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,220,150,0.8) 0%, rgba(255,180,80,0.4) 50%, transparent 80%)',
          transform: 'scale(1.8)',
          filter: 'blur(8px)',
        }}
      />
      
      {/* Lantern body */}
      <div 
        className="absolute inset-0 rounded-[40%]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,230,180,0.95) 0%, rgba(255,180,100,0.9) 50%, rgba(255,140,60,0.85) 100%)',
          boxShadow: `
            0 0 ${size/2}px rgba(255,200,100,0.8),
            0 0 ${size}px rgba(255,150,50,0.6),
            inset 0 -${size/4}px ${size/3}px rgba(255,100,30,0.3),
            inset 0 ${size/6}px ${size/4}px rgba(255,255,200,0.4)
          `,
        }}
      />
      
      {/* Inner flame glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-flame"
        style={{
          width: size * 0.3,
          height: size * 0.4,
          background: 'radial-gradient(ellipse, rgba(255,255,220,1) 0%, rgba(255,200,100,0.8) 50%, transparent 100%)',
        }}
      />
      
      {/* Paper texture lines */}
      <div 
        className="absolute inset-[15%] rounded-[35%] opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139,69,19,0.3) 3px, rgba(139,69,19,0.3) 4px)',
        }}
      />
      
      {/* Top rim */}
      <div 
        className="absolute top-0 left-[20%] right-[20%] h-[8%] rounded-t-full"
        style={{
          background: 'linear-gradient(180deg, rgba(139,69,19,0.6) 0%, rgba(205,133,63,0.4) 100%)',
        }}
      />
      
      {/* Bottom rim */}
      <div 
        className="absolute bottom-0 left-[25%] right-[25%] h-[6%] rounded-b-full"
        style={{
          background: 'linear-gradient(0deg, rgba(139,69,19,0.6) 0%, rgba(205,133,63,0.4) 100%)',
        }}
      />
    </motion.div>
  );
};

const TangledLanterns = () => {
  const lanterns = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      startY: (typeof window !== 'undefined' ? window.innerHeight : 800) + Math.random() * 200,
      delay: Math.random() * 15,
      size: 30 + Math.random() * 40,
      duration: 20 + Math.random() * 15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {lanterns.map((lantern) => (
        <Lantern key={lantern.id} {...lantern} />
      ))}
    </div>
  );
};

export default TangledLanterns;
