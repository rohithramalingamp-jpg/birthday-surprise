import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';

export const FloatingMusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const toggleMusic = () => {
    setHasInteracted(true);
    const active = soundManager.toggle(BIRTHDAY_CONFIG.musicUrl);
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      {!hasInteracted && (
        <span className="hidden sm:inline-block text-xs px-2.5 py-1 rounded-full bg-purple-950/70 text-purple-200 border border-purple-500/30 backdrop-blur-md animate-pulse">
          Click for music 🎵
        </span>
      )}
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className="relative group flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
      >
        {isPlaying ? (
          <div className="flex items-center gap-0.5">
            {/* Animated equalizer bars */}
            <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-0.5 h-4 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-0.5 h-2.5 bg-amber-300 rounded-full animate-bounce [animation-delay:-0.45s]" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-purple-200/70 group-hover:text-purple-100 transition-colors" />
        )}

        {/* Ambient halo glow */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-sm pointer-events-none -z-10 animate-pulse" />
        )}
      </button>
    </div>
  );
};
