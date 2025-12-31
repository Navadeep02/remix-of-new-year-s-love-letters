import { useMemo } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const hearts = useMemo(() => {
    const items = [];
    const count = 5; // Reduced for performance
    
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        startY: (typeof window !== 'undefined' ? window.innerHeight : 800) + 30 + Math.random() * 200,
        size: 20 + Math.random() * 12,
        duration: 10 + Math.random() * 5,
        delay: i * 1.5,
        opacity: 0.7,
      });
    }
    return items;
  }, []);

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
            willChange: 'transform',
          }}
        >
          <Heart
            size={heart.size}
            className="fill-red-500"
            style={{
              opacity: heart.opacity,
              color: '#FF6B6B',
              filter: 'drop-shadow(0 0 6px rgba(255,100,100,0.6))',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;