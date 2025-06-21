'use client';
import Button from '@/components/common/button';
import Chip from '@/components/common/chip';
import Input from '@/components/common/input';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Textarea } from '@heroui/react';
import { useState } from 'react';

// 기타 안내 사항 데이터
const otherInfoOptions = [
  { id: 'parking_available', label: '주차가능' },
  { id: 'no_parking', label: '주차불가' },
  { id: 'kids_zone', label: '웰컴 키즈존' },
  { id: 'no_kids_zone', label: '노키즈존' },
  { id: 'free_admission', label: '입장료 무료' },
  { id: 'paid_admission', label: '입장료 유료' },
  { id: 'pets_allowed', label: '반려동물 동반가능' },
  { id: 'no_pets_allowed', label: '반려동물 입장금지' },
  { id: 'wifi', label: '와이파이 가능' },
  { id: 'photography_allowed', label: '사진촬영 가능' },
];

export default function EventRegisterPage() {
  const [eventName, setEventName] = useState('');
  const [recruitmentMethod, setRecruitmentMethod] = useState('현장');
  const [selectedInfo, setSelectedInfo] = useState<string[]>([]);

  const handleInfoClick = (infoId: string) => {
    setSelectedInfo((prev) => (prev.includes(infoId) ? prev.filter((item) => item !== infoId) : [...prev, infoId]));
  };

  return (
    <main className="container mx-auto min-h-screen items-center justify-center p-8">
      <div id="defaultSt" className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <PhotoIcon className="h-16 w-16" />
            <p className="mt-2">drag & drop</p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex flex-col space-y-6">
          <Input
            label="제목"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="개최하실 팝업 제목을 입력해주세요."
          />
          <Textarea label="이벤트에 대한 상세 설명" placeholder="Enter a brief description of your event." />
          <Input label="이벤트 위치" type="text" placeholder="Enter the location of the event." />
          <Input label="이메일" type="email" placeholder="Enter a contact email for the event." />
          <div className="flex items-center space-x-4">
            <label className="font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">오픈 일자</label>
            <Input type="text" placeholder="MM/DD/YYYY HH:MM AM/PM" />
          </div>
          <div className="flex items-center space-x-4">
            <label className="font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">마감 일자</label>
            <Input type="text" placeholder="MM/DD/YYYY HH:MM AM/PM" />
          </div>
          <Input label="수용 인원" type="number" placeholder="Maximum number of attendees." />

          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">참가자 모집 방법</label>
            <div className="flex space-x-2">
              {['현장', '사이트 신청 폼 이용', '외부 신청 링크'].map((method) => (
                <Chip
                  key={method}
                  variant={recruitmentMethod === method ? 'solid' : 'bordered'}
                  onClick={() => setRecruitmentMethod(method)}
                  className="cursor-pointer"
                >
                  {method}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">기타 안내 사항</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {otherInfoOptions.map((info) => (
                <Chip
                  key={info.id}
                  variant={selectedInfo.includes(info.id) ? 'solid' : 'bordered'}
                  onClick={() => handleInfoClick(info.id)}
                  color={selectedInfo.includes(info.id) ? 'danger' : 'default'}
                  className="cursor-pointer"
                >
                  {info.label}
                </Chip>
              ))}
            </div>
          </div>

          <Button>등록하기</Button>
        </div>
      </div>
    </main>
  );
}
