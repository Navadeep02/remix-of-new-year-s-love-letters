import { useEffect, useRef, useCallback } from 'react';

const FireworkSoundManager = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInitializedRef = useRef(false);

  const playFireworkSound = useCallback(() => {
    if (!audioRef.current) return;
    
    // Clone audio for overlapping sounds
    const sound = audioRef.current.cloneNode() as HTMLAudioElement;
    sound.volume = 0.1 + Math.random() * 0.05; // Much lower volume
    sound.playbackRate = 0.9 + Math.random() * 0.2;
    sound.play().catch(() => {});
    
    // Clean up after playing
    sound.onended = () => sound.remove();
  }, []);

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
    const timeouts: NodeJS.Timeout[] = [];
    const intervals: NodeJS.Timeout[] = [];
    
    // Only 4 fireworks have sound - synced with aerial fireworks
    const aerialTimes = [500, 1800, 3500, 5200];
    aerialTimes.forEach((delay) => {
      // Initial sound
      const t = setTimeout(() => playFireworkSound(), delay + 700);
      timeouts.push(t);
      
      // Recurring sound every 8 seconds
      const interval = setInterval(() => {
        playFireworkSound();
      }, 8000);
      intervals.push(interval);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [playFireworkSound]);

  return null;
};

export default FireworkSoundManager;
