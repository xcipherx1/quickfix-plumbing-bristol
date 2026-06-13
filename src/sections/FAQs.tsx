import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/mock-data';

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8FAFC]">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[#0F172A]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#0F172A]/60 mt-4">Everything you need to know</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`bg-white rounded-2xl shadow-bento overflow-hidden transition-all ${
                  isOpen ? 'border-l-4 border-l-[#06B6D4]' : 'border border-[rgba(15,23,42,0.06)]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-[#0F172A] pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0F172A]/40 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-[#0F172A]/60 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
