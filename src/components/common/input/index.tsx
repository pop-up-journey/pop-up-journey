import { Input as HerouiInput } from '@heroui/react';
import type { ChangeEvent, FC, SVGProps } from 'react';
import LabelIconMapper from './LabelIconMapper';
import { Label, LABELS } from './labels';

interface InputProps {
  // 기본 입력 관련
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: 'text' | 'email' | 'url' | 'password' | 'tel' | 'search' | 'file' | 'number';

  // 라벨 관련
  label?: Label | string;

  // 상태 관련
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;

  // 메세지 관련
  errorMessage?: string;
  description?: string;

  // 스타일 관련
  className?: string;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
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
  variant = 'underlined',
}: InputProps) {
  const isLabelEnum = label && Object.values(LABELS).includes(label as Label);
  const Icon: FC<SVGProps<SVGSVGElement>> | null = isLabelEnum ? LabelIconMapper(label as Label) : null;

  return (
    <HerouiInput
      variant={variant}
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
