import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
// import { type UploadedImage } from '@/utils/imgUploader.supabase';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function useDragAndDropImg() {
  // 썸네일 - 로컬 미리보기용
  // const [thumbnail, setThumbnail] = useState<FileWithPreview[]>([]);
  const thumbnail = usePopupRegisterFormStore((state) => state.thumbnail);
  const setThumbnail = usePopupRegisterFormStore((state) => state.setThumbnail);

  const [isUploading, setIsUploading] = useState(false);
  console.log('thumbnail', thumbnail);
  // 업로드된 이미지 정보 : 이거 useRegisterFormStore에 넣어야 함
  // const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  // 업로드 상태

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // 로컬 미리보기 설정
    setThumbnail([
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    ]);

    // Supabase Storage에 업로드 이거 여기 있으면 안되겠네.
    setIsUploading(true);
    try {
      // const uploadedImageData = await uploadImageToStorage(file);
      // setUploadedImage(uploadedImageData);
      console.log('Image uploaded successfully:', file);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      // 업로드 실패 시 로컬 미리보기도 제거
      setThumbnail([]);
    } finally {
      setIsUploading(false);
    }
  }, []);

  useEffect(() => {
    return () => thumbnail.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [thumbnail]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
    disabled: isUploading,
  });

  return { getRootProps, getInputProps, isUploading };
}
