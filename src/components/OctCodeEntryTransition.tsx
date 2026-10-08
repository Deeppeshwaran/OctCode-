import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OctCodeEntryTransitionProps {
  onComplete?: () => void;
}

export const OctCodeEntryTransition: React.FC<OctCodeEntryTransitionProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'complete'>('loading');
  const [statusText, setStatusText] = useState('INITIALIZING STUDIO CORE...');

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(rawProgress);

      if (rawProgress < 25) {
        setStatusText('INITIALIZING STUDIO CORE...');
      } else if (rawProgress < 55) {
        setStatusText('ASSEMBLING DIGITAL ARCHITECTURE...');
      } else if (rawProgress < 85) {
        setStatusText('SYNCING AI & AUTOMATION ENGINES...');
      } else if (rawProgress < 100) {
        setStatusText('FINALIZING OCTCODE EXPERIENCE...');
      } else {
        setStatusText('OCTCODE READY // ENTERING');
      }

      if (rawProgress < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        // Hold at 100% for 200ms then initiate curtain slide exit
        setTimeout(() => {
          setPhase('exiting');
          setTimeout(() => {
            setPhase('complete');
            onComplete?.();
          }, 800);
        }, 220);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // Allow ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && phase === 'loading') {
        setProgress(100);
        setPhase('exiting');
        setTimeout(() => {
          setPhase('complete');
          onComplete?.();
        }, 300);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, onComplete]);

  if (phase === 'complete') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="octcode-loader"
        initial={{ y: 0 }}
        animate={{ y: phase === 'exiting' ? '-100%' : 0 }}
        transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
        className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-[#08080A] text-[#D7E2EA] select-none pointer-events-auto overflow-hidden"
        style={{ willChange: 'transform' }}
      >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Bar: Studio Brand & Progress Counter */}
          <div className="relative z-10 flex items-center justify-between text-xs sm:text-sm uppercase tracking-widest text-[#8C9AA8] font-mono">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-white font-semibold tracking-wider font-['Kanit',sans-serif]">
                OCTCODE
              </span>
              <span className="hidden sm:inline text-white/30">/</span>
              <span className="hidden sm:inline text-[#8C9AA8] text-[11px]">
                DIGITAL SOLUTIONS STUDIO
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white font-mono font-bold tracking-tight text-sm sm:text-base">
                [{progress.toString().padStart(3, '0')}%]
              </span>
              <button
                type="button"
                onClick={() => {
                  setProgress(100);
                  setPhase('exiting');
                  setTimeout(() => {
                    setPhase('complete');
                    onComplete?.();
                  }, 300);
                }}
                className="text-[10px] tracking-widest uppercase text-[#8C9AA8] hover:text-white transition-colors cursor-pointer hidden md:inline-block border border-white/10 px-2.5 py-1 rounded-full"
              >
                Skip ↗
              </button>
            </div>
          </div>

          {/* Centerpiece: OctCode Emblem, Kinetic Typography & Studio Tagline */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4">
            {/* Animated Brand Emblem */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-20 h-14 sm:w-28 sm:h-20 mb-6 flex items-center justify-center"
            >
              <img
                src="/octcode-logo-white.svg"
                alt="OctCode Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_24px_rgba(168,85,247,0.4)]"
              />
            </motion.div>

            {/* Giant Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-black uppercase tracking-tight text-white leading-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 font-['Kanit',sans-serif]"
            >
              OCTCODE
            </motion.h1>

            {/* Pillar Services */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-cyan-300/90 uppercase font-['Kanit',sans-serif] mt-1"
            >
              <span>WEB</span>
              <span className="text-purple-400">•</span>
              <span>AI</span>
              <span className="text-purple-400">•</span>
              <span>SEO</span>
              <span className="text-purple-400">•</span>
              <span>AUTOMATION</span>
            </motion.div>

            {/* Dynamic Status Output */}
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-6 text-xs text-[#8C9AA8] font-mono uppercase tracking-widest h-4"
            >
              {statusText}
            </motion.p>
          </div>

          {/* Bottom Bar: Progress Line & Metadata */}
          <div className="relative z-10 w-full space-y-4">
            {/* Slim Modern Progress Bar */}
            <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#8C9AA8] uppercase tracking-wider font-mono">
              <span>EST. 2026 // CHENNAI • GLOBAL</span>
              <span className="text-right">DIGITAL EXPERIENCES</span>
            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
};
