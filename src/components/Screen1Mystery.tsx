import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioPlayer';
import { launchGentleHearts } from '../utils/confetti';
import { Sparkles } from 'lucide-react';

interface Screen1MysteryProps {
  onNext: () => void;
}

export const Screen1Mystery: React.FC<Screen1MysteryProps> = ({ onNext }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    soundManager.playChimeEffect('sparkle');
    launchGentleHearts();

    // Smooth delay before unlocking screen 2
    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center select-none"
    >
      <div className="max-w-xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8">
        {/* Subtle decorative badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-purple-200/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>A Private Message</span>
        </motion.div>

        {/* Main mysterious headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-sm"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {BIRTHDAY_CONFIG.screen1.greeting}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-lg sm:text-2xl text-purple-200/80 font-serif italic max-w-md"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {BIRTHDAY_CONFIG.screen1.subtext}
        </motion.p>

        {/* Glowing Mystery Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-4 sm:pt-6"
        >
          <div className="relative group">
            {/* Pulsing neon glow behind button */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 opacity-60 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none" />

            <button
              onClick={handleStart}
              disabled={isTransitioning}
              type="button"
              className="relative px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-[#140827] hover:bg-[#1a0b33] text-white font-medium text-base sm:text-lg border border-pink-400/40 shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300 transform group-hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <span className="bg-gradient-to-r from-pink-200 via-white to-amber-200 bg-clip-text text-transparent font-semibold tracking-wide">
                {isTransitioning ? "Opening..." : BIRTHDAY_CONFIG.screen1.buttonLabel}
              </span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-pink-300"
              >
                ✨
              </motion.span>
            </button>
          </div>
        </motion.div>

        {/* Ambient hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xs text-slate-400 tracking-wider uppercase pt-2"
        >
          Best experienced with sound on
        </motion.p>
      </div>
    </motion.section>
  );
};
