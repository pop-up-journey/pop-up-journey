import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import imageCompression from 'browser-image-compression';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function useDragAndDropImg() {
  const thumbnail = usePopupRegisterFormStore((state) => state.thumbnail);
  const setThumbnail = usePopupRegisterFormStore((state) => state.setThumbnail);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      // 1. 브라우저에서 1차 압축/리사이즈
      const options = {
        maxWidthOrHeight: 1080, // 최대 1080px
        maxSizeMB: 0.2, // 최대 0.2MB
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      // 로컬 미리보기 설정만 처리
      setThumbnail([
        Object.assign(compressedFile, {
          preview: URL.createObjectURL(compressedFile),
        }),
      ]);
    },
    [setThumbnail]
  );

  useEffect(() => {
    return () => thumbnail.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [thumbnail]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  return { getRootProps, getInputProps, isUploading: false };
}
