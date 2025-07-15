'use client';

import Button from '@/components/common/button';
import FormTitle from '@/components/common/form/FormTitle';
import InputField from '@/components/common/form/ValidateInput';
import { LABELS } from '@/components/common/input/labels';
// validate는 따로 공통 utils로 빼기
import { validateName } from '@/features/add-info/services/nameValidation';
import { validatePhone } from '@/features/add-info/services/phoneValidation';
import { createParticipate } from '@/features/popup-participate/api/createParticipate';
import { validateTickets } from '@/features/popup-participate/services/validateTickets';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useEventParticipateFormStore } from '@/store/event-participate/useEventParticipateFormStore';
import { addToast } from '@heroui/react';
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
    // const body: Pick<CreateEventParticipant, 'participantStatus' | 'tickets'> = {
    // participantStatus: 'pending',
    // tickets,
    // };
    createParticipate({ name, email, phone, tickets }, popupId);
  };

  return (
    <section aria-label="participate-form">
      <form
        id="defaultSt"
        // className="grid grid-cols-1 gap-y-8 px-6 sm:px-8 md:grid-cols-2 md:gap-x-6 md:px-10 lg:px-16"
        onSubmit={handleSubmit}
      >
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
