import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundManager } from '../utils/audioPlayer';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

interface Screen3PersonalMessageProps {
  onNext: () => void;
}

export const Screen3PersonalMessage: React.FC<Screen3PersonalMessageProps> = ({ onNext }) => {
  // Line-by-line reveal tracking for cinematic reading pacing
  const [visibleLinesCount, setVisibleLinesCount] = useState<number>(1);
  const totalLines = BIRTHDAY_CONFIG.screen3.paragraphs.length;

  useEffect(() => {
    if (visibleLinesCount < totalLines) {
      const timer = setTimeout(() => {
        setVisibleLinesCount((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [visibleLinesCount, totalLines]);

  const handleNext = () => {
    soundManager.playChimeEffect('pop');
    onNext();
  };

  const handleRevealAll = () => {
    setVisibleLinesCount(totalLines);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16"
    >
      <div className="max-w-2xl w-full mx-auto">
        {/* Glassmorphic letter card */}
        <div className="relative rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle decorative inner corner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-pink-500/10 via-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 via-purple-500/5 to-transparent rounded-tr-full pointer-events-none" />

          {/* Letter Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-400/20 flex items-center justify-center text-pink-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <span>{BIRTHDAY_CONFIG.screen3.heading}</span>
                </h3>
                <p className="text-xs text-purple-200/60 font-sans">
                  From someone who appreciates you
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-amber-300/80 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              <Sparkles className="w-3 h-3" />
              <span>For Shamili</span>
            </div>
          </div>

          {/* Line-by-line animated message */}
          <div className="space-y-4 sm:space-y-5 text-slate-100 font-serif leading-relaxed text-base sm:text-xl md:text-2xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {BIRTHDAY_CONFIG.screen3.paragraphs.map((paragraph, index) => {
              const isVisible = index < visibleLinesCount;

              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`${
                    paragraph.includes(BIRTHDAY_CONFIG.recipientName)
                      ? 'text-pink-200 font-semibold'
                      : 'text-purple-100/90'
                  } ${!isVisible ? 'hidden' : ''}`}
                >
                  {paragraph}
                </motion.p>
              );
            })}
          </div>

          {/* Controls: Skip typing / Next button */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {visibleLinesCount < totalLines ? (
              <button
                type="button"
                onClick={handleRevealAll}
                className="text-xs text-purple-300/70 hover:text-purple-200 underline underline-offset-4 cursor-pointer"
              >
                Read entire note at once
              </button>
            ) : (
              <span className="text-xs text-purple-300/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Note revealed completely
              </span>
            )}

            <button
              onClick={handleNext}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-pink-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{BIRTHDAY_CONFIG.screen3.buttonLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
