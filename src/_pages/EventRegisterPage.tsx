'use client';

import Button from '@/components/common/button';
import Chip from '@/components/common/chip';
import Input from '@/components/common/input';
import { FolderPlusIcon, MapPinIcon } from '@heroicons/react/24/outline';
import type { DateValue } from '@heroui/react';
import { Calendar, Checkbox, CheckboxGroup, Popover, PopoverContent, PopoverTrigger, Textarea } from '@heroui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { LABELS } from '../components/common/input/labels';
import { clientApi } from '../libs/api';
import { uploadImageToStorage, type UploadedImage } from '../utils/imageUpload';

declare global {
  interface Window {
    daum: any;
  }
}

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
  const { data: session } = useSession();
  const hostId = session?.user?.id;

  // 제목
  const [title, setTitle] = useState('');
  // 본문
  const [description, setDescription] = useState('');
  // 이메일
  const [email, setEmail] = useState('');
  // 모집 방법
  const [recruitmentMethod, setRecruitmentMethod] = useState<string[]>([]);
  // 참가자 수
  const [capacity, setCapacity] = useState<number>(0);
  // 안내사항 선택 상태
  const [selectedInfo, setSelectedInfo] = useState<string[]>([]);
  // 썸네일 - 로컬 미리보기용
  const [thumbnail, setThumbnail] = useState<FileWithPreview[]>([]);
  // 업로드된 이미지 정보
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  // 업로드 상태
  const [isUploading, setIsUploading] = useState(false);
  // 날짜 상태
  const [eventStart, setEventStart] = useState<DateValue | null>(null);
  const [eventEnd, setEventEnd] = useState<DateValue | null>(null);
  // 주소 상태
  const [zonecode, setZonecode] = useState(''); // 우편번호
  const [address, setAddress] = useState(''); // 주소
  const [extraAddress, setExtraAddress] = useState(''); // 상세 주소

  console.log(eventStart);
  console.log(thumbnail);
  console.log('Uploaded image:', uploadedImage);

  const handleOpenPostcode = () => {
    if (typeof window.daum === 'undefined' || typeof window.daum.Postcode === 'undefined') {
      alert('Daum Postcode 서비스가 로드되지 않았습니다.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data: any) {
        let fullAddress = data.address;
        console.log(data);
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // NOTE: 디버깅할 때 쓸 것, 선택된 주소를 alert으로 표시
        // alert(`우편번호: ${data.zonecode}\n주소: ${fullAddress}`);

        setAddress(fullAddress);
        setZonecode(data.zonecode);
        setExtraAddress(extraAddress);
      },
    }).open();
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // 로컬 미리보기 설정
    setThumbnail([
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    ]);

    // Supabase Storage에 업로드
    setIsUploading(true);
    try {
      const uploadedImageData = await uploadImageToStorage(file);
      setUploadedImage(uploadedImageData);
      console.log('Image uploaded successfully:', uploadedImageData);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      // 업로드 실패 시 로컬 미리보기도 제거
      setThumbnail([]);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
    disabled: isUploading,
  });

  useEffect(() => {
    return () => thumbnail.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [thumbnail]);

  const handleInfoClick = (infoId: string) => {
    setSelectedInfo((prev) => (prev.includes(infoId) ? prev.filter((item) => item !== infoId) : [...prev, infoId]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uploadedImage) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    await clientApi(`/api/host/${hostId}`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        recruitmentMethod,
        email,
        capacity,
        selectedInfo,
        thumbnail: uploadedImage.url, // 업로드된 이미지 URL 전송
        eventStart,
        eventEnd,
        zonecode,
        address,
        extraAddress,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />
      <main className="container mx-auto min-h-screen items-center justify-center p-8">
        <form id="defaultSt" className="grid grid-cols-1 gap-16 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center space-y-8">
            <div
              {...getRootProps()}
              className={`flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                isUploading ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <input {...getInputProps()} />
              {thumbnail.length > 0 ? (
                <div className="relative h-full w-full">
                  <Image
                    src={thumbnail[0].preview}
                    alt="preview"
                    width={500}
                    height={625}
                    className="h-full w-full object-cover"
                  />
                  {isUploading && (
                    <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black text-white">
                      <div className="text-center">
                        <div className="mb-2">업로드 중...</div>
                        <div className="h-2 w-16 rounded-full bg-gray-300">
                          <div className="h-2 w-8 animate-pulse rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <FolderPlusIcon className="h-16 w-16" />
                  <p className="mt-2">{isUploading ? '업로드 중...' : '클릭하여 이미지 업로드 또는 드래그 앤 드롭'}</p>
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
            <label className="mb-2 block font-medium">
              <span className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5" />
                팝업 위치
              </span>
            </label>
            {address && zonecode ? (
              <>
                <div className="flex items-center space-x-2">
                  <Input value={zonecode} type="text" isReadOnly className="w-sm" />
                  <Input value={address} type="text" isReadOnly />
                </div>
              </>
            ) : (
              <div className="w-sm">
                <Button onClick={handleOpenPostcode} type="button">
                  주소 검색
                </Button>
              </div>
            )}

            <Input
              type="text"
              placeholder="상세 주소"
              value={extraAddress}
              onChange={(e) => setExtraAddress(e.target.value)}
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
                  <Button>{eventStart ? eventStart.toString() : '시작일 선택'}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar value={eventStart} onChange={setEventStart} color="primary" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-4">
              <label className="font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">종료일</label>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button>{eventEnd ? eventEnd.toString() : '종료일 선택'}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar value={eventEnd} onChange={setEventEnd} color="primary" />
                </PopoverContent>
              </Popover>
            </div>
            <Input
              label={LABELS.PEOPLE}
              type="number"
              placeholder="수용 가능한 인원을 입력해주세요."
              value={capacity.toString()}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
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
                <Checkbox value="auto">자동 신청</Checkbox>
                <Checkbox value="manual">외부 신청 링크</Checkbox>
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
    </>
  );
}
