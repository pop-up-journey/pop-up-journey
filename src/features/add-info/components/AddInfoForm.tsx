'use client';

import Button from '@/components/common/button';
import FormTitle from '@/components/common/form/FormTitle';
import ValidateInput from '@/components/common/form/ValidateInput';
import { LABELS } from '@/components/common/input/labels';
import Select from '@/components/common/select';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useAddInfoFormStore } from '@/store/add-info/useAddInfoFormStore';
import { validateName, validatePhone } from '@/utils/form-validation';
import { addToast } from '@heroui/react';
import { useEffect } from 'react';
import { updateUserInfo } from '../api/updateUserInfo';
import InterestChip from './InterestChip';

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
  }, [userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, role, nameValid, emailValid, phoneValid } = useAddInfoFormStore.getState();
    const requiredFields = [name, email, phone, role];
    const validityFlags = [nameValid, emailValid, phoneValid];

    if (requiredFields.some((field) => !field) || validityFlags.some((flag) => !flag)) {
      addToast({
        title: '모든 필드를 입력해주세요.',
        color: 'warning',
      });
      return;
    }

    if (userId) {
      try {
        await updateUserInfo({ name, email, phone, role }, userId);
        addToast({ title: '업데이트 완료', color: 'success' });
      } catch (error) {
        console.error(error);
        addToast({
          title: '업데이트 중 오류가 발생했습니다. 다시 시도해주세요.',
          color: 'danger',
        });
      }
    }
  };

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
              <ValidateInput key={k} {...v} useStore={useAddInfoFormStore} />
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
