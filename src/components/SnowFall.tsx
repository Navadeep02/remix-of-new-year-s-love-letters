import { useMemo } from 'react';

const SnowFall = () => {
  // Reduced to 40 snowflakes with shared keyframes for better performance
  const snowflakes = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 2 + Math.random() * 4,
      opacity: 0.4 + Math.random() * 0.4,
      driftClass: i % 3, // Use 3 shared animation classes instead of unique ones
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[3] pointer-events-none overflow-hidden">
      <style>{`
        @keyframes snowfall-drift0 {
          0% { transform: translateY(-10px) translateX(0px); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) translateX(-10px); opacity: 0; }
        }
        @keyframes snowfall-drift1 {
          0% { transform: translateY(-10px) translateX(0px); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100vh) translateX(15px); opacity: 0; }
        }
        @keyframes snowfall-drift2 {
          0% { transform: translateY(-10px) translateX(0px); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(100vh) translateX(-8px); opacity: 0; }
        }
      `}</style>
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
            animation: `snowfall-drift${flake.driftClass} ${flake.duration}s linear ${flake.delay}s infinite`,
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default SnowFall;