'use client';

import Button from '@/components/common/button';
import FormTitle from '@/components/common/form/FormTitle';
import InputField from '@/components/common/form/ValidateInput';
import { LABELS } from '@/components/common/input/labels';
import { createParticipate } from '@/features/popup-participate/api/createParticipate';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useEventParticipateFormStore } from '@/store/event-participate/useEventParticipateFormStore';
import { validateName, validatePhone, validateTickets } from '@/utils/form-validation';
import { addToast } from '@heroui/toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const inputOptions = {
  name: {
    name: 'name',
    label: LABELS.NAME,
    type: 'text',
    validation: validateName,
  },
  email: {
    name: 'email',
    label: LABELS.EMAIL,
    type: 'email',
  },
  phone: {
    name: 'phone',
    label: LABELS.PHONE,
    type: 'tel',
    validation: validatePhone,
  },
  tickets: {
    name: 'tickets',
    label: LABELS.TICKETS,
    type: 'number',
    validation: validateTickets,
    max: 4,
    min: 1,
  },
};

interface ParticipateFormProps {
  popupId: string;
}

export default function ParticipateForm({ popupId }: ParticipateFormProps) {
  const router = useRouter();
  const { userInfo } = useGetUserInfo();
  const setValue = useEventParticipateFormStore((state) => state.setValue);
  const setIsValid = useEventParticipateFormStore((state) => state.setIsValid);

  useEffect(() => {
    if (!userInfo) return;
    setValue('name', userInfo.name);
    setValue('email', userInfo.email ?? '');
    setValue('phone', userInfo.phone ?? '');
    setIsValid('name', true);
    setIsValid('email', true);
    setIsValid('phone', true);
  }, [userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, tickets } = useEventParticipateFormStore.getState();

    if (!name || !email || !phone || !tickets) {
      addToast({
        title: '모든 필드를 입력해주세요.',
        color: 'warning',
      });
      return;
    }

    createParticipate({ name, email, phone, tickets }, popupId);
    try {
      const res = await createParticipate({ name, email, phone, tickets }, popupId);

      //TODO: 서버에서 이미 신청한 팝업이면 res.error를 반환함. 좀 더 정교한 로직이 필요
      if (res.error) {
        addToast({
          title: '이미 신청을 완료한 팝업입니다.',
          color: 'warning',
        });
        return;
      }
      addToast({ title: '참여 신청이 완료되었습니다!', color: 'success' });
      router.push('/profile');
    } catch {
      addToast({
        title: '참여 신청에 실패했습니다. 다시 시도해주세요.',
        color: 'danger',
      });
    }
  };

  return (
    <section aria-label="participate-form">
      <form id="defaultSt" onSubmit={handleSubmit}>
        <FormTitle>신청자 정보 입력</FormTitle>
        <div className="flex flex-col justify-evenly space-y-6">
          {Object.entries(inputOptions).map(([k, v]) => (
            <InputField key={k} {...v} useStore={useEventParticipateFormStore} />
          ))}
          <Button type="submit">신청하기</Button>
        </div>
      </form>
    </section>
  );
}
