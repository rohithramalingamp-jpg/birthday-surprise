import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioPlayer';
import { launchGentleHearts } from '../utils/confetti';
import { Sparkles, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface Screen4SurpriseCardsProps {
  onNext: () => void;
}

export const Screen4SurpriseCards: React.FC<Screen4SurpriseCardsProps> = ({ onNext }) => {
  const [openedCards, setOpenedCards] = useState<{ [id: string]: boolean }>({});

  const cards = BIRTHDAY_CONFIG.cards;
  const openedCount = Object.values(openedCards).filter(Boolean).length;
  const isAllUnlocked = openedCount === cards.length;

  const toggleCard = (cardId: string) => {
    soundManager.playChimeEffect('sparkle');
    setOpenedCards((prev) => {
      const next = { ...prev, [cardId]: !prev[cardId] };
      // Check if all cards will be opened
      const nextOpenedCount = Object.values(next).filter(Boolean).length;
      if (nextOpenedCount === cards.length) {
        launchGentleHearts();
      }
      return next;
    });
  };

  const handleProceed = () => {
    soundManager.playChimeEffect('pop');
    onNext();
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16"
    >
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-200 text-xs uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Gifts</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Three Little Surprises
          </h2>

          <p className="text-sm sm:text-base text-purple-200/70 max-w-md mx-auto">
            {isAllUnlocked
              ? '✨ All gifts unlocked! Ready for the grand countdown?'
              : 'Tap each card below to uncover what is inside:'}
          </p>

          {/* Progress pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-white/10 text-xs text-slate-300">
            <span>Opened:</span>
            <span className="font-semibold text-pink-300">{openedCount} / {cards.length}</span>
            {isAllUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
        </div>

        {/* The 3 Surprise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
          {cards.map((card, idx) => {
            const isOpen = !!openedCards[card.id];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="perspective-1000"
              >
                <div
                  onClick={() => toggleCard(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCard(card.id);
                    }
                  }}
                  className={`group relative min-h-[260px] sm:min-h-[290px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-500 select-none overflow-hidden ${
                    isOpen
                      ? 'bg-gradient-to-b from-purple-950/80 to-[#1e0d38]/90 border border-pink-400/40 shadow-[0_15px_35px_rgba(236,72,153,0.25)] ring-1 ring-pink-400/20'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-pink-300/30 shadow-xl hover:shadow-2xl hover:-translate-y-1'
                  } backdrop-blur-xl`}
                >
                  {/* Subtle Card Ambient Glow */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${card.glowColor} blur-2xl pointer-events-none transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'}`} />

                  {/* Top card metadata: Badge & Icon */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-xs font-mono tracking-wider text-purple-300/50 group-hover:text-purple-300">
                      {card.badge}
                    </span>
                    <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                      {card.icon}
                    </span>
                  </div>

                  {/* Card Content: Front vs Revealed */}
                  <div className="my-auto py-4 z-10">
                    <AnimatePresence mode="wait">
                      {!isOpen ? (
                        <motion.div
                          key="closed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-2 text-center"
                        >
                          <h3
                            className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-200 transition-colors"
                            style={{ fontFamily: "'Cinzel', serif" }}
                          >
                            {card.title}
                          </h3>
                          <p className="text-xs text-purple-200/60 font-sans flex items-center justify-center gap-1">
                            <span>{card.subtitle}</span>
                            <span className="text-pink-400 group-hover:translate-x-0.5 transition-transform">→</span>
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="open"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 text-center"
                        >
                          <span className="inline-block text-xs uppercase tracking-widest text-pink-300 font-medium mb-1">
                            {card.title}
                          </span>
                          <p
                            className="text-base sm:text-lg text-slate-100 font-serif leading-relaxed italic"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            &ldquo;{card.secretMessage}&rdquo;
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom indicator */}
                  <div className="z-10 flex items-center justify-center pt-2 border-t border-white/5">
                    {isOpen ? (
                      <span className="text-xs text-pink-300 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                        <span>Revealed</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-slate-200 transition-colors">
                        <Lock className="w-3 h-3 text-purple-400/70" />
                        <span>Tap to open</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Unlocked Action Button */}
        <div className="flex flex-col items-center">
          <AnimatePresence>
            {isAllUnlocked ? (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={handleProceed}
                  type="button"
                  className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 hover:opacity-95 text-white font-semibold text-base sm:text-lg shadow-[0_0_30px_rgba(244,114,182,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Step Into The Countdown</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-xs sm:text-sm text-purple-200/50 italic"
              >
                (Open all 3 cards above to unlock the final surprise)
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};
