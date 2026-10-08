import React from 'react';
import { motion } from 'framer-motion';

interface AvatarBadgeProps {
  type: 'claude' | 'antigravity' | 'vscode' | 'react-ai';
  className?: string;
  size?: number;
}

export const TechAvatarBadge: React.FC<AvatarBadgeProps> = ({
  type,
  className = '',
  size = 120,
}) => {
  if (type === 'claude') {
    return (
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className={`group relative flex flex-col items-center select-none ${className}`}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-3xl bg-[#D97757]/25 blur-2xl group-hover:bg-[#D97757]/45 transition-colors duration-500 -z-10" />

        {/* Squircle Badge Container */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-[#1A1412]/90 border border-[#D97757]/40 p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#D97757]">
          {/* Subtle 3D Glass Highlight */}
          <div className="absolute top-0 inset-x-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Claude Official Coral Sunburst / Asterisk Icon */}
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(217,119,87,0.5)]">
            <g fill="#D97757">
              {/* Vertical rays */}
              <rect x="44" y="8" width="12" height="84" rx="6" />
              {/* Horizontal rays */}
              <rect x="8" y="44" width="84" height="12" rx="6" />
              {/* 45 deg diagonal rays */}
              <rect x="44" y="8" width="12" height="84" rx="6" transform="rotate(45 50 50)" />
              {/* 135 deg diagonal rays */}
              <rect x="44" y="8" width="12" height="84" rx="6" transform="rotate(-45 50 50)" />
              {/* Organic center core */}
              <circle cx="50" cy="50" r="14" fill="#F08A68" />
            </g>
          </svg>

          {/* Micro Status Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1A1412] border border-[#D97757] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#D97757] animate-pulse" />
          </div>
        </div>

        {/* Floating Tag */}
        <span className="mt-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#D97757] bg-[#1A1412]/80 border border-[#D97757]/30 px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm group-hover:border-[#D97757] transition-colors">
          Claude AI
        </span>
      </motion.div>
    );
  }

  if (type === 'antigravity') {
    return (
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className={`group relative flex flex-col items-center select-none ${className}`}
      >
        {/* Ambient Cosmic Glow */}
        <div className="absolute inset-0 rounded-3xl bg-[#8B5CF6]/25 blur-2xl group-hover:bg-[#8B5CF6]/45 transition-colors duration-500 -z-10" />

        {/* Squircle Badge Container */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-[#120F1F]/90 border border-[#8B5CF6]/40 p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#8B5CF6]">
          {/* Subtle 3D Glass Highlight */}
          <div className="absolute top-0 inset-x-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Antigravity Zero-G Orbital Singularity Icon */}
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_16px_rgba(139,92,246,0.6)]">
            <defs>
              <linearGradient id="antiGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="antiGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>

            {/* Orbit 1 */}
            <ellipse cx="50" cy="50" rx="36" ry="14" stroke="url(#antiGrad1)" strokeWidth="3.5" transform="rotate(-30 50 50)" />
            {/* Orbit 2 */}
            <ellipse cx="50" cy="50" rx="36" ry="14" stroke="url(#antiGrad2)" strokeWidth="3.5" transform="rotate(45 50 50)" />
            {/* Zero-G Floating Core */}
            <circle cx="50" cy="50" r="13" fill="url(#antiGrad1)" />
            <circle cx="50" cy="50" r="6" fill="#FFFFFF" opacity="0.9" />

            {/* Satellite Particles */}
            <circle cx="28" cy="30" r="3" fill="#06B6D4" />
            <circle cx="72" cy="70" r="2.5" fill="#EC4899" />
          </svg>

          {/* Micro Status Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#120F1F] border border-[#8B5CF6] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#A78BFA] animate-ping" />
          </div>
        </div>

        {/* Floating Tag */}
        <span className="mt-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#A78BFA] bg-[#120F1F]/80 border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm group-hover:border-[#8B5CF6] transition-colors">
          Antigravity
        </span>
      </motion.div>
    );
  }

  if (type === 'vscode') {
    return (
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className={`group relative flex flex-col items-center select-none ${className}`}
      >
        {/* Ambient Cyan/Blue Glow */}
        <div className="absolute inset-0 rounded-3xl bg-[#007ACC]/25 blur-2xl group-hover:bg-[#007ACC]/45 transition-colors duration-500 -z-10" />

        {/* Squircle Badge Container */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-[#0E1520]/90 border border-[#007ACC]/40 p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#007ACC]">
          {/* Subtle 3D Glass Highlight */}
          <div className="absolute top-0 inset-x-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* VS Code Official Folded Ribbon Icon */}
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,122,204,0.6)]">
            <defs>
              <linearGradient id="vsBlue1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0065A9" />
                <stop offset="100%" stopColor="#007ACC" />
              </linearGradient>
              <linearGradient id="vsBlue2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1F8AD2" />
                <stop offset="100%" stopColor="#3EA6FF" />
              </linearGradient>
              <linearGradient id="vsBlue3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007ACC" />
                <stop offset="100%" stopColor="#1F8AD2" />
              </linearGradient>
            </defs>

            {/* Background chevron layer */}
            <path
              d="M71 14L28 47L14 36L8 39V61L14 64L28 53L71 86L92 76V24L71 14Z"
              fill="url(#vsBlue1)"
              opacity="0.95"
            />
            {/* Front chevron highlight */}
            <path
              d="M71 86L28 53L14 64L8 61V39L14 36L71 14V86Z"
              fill="url(#vsBlue2)"
              opacity="0.75"
            />
            {/* Right folded ribbon */}
            <path
              d="M71 14L92 24V76L71 86V14Z"
              fill="url(#vsBlue3)"
            />
            {/* Left bracket cut */}
            <path
              d="M28 47L71 14V34L45 50L71 66V86L28 53L14 64V36L28 47Z"
              fill="#FFFFFF"
              opacity="0.15"
            />
          </svg>

          {/* Micro Status Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0E1520] border border-[#007ACC] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#3EA6FF] animate-pulse" />
          </div>
        </div>

        {/* Floating Tag */}
        <span className="mt-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#3EA6FF] bg-[#0E1520]/80 border border-[#007ACC]/30 px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm group-hover:border-[#007ACC] transition-colors">
          VS Code
        </span>
      </motion.div>
    );
  }

  // react-ai
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
      className={`group relative flex flex-col items-center select-none ${className}`}
    >
      {/* Ambient Cyan/Magenta Glow */}
      <div className="absolute inset-0 rounded-3xl bg-[#61DAFB]/25 blur-2xl group-hover:bg-[#61DAFB]/45 transition-colors duration-500 -z-10" />

      {/* Squircle Badge Container */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-[#09151C]/90 border border-[#61DAFB]/40 p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#61DAFB]">
        {/* Subtle 3D Glass Highlight */}
        <div className="absolute top-0 inset-x-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

        {/* React Orbits with AI Neural Spark Core */}
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_16px_rgba(97,218,251,0.6)]">
          <defs>
            <radialGradient id="aiCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#61DAFB" />
            </radialGradient>
          </defs>

          {/* 3 React Orbital Ellipses */}
          <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" />
          <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 50 50)" />

          {/* Glowing AI Neural Core Spark */}
          <circle cx="50" cy="50" r="10" fill="url(#aiCoreGrad)" />
          {/* Spark crosshair */}
          <path d="M50 34V66M34 50H66" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Micro Status Dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#09151C] border border-[#61DAFB] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#61DAFB] animate-pulse" />
        </div>
      </div>

      {/* Floating Tag */}
      <span className="mt-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#61DAFB] bg-[#09151C]/80 border border-[#61DAFB]/30 px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm group-hover:border-[#61DAFB] transition-colors">
        React AI
      </span>
    </motion.div>
  );
};
