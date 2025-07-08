'use client';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { LABELS } from '@/components/common/input/labels';
import EventDatePicker from '@/features/event/register/components/EventDatePicker';
import EventExtraInfo from '@/features/event/register/components/EventExtraInfo';
import EventImageUpload from '@/features/event/register/components/EventImageUpload';
import EventLocation from '@/features/event/register/components/EventLocation';
import EventRecruitment from '@/features/event/register/components/EventRecruitment';
import useEventRegisterForm from '@/features/event/register/hooks/useEventRegisterForm';
import { OTHER_INFO_OPTIONS } from '@/features/event/register/services/otherInfoLabelHelper';
import { Textarea } from '@heroui/react';
import { useSession } from 'next-auth/react';
import Script from 'next/script';

// TODO: 폼 제출이 완료된 다음에 알림 + 페이지이동(호스트센터 / 상세페이지)
declare global {
  interface Window {
    daum: any;
  }
}

export default function EventRegisterPage() {
  const { data: session } = useSession();
  const hostId = session?.user?.id;

  // HACK: 폼에서 관리하는 상태가 많으니까 useReducer로 통합하는 건 어떨까
  const { fields, imageUpload, handlers } = useEventRegisterForm(hostId);
  const {
    title,
    setTitle,
    description,
    setDescription,
    email,
    setEmail,
    recruitmentMethod,
    setRecruitmentMethod,
    capacity,
    setCapacity,
    selectedInfo,
    eventStart,
    setEventStart,
    eventEnd,
    setEventEnd,
    zonecode,
    address,
    extraAddress,
    setExtraAddress,
  } = fields;

  const { thumbnail, isUploading, getRootProps, getInputProps } = imageUpload;
  const { handleInfoClick, openPostcode, handleSubmit } = handlers;

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />
      <main className="container mx-auto min-h-screen items-center justify-center p-8">
        <form id="defaultSt" className="grid grid-cols-1 gap-16 md:grid-cols-2" onSubmit={handleSubmit}>
          {/* 이미지 영역 */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <EventImageUpload
              thumbnail={thumbnail}
              isUploading={isUploading}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
            />
          </div>

          <div className="flex flex-col space-y-6">
            {/* 이벤트명 */}
            <Input
              label={LABELS.TITLE}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="개최하실 팝업 제목을 입력해주세요."
            />

            {/* 본문 */}
            {/* TODO: Text area 사용자가 작성할 때 입력창이 커지거나 따로 모달로 나오던가 해서 UX를 좀 향상시켜야함 지금
          텍스트 창 너무 작음 */}
            {/* TODO: 본문은 아마 텍스트에디터를 쓰거나 마크업언어를 쓸 수 있도록 해야 할 듯.. */}
            <Textarea
              label="이벤트에 대한 상세 설명을 입력해주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* 장소 */}
            <EventLocation
              zonecode={zonecode}
              address={address}
              extraAddress={extraAddress}
              setExtraAddress={setExtraAddress}
              onOpenPostcode={openPostcode}
            />

            {/* 이메일 */}
            <Input
              label={LABELS.EMAIL}
              type="email"
              placeholder="문의 및 연락받을 이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* 이벤트 날짜(시작, 종료) */}
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-20">
              <EventDatePicker label="시작일" value={eventStart} onChange={setEventStart} />
              <EventDatePicker label="종료일" value={eventEnd} onChange={setEventEnd} />
            </div>

            {/* 수용인원 */}
            <Input
              label={LABELS.PEOPLE}
              type="number"
              placeholder="수용 가능한 인원을 입력해주세요."
              value={capacity.toString()}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />

            {/* 모집방법 */}
            {/* TODO: 외부링크로 받을 경우에 링크 입력 할 수 있게 만들어줘야할듯 */}
            <EventRecruitment selectedMethods={recruitmentMethod} onChange={setRecruitmentMethod} />

            {/* 기타안내사항 */}
            <EventExtraInfo options={OTHER_INFO_OPTIONS} selectedInfo={selectedInfo} onToggle={handleInfoClick} />

            {/* 폼 제출 버튼 */}
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </main>
    </>
  );
}
