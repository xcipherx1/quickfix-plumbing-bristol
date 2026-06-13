import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, AlertTriangle, Flame, ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/motion';

const services = [
  {
    id: 'residential',
    title: 'Residential Plumbing',
    icon: Home,
    description: 'Leaks, taps, toilets, pipes, installations',
    accent: '#06B6D4',
  },
  {
    id: 'commercial',
    title: 'Commercial Plumbing',
    icon: Building2,
    description: 'Offices, retail, restaurants, maintenance contracts',
    accent: '#06B6D4',
  },
  {
    id: 'emergency',
    title: 'Emergency Plumbing',
    icon: AlertTriangle,
    description: '24/7 • 30 Min Response • No Call-Out Fee',
    accent: '#EF4444',
    isEmergency: true,
  },
  {
    id: 'heating',
    title: 'Heating & Gas',
    icon: Flame,
    description: 'Boilers, radiators, gas safety certificates',
    accent: '#06B6D4',
  },
];

export function Services() {
  const scrollToDetails = () => {
    const el = document.querySelector('#service-details');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[#0F172A]">
            Our Services
          </h2>
          <p className="text-lg text-[#0F172A]/60 mt-4">Comprehensive plumbing solutions for every need</p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <motion.div
                whileHover={{ y: -4 }}
                onClick={scrollToDetails}
                className={`relative bg-white rounded-2xl p-8 shadow-bento hover:shadow-bento-hover transition-all cursor-pointer border ${
                  service.isEmergency
                    ? 'border-l-4 border-l-[#EF4444] border-[rgba(15,23,42,0.06)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.12)]'
                    : 'border-[rgba(15,23,42,0.06)]'
                }`}
              >
                {service.isEmergency && (
                  <span className="absolute top-4 right-4 bg-[#EF4444]/10 text-[#EF4444] text-xs font-bold px-3 py-1 rounded-full">
                    Our #1 Service
                  </span>
                )}
                <service.icon
                  className="w-12 h-12 mb-4 transition-transform group-hover:scale-110"
                  style={{ color: service.accent }}
                />
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{service.title}</h3>
                <p className="text-[#0F172A]/60 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: service.accent }}>
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
