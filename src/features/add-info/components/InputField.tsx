'use client';

import Input from '@/components/common/input';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-haiku';
import { formatPhone } from '../services/formatPhone';
import type { ValidationResult } from '../types/validationResult';

interface InputFieldProps extends React.ComponentProps<typeof Input> {
  validation?: (value: string) => ValidationResult;
  useStore?: any;
}

export default function ValidateInput(props: InputFieldProps) {
  // const value = useAddInfoFormStore((state) => state[props.name as keyof typeof state]);
  // const debouncedValue = useDebounce(value, 500);
  // const setField = useAddInfoFormStore((state) => state.setValue);
  // const setIsValid = useAddInfoFormStore((state) => state.setIsValid);
  const value = props.useStore((state: any) => state[props.name as string]);
  const debouncedValue = useDebounce(value, 500);
  const setField = props.useStore((state: any) => state.setValue);
  const setIsValid = props.useStore((state: any) => state.setIsValid);

  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let nextValue = value;
    if (name === 'phone') {
      nextValue = formatPhone(value);
    }
    setField(name, nextValue);
  };

  useEffect(() => {
    if (props.validation) {
      const { isValid, errorMessage } = props.validation(debouncedValue as string);
      setIsInvalid(!isValid);
      setErrorMessage(errorMessage ?? null);
      setIsValid(props.name as string, isValid);
    }
  }, [debouncedValue]);

  return (
    <Input
      {...props}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      onChange={handleChange}
      value={value as string}
    />
  );
}
