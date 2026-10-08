/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { HeroSection } from './sections/HeroSection';
import { StatsSection } from './sections/StatsSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { FooterSection } from './sections/FooterSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { OctCodeEntryTransition } from './components/OctCodeEntryTransition';
import { ProjectItem } from './data/portfolioData';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('WEB DEVELOPMENT');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isPageReady, setIsPageReady] = useState(false);

  const handleOpenContact = useCallback((serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsContactOpen(true);
  }, []);

  const handleCloseContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      className="w-full bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-screen relative selection:bg-purple-600 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* Full-screen OctCode Entry Transition Animation */}
      <OctCodeEntryTransition onComplete={() => setIsPageReady(true)} />

      {/* 1. Hero Section */}
      <HeroSection
        onOpenContact={() => handleOpenContact()}
        onNavigate={handleNavigate}
      />

      {/* 2. Stats / Impact Metrics Section */}
      <StatsSection />

      {/* 3. About Section */}
      <AboutSection onOpenContact={() => handleOpenContact()} />

      {/* 4. Services Section */}
      <ServicesSection
        onSelectService={(service) => handleOpenContact(service)}
      />

      {/* 5. Projects Section */}
      <ProjectsSection
        onOpenProject={(project) => setActiveProject(project)}
      />

      {/* Footer Section */}
      <FooterSection
        onOpenContact={() => handleOpenContact()}
        onScrollTop={handleScrollTop}
      />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
        defaultService={selectedService}
      />

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenContact={(service) => handleOpenContact(service)}
      />
    </div>
  );
}
