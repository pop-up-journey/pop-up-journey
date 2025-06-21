import { Input as HerouiInput } from '@heroui/react';
import type { ChangeEvent, FC, SVGProps } from 'react';
import { Label } from './labels';
import { getIconByLabel } from './utils/IconMappter';

interface InputProps {
  label: Label;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: 'text' | 'email' | 'url' | 'password' | 'tel' | 'search' | 'file' | 'number';
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  isReadOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  description?: string;
  isInvalid?: boolean;
}
// NOTE: 필요시 스타일링은 여기서 작성 할 것
const styles = {
  label: ['text-black/50 dark:text-white/90'],
  // inputWrapper: []
  // innerWrapper: []
  // mainWrapper: []
  input: ['text-black/50 dark:text-white/90'],
  // clearButton: []
  // helperWrapper: []
  description: ['text-black/50 dark:text-white/90'],
  // errorMessage: []
  // helperWrapper: []
};

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type,
  isReadOnly = false,
  errorMessage,
  description,
  isInvalid,
  isRequired,
}: InputProps) {
  const Icon: FC<SVGProps<SVGSVGElement>> | null = getIconByLabel(label);

  return (
    <HerouiInput
      variant="underlined"
      size="md"
      fullWidth={true}
      label={label}
      type={type}
      color="primary"
      value={value}
      onChange={onChange}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      description={description}
      placeholder={placeholder}
      classNames={{ ...styles }}
      startContent={
        Icon && (
          <Icon className="pointer-events-none flex-shrink-0 text-black/50 dark:text-white/90" width={20} height={20} />
        )
      }
    />
  );
}
