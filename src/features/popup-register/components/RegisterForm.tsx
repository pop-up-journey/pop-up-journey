'use client';

import Button from '@/components/common/button';
import {
  Address,
  Capacity,
  DateCalendar,
  Description,
  Email,
  ExtraInfo,
  RecruitmentMethod,
  Tag,
  Thumbnail,
  Title,
} from '@/features/popup-register/components/form-field';
import { clientApi } from '@/libs/api';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { uploadImageToStorage } from '@/utils/supabaseImgUploader';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface RegisterFormProps {
  hostId: string;
}

export default function RegisterForm({ hostId }: RegisterFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const {
        title,
        description,
        email,
        capacity,
        eventStart,
        eventEnd,
        zonecode,
        address,
        extraAddress,
        thumbnail,
        uploadedThumbnail,
        selectedTags,
        externalLink,
        recruitmentMethod,
        extraInfo,
      } = usePopupRegisterFormStore.getState();

      // 필수 필드 검증
      if (!title || !description || !email || !capacity || !eventStart || !eventEnd || !address) {
        addToast({
          title: '필수 필드를 모두 입력해주세요.',
          color: 'warning',
        });
        setIsSubmitting(false);
        return;
      }

      // 이미지 업로드 처리
      let thumbnailUrl = uploadedThumbnail;
      if (thumbnail.length > 0 && !uploadedThumbnail) {
        try {
          const uploadedImage = await uploadImageToStorage(thumbnail[0]);
          thumbnailUrl = uploadedImage.url;
          console.log('Image uploaded successfully');
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          addToast({
            title: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
            color: 'danger',
          });
          return;
        }
      }

      const eventData = {
        title,
        description,
        email,
        capacity,
        eventStart,
        eventEnd,
        zonecode,
        address,
        extraAddress,
        thumbnail: thumbnailUrl,
        selectedTags,
        externalLink,
        recruitmentMethod,
        selectedInfo: extraInfo,
      };

      const response = await clientApi(`/api/host/${hostId}`, {
        method: 'POST',
        body: eventData,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.success) {
        addToast({
          title: '이벤트가 성공적으로 등록되었습니다!',
          color: 'success',
        });
        router.push('/host-center');
      } else {
        addToast({
          title: '이벤트 등록에 실패했습니다. 다시 시도해주세요.',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error('Event registration error:', error);
      addToast({
        title: '이벤트 등록 중 오류가 발생했습니다. 다시 시도해주세요.',
        color: 'danger',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="defaultSt" className="grid grid-cols-1 gap-16 md:grid-cols-2" onSubmit={handleSubmit}>
      <Thumbnail />

      <div className="flex flex-col space-y-6">
        <Title />
        <Email />
        <Description />
        <Capacity />
        <DateCalendar />
        <Address />
        <RecruitmentMethod />
        <ExtraInfo />
        <Tag />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}
