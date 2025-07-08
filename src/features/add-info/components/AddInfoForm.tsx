'use client';

import Button from '@/components/common/button';
import { LABELS } from '@/components/common/input/labels';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useAddInfoFormStore } from '@/store/add-info/useAddInfoFormStore';
import { useCallback, useEffect } from 'react';
import { validateName } from '../services/nameValidation';
import { validatePhone } from '../services/phoneValidation';
import { updateUserInfo } from '../services/updateUserInfo';
import FormTitle from './FormTitle';
import InputField from './InputField';
import InterestChip from './InterestChip';
import Select from './Select';

const inputOptions = {
  name: {
    name: 'name',
    label: LABELS.NAME,
    type: 'text',
    placeholder: '사용하실 이름을 입력해주세요.',
    description: '이름은 최소 2자, 최대 10자까지 입력할 수 있습니다.',
    validation: validateName,
  },
  email: {
    name: 'email',
    label: LABELS.EMAIL,
    type: 'email',
    placeholder: 'example@example.com',
    isDisabled: true,
  },
  phone: {
    name: 'phone',
    label: LABELS.PHONE,
    type: 'tel',
    placeholder: '010-1234-5678',
    validation: validatePhone,
  },
};

export default function AddInfoForm() {
  const { userInfo } = useGetUserInfo();
  const setValue = useAddInfoFormStore((state) => state.setValue);
  const setIsValid = useAddInfoFormStore((state) => state.setIsValid);

  // TODO: interests 항목을 db에 넣을지 아니면 localstorage에 넣을지 고민

  const userId = userInfo?.id;

  useEffect(() => {
    if (userInfo) {
      setValue('name', userInfo.name);
      setValue('email', userInfo.email ?? '');
      setValue('phone', userInfo.phone ?? '');
      setIsValid('name', true);
      setIsValid('email', true);
      setIsValid('phone', true);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { name, email, phone, role, nameValid, emailValid, phoneValid } = useAddInfoFormStore.getState(); // NOTE: interest 어떻게
      if (!name || !email || !phone || !role) {
        alert('모든 필드를 입력해주세요.'); // TODO: Toast
        return;
      }

      if (!nameValid || !emailValid || !phoneValid) {
        alert('모든 필드를 입력해주세요.'); // TODO: Toast
        return;
      }

      if (userId) {
        updateUserInfo({ name, email, phone, role }, userId);
        return;
      }
    },
    [userId]
  );

  return (
    <section aria-label="add-info-form">
      <div className="flex min-h-screen flex-1 items-start justify-center px-4 py-12 dark:bg-black">
        <div className="flex w-full max-w-5xl gap-12">
          <form
            className="mx-auto w-1/2 flex-1 flex-col gap-6 space-y-6 rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl"
            onSubmit={handleSubmit}
          >
            <FormTitle>회원 정보 입력</FormTitle>
            {Object.entries(inputOptions).map(([k, v]) => (
              <InputField key={k} {...v} />
            ))}
            <Select />
            <InterestChip />
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-pink-400 to-blue-400 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              완료
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
