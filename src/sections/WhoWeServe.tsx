import React from 'react';
import { Home, Key, Building2, ClipboardList, Store, Settings, ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/motion';

const audiences = [
  { title: 'Homeowners', description: 'From leaky taps to full bathroom renovations.', icon: Home },
  { title: 'Landlords', description: 'Reliable service for your properties. Certificates included.', icon: Key },
  { title: 'Estate Agents', description: 'Quick turnaround for sales and lettings.', icon: Building2 },
  { title: 'Property Managers', description: 'Maintenance contracts for multiple properties.', icon: ClipboardList },
  { title: 'Restaurants & Retail', description: 'Commercial compliance and emergency cover.', icon: Store },
  { title: 'Facilities Management', description: 'Scheduled maintenance and 24/7 support.', icon: Settings },
];

export function WhoWeServe() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[#0F172A]">
            Who We Serve
          </h2>
          <p className="text-lg text-[#0F172A]/60 mt-4">Tailored plumbing solutions for every sector</p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience) => (
            <StaggerItem key={audience.title}>
              <div className="bg-white border border-[rgba(15,23,42,0.06)] rounded-2xl p-6 shadow-bento hover:shadow-bento-hover transition-all hover:-translate-y-1 group cursor-pointer h-full">
                <audience.icon className="w-12 h-12 text-[#06B6D4] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">{audience.title}</h3>
                <p className="text-sm text-[#0F172A]/60 mb-4">{audience.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#06B6D4] group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
