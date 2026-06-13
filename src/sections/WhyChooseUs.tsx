import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Lock, Shield, Award, MapPin, Phone } from 'lucide-react';
import { BentoGrid } from '@/components/bento';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

const reasons = [
  { title: 'Fixed Price Guarantee', description: 'No hidden fees. Quote before we start.', icon: Lock },
  { title: '12-Month Workmanship Warranty', description: 'All work guaranteed for 12 months.', icon: Shield },
  { title: 'Gas Safe Registered Engineers', description: 'Fully certified and insured.', icon: Award },
  { title: 'Local Bristol Team', description: 'We know your area. We know your pipes.', icon: MapPin },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <BentoGrid>
          {/* USP Card - Large Left */}
          <FadeIn className="md:col-span-8 lg:col-span-7">
            <div className="relative h-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] border-2 border-[#EF4444] rounded-2xl p-8 overflow-hidden group">
              <motion.div
                className="absolute inset-0 border-2 border-[#EF4444] rounded-2xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <AlertTriangle className="w-12 h-12 text-[#EF4444] mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                Emergency Response in 30 Minutes — Or We Pay Your Call-Out Fee
              </h3>
              <p className="text-white/70 mb-6">
                Available 24/7, 365 days a year. No hidden charges. No excuses.
              </p>
              <a
                href="tel:01172345678"
                className="inline-flex items-center gap-2 bg-[#EF4444] hover:bg-[#EF4444]/90 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" /> Call Emergency Line
              </a>
            </div>
          </FadeIn>

          {/* Reason Cards - Right Stack */}
          <StaggerContainer className="md:col-span-8 lg:col-span-5 flex flex-col gap-4">
            {reasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-5 shadow-bento hover:shadow-bento-hover transition-all hover:-translate-y-1 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#06B6D4]/20 transition-colors">
                      <reason.icon className="w-5 h-5 text-[#06B6D4]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] mb-1">{reason.title}</h4>
                      <p className="text-sm text-[#0F172A]/60">{reason.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </BentoGrid>
      </div>
    </section>
  );
}
