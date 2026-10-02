import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/audioPlayer';
import { launchGentleHearts } from '../utils/confetti';
import { Sparkles, Stars, RefreshCw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

export const WishJar: React.FC = () => {
  const wishes = BIRTHDAY_CONFIG.extras.wishJarMessages;
  const [currentWishIndex, setCurrentWishIndex] = useState<number>(0);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

  const drawNextWish = () => {
    soundManager.playChimeEffect('sparkle');
    launchGentleHearts();
    setHasDrawn(true);
    setCurrentWishIndex((prev) => (prev + 1) % wishes.length);
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-xl text-center">
      <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-amber-300">
        <Stars className="w-3.5 h-3.5 text-amber-300" />
        <span>Cosmic Wish Jar</span>
      </div>

      <p className="text-xs text-purple-200/70 mb-4">
        Tap the jar to pull a personal wish written for you:
      </p>

      {/* Wish Display Area */}
      <div className="min-h-[80px] flex items-center justify-center p-4 rounded-2xl bg-black/20 border border-white/5 mb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentWishIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm sm:text-base text-slate-100 font-serif leading-relaxed italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            &ldquo;{wishes[currentWishIndex]}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        onClick={drawNextWish}
        type="button"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/30 text-purple-200 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
      >
        <RefreshCw className="w-3 h-3 text-pink-300" />
        <span>{hasDrawn ? 'Pull Another Wish ✨' : 'Draw A Wish 🌟'}</span>
      </button>
    </div>
  );
};
