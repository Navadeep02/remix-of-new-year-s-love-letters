interface StarProps {
  size?: number;
  delay?: number;
  top: string;
  left: string;
}

const Star = ({ size = 2, delay = 0, top, left }: StarProps) => {
  return (
    <div
      className="absolute rounded-full bg-star animate-twinkle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top,
        left,
        animationDelay: `${delay}ms`,
        boxShadow: `0 0 ${size * 2}px hsl(var(--star-yellow) / 0.8)`,
      }}
    />
  );
};

export default Star;
