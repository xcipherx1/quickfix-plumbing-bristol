import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Send } from 'lucide-react';
import { FadeIn } from '@/components/motion';

export function CTA() {
  const scrollToForm = () => {
    const el = document.querySelector('#hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-[#0F172A] relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/10 via-transparent to-[#06B6D4]/10" />

      <div className="max-w-[900px] mx-auto px-4 md:px-6 relative z-10 text-center">
        <FadeIn>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white leading-tight mb-4">
            Need a Plumber in Bristol? We're 30 Minutes Away.
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Emergency or routine — we'll be there. Fast, fixed, guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white px-8 py-4 rounded-xl font-semibold transition-all"
            >
              <Send className="w-5 h-5" /> Get Free Quote
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="tel:01172345678"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all animate-emergency-pulse"
            >
              <Phone className="w-5 h-5" /> Call Emergency Line
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
