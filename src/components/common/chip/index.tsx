'use client';
import { Chip as HerouiChip } from '@heroui/react';

interface ChipProps extends Omit<React.ComponentProps<typeof HerouiChip>, 'color' | 'variant'> {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'solid' | 'bordered' | 'flat' | 'faded' | 'light' | 'shadow';
  className?: string;
}
export default function Chip({
  children,
  color = 'danger',
  size = 'sm',
  radius = 'sm',
  variant = 'flat',
  className = '',
}: ChipProps) {
  return (
    <HerouiChip size={size} radius={radius} variant={variant} color={color} className={className}>
      {children}
    </HerouiChip>
  );
}
