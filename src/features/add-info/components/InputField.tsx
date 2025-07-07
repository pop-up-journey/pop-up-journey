'use client';

import Input from '@/components/common/input';
import { useAddInfoFormStore } from '@/store/add-info/useAddInfoFormStore';
import { useState } from 'react';
import { formatPhone } from '../services/formatPhone';

interface InputFieldProps extends React.ComponentProps<typeof Input> {
  validation?: (value: string) => { isValid: boolean; errorMessage: string | null };
}

export default function ValidateInput(props: InputFieldProps) {
  const value = useAddInfoFormStore((state) => state[props.name as keyof typeof state]);
  const setField = useAddInfoFormStore((state) => state.setValue);

  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let nextValue = value;
    if (name === 'phone') {
      nextValue = formatPhone(value);
    }
    setField(name, nextValue);
    if (props.validation) {
      setIsInvalid(props.validation(nextValue)?.isValid === false);
      setErrorMessage(props.validation(nextValue)?.errorMessage ?? null);
    }
  };

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
