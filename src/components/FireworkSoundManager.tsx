import { useEffect, useRef, useCallback } from 'react';

const FireworkSoundManager = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInitializedRef = useRef(false);

  const playFireworkSound = useCallback(() => {
    if (!audioRef.current) return;
    
    // Clone audio for overlapping sounds
    const sound = audioRef.current.cloneNode() as HTMLAudioElement;
    sound.volume = 0.15 + Math.random() * 0.05;
    sound.playbackRate = 0.9 + Math.random() * 0.2;
    sound.play().catch(() => {});
    
    // Clean up after playing
    sound.onended = () => sound.remove();
  }, []);

  const playFireworkBurst = useCallback(() => {
    // Play 2-3 fireworks with 30 second gaps
    const fireworkCount = 2 + Math.floor(Math.random() * 2); // 2 or 3 fireworks
    
    for (let i = 0; i < fireworkCount; i++) {
      setTimeout(() => {
        playFireworkSound();
      }, i * 30000); // 30 second gap between each
    }
  }, [playFireworkSound]);

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio('/sounds/fireworks.mp3');
    audioRef.current.preload = 'auto';
    
    const handleInteraction = () => {
      if (!isInitializedRef.current) {
        audioRef.current?.load();
        isInitializedRef.current = true;
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
    // Initial burst after a short delay
    const initialTimeout = setTimeout(() => {
      playFireworkBurst();
    }, 1000);

    // Loop: play burst every 30 seconds
    const loopInterval = setInterval(() => {
      playFireworkBurst();
    }, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(loopInterval);
    };
  }, [playFireworkBurst]);

  return null;
};

export default FireworkSoundManager;
