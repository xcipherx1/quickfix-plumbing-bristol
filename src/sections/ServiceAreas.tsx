import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { FadeIn } from '@/components/motion';
import { bristolAreas, bathAreas } from '@/lib/mock-data';

export function ServiceAreas() {
  return (
    <section id="areas" className="py-20 md:py-28 bg-[#0F172A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Text */}
          <FadeIn>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white leading-tight mb-6">
              Serving All of Bristol & Bath
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              From Clifton to Kingswood, Bath city centre to Widcombe — if you're in Bristol or Bath, we're never more than 30 minutes away.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#06B6D4]">{bristolAreas.length + bathAreas.length}+</div>
                <div className="text-sm text-white/60">Areas Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#06B6D4]">30 min</div>
                <div className="text-sm text-white/60">Max Response</div>
              </div>
            </div>
          </FadeIn>

          {/* Right - Area Chips */}
          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Bristol Areas
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {bristolAreas.map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.015, duration: 0.3 }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/70 hover:bg-[#06B6D4]/20 hover:border-[#06B6D4] hover:text-white transition-all cursor-default"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>

              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Bath Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {bathAreas.map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/70 hover:bg-[#06B6D4]/20 hover:border-[#06B6D4] hover:text-white transition-all cursor-default"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
