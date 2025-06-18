import { Button as HerouiButton } from '@heroui/react';

interface ButtonProps extends Omit<React.ComponentProps<typeof HerouiButton>, 'color' | 'variant'> {
  // TODO: color, variant 뭐 쓸건지 정해야 함
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow';
  isLoading?: boolean;
  isDisabled?: boolean;
  width?: string;
}

export const Button = ({ width = '', ...props }: ButtonProps) => {
  return <HerouiButton className={`w-${width}`} {...props} />;
};
