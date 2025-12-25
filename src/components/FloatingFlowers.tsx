import { useMemo } from 'react';

interface FlowerProps {
  type: 'sunflower' | 'rose' | 'tulip' | 'daisy';
  startX: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
}

const Flower = ({ type, startX, startY, size, duration, delay }: FlowerProps) => {
  const renderFlower = () => {
    switch (type) {
      case 'sunflower':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* Petals */}
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse
                key={i}
                cx="50"
                cy="20"
                rx="8"
                ry="18"
                fill="#FFD700"
                transform={`rotate(${i * 30} 50 50)`}
                style={{ filter: 'drop-shadow(0 0 2px rgba(255,200,0,0.5))' }}
              />
            ))}
            {/* Center */}
            <circle cx="50" cy="50" r="15" fill="#8B4513" />
            <circle cx="50" cy="50" r="12" fill="#654321" />
            {/* Seeds pattern */}
            {Array.from({ length: 8 }).map((_, i) => (
              <circle key={i} cx={45 + (i % 3) * 5} cy={45 + Math.floor(i / 3) * 5} r="1.5" fill="#3D2914" />
            ))}
          </svg>
        );
      case 'rose':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* Outer petals */}
            <ellipse cx="50" cy="35" rx="18" ry="22" fill="#DC143C" transform="rotate(-20 50 50)" />
            <ellipse cx="50" cy="35" rx="18" ry="22" fill="#B22222" transform="rotate(20 50 50)" />
            <ellipse cx="35" cy="50" rx="16" ry="20" fill="#CD5C5C" transform="rotate(-45 50 50)" />
            <ellipse cx="65" cy="50" rx="16" ry="20" fill="#CD5C5C" transform="rotate(45 50 50)" />
            {/* Inner petals */}
            <ellipse cx="50" cy="45" rx="12" ry="15" fill="#FF6B6B" />
            <ellipse cx="45" cy="50" rx="10" ry="12" fill="#FF4444" transform="rotate(-30 50 50)" />
            <ellipse cx="55" cy="50" rx="10" ry="12" fill="#FF4444" transform="rotate(30 50 50)" />
            {/* Center */}
            <circle cx="50" cy="52" r="6" fill="#8B0000" />
            <circle cx="50" cy="52" r="3" fill="#FFD700" />
          </svg>
        );
      case 'tulip':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* Petals */}
            <ellipse cx="50" cy="40" rx="12" ry="25" fill="#FF69B4" />
            <ellipse cx="38" cy="45" rx="10" ry="22" fill="#FF1493" />
            <ellipse cx="62" cy="45" rx="10" ry="22" fill="#FF1493" />
            {/* Stem */}
            <rect x="47" y="60" width="6" height="30" fill="#228B22" rx="3" />
            {/* Leaves */}
            <ellipse cx="40" cy="78" rx="12" ry="5" fill="#32CD32" transform="rotate(-30 40 78)" />
            <ellipse cx="60" cy="78" rx="12" ry="5" fill="#32CD32" transform="rotate(30 60 78)" />
          </svg>
        );
      case 'daisy':
        return (
          <svg viewBox="0 0 100 100" width={size} height={size}>
            {/* White petals */}
            {Array.from({ length: 10 }).map((_, i) => (
              <ellipse
                key={i}
                cx="50"
                cy="25"
                rx="6"
                ry="18"
                fill="white"
                transform={`rotate(${i * 36} 50 50)`}
                style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.2))' }}
              />
            ))}
            {/* Yellow center */}
            <circle cx="50" cy="50" r="12" fill="#FFD700" />
            <circle cx="50" cy="50" r="8" fill="#FFA500" />
          </svg>
        );
    }
  };

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: startX,
        top: startY,
        animation: `floatUpSway ${duration}s linear ${delay}s infinite`,
        willChange: 'transform',
      }}
    >
      <div style={{ animation: `spinSlow ${8 + Math.random() * 4}s linear infinite` }}>
        {renderFlower()}
      </div>
    </div>
  );
};

const FloatingFlowers = () => {
  const flowers = useMemo(() => {
    const items: Array<FlowerProps & { id: number }> = [];
    const types: FlowerProps['type'][] = ['sunflower', 'rose', 'tulip', 'daisy'];
    const count = 6; // Reduced from 12
    
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        type: types[i % types.length],
        startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        startY: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50 + Math.random() * 300,
        size: 30 + Math.random() * 20,
        duration: 10 + Math.random() * 8,
        delay: i * 1,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 z-[4] pointer-events-none overflow-hidden">
      {flowers.map((flower) => (
        <Flower key={flower.id} {...flower} />
      ))}
    </div>
  );
};

export default FloatingFlowers;
