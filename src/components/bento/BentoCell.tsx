import React from 'react';
import { BentoCard } from './BentoCard';

interface BentoCellProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'full';
  className?: string;
  variant?: 'default' | 'dark' | 'emergency' | 'gradient';
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function BentoCell({
  children,
  size = 'medium',
  className,
  variant = 'default',
  hoverEffect = true,
  onClick,
}: BentoCellProps) {
  const sizeMap = {
    small: { colSpan: 3 as const, rowSpan: 1 as const },
    medium: { colSpan: 4 as const, rowSpan: 1 as const },
    large: { colSpan: 6 as const, rowSpan: 1 as const },
    xlarge: { colSpan: 8 as const, rowSpan: 2 as const },
    full: { colSpan: 12 as const, rowSpan: 1 as const },
  };

  const { colSpan, rowSpan } = sizeMap[size];

  return (
    <BentoCard
      colSpan={colSpan}
      rowSpan={rowSpan}
      variant={variant}
      hoverEffect={hoverEffect}
      className={className}
      onClick={onClick}
    >
      {children}
    </BentoCard>
  );
}
