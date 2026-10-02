import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { launchBirthdayConfetti, launchGentleHearts } from '../utils/confetti';
import { soundManager } from '../utils/audioPlayer';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';

interface Screen2RevealProps {
  onNext: () => void;
}

export const Screen2Reveal: React.FC<Screen2RevealProps> = ({ onNext }) => {
  useEffect(() => {
    // Grand celebration burst upon arrival
    launchBirthdayConfetti();
    soundManager.playChimeEffect('sparkle');

    const timeout = setTimeout(() => {
      launchGentleHearts();
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const handleNext = () => {
    soundManager.playChimeEffect('pop');
    onNext();
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8">
        {/* Subtle kicker tagline */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20 backdrop-blur-md text-pink-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:8s]" />
          <span>{BIRTHDAY_CONFIG.screen2.tagline}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:8s]" />
        </motion.div>

        {/* Large animated typography: HAPPY BIRTHDAY */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-2 sm:space-y-3"
        >
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-purple-200/80 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {BIRTHDAY_CONFIG.screen2.revealTitle}
          </h2>

          {/* Recipient name with warm gold & rose shimmer */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
          >
            <span
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300 drop-shadow-[0_0_35px_rgba(244,114,182,0.4)]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {BIRTHDAY_CONFIG.recipientName.toUpperCase()}
            </span>
            <motion.span
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, -6, 6, 0],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-rose-500 inline-block text-4xl sm:text-6xl"
            >
              {BIRTHDAY_CONFIG.screen2.nameSuffix}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-xl sm:text-3xl text-purple-200/90 font-serif italic"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {BIRTHDAY_CONFIG.screen2.subtitle}
        </motion.p>

        {/* Interactive Floating Hearts decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex items-center gap-3 py-2 text-pink-400/60"
        >
          <Heart className="w-4 h-4 fill-pink-500/40 animate-pulse" />
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />
          <Heart className="w-4 h-4 fill-purple-500/40 animate-pulse [animation-delay:0.5s]" />
        </motion.div>

        {/* Button: There's More ✨ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="pt-2 sm:pt-4"
        >
          <button
            onClick={handleNext}
            type="button"
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-500/90 to-purple-600/90 hover:from-pink-500 hover:to-purple-600 text-white font-medium text-base sm:text-lg shadow-[0_4px_25px_rgba(236,72,153,0.4)] hover:shadow-[0_6px_35px_rgba(236,72,153,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{BIRTHDAY_CONFIG.screen2.buttonLabel}</span>
            <ChevronRight className="w-5 h-5 text-pink-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};
