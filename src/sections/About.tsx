import React from 'react';
import { Calendar, Wrench, Star } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/bento';
import { FadeIn, CountUp, StaggerContainer, StaggerItem } from '@/components/motion';
import { timeline } from '@/lib/mock-data';

const stats = [
  { value: 2004, label: 'Year Founded', icon: Calendar, suffix: '' },
  { value: 50000, label: 'Jobs Completed', icon: Wrench, suffix: '+' },
  { value: 98, label: 'Satisfaction Rate', icon: Star, suffix: '%' },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <BentoGrid>
          {/* Left - Text */}
          <FadeIn className="md:col-span-8 lg:col-span-6">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[#0F172A] leading-tight mb-6">
              20+ Years Fixing Bristol's Pipes
            </h2>
            <p className="text-lg text-[#0F172A]/70 leading-relaxed mb-6">
              Founded in 2004 in St George, Bristol, QuickFix Plumbing has grown from a one-van operation to Bristol's most trusted emergency plumbing service. Three generations of plumbing expertise, 50,000+ jobs completed, and a 98% customer satisfaction rate. We're not just plumbers — we're your neighbors.
            </p>
            <button className="inline-flex items-center gap-2 border-2 border-[#0F172A] text-[#0F172A] px-6 py-3 rounded-xl font-semibold hover:bg-[#0F172A] hover:text-white transition-all">
              Meet Our Team
            </button>
          </FadeIn>

          {/* Right - Stats */}
          <div className="md:col-span-8 lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ value, label, icon: Icon, suffix }) => (
              <FadeIn key={label} delay={0.2}>
                <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-6 shadow-bento hover:shadow-bento-hover transition-all text-center group hover:-translate-y-1">
                  <Icon className="w-8 h-8 text-[#06B6D4] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-extrabold text-[#0F172A]">
                    {suffix === '%' ? (
                      <><CountUp end={value} suffix="%" /></>
                    ) : value === 2004 ? (
                      value
                    ) : (
                      <><CountUp end={value} suffix="+" /></>
                    )}
                  </div>
                  <div className="text-sm text-[#0F172A]/60 mt-1">{label}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bottom - Timeline */}
          <FadeIn className="md:col-span-8 lg:col-span-12">
            <div className="bg-[#F8FAFC] border border-[rgba(15,23,42,0.06)] rounded-2xl p-6 md:p-8 shadow-bento mt-4">
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Our Legacy</h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between overflow-x-auto pb-4">
                {timeline.map((item, index) => (
                  <div key={item.year} className="flex md:flex-col items-center gap-3 md:text-center md:flex-1 relative">
                    {index > 0 && (
                      <div className="hidden md:block absolute left-0 top-6 w-full h-0.5 bg-[#06B6D4]/20 -translate-x-1/2" />
                    )}
                    <div className="w-12 h-12 rounded-full bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0 relative z-10">
                      <span className="text-sm font-bold text-[#06B6D4]">{item.year}</span>
                    </div>
                    <span className="text-sm text-[#0F172A]/70 md:mt-2">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </BentoGrid>
      </div>
    </section>
  );
}
