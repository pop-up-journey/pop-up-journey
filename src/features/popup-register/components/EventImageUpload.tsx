'use client';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface FileWithPreview extends File {
  preview: string;
}

interface EventImageUploadProps {
  thumbnail: FileWithPreview[];
  isUploading: boolean;
  getRootProps: () => any;
  getInputProps: () => any;
}

export default function EventImageUpload({
  thumbnail,
  isUploading,
  getRootProps,
  getInputProps,
}: EventImageUploadProps) {
  return (
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
  );
}
