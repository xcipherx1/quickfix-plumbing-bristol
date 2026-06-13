import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle, Star, Users, Droplets } from 'lucide-react';

const partners = [
  { name: 'Trustpilot', icon: Star },
  { name: 'Checkatrade', icon: CheckCircle },
  { name: 'Rated People', icon: Users },
  { name: 'Which? Trusted Trader', icon: Award },
  { name: 'Gas Safe Register', icon: Shield },
  { name: 'WaterSafe', icon: Droplets },
];

export function Partners() {
  return (
    <section className="py-16 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <p className="text-center text-sm text-[#0F172A]/50 mb-8">Trusted by leading industry organisations</p>
        <div className="relative">
          <div className="flex gap-6 animate-marquee">
            {[...partners, ...partners].map((partner, i) => (
              <motion.div
                key={`${partner.name}-${i}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-6 w-48 flex flex-col items-center gap-3 shadow-bento hover:shadow-bento-hover transition-all group cursor-pointer"
              >
                <partner.icon className="w-8 h-8 text-[#0F172A]/30 group-hover:text-[#06B6D4] transition-colors" />
                <span className="text-sm font-semibold text-[#0F172A]/60 group-hover:text-[#0F172A] transition-colors text-center">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
