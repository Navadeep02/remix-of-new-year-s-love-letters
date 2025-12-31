import { useMemo } from 'react';
import Lantern from './Lantern';

const FloatingLanterns = () => {
  const lanterns = useMemo(() => {
    const items = [];
    const count = 3; // Reduced for performance
    
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        startX: 50 + Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 100 : 800),
        startY: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50 + Math.random() * 200,
        size: 35 + Math.random() * 15,
        duration: 14 + Math.random() * 6,
        delay: i * 3,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 z-[6] pointer-events-none overflow-hidden">
      {lanterns.map((lantern) => (
        <Lantern
          key={lantern.id}
          startX={lantern.startX}
          startY={lantern.startY}
          size={lantern.size}
          duration={lantern.duration}
          delay={lantern.delay}
        />
      ))}
    </div>
  );
};

export default FloatingLanterns;
