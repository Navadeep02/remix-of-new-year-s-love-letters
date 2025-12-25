import { useMemo } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const hearts = useMemo(() => {
    const items = [];
    const count = 10; // Reduced from 20
    
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        startY: (typeof window !== 'undefined' ? window.innerHeight : 800) + 30 + Math.random() * 200,
        size: 18 + Math.random() * 16,
        duration: 7 + Math.random() * 5,
        delay: i * 0.5,
        opacity: 0.6 + Math.random() * 0.4,
        glowIntensity: 0.5 + Math.random() * 0.5,
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
              filter: `drop-shadow(0 0 ${8 * heart.glowIntensity}px rgba(255,100,100,0.8)) drop-shadow(0 0 ${16 * heart.glowIntensity}px rgba(255,50,50,0.6)) drop-shadow(0 0 ${24 * heart.glowIntensity}px rgba(255,0,0,0.4))`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;