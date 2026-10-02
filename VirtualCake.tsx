import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/audioPlayer';
import { launchGentleHearts } from '../utils/confetti';
import { Sparkles, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

export const VirtualCake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [blownCount, setBlownCount] = useState<number>(0);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setBlownCount((prev) => prev + 1);
    soundManager.playChimeEffect('sparkle');
    launchGentleHearts();
  };

  const handleRelight = () => {
    soundManager.playChimeEffect('pop');
    setCandlesLit(true);
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl text-center">
      {/* Cake Title */}
      <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold uppercase tracking-widest text-pink-300">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Virtual Birthday Cake</span>
      </div>

      {/* Interactive Cake Illustration */}
      <div
        onClick={candlesLit ? handleBlowCandles : undefined}
        className={`relative my-6 mx-auto w-64 h-48 flex flex-col items-center justify-end select-none ${
          candlesLit ? 'cursor-pointer group' : 'cursor-default'
        }`}
      >
        {/* Candles Container */}
        <div className="flex items-end justify-center gap-8 mb-1 z-20">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <AnimatePresence>
                {candlesLit ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.15, 0.9, 1.1],
                      y: [0, -2, 1, 0],
                      opacity: [0.9, 1, 0.85, 1],
                    }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + i * 0.15,
                      ease: 'easeInOut',
                    }}
                    className="relative w-4 h-6 mb-0.5 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_15px_#f59e0b] group-hover:scale-125 transition-transform"
                  >
                    <div className="absolute inset-0 bg-yellow-200 blur-sm rounded-full opacity-60 animate-ping [animation-duration:2s]" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -20, x: (i - 1) * 6 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="text-xs text-slate-400 select-none pb-1"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Stick */}
              <div className="w-3 h-10 rounded-t-sm bg-gradient-to-b from-pink-300 via-purple-300 to-pink-400 border border-white/20 shadow-inner" />
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top) */}
        <div className="relative w-44 h-12 rounded-t-2xl bg-gradient-to-r from-pink-400/90 via-purple-400/90 to-pink-400/90 border border-white/20 shadow-lg flex items-center justify-around px-4 z-10">
          <span className="w-2 h-2 rounded-full bg-white/70 shadow-sm" />
          <span className="w-2 h-2 rounded-full bg-amber-200/90 shadow-sm" />
          <span className="w-2 h-2 rounded-full bg-white/70 shadow-sm" />
          <span className="w-2 h-2 rounded-full bg-amber-200/90 shadow-sm" />
        </div>

        {/* Cake Tier 2 (Bottom Base) */}
        <div className="relative w-56 h-16 rounded-2xl -mt-1 bg-gradient-to-r from-[#2a134a] via-[#3d186b] to-[#2a134a] border border-pink-400/30 shadow-2xl flex items-center justify-around px-6 overflow-hidden">
          {/* Frosting drips */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-pink-300/40 rounded-b-xl" />
          <div className="text-xs text-pink-200/70 tracking-widest uppercase font-mono">
            {BIRTHDAY_CONFIG.recipientName}
          </div>
        </div>

        {/* Cake Plate */}
        <div className="w-64 h-3.5 rounded-full bg-gradient-to-r from-amber-200/40 via-white/50 to-amber-200/40 border border-white/30 -mt-1 shadow-md" />
      </div>

      {/* Prompt or Congratulations */}
      <div className="mt-4">
        {candlesLit ? (
          <div className="space-y-2">
            <p className="text-sm text-purple-200/90 font-serif italic">
              {BIRTHDAY_CONFIG.extras.cakeWishPrompt}
            </p>
            <button
              onClick={handleBlowCandles}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-pink-200 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Tap Here to Blow Candles 🎂</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-sm sm:text-base text-amber-200 font-serif italic">
              {BIRTHDAY_CONFIG.extras.blownCandlesMessage}
            </p>
            <button
              onClick={handleRelight}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Light them again</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
