import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Sparkles, MapPin, Award } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#16181F]">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-white/[0.04] animate-pulse" />
      )}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#161922] to-[#0C0E14] text-[#8C9AA8] text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]">
            {fallbackLabel || alt}
          </span>
          <span className="text-[10px] mt-1 text-[#8C9AA8]/80">Official Preview</span>
        </div>
      )}
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Stacking scale transform: slight shrink when stacked underneath
  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const handleOpenLive = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      onOpenProject(project);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-[82vh] md:min-h-[88vh] flex items-start justify-center sticky pb-16 md:pb-24"
      style={{
        top: `calc(5rem + ${index * 32}px)`,
      }}
    >
      {/* Scroll-triggered reveal animation: slide up and fade in */}
      <motion.div
        initial={{ opacity: 0, y: 75, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          duration: 0.85,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full flex justify-center"
      >
        <motion.div
          style={{ scale }}
          onClick={() => onOpenProject(project)}
          className="w-full max-w-6xl rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl relative transition-all duration-300 hover:border-purple-300/80 hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] cursor-pointer group"
        >
          {/* Top Row: Number, Category, Name, Live Project Button */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 sm:mb-6 md:mb-7 pb-4 sm:pb-5 border-b border-[#D7E2EA]/15">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              {/* Huge Number */}
              <span
                className="font-black text-[#D7E2EA] leading-none tracking-tighter select-none font-mono"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {project.number}
              </span>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {project.location && (
                    <span className="text-[11px] sm:text-xs text-[#8C9AA8] flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {project.location}
                    </span>
                  )}
                </div>
                <h3
                  className="font-bold uppercase text-[#D7E2EA] tracking-wide group-hover:text-white transition-colors"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2rem)' }}
                >
                  {project.name}
                </h3>
                {project.subtitle && (
                  <p className="text-xs sm:text-sm text-cyan-300/80 font-medium tracking-wide mt-0.5">
                    {project.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Actions: Live Button & View Details prompt */}
            <div className="flex items-center gap-3 self-start lg:self-center">
              <LiveProjectButton
                onClick={handleOpenLive}
                label="Live Project"
              />
            </div>
          </div>

          {/* Highlights badge bar if stats exist */}
          {project.stats && project.stats.length > 0 && (
            <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-2">
              {project.stats.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs text-[#B0C1D0]"
                >
                  <Award className="w-3 h-3 text-purple-400" />
                  <span className="font-semibold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Row: Two-column image grid (40% / 60%) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5 items-stretch">
            {/* Left Column (40% width -> 5 cols): 2 stacked images */}
            <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-between">
              {/* Top image */}
              <div
                className="w-full overflow-hidden rounded-[26px] sm:rounded-[36px] md:rounded-[42px] bg-[#16181F] relative group/sub"
                style={{ height: 'clamp(130px, 16vw, 220px)' }}
              >
                <ProjectImage
                  src={project.col1Img1}
                  alt={`${project.name} preview 1`}
                  fallbackLabel={`${project.name} - Part 1`}
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-white bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm">
                    Expand Details
                  </span>
                </div>
              </div>

              {/* Bottom image */}
              <div
                className="w-full overflow-hidden rounded-[26px] sm:rounded-[36px] md:rounded-[42px] bg-[#16181F] relative group/sub"
                style={{ height: 'clamp(160px, 22vw, 320px)' }}
              >
                <ProjectImage
                  src={project.col1Img2}
                  alt={`${project.name} preview 2`}
                  fallbackLabel={`${project.name} - Part 2`}
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-white bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm">
                    Expand Details
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (60% width -> 7 cols): 1 tall image */}
            <div
              className="md:col-span-7 overflow-hidden rounded-[26px] sm:rounded-[36px] md:rounded-[42px] bg-[#16181F] relative min-h-[260px] md:min-h-full group/main"
            >
              <ProjectImage
                src={project.col2Img}
                alt={`${project.name} main showcase`}
                fallbackLabel={`${project.name} - Showcase`}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-white bg-black/70 px-4 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  View Project Details
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenProject,
}) => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-8 md:px-10 pt-20 pb-36"
      aria-label="Projects Portfolio"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading: "Project" */}
        <FadeIn delay={0} y={30} className="mb-14 sm:mb-20 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#8C9AA8] mb-2">
            Selected Works
          </p>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Scroll-triggered sticky stacking cards */}
        <div className="relative">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
