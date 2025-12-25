interface SparkleProps {
  top: string;
  left: string;
  delay?: number;
  size?: number;
}

const Sparkle = ({ top, left, delay = 0, size = 12 }: SparkleProps) => {
  return (
    <svg
      className="absolute animate-sparkle pointer-events-none"
      style={{ top, left, animationDelay: `${delay}ms` }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z"
        fill="hsl(var(--star-yellow))"
        className="drop-shadow-[0_0_4px_hsl(var(--star-yellow))]"
      />
    </svg>
  );
};

export default Sparkle;
