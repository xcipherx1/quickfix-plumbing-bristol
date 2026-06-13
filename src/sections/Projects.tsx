import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { projects } from '@/lib/mock-data';

const filters = ['All', 'Residential', 'Commercial', 'Emergency'];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter.toLowerCase());

  const getSpan = (index: number) => {
    if (index === 0) return 'md:col-span-5 lg:col-span-8 md:row-span-2';
    if (index === 1) return 'md:col-span-3 lg:col-span-4 md:row-span-2';
    return 'md:col-span-4 lg:col-span-4';
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[#0F172A]">
            Past Projects
          </h2>
          <p className="text-lg text-[#0F172A]/60 mt-4">See the quality of our work</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#0F172A]/60 hover:text-[#0F172A]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${getSpan(index)} ${
                  index === 0 || index === 1 ? 'aspect-[4/3] md:aspect-auto md:h-80' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <span className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">{project.serviceType}</span>
                  <h3 className="text-white font-bold text-lg mt-1">{project.title}</h3>
                  <p className="text-white/70 text-sm">{project.location}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="inline-flex items-center gap-2 bg-white text-[#0F172A] px-4 py-2 rounded-full text-sm font-semibold">
                    <Eye className="w-4 h-4" /> View Project
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
