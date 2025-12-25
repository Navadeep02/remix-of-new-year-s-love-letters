import { useMemo } from 'react';
import Star from './Star';
import Sparkle from './Sparkle';

const StarryBackground = () => {
  // Keep these stable for the whole session (prevents unnecessary DOM churn).
  const stars = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3000,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      })),
    []
  );

  const sparkles = useMemo(
    () => [
      { top: '15%', left: '22%', delay: 0 },
      { top: '28%', left: '78%', delay: 900 },
      { top: '62%', left: '12%', delay: 1700 },
      { top: '82%', left: '70%', delay: 2400 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 gradient-night overflow-hidden z-0">
      {/* Stars */}
      {stars.map((star) => (
        <Star key={star.id} size={star.size} delay={star.delay} top={star.top} left={star.left} />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle, index) => (
        <Sparkle key={index} top={sparkle.top} left={sparkle.left} delay={sparkle.delay} />
      ))}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-night-deep/55 via-transparent to-transparent" />
    </div>
  );
};

export default StarryBackground;

