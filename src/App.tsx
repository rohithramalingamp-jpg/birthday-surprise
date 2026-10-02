/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ParticleBackground } from './components/ParticleBackground';
import { FloatingMusicToggle } from './components/FloatingMusicToggle';
import { NavigationDots } from './components/NavigationDots';
import { Screen1Mystery } from './components/Screen1Mystery';
import { Screen2Reveal } from './components/Screen2Reveal';
import { Screen3PersonalMessage } from './components/Screen3PersonalMessage';
import { Screen4SurpriseCards } from './components/Screen4SurpriseCards';
import { Screen5Countdown } from './components/Screen5Countdown';
import { Screen6FinalCelebration } from './components/Screen6FinalCelebration';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [maxUnlockedScreen, setMaxUnlockedScreen] = useState<number>(1);

  // Automatically scroll to top on screen transitions for a clean presentation
  const goToScreen = (screenNumber: number) => {
    setCurrentScreen(screenNumber);
    if (screenNumber > maxUnlockedScreen) {
      setMaxUnlockedScreen(screenNumber);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextFromScreen1 = () => goToScreen(2);
  const handleNextFromScreen2 = () => goToScreen(3);
  const handleNextFromScreen3 = () => goToScreen(4);
  const handleNextFromScreen4 = () => goToScreen(5);
  const handleCompleteCountdown = () => goToScreen(6);
  const handleRestart = () => {
    goToScreen(1);
  };

  return (
    <main className="relative min-h-screen bg-[#07020d] text-slate-100 overflow-x-hidden selection:bg-pink-500/30 selection:text-pink-200">
      {/* Dynamic Midnight / Deep Purple Ambient Starry Particle Canvas */}
      <ParticleBackground />

      {/* Floating Music Button (Top Right) */}
      <FloatingMusicToggle />

      {/* Step-by-Step Experience Screens */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <Screen1Mystery key="screen-1" onNext={handleNextFromScreen1} />
          )}

          {currentScreen === 2 && (
            <Screen2Reveal key="screen-2" onNext={handleNextFromScreen2} />
          )}

          {currentScreen === 3 && (
            <Screen3PersonalMessage key="screen-3" onNext={handleNextFromScreen3} />
          )}

          {currentScreen === 4 && (
            <Screen4SurpriseCards key="screen-4" onNext={handleNextFromScreen4} />
          )}

          {currentScreen === 5 && (
            <Screen5Countdown key="screen-5" onComplete={handleCompleteCountdown} />
          )}

          {currentScreen === 6 && (
            <Screen6FinalCelebration key="screen-6" onRestart={handleRestart} />
          )}
        </AnimatePresence>
      </div>

      {/* Chapter Navigation Indicator Dots (Bottom Center) */}
      <NavigationDots
        currentScreen={currentScreen}
        maxUnlockedScreen={maxUnlockedScreen}
        onSelectScreen={goToScreen}
      />
    </main>
  );
}
