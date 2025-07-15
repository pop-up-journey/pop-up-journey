import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function useDragAndDropImg() {
  const thumbnail = usePopupRegisterFormStore((state) => state.thumbnail);
  const setThumbnail = usePopupRegisterFormStore((state) => state.setThumbnail);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // 로컬 미리보기 설정만 처리
      setThumbnail([
        Object.assign(file, {
          preview: URL.createObjectURL(file),
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
