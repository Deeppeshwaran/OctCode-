import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Mail, MapPin, Sparkles } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultService = '3D Modeling',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      // keep submitted state visible
    }, 400);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-xl bg-[#111317] border border-[#2D333D] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#D7E2EA] z-10 my-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#8C9AA8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-[#9BB0C1] max-w-sm mb-6">
                    Thank you {name}. The OctCode team will review your project brief and get back to you within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full border border-[#D7E2EA] text-[#D7E2EA] hover:bg-white/10 transition-colors uppercase text-xs tracking-wider font-medium cursor-pointer"
                  >
                    Done
                  </button>
                  <a
                    href="https://wa.me/916384174537?text=Hi%20OctCode,%20I%20just%20submitted%20a%20project%20inquiry!"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors uppercase text-xs tracking-wider font-semibold"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Let&apos;s collaborate</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Start a Project
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8C9AA8] mt-1">
                    Have an upcoming web build, AI solution, SEO campaign, or automation project? Send the details below.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#A2B2C2] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-[#181B22] border border-[#2D333D] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#535D6D] focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#A2B2C2] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@studio.com"
                      className="w-full bg-[#181B22] border border-[#2D333D] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#535D6D] focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#A2B2C2] mb-1.5">
                      Service Interest
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#181B22] border border-[#2D333D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="WEB DEVELOPMENT">01 — Web Development</option>
                      <option value="AI SOLUTIONS">02 — AI Solutions</option>
                      <option value="SEO SERVICES">03 — SEO Services</option>
                      <option value="BUSINESS AUTOMATION">04 — Business Automation</option>
                      <option value="Full Digital Strategy">Full Digital Strategy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#A2B2C2] mb-1.5">
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your business goals, timeline, and requirements..."
                      className="w-full bg-[#181B22] border border-[#2D333D] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#535D6D] focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-[#8C9AA8]">
                      <a
                        href="mailto:octcode13@gmail.com"
                        className="flex items-center gap-1.5 hover:text-white transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-purple-400" />
                        <span>octcode13@gmail.com</span>
                      </a>
                      <span>•</span>
                      <a
                        href="https://wa.me/916384174537"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        WhatsApp
                      </a>
                    </div>

                    <ContactButton
                      label="Send Request"
                      className="w-full sm:w-auto"
                    />
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
