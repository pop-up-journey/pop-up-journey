'use client';

import Button from '@/components/common/button';
import Chip from '@/components/common/chip';
import Input from '@/components/common/input';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import type { DateValue } from '@heroui/react';
import { Calendar, Checkbox, CheckboxGroup, Popover, PopoverContent, PopoverTrigger, Textarea } from '@heroui/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { LABELS } from '../components/common/input/labels';

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

interface FileWithPreview extends File {
  preview: string;
}

export default function EventRegisterPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [recruitmentMethod, setRecruitmentMethod] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [selectedInfo, setSelectedInfo] = useState<string[]>([]);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [startDate, setStartDate] = useState<DateValue | null>(null);
  const [endDate, setEndDate] = useState<DateValue | null>(null);

  console.log(title, description, location, recruitmentMethod, email, selectedInfo, files, startDate, endDate);

  console.log(startDate, endDate);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleInfoClick = (infoId: string) => {
    setSelectedInfo((prev) => (prev.includes(infoId) ? prev.filter((item) => item !== infoId) : [...prev, infoId]));
  };

  return (
    <main className="container mx-auto min-h-screen items-center justify-center p-8">
      <form id="defaultSt" className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div
            {...getRootProps()}
            className="flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <Image
                src={files[0].preview}
                alt="preview"
                width={500}
                height={625}
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <FolderPlusIcon className="h-16 w-16" />
                <p className="mt-2">클릭하여 이미지 업로드 또는 드래그 앤 드롭</p>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <Input
            label={LABELS.TITLE}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="개최하실 팝업 제목을 입력해주세요."
          />
          {/* TODO: Text area 사용자가 작성할 때 입력창이 커지거나 따로 모달로 나오던가 해서 UX를 좀 향상시켜야함 지금
          텍스트 창 너무 작음 */}
          <Textarea
            label="이벤트에 대한 상세 설명을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* TODO: 이벤트 위치는 주소를 입력하면 해당 주소지의 맨 앞을 따서 가져와야겠다 e.g: 서울시 강남구 역삼동 123-45 1층 101호 -> 위치 = 서울*/}
          <Input
            label={LABELS.LOCATION}
            type="text"
            placeholder="팝업 위치를 입력해주세요."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            label={LABELS.EMAIL}
            type="email"
            placeholder="문의 및 연락받을 이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center space-x-4">
            <label className="font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">시작일</label>
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button>{startDate ? startDate.toString() : '시작일 선택'}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar value={startDate} onChange={setStartDate} color="primary" />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center space-x-4">
            <label className="font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">종료일</label>
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button>{endDate ? endDate.toString() : '종료일 선택'}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar value={endDate} onChange={setEndDate} color="primary" />
              </PopoverContent>
            </Popover>
          </div>
          <Input label={LABELS.PEOPLE} type="number" placeholder="수용 가능한 인원을 입력해주세요." />
          <div>
            <label className="mb-2 block font-medium">참가자 모집 방법</label>
            <CheckboxGroup
              color="primary"
              value={recruitmentMethod}
              onValueChange={setRecruitmentMethod}
              orientation="horizontal"
              classNames={{
                wrapper: 'gap-20',
              }}
            >
              <Checkbox value="현장">현장</Checkbox>
              <Checkbox value="사이트 신청 폼">사이트 신청 폼</Checkbox>
              <Checkbox value="외부 신청 링크">외부 신청 링크</Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <label className="mb-2 block font-medium">기타 안내 사항</label>
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
          <Button type="submit">등록하기</Button>
        </div>
      </form>
    </main>
  );
}
