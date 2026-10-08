import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';
import { TechAvatarBadge } from '../components/TechAvatars';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const PARAGRAPH_1 =
    'OCTCODE is a digital solutions studio building powerful websites, AI solutions, web applications, and automation.';

  const PARAGRAPH_2 =
    'We combine technology, design, and strategy to help businesses grow.';

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden bg-[#0C0C0C]"
      aria-label="About OCTCODE"
    >
      {/* 4 Tech Avatar DP Badges in the Corners (Replacing moon, puzzle/lego, cross/arrow, emoji group) */}

      {/* 1. Top-Left: Claude AI DP Pic */}
      <div className="absolute top-[5%] sm:top-[7%] left-[2%] sm:left-[4%] md:left-[6%] z-20 pointer-events-auto">
        <FadeIn delay={0.1} x={-60} y={0} duration={0.8}>
          <TechAvatarBadge type="claude" />
        </FadeIn>
      </div>

      {/* 2. Top-Right: VS Code DP Pic */}
      <div className="absolute top-[5%] sm:top-[7%] right-[2%] sm:right-[4%] md:right-[6%] z-20 pointer-events-auto">
        <FadeIn delay={0.15} x={60} y={0} duration={0.8}>
          <TechAvatarBadge type="vscode" />
        </FadeIn>
      </div>

      {/* 3. Bottom-Left: Antigravity DP Pic */}
      <div className="absolute bottom-[6%] sm:bottom-[8%] left-[2%] sm:left-[4%] md:left-[6%] z-20 pointer-events-auto">
        <FadeIn delay={0.25} x={-60} y={0} duration={0.8}>
          <TechAvatarBadge type="antigravity" />
        </FadeIn>
      </div>

      {/* 4. Bottom-Right: React AI DP Pic */}
      <div className="absolute bottom-[6%] sm:bottom-[8%] right-[2%] sm:right-[4%] md:right-[6%] z-20 pointer-events-auto">
        <FadeIn delay={0.3} x={60} y={0} duration={0.8}>
          <TechAvatarBadge type="react-ai" />
        </FadeIn>
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center my-auto px-4">
        {/* Heading: "About me" */}
        <FadeIn delay={0} y={40} className="w-full">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading and text block */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated paragraph statements with clear gap between paragraphs and words */}
        <div className="flex flex-col gap-6 sm:gap-8 max-w-[640px] px-4 text-center">
          <AnimatedText
            text={PARAGRAPH_1}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed tracking-wide"
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', wordSpacing: '0.22em' }}
          />

          <AnimatedText
            text={PARAGRAPH_2}
            className="text-[#BBCCD7] font-normal text-center leading-relaxed tracking-wide"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)', wordSpacing: '0.22em' }}
          />
        </div>

        {/* Gap between text block and button */}
        <div className="h-14 sm:h-18 md:h-20" />

        {/* Contact Button */}
        <FadeIn delay={0.2} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
