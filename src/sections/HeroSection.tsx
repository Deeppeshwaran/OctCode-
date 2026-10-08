import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { ContactButton } from '../components/ContactButton';
import { OctCodeLogo } from '../components/OctCodeLogo';

interface HeroSectionProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onNavigate,
}) => {
  const navLinks = [
    { label: 'About', target: 'about' },
    { label: 'Services', target: 'services' },
    { label: 'Projects', target: 'projects' },
    { label: 'Contact', action: onOpenContact },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav
          className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => {
                if (link.action) {
                  link.action();
                } else if (link.target) {
                  onNavigate(link.target);
                }
              }}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-0 text-inherit p-0"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </FadeIn>

      {/* 2. Top Tagline + Massive Hero Heading: octcode with equal space between letters */}
      <div className="w-full overflow-hidden select-none pointer-events-none z-0 mt-6 sm:mt-4 md:-mt-5 px-6 md:px-10 flex flex-col items-center">
        <FadeIn delay={0.1} y={15} className="w-full text-center mb-1.5 sm:mb-2 md:mb-3">
          <p className="text-[#D7E2EA]/85 font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.45em] text-xs sm:text-sm md:text-base lg:text-lg">
            BUILD DIGITAL GROW FASTER
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={40} className="w-full">
          <h1
            className="w-full flex justify-between items-center font-black uppercase leading-none whitespace-nowrap text-[11vw] sm:text-[12vw] md:text-[13vw] lg:text-[14.5vw]"
            aria-label="OCTCODE"
          >
            {'octcode'.split('').map((char, index) => (
              <span
                key={index}
                className="hero-heading inline-block text-center flex-1"
              >
                {char}
              </span>
            ))}
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Centerpiece: OctCode Logo in White with Magnet Effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[460px] lg:w-[540px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto flex justify-center">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] p-4 flex items-center justify-center cursor-pointer">
              <OctCodeLogo
                mode="vector"
                color="#FFFFFF"
                glow={true}
                className="w-full filter drop-shadow-[0_20px_45px_rgba(255,255,255,0.28)] hover:brightness-110 transition-all duration-300"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom Bar */}
      <div className="relative z-20 flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 w-full">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-semibold uppercase tracking-wider leading-tight max-w-[180px] sm:max-w-[240px] md:max-w-[300px]"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.8rem)' }}
          >
            WE BUILD<br />WHAT&apos;S NEXT.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
