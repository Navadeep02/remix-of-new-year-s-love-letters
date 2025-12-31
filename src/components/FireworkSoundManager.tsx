import { useEffect, useRef, useCallback, useState } from 'react';

const FireworkSoundManager = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const playFireworkSound = useCallback(() => {
    if (!audioRef.current || !isUnlocked) return;
    
    try {
      // Clone audio for overlapping sounds
      const sound = audioRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.15 + Math.random() * 0.05;
      sound.playbackRate = 0.9 + Math.random() * 0.2;
      
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Audio play failed:', err);
        });
      }
      
      // Clean up after playing
      sound.onended = () => sound.remove();
    } catch (err) {
      console.log('Audio error:', err);
    }
  }, [isUnlocked]);

  const playFireworkBurst = useCallback(() => {
    // Play 2-3 fireworks with 15 second gaps
    const fireworkCount = 2 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < fireworkCount; i++) {
      const timeout = window.setTimeout(() => {
        playFireworkSound();
      }, i * 15000);
      timeoutsRef.current.push(timeout);
    }
  }, [playFireworkSound]);

  // Unlock audio on first user interaction
  useEffect(() => {
    const unlockAudio = async () => {
      if (isUnlocked) return;
      
      // Create and load audio element
      if (!audioRef.current) {
        audioRef.current = new Audio('/sounds/fireworks.mp3');
        audioRef.current.preload = 'auto';
      }
      
      try {
        // Try to play a silent version to unlock
        audioRef.current.volume = 0;
        await audioRef.current.play();
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.15;
        
        setIsUnlocked(true);
        
        // Remove listeners after unlock
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('touchend', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      } catch (err) {
        console.log('Audio unlock failed, will retry on next interaction');
      }
    };

    // Preload audio
    audioRef.current = new Audio('/sounds/fireworks.mp3');
    audioRef.current.preload = 'auto';
    audioRef.current.load();

    // Listen for various user interactions
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('touchend', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('touchend', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [isUnlocked]);

  // Start playing sounds once unlocked
  useEffect(() => {
    if (!isUnlocked) return;

    // Initial burst after unlock
    const initialTimeout = window.setTimeout(() => {
      playFireworkBurst();
    }, 500);
    timeoutsRef.current.push(initialTimeout);

    // Loop: play burst every 15 seconds
    const loopInterval = window.setInterval(() => {
      playFireworkBurst();
    }, 15000);

    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
      timeoutsRef.current = [];
      clearInterval(loopInterval);
    };
  }, [isUnlocked, playFireworkBurst]);

  return null;
};

export default FireworkSoundManager;
