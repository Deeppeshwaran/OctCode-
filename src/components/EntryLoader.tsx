import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';

interface EntryLoaderProps {
  onComplete: () => void;
}

export const EntryLoader: React.FC<EntryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING CORE...');
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Exact C1-continuous path for the intertwined OctCode monogram
  const pathD =
    'M 355 110 A 68 68 0 0 0 300 82 C 255 82 215 218 170 218 A 68 68 0 0 1 102 150 A 68 68 0 0 1 170 82 C 215 82 255 218 300 218 A 68 68 0 0 0 355 190';

  const finishIntro = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setProgress(100);
    setStatusText('OCTCODE READY // ENTERING');
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  useEffect(() => {
    // Total loading duration ~ 2.0 seconds
    const totalDuration = 2000;

    const animateProgress = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawRatio = Math.min(elapsed / totalDuration, 1);

      // Smooth cubic-bezier-like easing curve
      const easedProgress = Math.min(
        100,
        Math.floor(
          rawRatio < 0.5
            ? 4 * rawRatio * rawRatio * rawRatio * 100
            : (1 - Math.pow(-2 * rawRatio + 2, 3) / 2) * 100
        )
      );

      setProgress(easedProgress);

      if (easedProgress < 22) {
        setStatusText('INITIALIZING CORE PROTOCOLS');
      } else if (easedProgress < 48) {
        setStatusText('CALIBRATING DIGITAL EXPERIENCES');
      } else if (easedProgress < 74) {
        setStatusText('INTEGRATING AI & WEB SYSTEMS');
      } else if (easedProgress < 95) {
        setStatusText('LAUNCHING SPATIAL ENGINE');
      } else {
        setStatusText('OCTCODE READY // ENTERING');
      }

      if (rawRatio < 1) {
        timerRef.current = requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        setStatusText('OCTCODE READY // ENTERING');
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 320);
      }
    };

    timerRef.current = requestAnimationFrame(animateProgress);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loader-panel"
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-[#08080A] text-white select-none overflow-hidden cursor-default"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Ambient Studio Lighting Glow */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] md:w-[700px] h-[350px] sm:h-[550px] md:h-[700px] rounded-full blur-[120px] opacity-25"
              style={{
                background:
                  'radial-gradient(circle, rgba(182,0,168,0.45) 0%, rgba(118,33,176,0.3) 40%, rgba(190,76,0,0.15) 70%, transparent 100%)',
              }}
            />
            {/* Subtle background tech grid lines */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Top Header Row with System Identifiers & Skip Action */}
          <div className="relative z-10 w-full flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#8C9AA8]">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              <span className="text-white font-semibold">OCTCODE STUDIO</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-white/50">SYS.INIT // 2026</span>
            </div>

            <button
              type="button"
              onClick={finishIntro}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/40 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white transition-all cursor-pointer text-[10px] sm:text-xs font-mono tracking-wider"
              aria-label="Skip introduction animation"
              title="Skip intro (or press ESC)"
            >
              <span>SKIP</span>
              <span className="text-white/30 hidden sm:inline">[ESC]</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Center Brand Identity & Animated Monogram */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4">
            {/* Glowing Infinity Ribbon SVG */}
            <div className="relative w-40 sm:w-56 md:w-64 aspect-[460/300] mb-6 sm:mb-8 flex items-center justify-center">
              {/* Backing Ambient Blur */}
              <div
                className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-40 transition-all duration-300"
                style={{
                  background:
                    'radial-gradient(circle, rgba(182,0,168,0.7) 0%, rgba(118,33,176,0.4) 60%, transparent 80%)',
                  transform: `scale(${0.8 + (progress / 100) * 0.4})`,
                }}
              />

              <svg
                viewBox="0 0 460 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_12px_30px_rgba(182,0,168,0.4)]"
              >
                <defs>
                  {/* Dynamic Gradient for the brand path */}
                  <linearGradient id="introStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#E0B0FF" />
                    <stop offset="70%" stopColor="#B600A8" />
                    <stop offset="100%" stopColor="#7621B0" />
                  </linearGradient>

                  <filter id="introGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background faint guide track */}
                <path
                  d={pathD}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="38"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                />

                {/* Animated Primary Path synced to progress */}
                <motion.path
                  d={pathD}
                  stroke="url(#introStrokeGrad)"
                  strokeWidth="38"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  filter="url(#introGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0.05, progress / 100) }}
                  transition={{ ease: 'easeOut', duration: 0.15 }}
                />

                {/* Inner white specular ribbon highlight */}
                <motion.path
                  d={pathD}
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  opacity={0.85}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0.05, progress / 100) }}
                  transition={{ ease: 'easeOut', duration: 0.15 }}
                />
              </svg>
            </div>

            {/* Brand Title: OCTCODE */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-3xl sm:text-5xl md:text-6xl text-white hero-heading"
              >
                OCTCODE
              </motion.h1>
            </div>

            {/* Subtitle: DIGITAL SOLUTIONS STUDIO */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#9BB0C1] mb-2"
            >
              DIGITAL SOLUTIONS STUDIO
            </motion.p>

            {/* Disciplines: WEB • AI • SEO • AUTOMATION */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-purple-300/80 mb-8"
            >
              WEB &bull; AI &bull; SEO &bull; AUTOMATION
            </motion.div>

            {/* Numerical Progress Indicator */}
            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#8C9AA8]">
                <span className="flex items-center gap-1.5 text-white/90">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[11px] tracking-wider">{statusText}</span>
                </span>
                <span className="text-white font-bold text-sm tracking-widest">
                  {progress.toString().padStart(2, '0')}%
                </span>
              </div>

              {/* Progress Line Bar */}
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(90deg, #B600A8 0%, #7621B0 50%, #BE4C00 100%)',
                    boxShadow: '0 0 12px #B600A8',
                  }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Technical HUD Row */}
          <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#8C9AA8]/70">
            <div>
              <span>OCTCODE &copy; 2026 // ALL RIGHTS RESERVED</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>EXPERIENCE ENGINE ACTIVE</span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Shutter Exit Curtain Wipe (Reveals the site) */
        <motion.div
          key="loader-exit-curtain"
          className="fixed inset-0 z-[9999] pointer-events-none bg-[#08080A] flex flex-col justify-between"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Bottom neon laser edge during upward wipe */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 shadow-[0_0_20px_#B600A8]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
