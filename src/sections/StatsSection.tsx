import React from 'react';
import { FadeIn } from '../components/FadeIn';

interface MetricItem {
  number: string;
  label: string;
  tag: string;
  description: string;
}

export const StatsSection: React.FC = () => {
  const metrics: MetricItem[] = [
    {
      number: '20+',
      label: 'Projects Delivered',
      tag: '01 / REACH',
      description: 'High-fidelity digital ecosystems, web platforms, and automated solutions deployed worldwide.',
    },
    {
      number: '10+',
      label: 'Digital Solutions',
      tag: '02 / ARCHITECTURE',
      description: 'Custom web apps, intelligent AI workflows, and strategic SEO growth systems.',
    },
    {
      number: '24/7',
      label: 'Technical Support',
      tag: '03 / RELIABILITY',
      description: 'Round-the-clock client communication, rapid iteration, and dedicated production care.',
    },
    {
      number: '100%',
      label: 'Custom Approach',
      tag: '04 / BESPOKE',
      description: 'Zero generic templates. Handcrafted architecture tailored specifically to each business.',
    },
  ];

  return (
    <section className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-28 select-none border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Top Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <FadeIn delay={0} y={20}>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#8C9AA8] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#BBCCD7] inline-block animate-pulse" />
              <span>Proven Impact & Execution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Engineered For Excellence
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={20}>
            <p className="text-xs sm:text-sm text-[#8C9AA8] max-w-xs uppercase tracking-wider font-light">
              Digital craft combined with technical precision and reliable production delivery.
            </p>
          </FadeIn>
        </div>

        {/* 4-Column Typographic Grid without circular gauges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-3xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#101216]/60 backdrop-blur-sm">
          {metrics.map((metric, index) => (
            <FadeIn
              key={metric.label}
              delay={index * 0.1}
              y={25}
              className="group p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.03]"
            >
              <div>
                {/* Header row: Micro Tag */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="text-[11px] font-mono tracking-widest text-[#8C9AA8]">
                    {metric.tag}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400/40 group-hover:bg-purple-400 group-hover:scale-125 transition-all" />
                </div>

                {/* Massive Number with .hero-heading Gradient */}
                <div
                  className="hero-heading font-black tracking-tight leading-none mb-3"
                  style={{ fontSize: 'clamp(2.75rem, 5vw, 4.5rem)' }}
                >
                  {metric.number}
                </div>

                {/* Uppercase Metric Label */}
                <h3 className="text-white font-bold uppercase tracking-wider text-sm sm:text-base mb-3 group-hover:text-[#BBCCD7] transition-colors">
                  {metric.label}
                </h3>
              </div>

              {/* Supporting Subtext */}
              <p className="text-xs text-[#8C9AA8] leading-relaxed font-light mt-4 pt-4 border-t border-white/5">
                {metric.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
