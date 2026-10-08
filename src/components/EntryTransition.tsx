import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryTransitionProps {
  onComplete?: () => void;
}

export const EntryTransition: React.FC<EntryTransitionProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING STUDIO ENVIRONMENT...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress counter reaching 100 in ~2.1 seconds
    const startTime = Date.now();
    const duration = 2100;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress < 28) {
        setStatusText('INITIALIZING CORE STUDIO MATRIX...');
      } else if (currentProgress < 62) {
        setStatusText('COMPILING DIGITAL EXPERIENCES...');
      } else if (currentProgress < 90) {
        setStatusText('OPTIMIZING PRODUCTION PROTOCOLS...');
      } else {
        setStatusText('SYSTEM READY // WELCOME TO OCTCODE');
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 700);
        }, 350);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="octcode-entry-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -30,
            scale: 1.03,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070707] text-[#D7E2EA] select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Lighting Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(182, 0, 168, 0.22) 0%, rgba(118, 33, 176, 0.15) 35%, rgba(0, 0, 0, 0) 70%)',
            }}
          />

          {/* Background Grid Accent */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Skip Intro Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[11px] font-mono tracking-[0.25em] text-[#8C9AA8] hover:text-white uppercase transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 cursor-pointer z-20"
          >
            SKIP [ESC]
          </button>

          {/* Center Branding Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">
            {/* OctCode Emblem with pulsating radiant glow */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-20 h-16 sm:w-24 sm:h-20 mb-8 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-purple-600/30 blur-2xl rounded-full scale-125 animate-pulse" />
              <img
                src="/octcode-logo-white.svg"
                alt="OCTCODE Logo"
                className="w-full h-auto drop-shadow-[0_0_25px_rgba(182,0,168,0.7)]"
              />
            </motion.div>

            {/* Brand Title: OCTCODE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-2"
            >
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.45em] sm:tracking-[0.55em] text-white pl-2">
                OCTCODE
              </h1>
            </motion.div>

            {/* Brand Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-purple-300/80 mb-10"
            >
              DIGITAL SOLUTIONS STUDIO
            </motion.p>

            {/* Digital Progress Bar */}
            <div className="w-64 sm:w-80 relative mb-4">
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(90deg, #B600A8 0%, #7621B0 50%, #38BDF8 100%)',
                    boxShadow: '0 0 12px rgba(56, 189, 248, 0.8)',
                  }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Numerical Counter */}
              <div className="flex items-center justify-between mt-3 text-[11px] font-mono tracking-widest text-[#8C9AA8]">
                <span>SYSTEM_BOOT</span>
                <span className="text-white font-bold">{progress.toString().padStart(3, '0')}%</span>
              </div>
            </div>

            {/* Live Status Micro-Copy */}
            <motion.div
              key={statusText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C9AA8] h-5 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{statusText}</span>
            </motion.div>
          </div>

          {/* Bottom Copyright & Version */}
          <div className="absolute bottom-8 text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 text-center">
            &copy; 2026 OCTCODE STUDIO // ALL SYSTEMS OPERATIONAL
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
