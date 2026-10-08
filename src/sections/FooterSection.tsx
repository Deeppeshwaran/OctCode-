import React from 'react';
import { ArrowUp, Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { ContactButton } from '../components/ContactButton';
import { FadeIn } from '../components/FadeIn';

interface FooterSectionProps {
  onOpenContact: () => void;
  onScrollTop: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContact,
  onScrollTop,
}) => {
  const WHATSAPP_URL = 'https://wa.me/916384174537?text=Hi%20OctCode,%20let%27s%20talk%20about%20a%20project!';
  const INSTAGRAM_URL = 'https://www.instagram.com/octcode13?stkn=MWx5dWh3dGpmbnI3OA==';

  return (
    <footer className="relative w-full bg-[#080808] border-t border-white/10 px-6 md:px-12 pt-20 pb-12 text-[#D7E2EA] z-10">
      <div className="max-w-6xl mx-auto flex flex-col justify-between">
        {/* Top CTA Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-2 font-mono">
              NEXT STEPS
            </span>
            <h3
              className="font-black uppercase tracking-tight text-white leading-none mb-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              HAVE A PROJECT IN MIND?
            </h3>
            <p className="text-[#8C9AA8] text-sm sm:text-base max-w-xl leading-relaxed">
              Let&apos;s turn your idea into a powerful digital experience. Let&apos;s build something that helps your business grow.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <ContactButton onClick={onOpenContact} label="LET’S TALK →" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp (6384174537)"
              title="Chat on WhatsApp"
              className="p-3.5 sm:p-4 rounded-full border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 transition-colors inline-flex items-center justify-center cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={onScrollTop}
              className="p-3.5 sm:p-4 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Scroll back to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Middle Services Tagline Row: WEB • AI • SEO • AUTOMATION */}
        <div className="py-8 border-b border-white/10 flex items-center justify-center">
          <p className="font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-xs sm:text-sm text-cyan-300/80 text-center">
            WEB • AI • SEO • AUTOMATION
          </p>
        </div>

        {/* Bottom Metadata & Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8C9AA8] uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <div className="w-7 h-5 flex items-center justify-center">
              <img src="/octcode-logo-white.svg" alt="OctCode" className="w-full h-auto" />
            </div>
            <span className="font-semibold text-white tracking-widest">
              OCTCODE &copy; 2026 • DIGITAL SOLUTIONS STUDIO
            </span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6 flex-wrap justify-center font-medium">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5 text-purple-400" />
              Instagram
            </a>
            <span className="text-white/20 hidden sm:inline">·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              LinkedIn
            </a>
            <span className="text-white/20 hidden sm:inline">·</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-white/80" />
              GitHub
            </a>
            <span className="text-white/20 hidden sm:inline">·</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
