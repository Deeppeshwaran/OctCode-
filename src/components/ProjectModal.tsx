import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, MapPin, ExternalLink, CheckCircle } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { LiveProjectButton } from './LiveProjectButton';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact: (service: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-4xl bg-[#0F1115] border-2 border-[#D7E2EA]/30 rounded-3xl p-5 sm:p-8 text-[#D7E2EA] z-10 my-6 max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#2D333D] pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs uppercase tracking-widest text-[#8C9AA8] mb-1.5 flex-wrap">
                <span className="font-mono text-purple-400 font-bold">{project.number}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.year}
                </span>
                {project.location && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#8C9AA8]">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {project.location}
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {project.name}
              </h2>
              {project.subtitle && (
                <p className="text-xs sm:text-sm text-cyan-300/90 font-medium tracking-wide mt-1">
                  {project.subtitle}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer shrink-0 ml-3"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar if available */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C9AA8]">
                    {stat.label}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Description & Tags */}
          <div className="mb-6 space-y-3">
            <p className="text-sm sm:text-base text-[#B0C1D0] leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-[#3E4654] bg-[#161922] text-[#D7E2EA]"
                >
                  <Tag className="w-3 h-3 text-purple-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Showcase Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black min-h-[180px]">
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black min-h-[180px]">
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10 bg-black min-h-[240px]">
              <img
                src={project.col2Img}
                alt={`${project.name} hero showcase`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Action bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#2D333D] pt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact(project.name);
              }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-300 hover:text-white transition-colors cursor-pointer"
            >
              Inquire about similar work →
            </button>
            <LiveProjectButton
              label="Visit Live Website"
              onClick={() => {
                if (project.liveUrl) {
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
