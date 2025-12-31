import { useMemo, useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hearts = useMemo(() => {
    const items = [];
    const count = isMobile ? 2 : 5;
    
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        startY: (typeof window !== 'undefined' ? window.innerHeight : 800) + 30 + Math.random() * 200,
        size: isMobile ? 16 : 20 + Math.random() * 12,
        duration: isMobile ? 15 : 10 + Math.random() * 5,
        delay: i * 2,
        opacity: 0.6,
      });
    }
    return items;
  }, [isMobile]);

  if (isMobile && hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[3] pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.startX,
            top: heart.startY,
            animation: `floatUpSway ${heart.duration}s linear ${heart.delay}s infinite`,
            transform: 'translateZ(0)',
          }}
        >
          <Heart
            size={heart.size}
            className="fill-red-500"
            style={{
              opacity: heart.opacity,
              color: '#FF6B6B',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;