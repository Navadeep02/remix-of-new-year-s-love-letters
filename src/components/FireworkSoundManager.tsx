import { useEffect, useRef, useCallback, useState } from 'react';

const FireworkSoundManager = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const playFireworkSound = useCallback(() => {
    if (!audioRef.current || !isUnlocked) return;
    
    try {
      const sound = audioRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.15 + Math.random() * 0.05;
      sound.playbackRate = 0.9 + Math.random() * 0.2;
      
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      
      sound.onended = () => sound.remove();
    } catch (err) {
      console.log('Audio error:', err);
    }
  }, [isUnlocked]);

  const playFireworkBurst = useCallback(() => {
    const fireworkCount = 2 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < fireworkCount; i++) {
      const timeout = window.setTimeout(() => {
        playFireworkSound();
      }, i * 15000);
      timeoutsRef.current.push(timeout);
    }
  }, [playFireworkSound]);

  useEffect(() => {
    const unlockAudio = async () => {
      if (isUnlocked) return;
      
      try {
        // Create AudioContext for mobile unlock
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        // Resume AudioContext (required for mobile)
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        // Create and load audio element
        if (!audioRef.current) {
          audioRef.current = new Audio('/sounds/fireworks.mp3');
          audioRef.current.preload = 'auto';
        }
        
        // Play silent to unlock
        audioRef.current.volume = 0.001;
        audioRef.current.muted = false;
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.15;
          
          setIsUnlocked(true);
          
          // Remove all listeners after unlock
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
          document.removeEventListener('touchend', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
          document.removeEventListener('scroll', unlockAudio);
        }
      } catch (err) {
        console.log('Audio unlock pending, will retry');
      }
    };

    // Preload audio
    audioRef.current = new Audio('/sounds/fireworks.mp3');
    audioRef.current.preload = 'auto';
    audioRef.current.load();

    // Listen on document for better mobile support
    document.addEventListener('click', unlockAudio, { passive: true });
    document.addEventListener('touchstart', unlockAudio, { passive: true });
    document.addEventListener('touchend', unlockAudio, { passive: true });
    document.addEventListener('keydown', unlockAudio, { passive: true });
    document.addEventListener('scroll', unlockAudio, { passive: true });

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('touchend', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('scroll', unlockAudio);
    };
  }, [isUnlocked]);

  useEffect(() => {
    if (!isUnlocked) return;

    const initialTimeout = window.setTimeout(() => {
      playFireworkBurst();
    }, 500);
    timeoutsRef.current.push(initialTimeout);

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
