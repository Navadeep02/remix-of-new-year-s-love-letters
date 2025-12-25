import { useMemo } from 'react';

const SnowFall = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 6,
      size: 2 + Math.random() * 5,
      opacity: 0.5 + Math.random() * 0.4,
      drift: -15 + Math.random() * 30,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[3] pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.left}%`,
            top: '-10px',
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `snowfall-${flake.id} ${flake.duration}s linear ${flake.delay}s infinite`,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.7)',
          }}
        />
      ))}
      <style>{`
        ${snowflakes.map((flake) => `
          @keyframes snowfall-${flake.id} {
            0% {
              transform: translateY(-10px) translateX(0px);
              opacity: 0;
            }
            10% {
              opacity: ${flake.opacity};
            }
            90% {
              opacity: ${flake.opacity};
            }
            100% {
              transform: translateY(100vh) translateX(${flake.drift}px);
              opacity: 0;
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default SnowFall;
