'use client';
import useDragAndDropImg from '@/features/popup-register/hooks/useDragAndDropImg';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function EventImageUpload() {
  const thumbnail = usePopupRegisterFormStore((state) => state.thumbnail);
  const { getRootProps, getInputProps } = useDragAndDropImg();

  return (
    <div
      {...getRootProps()}
      className="flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
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
        </div>
      ) : (
        <>
          <FolderPlusIcon className="h-16 w-16" />
          <p className="mt-2">클릭하여 이미지 업로드 또는 드래그 앤 드롭</p>
        </>
      )}
    </div>
  );
}
