'use client';

import Input from '@/components/common/input';
import { formatPhone } from '@/features/add-info/services/formatPhone';
import type { ValidationResult } from '@/features/add-info/types/validationResult';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-haiku';

interface InputFieldProps extends React.ComponentProps<typeof Input> {
  validation?: (value: string) => ValidationResult;
  // TODO: 타입 정의 필요
  useStore?: any;
}

export default function ValidateInput(props: InputFieldProps) {
  const value = props.useStore((state: any) => state[props.name as string]);
  const debouncedValue = useDebounce(value, 500);
  const setField = props.useStore((state: any) => state.setValue);
  const setIsValid = props.useStore((state: any) => state.setIsValid);

  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const isFirstRender = useRef(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let nextValue = value;
    if (name === 'phone') {
      nextValue = formatPhone(value);
    }
    setField(name, nextValue);
    setTouched(true);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (props.validation) {
      const { isValid, errorMessage } = props.validation(debouncedValue as string);
      setIsInvalid(!isValid);
      setErrorMessage(errorMessage ?? null);
      setIsValid(props.name as string, isValid);
    }
  }, [debouncedValue, touched]);

  return (
    <Input
      {...props}
      isInvalid={touched && isInvalid}
      errorMessage={touched ? errorMessage : undefined}
      onChange={handleChange}
      value={value as string}
    />
  );
}
