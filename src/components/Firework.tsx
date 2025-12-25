import { useEffect, useState } from 'react';

interface FireworkProps {
  x: string;
  y: string;
  delay?: number;
  color?: 'gold' | 'red' | 'orange';
}

const Firework = ({ x, y, delay = 0, color = 'gold' }: FireworkProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsActive(true), delay);
    const hideTimer = setTimeout(() => setIsActive(false), delay + 1500);
    
    const interval = setInterval(() => {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 1500);
    }, 8000 + Math.random() * 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [delay]);

  const colorMap = {
    gold: 'hsl(var(--glow-gold))',
    red: 'hsl(var(--glow-red))',
    orange: 'hsl(var(--lantern-orange))',
  };

  if (!isActive) return null;

  return (
    <div 
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
    >
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-8 origin-bottom animate-firework"
          style={{
            transform: `rotate(${i * 30}deg)`,
            background: `linear-gradient(to top, ${colorMap[color]}, transparent)`,
            animationDelay: `${i * 30}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default Firework;
