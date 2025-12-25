interface LanternProps {
  delay?: number;
  size?: number;
  startX: number;
  startY: number;
  duration: number;
}

const Lantern = ({ delay = 0, size = 40, startX, startY, duration }: LanternProps) => {
  const uniqueId = `lantern-${startX}-${startY}`;
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: startX,
        top: startY,
        width: size,
        height: size * 1.3,
        animation: `floatUp ${duration}s linear ${delay}s infinite`,
        willChange: 'transform',
      }}
    >
      {/* Soft outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          transform: 'scale(2)',
          background: 'radial-gradient(circle, rgba(255,180,80,0.2) 0%, rgba(255,140,50,0.08) 50%, transparent 70%)',
          filter: 'blur(8px)',
          animation: 'glowPulse 2s ease-in-out infinite',
        }}
      />

      {/* Lantern body */}
      <div
        className="absolute inset-[5%] rounded-[50%_50%_45%_45%]"
        style={{
          background: 'linear-gradient(180deg, #FFE4B5 0%, #FFB347 40%, #E85A0C 100%)',
          boxShadow: `
            0 0 ${size * 0.4}px rgba(255,160,60,0.5),
            0 0 ${size * 0.8}px rgba(255,120,40,0.2),
            inset 0 -${size * 0.2}px ${size * 0.3}px rgba(200,80,20,0.3),
            inset 0 ${size * 0.15}px ${size * 0.2}px rgba(255,255,200,0.2)
          `,
        }}
      />

      {/* Inner flame glow */}
      <div
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.35,
          height: size * 0.45,
          background: 'radial-gradient(ellipse at center 60%, #FFFACD 0%, rgba(255,200,100,0.6) 40%, transparent 70%)',
          animation: 'flamePulse 0.8s ease-in-out infinite',
        }}
      />

      {/* Top rim */}
      <div
        className="absolute top-[4%] left-[20%] right-[20%] h-[10%] rounded-t-full"
        style={{ background: 'linear-gradient(180deg, #8B4513 0%, #654321 100%)' }}
      />

      {/* Bottom rim */}
      <div
        className="absolute bottom-[2%] left-[25%] right-[25%] h-[8%] rounded-b-full"
        style={{ background: 'linear-gradient(0deg, #8B4513 0%, #654321 100%)' }}
      />
    </div>
  );
};

export default Lantern;
