import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioPlayer';
import { launchFireworks, launchBirthdayConfetti, launchConfettiCannons } from '../utils/confetti';
import { VirtualCake } from './VirtualCake';
import { WishJar } from './WishJar';
import { Sparkles, Heart, Flame, RotateCcw, PartyPopper } from 'lucide-react';

interface Screen6FinalCelebrationProps {
  onRestart: () => void;
}

export const Screen6FinalCelebration: React.FC<Screen6FinalCelebrationProps> = ({ onRestart }) => {
  // Automatically trigger the celebratory confetti cannon effect upon arriving at this final screen!
  useEffect(() => {
    soundManager.playChimeEffect('sparkle');
    // Launch initial cannon barrage
    launchConfettiCannons();

    // Additional celebratory wave after a short interval
    const timeout = setTimeout(() => {
      launchBirthdayConfetti();
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  const handleFireCannons = () => {
    soundManager.playChimeEffect('sparkle');
    launchConfettiCannons();
  };

  const handleLaunchMoreFireworks = () => {
    soundManager.playChimeEffect('sparkle');
    launchFireworks(2500);
    launchBirthdayConfetti();
  };

  const handleRestart = () => {
    soundManager.playChimeEffect('pop');
    onRestart();
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center"
    >
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center space-y-6 sm:space-y-8">
        {/* Subtle kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs uppercase tracking-widest backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>The Grand Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        {/* Large centered main heading: "Happy Birthday, Shamili ❤️" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-2"
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300 drop-shadow-[0_0_35px_rgba(244,114,182,0.4)]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {BIRTHDAY_CONFIG.screen6.mainHeading}
          </h1>
        </motion.div>

        {/* Lead Blessing Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-2xl text-purple-100/90 font-serif leading-relaxed italic max-w-xl mx-auto"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          &ldquo;{BIRTHDAY_CONFIG.screen6.leadParagraph}&rdquo;
        </motion.p>

        {/* Affirmation: "Keep smiling. Keep being you. ✨" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="py-1"
        >
          <p
            className="text-xl sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-amber-200"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {BIRTHDAY_CONFIG.screen6.affirmation}
          </p>
        </motion.div>

        {/* Interactive Virtual Cake Section */}
        {BIRTHDAY_CONFIG.extras.showCake && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="w-full"
          >
            <VirtualCake />
          </motion.div>
        )}

        {/* Cosmic Wish Jar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="w-full"
        >
          <WishJar />
        </motion.div>

        {/* Interactive Celebration Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
        >
          <button
            onClick={handleFireCannons}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/80 via-rose-500/80 to-purple-600/80 hover:opacity-95 text-white text-sm font-semibold shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <PartyPopper className="w-4 h-4 text-amber-200" />
            <span>Fire Cannons 🎊</span>
          </button>

          <button
            onClick={handleLaunchMoreFireworks}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/80 to-purple-600/80 hover:from-pink-500 hover:to-purple-600 text-white text-sm font-medium shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Launch Fireworks 🎆</span>
          </button>

          <button
            onClick={handleRestart}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-purple-300" />
            <span>Replay Experience</span>
          </button>
        </motion.div>

        {/* Footer Signoff & Animated Heart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="pt-8 pb-12 flex flex-col items-center gap-2 text-xs text-purple-300/60"
        >
          <div className="flex items-center gap-2">
            <span>{BIRTHDAY_CONFIG.screen6.footerSignoff}</span>
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
              }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
            </motion.div>
          </div>
          <span className="text-[11px] text-purple-400/40">
            A small digital universe created specially for tomorrow
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};
