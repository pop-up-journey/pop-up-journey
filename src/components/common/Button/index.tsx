import { Button as HerouiButton } from '@heroui/react';

interface ButtonProps extends Omit<React.ComponentProps<typeof HerouiButton>, 'color' | 'variant'> {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow';
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const Button = ({ ...props }: ButtonProps) => {
  return <HerouiButton {...props} />;
};
