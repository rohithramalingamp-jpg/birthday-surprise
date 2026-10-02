import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  targetOpacity: number;
  pulseSpeed: number;
  color: string;
  isStar: boolean;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(244, 114, 182, ', // pink-400
      'rgba(192, 132, 252, ', // purple-400
      'rgba(251, 191, 36, ',  // amber-400
      'rgba(233, 213, 255, ', // lavender
      'rgba(255, 255, 255, ', // pure starlight
    ];

    // Responsive particle count (fewer on mobile for 60fps smoothness)
    const particleCount = Math.min(window.innerWidth < 768 ? 40 : 80, 100);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1, // gently rising
        opacity: Math.random() * 0.7 + 0.1,
        targetOpacity: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
        isStar: Math.random() > 0.65,
      });
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Pulse opacity
        p.opacity += (p.targetOpacity - p.opacity) * p.pulseSpeed;
        if (Math.abs(p.targetOpacity - p.opacity) < 0.05) {
          p.targetOpacity = Math.random() * 0.75 + 0.15;
        }

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle
        ctx.beginPath();
        if (p.isStar) {
          // Soft glowing 4-point star
          const rad = p.size * 1.8;
          ctx.fillStyle = `${p.color}${p.opacity * 0.9})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `${p.color}${p.opacity * 0.3})`;
          ctx.arc(p.x, p.y, rad * 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft circular ember / bokeh particle
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep purple & midnight gradient backgrounds with ambient light spots */}
      <div className="absolute inset-0 bg-[#07020d]" />
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(236,72,153,0.1) 50%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[65vw] h-[65vw] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.25) 0%, rgba(245,158,11,0.1) 50%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)' }}
      />
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
