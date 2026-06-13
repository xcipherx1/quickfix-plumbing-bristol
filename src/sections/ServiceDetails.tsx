import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Building2, AlertTriangle, Flame, ChevronDown, Wrench,
  Droplets, Toilet, Bath, ClipboardList, Store, Utensils, Thermometer,
  Ban, Shield, Zap, Grid, Phone, Waves
} from 'lucide-react';
import { serviceDetails } from '@/lib/mock-data';

const iconMap: Record<string, React.ElementType> = {
  Home, Building2, AlertTriangle, Flame, Wrench,
  Droplets, Toilet, Bath, Waves, ClipboardList, Store, Utensils, Thermometer,
  Ban, Shield, Zap, Grid, Phone,
};

export function ServiceDetails() {
  const [openId, setOpenId] = useState<string | null>('emergency');

  return (
    <section id="service-details" className="py-20 md:py-28 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[#0F172A]">
            Service Details
          </h2>
          <p className="text-lg text-[#0F172A]/60 mt-4">Click to explore our full range of services</p>
        </div>

        <div className="space-y-4">
          {serviceDetails.map((service) => {
            const isOpen = openId === service.id;
            const MainIcon = iconMap[service.icon] || Home;

            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl shadow-bento overflow-hidden transition-all ${
                  service.isEmergency ? 'border-l-4 border-l-[#EF4444]' : 'border border-[rgba(15,23,42,0.06)]'
                }`}
              >
                {/* Emergency Banner */}
                {service.isEmergency && (
                  <div className="bg-[#EF4444] text-white px-6 py-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-semibold">Emergency Line: 0117 234 5678 — Call Now</span>
                  </div>
                )}

                {/* Header */}
                <button
                  onClick={() => setOpenId(isOpen ? null : service.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <MainIcon className={`w-8 h-8 ${service.isEmergency ? 'text-[#EF4444]' : 'text-[#06B6D4]'}`} />
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">{service.title}</h3>
                      <p className="text-sm text-[#0F172A]/60">{service.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0F172A]/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4 border-t border-[rgba(15,23,42,0.06)]">
                          {service.subservices.map((sub) => {
                            const SubIcon = iconMap[sub.icon] || Wrench;
                            return (
                              <div
                                key={sub.name}
                                className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl p-4 hover:bg-[#06B6D4]/5 transition-colors"
                              >
                                <SubIcon className="w-5 h-5 text-[#06B6D4] flex-shrink-0" />
                                <span className="text-sm font-medium text-[#0F172A]/80">{sub.name}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Guarantee box for emergency */}
                        {service.isEmergency && (
                          <div className="mt-4 bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-xl p-4 text-center">
                            <p className="text-sm font-semibold text-[#EF4444]">
                              We arrive in 30 minutes or less — guaranteed. If we're late, your call-out is free.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
