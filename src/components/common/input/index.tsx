import { EnvelopeIcon, PhoneIcon, TagIcon } from '@heroicons/react/24/outline';
import { Input as HerouiInput } from '@heroui/react';
import { type FC, type SVGProps } from 'react';
import { type Label, LABELS } from './labels';

type HerouiInputProps = React.ComponentProps<typeof HerouiInput>;

interface InputProps extends Omit<HerouiInputProps, 'label'> {
  label: Label;
  width?: string;
}

export const Input = ({ label, width = '', ...props }: InputProps) => {
  let Icon: FC<SVGProps<SVGSVGElement>> | null = null;
  switch (label) {
    case LABELS.EMAIL:
      Icon = EnvelopeIcon;
      break;
    case LABELS.PHONE:
      Icon = PhoneIcon;
      break;
    case LABELS.NAME:
      Icon = TagIcon;
      break;
    default:
      Icon = null;
      break;
  }

  return (
    <HerouiInput
      isClearable
      classNames={{
        label: 'text-black/50 dark:text-white/90',
        input: [
          'bg-transparent',
          'text-black/90 dark:text-white/90',
          'placeholder:text-default-700/50 dark:placeholder:text-white/60',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'shadow-xl',
          'bg-default-200/50',
          'dark:bg-default/60',
          'backdrop-blur-xl',
          'backdrop-saturate-200',
          'hover:bg-default-200/70',
          'dark:hover:bg-default/70',
          'group-data-[focus=true]:bg-default-200/50',
          'dark:group-data-[focus=true]:bg-default/60',
          '!cursor-text',
          `w-${width}`,
        ],
      }}
      startContent={
        Icon && (
          <Icon
            className="pointer-events-none mb-0.5 flex-shrink-0 text-black/50 dark:text-white/90"
            width={20}
            height={20}
          />
        )
      }
      {...props}
    />
  );
};
