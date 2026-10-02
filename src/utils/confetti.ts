import confetti from 'canvas-confetti';

/**
 * Premium Confetti & Fireworks Utility
 * Uses tailored palette: warm gold, rose gold, soft pink, lavender, and champagne.
 */

const PALETTE = ['#f472b6', '#c084fc', '#f59e0b', '#fbbf24', '#fbcfe8', '#e9d5ff', '#ffffff'];

export function launchConfettiCannons() {
  if (typeof window === 'undefined') return;

  const count = 200;
  const defaults = {
    origin: { y: 0.85 },
    colors: PALETTE,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // 1. Initial powerful dual side cannon blast from bottom corners
  confetti({
    particleCount: 70,
    angle: 60,
    spread: 65,
    origin: { x: 0, y: 0.9 },
    startVelocity: 55,
    colors: PALETTE,
    scalar: 1.2,
  });

  confetti({
    particleCount: 70,
    angle: 120,
    spread: 65,
    origin: { x: 1, y: 0.9 },
    startVelocity: 55,
    colors: PALETTE,
    scalar: 1.2,
  });

  // 2. High-elevation cascading center burst
  setTimeout(() => {
    fire(0.25, {
      spread: 40,
      startVelocity: 60,
      origin: { x: 0.5, y: 0.85 },
    });
    fire(0.2, {
      spread: 70,
      origin: { x: 0.5, y: 0.85 },
    });
  }, 200);

  // 3. Second volley from left and right cannons with wider spread
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 55,
      spread: 75,
      origin: { x: 0.05, y: 0.85 },
      startVelocity: 50,
      colors: PALETTE,
      shapes: ['star', 'circle'],
    });

    confetti({
      particleCount: 60,
      angle: 125,
      spread: 75,
      origin: { x: 0.95, y: 0.85 },
      startVelocity: 50,
      colors: PALETTE,
      shapes: ['star', 'circle'],
    });
  }, 450);

  // 4. Final soft glittering rain
  setTimeout(() => {
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.9,
      origin: { x: 0.5, y: 0.7 },
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      shapes: ['star'],
      origin: { x: 0.5, y: 0.6 },
    });
  }, 750);
}

export function launchBirthdayConfetti() {
  if (typeof window === 'undefined') return;

  // Center celebration burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: PALETTE,
    disableForReducedMotion: true,
  });

  // Dual side cannons
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: PALETTE,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: PALETTE,
    });
  }, 250);
}

export function launchFireworks(durationMs: number = 3000) {
  if (typeof window === 'undefined') return;

  const animationEnd = Date.now() + durationMs;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 40 * (timeLeft / durationMs);

    // Random fireworks explosion positions
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.15, 0.4), y: Math.random() - 0.2 },
      colors: PALETTE,
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.85), y: Math.random() - 0.2 },
      colors: PALETTE,
    });
  }, 300);
}

export function launchGentleHearts() {
  if (typeof window === 'undefined') return;

  // Shapes can use stars and circles
  confetti({
    particleCount: 30,
    spread: 100,
    origin: { y: 0.8 },
    colors: ['#f472b6', '#fbcfe8', '#fda4af', '#fcd34d'],
    shapes: ['star', 'circle'],
    scalar: 1.2,
    gravity: 0.7,
  });
}
