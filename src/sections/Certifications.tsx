import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Droplets, Wrench, CheckCircle, Award } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/motion';

const certs = [
  { name: 'Gas Safe Register', icon: Shield },
  { name: 'WaterSafe', icon: Droplets },
  { name: 'CIPHE', icon: Wrench },
  { name: 'TrustMark', icon: CheckCircle },
  { name: 'CHAS', icon: Award },
];

export function Certifications() {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {certs.map(({ name, icon: Icon }) => (
            <StaggerItem key={name}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-6 flex flex-col items-center gap-3 shadow-bento hover:shadow-bento-hover transition-all cursor-pointer group"
              >
                <Icon className="w-8 h-8 text-[#0F172A]/40 group-hover:text-[#06B6D4] transition-colors" />
                <span className="text-sm font-semibold text-[#0F172A]/70 group-hover:text-[#0F172A] transition-colors text-center">{name}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
