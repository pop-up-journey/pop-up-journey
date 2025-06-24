import { supabase } from '@/libs/supabase';

export interface UploadedImage {
  url: string;
  path: string;
}

export const uploadImageToStorage = async (file: File, bucketName: string = 'img'): Promise<UploadedImage> => {
  try {
    // 파일 확장자 추출
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Supabase Storage에 업로드
    const { data: _data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // 공개 URL 생성
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

export const deleteImageFromStorage = async (
  filePath: string,
  bucketName: string = 'event-thumbnails'
): Promise<void> => {
  try {
    const { error } = await supabase.storage.from(bucketName).remove([filePath]);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  } catch (error) {
    console.error('Image delete error:', error);
    throw error;
  }
};
