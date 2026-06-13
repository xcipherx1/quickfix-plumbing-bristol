import React from 'react';
import { Phone, Search, Wrench, ShieldCheck } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

const steps = [
  { number: '01', title: 'Book', description: 'Call or fill the form. We answer 24/7.', icon: Phone },
  { number: '02', title: 'Diagnose', description: 'Expert assessment within 30 minutes.', icon: Search },
  { number: '03', title: 'Fix', description: 'Repair completed with premium parts.', icon: Wrench },
  { number: '04', title: 'Guarantee', description: '12-month warranty + follow-up.', icon: ShieldCheck },
];

export function Process() {
  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[#0F172A]">
            Our Process
          </h2>
          <p className="text-lg text-[#0F172A]/60 mt-4">Simple, transparent, stress-free</p>
        </div>

        <StaggerContainer className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-[#06B6D4]/20" />

          {steps.map((step, index) => (
            <StaggerItem key={step.number}>
              <div className="relative bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-6 shadow-bento hover:shadow-bento-hover transition-all hover:-translate-y-1 text-center">
                {/* Step Number Background */}
                <span className="absolute top-4 right-4 text-5xl font-extrabold text-[#0F172A]/5">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-[#06B6D4]/10 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <step.icon className="w-6 h-6 text-[#06B6D4]" />
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] mb-2">{step.title}</h3>
                <p className="text-sm text-[#0F172A]/60">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
