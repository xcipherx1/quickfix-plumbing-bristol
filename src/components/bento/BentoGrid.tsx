import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

export function BentoGrid({ children, className, gap = 'md' }: BentoGridProps) {
  const gapMap = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 max-w-[1400px] mx-auto px-4 md:px-6',
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
