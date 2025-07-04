import { Input as HerouiInput } from '@heroui/react';
import type { ChangeEvent, FC, SVGProps } from 'react';
import LabelIconMapper from './LabelIconMapper';
import { Label, LABELS } from './labels';

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: 'text' | 'email' | 'url' | 'password' | 'tel' | 'search' | 'file' | 'number';
  label?: Label | string;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  isReadOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  description?: string;
  isInvalid?: boolean;
  className?: string;
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
  className,
}: InputProps) {
  const isLabelEnum = label && Object.values(LABELS).includes(label as Label);
  const Icon: FC<SVGProps<SVGSVGElement>> | null = isLabelEnum ? LabelIconMapper(label as Label) : null;

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
      className={className}
      classNames={{ ...styles }}
      startContent={
        Icon && (
          <Icon className="pointer-events-none flex-shrink-0 text-black/50 dark:text-white/90" width={20} height={20} />
        )
      }
    />
  );
}
