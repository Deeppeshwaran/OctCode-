import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OctCodeIntroLoaderProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const OctCodeIntroLoader: React.FC<OctCodeIntroLoaderProps> = ({
  onComplete,
  minDurationMs = 2400,
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'exit'>('loading');

  // Exact continuous ribbon path of OctCode monogram
  const pathD =
    'M 355 110 A 68 68 0 0 0 300 82 C 255 82 215 218 170 218 A 68 68 0 0 1 102 150 A 68 68 0 0 1 170 82 C 215 82 255 218 300 218 A 68 68 0 0 0 355 190';

  // Dynamic telemetry status readout
  const getStatusText = (val: number) => {
    if (val < 25) return 'SYSTEM_INIT // Loading studio runtime';
    if (val < 55) return 'CALIBRATING // Web, AI & automation engine';
    if (val < 85) return 'OPTIMIZING // Interactive portfolio pipeline';
    if (val < 100) return 'FINALIZING // Preparing interface';
    return 'ONLINE // Welcome to OctCode';
  };

  const handleFinish = useCallback(() => {
    setPhase('exit');
    setTimeout(() => {
      onComplete();
    }, 850);
  }, [onComplete]);

  // Handle skip on keypress or click
  const handleSkip = useCallback(() => {
    setProgress(100);
    handleFinish();
  }, [handleFinish]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Smooth realistic increment sequence
  useEffect(() => {
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / minDurationMs, 1);

      // Custom non-linear easing curve
      // Fast ramp -> slight pause around 75% -> quick dash to 100%
      let currentPercent: number;
      if (t < 0.4) {
        currentPercent = (t / 0.4) * 45;
      } else if (t < 0.7) {
        currentPercent = 45 + ((t - 0.4) / 0.3) * 35;
      } else {
        currentPercent = 80 + ((t - 0.7) / 0.3) * 20;
      }

      currentPercent = Math.min(Math.round(currentPercent), 100);
      setProgress(currentPercent);

      if (t < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setPhase('ready');
        const timer = setTimeout(() => {
          handleFinish();
        }, 320);
        return () => clearTimeout(timer);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [minDurationMs, handleFinish]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="octcode-intro"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] bg-[#070709] text-white flex flex-col justify-between items-center select-none overflow-hidden px-6 py-8 sm:py-12"
          style={{ cursor: 'default' }}
        >
          {/* Ambient luminous glow background */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full blur-[120px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(182,0,168,0.35) 0%, rgba(118,33,176,0.2) 45%, transparent 70%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          {/* Top Bar: Brand tag & Monospace Status */}
          <div className="w-full max-w-6xl flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8C9AA8]">
                OCTCODE &bull; STUDIO
              </span>
            </div>

            <div className="text-[11px] sm:text-xs font-mono text-[#8C9AA8]/80 uppercase tracking-widest hidden sm:block">
              INITIALIZING [v2.6]
            </div>

            {/* Skip button */}
            <button
              type="button"
              onClick={handleSkip}
              className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#8C9AA8] hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-3 py-1 cursor-pointer"
            >
              SKIP [ESC] &rarr;
            </button>
          </div>

          {/* Center Stage: OctCode Animated Infinity Mark + Wordmark */}
          <div className="flex flex-col items-center justify-center my-auto z-10 w-full max-w-md">
            {/* SVG Animated Infinity Ribbon */}
            <div className="relative w-44 sm:w-56 md:w-64 aspect-[460/300] flex items-center justify-center mb-8">
              <svg
                viewBox="0 0 460 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_25px_rgba(182,0,168,0.5)]"
              >
                <defs>
                  <linearGradient
                    id="introGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#B600A8" />
                    <stop offset="75%" stopColor="#7621B0" />
                    <stop offset="100%" stopColor="#BE4C00" />
                  </linearGradient>

                  <filter
                    id="introGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background faint guide stroke */}
                <path
                  d={pathD}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="38"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                />

                {/* Animated neon drawing path */}
                <motion.path
                  d={pathD}
                  stroke="url(#introGrad)"
                  strokeWidth="38"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  filter="url(#introGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ ease: 'linear', duration: 0.1 }}
                />

                {/* Inner sleek specular core line */}
                <motion.path
                  d={pathD}
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: progress / 100,
                    opacity: progress > 30 ? 0.9 : 0,
                  }}
                  transition={{ ease: 'linear', duration: 0.1 }}
                />
              </svg>
            </div>

            {/* Wordmark with kinetic typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.25em] text-white leading-none">
                OCTCODE
              </h1>
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#8C9AA8] mt-2.5">
                DIGITAL SOLUTIONS STUDIO
              </p>
            </motion.div>
          </div>

          {/* Bottom Row: Numerical Counter, Progress Bar & System Status */}
          <div className="w-full max-w-xl flex flex-col items-center gap-3 z-10">
            {/* Status readouts */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-[#8C9AA8]">
              <span className="truncate pr-4 text-[11px] sm:text-xs">
                {getStatusText(progress)}
              </span>
              <span className="text-sm sm:text-base font-bold text-white tabular-nums tracking-wider">
                {String(progress).padStart(2, '0')}%
              </span>
            </div>

            {/* High-tech Progress Track */}
            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    'linear-gradient(90deg, #7621B0 0%, #B600A8 50%, #FFFFFF 100%)',
                  boxShadow: '0 0 12px rgba(182,0,168,0.8)',
                }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Sub-label disciplines */}
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 pt-1">
              WEB &bull; AI &bull; SEO &bull; AUTOMATION
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
