import useDragAndDropImg from '@/features/event/register/hooks/useDragAndDropImg';
import usePostcode from '@/features/event/register/hooks/usePostCode';
import { clientApi } from '@/libs/api';
import { DateValue } from '@heroui/react';
import { useCallback, useState } from 'react';

interface AddressData {
  zonecode: string;
  address: string;
  extraAddress: string;
}

export default function useEventRegisterForm(hostId: string | undefined) {
  const [title, setTitle] = useState(''); // 제목
  const [description, setDescription] = useState(''); // 본문
  const [email, setEmail] = useState(''); // 이메일
  const [recruitmentMethod, setRecruitmentMethod] = useState<string[]>([]); // 모집 방법
  const [capacity, setCapacity] = useState<number>(0); // 참가자 수
  const [selectedInfo, setSelectedInfo] = useState<string[]>([]); // 기타안내사항 선택 상태

  // 날짜 상태
  const [eventStart, setEventStart] = useState<DateValue | null>(null);
  const [eventEnd, setEventEnd] = useState<DateValue | null>(null);

  // 주소 상태
  const [zonecode, setZonecode] = useState(''); // 우편번호
  const [address, setAddress] = useState(''); // 주소
  const [extraAddress, setExtraAddress] = useState(''); // 상세 주소

  // 이미지 드로그앤드롭 훅
  const { thumbnail, uploadedImage, isUploading, getRootProps, getInputProps } = useDragAndDropImg();

  // 우편번호 검색 콜백
  const handleAddressComplete = useCallback((data: AddressData) => {
    // NOTE: 디버깅할 때 쓸 것, 선택된 주소를 alert으로 표시
    // alert(`우편번호: ${data.zonecode}\n주소: ${fullAddress}`);

    setAddress(data.address);
    setZonecode(data.zonecode);
    setExtraAddress(data.extraAddress);
  }, []);

  // 우편번호 오픈 훅
  const openPostcode = usePostcode(handleAddressComplete);

  // 기타 안내 사항 선택
  const handleInfoClick = useCallback((infoId: string) => {
    setSelectedInfo((prev) => (prev.includes(infoId) ? prev.filter((item) => item !== infoId) : [...prev, infoId]));
  }, []);

  //제출 함수
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!uploadedImage) {
        alert('이미지를 업로드해주세요.');
        return;
      }

      await clientApi(`/api/host/${hostId}`, {
        method: 'POST',
        body: {
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
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    [
      address,
      capacity,
      description,
      email,
      eventEnd,
      eventStart,
      hostId,
      recruitmentMethod,
      selectedInfo,
      thumbnail,
      uploadedImage,
      zonecode,
      title,
      extraAddress,
    ]
  );

  return {
    fields: {
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
    },
    imageUpload: {
      thumbnail,
      uploadedImage,
      isUploading,
      getRootProps,
      getInputProps,
    },
    handlers: {
      handleInfoClick,
      openPostcode,
      handleSubmit,
    },
  };
}
