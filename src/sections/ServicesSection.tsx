import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { SERVICES, ServiceItem } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10 select-none"
      aria-label="Services"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header: Clean Services Heading */}
        <div className="text-center mb-16 sm:mb-20 md:mb-28">
          <FadeIn delay={0} y={20}>
            <h2
              className="font-black uppercase text-[#0C0C0C] tracking-tight leading-none"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Services
            </h2>
          </FadeIn>
        </div>

        {/* 5 Service Items in Vertical Divided List */}
        <div className="divide-y divide-[rgba(12,12,12,0.15)] border-t border-b border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((service: ServiceItem, index: number) => (
            <FadeIn
              key={service.number}
              delay={index * 0.08}
              y={25}
              className="group py-10 sm:py-12 md:py-14 transition-colors duration-200 hover:bg-black/[0.015]"
            >
              <div
                onClick={() => onSelectService?.(service.title)}
                className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12 cursor-pointer"
              >
                {/* Left: Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none tracking-tighter flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ fontSize: 'clamp(3rem, 8vw, 120px)' }}
                >
                  {service.number}
                </div>

                {/* Content: Title and Description */}
                <div className="flex-1 flex flex-col justify-start gap-3">
                  <div>
                    <h3
                      className="font-black uppercase text-[#0C0C0C] tracking-tight mb-2 transition-colors duration-200 group-hover:text-purple-950"
                      style={{ fontSize: 'clamp(1.25rem, 2.6vw, 2.4rem)' }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-75"
                      style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Right: Subtle interactive action indicator */}
                <div className="hidden lg:flex items-center text-xs font-semibold uppercase tracking-widest text-black/50 group-hover:text-black transition-colors pt-2 shrink-0">
                  <span>Explore →</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
