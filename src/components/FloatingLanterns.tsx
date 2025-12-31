import { useMemo, useState, useEffect } from 'react';
import Lantern from './Lantern';

const FloatingLanterns = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const lanterns = useMemo(() => {
    const items = [];
    const count = isMobile ? 1 : 3;
    
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        startX: 50 + Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 100 : 800),
        startY: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50 + Math.random() * 200,
        size: isMobile ? 30 : 35 + Math.random() * 15,
        duration: isMobile ? 20 : 14 + Math.random() * 6,
        delay: i * 5,
      });
    }
    return items;
  }, [isMobile]);

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
