import { Button as HerouiButton } from '@heroui/react';

interface ButtonProps extends Omit<React.ComponentProps<typeof HerouiButton>, 'color' | 'variant'> {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow';
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}
const defaultStyle =
  'rounded-lg border border-white/30 bg-white/30 shadow-2xl backdrop-blur-2xl transition hover:scale-105 font-semibold text-black dark:text-white';

// NOTE: 진행하다가 필요한 부분이 있으면 공식문서 참고해서 수정하기
export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <HerouiButton variant="flat" className={className ? `${className}` : defaultStyle} {...props}>
      {children}
    </HerouiButton>
  );
}
