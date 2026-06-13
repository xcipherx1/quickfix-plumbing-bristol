import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ title, subtitle, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2
        className={`text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight ${
          light ? 'text-white' : 'text-[#0F172A]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-white/70' : 'text-[#0F172A]/60'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
