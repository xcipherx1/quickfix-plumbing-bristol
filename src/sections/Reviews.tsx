import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { BentoGrid } from '@/components/bento';
import { FadeIn, ScrollReveal } from '@/components/motion';
import { reviews } from '@/lib/mock-data';

const filters = ['All', 'Emergency', 'Installation', 'Repair', 'Gas Safety', 'Drainage', 'Commercial'];

export function Reviews() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredReviews = activeFilter === 'All'
    ? reviews
    : reviews.filter(r => {
        if (activeFilter === 'Emergency') return r.service.includes('Emergency');
        if (activeFilter === 'Installation') return r.service.includes('Installation') || r.service.includes('Bathroom');
        if (activeFilter === 'Repair') return r.service.includes('Repair') || r.service.includes('Boiler');
        if (activeFilter === 'Gas Safety') return r.service.includes('Gas');
        if (activeFilter === 'Drainage') return r.service.includes('Drain');
        if (activeFilter === 'Commercial') return r.service.includes('Commercial');
        return true;
      });

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <FadeIn>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[#0F172A] text-center mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[#0F172A]/60 text-center mb-8">Trusted by thousands across Bristol & Bath</p>
        </FadeIn>

        {/* Aggregate Score */}
        <FadeIn delay={0.1}>
          <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-8 shadow-bento mb-8 max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-6xl font-extrabold text-[#0F172A]">4.9</span>
              <span className="text-2xl text-[#0F172A]/50">/5</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-[#0F172A]/60">From <strong className="text-[#0F172A]">2,400+</strong> reviews across Bristol</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[#0F172A]/40">
              <span>Trustpilot</span>
              <span>·</span>
              <span>Google</span>
              <span>·</span>
              <span>Checkatrade</span>
            </div>
          </div>
        </FadeIn>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-[#06B6D4] text-white'
                  : 'bg-white text-[#0F172A]/60 hover:text-[#0F172A] border border-[rgba(15,23,42,0.1)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Review Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-6 shadow-bento hover:shadow-bento-hover transition-all"
              >
                <Quote className="w-8 h-8 text-[#06B6D4] mb-3 opacity-60" />
                <p className="text-[#0F172A]/80 text-sm leading-relaxed mb-4">{review.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm text-[#0F172A]">{review.name}</span>
                    <span className="text-xs text-[#0F172A]/50 ml-2">{review.service}</span>
                  </div>
                  <span className="text-xs bg-[#F8FAFC] text-[#0F172A]/50 px-2 py-1 rounded-full">{review.source}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
