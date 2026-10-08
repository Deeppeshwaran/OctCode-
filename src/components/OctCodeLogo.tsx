import React from 'react';

interface OctCodeLogoProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
  glow?: boolean;
  mode?: 'vector' | '3d';
}

export const OctCodeLogo: React.FC<OctCodeLogoProps> = ({
  className = 'w-full h-auto',
  color = '#FFFFFF',
  strokeWidth = 38,
  glow = true,
  mode = 'vector',
}) => {
  // Exact C1-continuous path for the intertwined OctCode "oc" monogram
  const pathD =
    'M 355 110 A 68 68 0 0 0 300 82 C 255 82 215 218 170 218 A 68 68 0 0 1 102 150 A 68 68 0 0 1 170 82 C 215 82 255 218 300 218 A 68 68 0 0 0 355 190';

  if (mode === '3d') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src="/octcode-logo-white.svg"
          alt="OctCode Logo in White"
          className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(255,255,255,0.35)]"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background ambient glow if enabled */}
      {glow && (
        <div
          className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-35 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(187,204,215,0.15) 50%, transparent 75%)',
          }}
        />
      )}

      <svg
        viewBox="0 0 460 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
        aria-label="OctCode White Logo"
      >
        <defs>
          <filter id="octGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Elegant 3D white metallic highlight */}
          <linearGradient id="whiteGrade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F4F8FA" />
            <stop offset="70%" stopColor="#D9E6EF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* Ambient shadow stroke layer for depth */}
        <path
          d={pathD}
          stroke="#000000"
          strokeWidth={strokeWidth + 14}
          strokeLinecap="butt"
          strokeLinejoin="round"
          opacity="0.45"
          transform="translate(0, 8)"
        />

        {/* Outer soft glow stroke */}
        {glow && (
          <path
            d={pathD}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={strokeWidth + 8}
            strokeLinecap="butt"
            strokeLinejoin="round"
            filter="url(#octGlow)"
          />
        )}

        {/* Primary white stroke */}
        <path
          d={pathD}
          stroke="url(#whiteGrade)"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />

        {/* Inner subtle specular rim highlight */}
        <path
          d={pathD}
          stroke="#FFFFFF"
          strokeWidth={strokeWidth * 0.25}
          strokeLinecap="butt"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};
