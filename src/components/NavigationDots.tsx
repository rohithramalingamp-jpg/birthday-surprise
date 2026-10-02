import React from 'react';

interface NavigationDotsProps {
  currentScreen: number;
  maxUnlockedScreen: number;
  onSelectScreen: (screen: number) => void;
}

const SCREEN_LABELS = [
  'Mystery',
  'Birthday Reveal',
  'Personal Letter',
  'Three Gifts',
  'Countdown',
  'Celebration',
];

export const NavigationDots: React.FC<NavigationDotsProps> = ({
  currentScreen,
  maxUnlockedScreen,
  onSelectScreen,
}) => {
  // Only show navigation dots once they have passed screen 1 (to keep screen 1 pure mystery)
  if (currentScreen === 1 && maxUnlockedScreen === 1) {
    return null;
  }

  return (
    <nav
      aria-label="Experience Chapters"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl shadow-lg"
    >
      {[1, 2, 3, 4, 5, 6].map((num) => {
        const isCurrent = currentScreen === num;
        const isUnlocked = num <= maxUnlockedScreen;

        return (
          <button
            key={num}
            onClick={() => isUnlocked && onSelectScreen(num)}
            disabled={!isUnlocked}
            title={SCREEN_LABELS[num - 1]}
            className={`group relative flex items-center justify-center transition-all duration-300 ${
              isCurrent
                ? 'w-7 sm:w-8 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 shadow-[0_0_12px_rgba(244,114,182,0.8)]'
                : isUnlocked
                ? 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/80 hover:scale-125 cursor-pointer'
                : 'w-1.5 h-1.5 rounded-full bg-white/10 cursor-not-allowed'
            }`}
            aria-label={`Go to chapter ${num}: ${SCREEN_LABELS[num - 1]}`}
          />
        );
      })}
    </nav>
  );
};
