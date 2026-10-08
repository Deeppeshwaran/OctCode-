import React, { useRef, useState, useEffect } from 'react';
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../data/portfolioData';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const sectionTop = sectionRef.current.offsetTop;
            const currentOffset =
              (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Calculate initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Triple each row for continuous seamless scrolling
  const row1Images = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  const row2Images = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(-${offset - 200}px)`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] pt-12 sm:pt-16 md:pt-20 pb-10 overflow-hidden select-none"
      aria-label="Motion Showcase Marquee"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-3 flex-nowrap"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, index) => (
            <div
              key={`row1-${index}-${src}`}
              className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] rounded-2xl overflow-hidden bg-[#16181D] border border-white/5 shadow-lg group"
            >
              <img
                src={src}
                alt="3D Motion Project Preview"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-3 flex-nowrap"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, index) => (
            <div
              key={`row2-${index}-${src}`}
              className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] rounded-2xl overflow-hidden bg-[#16181D] border border-white/5 shadow-lg group"
            >
              <img
                src={src}
                alt="3D Motion Project Preview"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
