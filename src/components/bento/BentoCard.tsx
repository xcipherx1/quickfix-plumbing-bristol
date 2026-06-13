import React from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  children: React.ReactNode;
  colSpan?: 3 | 4 | 6 | 8 | 12;
  rowSpan?: 1 | 2;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  variant?: 'default' | 'dark' | 'emergency' | 'gradient';
  onClick?: () => void;
}

export function BentoCard({
  children,
  colSpan = 4,
  rowSpan = 1,
  className,
  hoverEffect = true,
  glowEffect = false,
  variant = 'default',
  onClick,
}: BentoCardProps) {
  const colSpanClass = {
    3: 'md:col-span-4 lg:col-span-3',
    4: 'md:col-span-4 lg:col-span-4',
    6: 'md:col-span-4 lg:col-span-6',
    8: 'md:col-span-8 lg:col-span-8',
    12: 'md:col-span-8 lg:col-span-12',
  };

  const rowSpanClass = rowSpan === 2 ? 'row-span-2' : '';

  const variantClasses = {
    default: 'bg-white border border-[rgba(15,23,42,0.06)]',
    dark: 'bg-[#0F172A] border border-[rgba(255,255,255,0.08)] text-white',
    emergency: 'bg-white border-l-4 border-l-emergency border border-[rgba(15,23,42,0.06)]',
    gradient: 'bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-[rgba(255,255,255,0.08)] text-white',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6 md:p-8 shadow-bento',
        colSpanClass[colSpan],
        rowSpanClass,
        variantClasses[variant],
        hoverEffect && 'transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:-translate-y-1 hover:shadow-bento-hover cursor-pointer',
        glowEffect && 'hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
