import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioPlayer';
import { launchFireworks, launchBirthdayConfetti } from '../utils/confetti';

interface Screen5CountdownProps {
  onComplete: () => void;
}

export const Screen5Countdown: React.FC<Screen5CountdownProps> = ({ onComplete }) => {
  // Phase 1: "Wait...", Phase 2: Countdown numbers 3, 2, 1, Phase 3: "NOW! 🎉"
  const [phase, setPhase] = useState<'wait' | 'counting' | 'blast'>('wait');
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    // Step 1: Show "Wait..." for 1.5 seconds
    const waitTimer = setTimeout(() => {
      setPhase('counting');
      soundManager.playChimeEffect('pop');
    }, 1600);

    return () => clearTimeout(waitTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'counting') return;

    if (count > 1) {
      const countdownTimer = setTimeout(() => {
        soundManager.playChimeEffect('pop');
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(countdownTimer);
    } else if (count === 1) {
      const finishTimer = setTimeout(() => {
        setPhase('blast');
        soundManager.playChimeEffect('sparkle');
        launchFireworks(3500);
        launchBirthdayConfetti();

        // Transition to Screen 6 after fireworks launch
        setTimeout(() => {
          onComplete();
        }, 1500);
      }, 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [phase, count, onComplete]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center select-none"
    >
      <div className="max-w-lg mx-auto flex flex-col items-center justify-center space-y-6">
        <AnimatePresence mode="wait">
          {phase === 'wait' && (
            <motion.div
              key="wait"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-purple-200"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {BIRTHDAY_CONFIG.screen5.prompt}
              </h2>
              <p className="text-sm sm:text-base text-purple-300/60 font-serif italic">
                {BIRTHDAY_CONFIG.screen5.revealNotice}
              </p>
            </motion.div>
          )}

          {phase === 'counting' && (
            <motion.div
              key={`count-${count}`}
              initial={{ scale: 0.3, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 1.8, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Glowing countdown ring */}
              <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-pink-500/40 bg-pink-500/5 animate-ping pointer-events-none" />
              <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 blur-xl pointer-events-none" />

              <span
                className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-200 to-amber-300 drop-shadow-[0_0_40px_rgba(244,114,182,0.6)]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {count}
              </span>
            </motion.div>
          )}

          {phase === 'blast' && (
            <motion.div
              key="blast"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <h2
                className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-200 animate-pulse"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                HAPPY BIRTHDAY! ✨
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
