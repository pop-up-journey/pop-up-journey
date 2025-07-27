import { supabase } from '@/libs/supabase';

export interface UploadedImage {
  url: string;
  path: string;
}

export const uploadImageToStorage = async (file: File): Promise<UploadedImage> => {
  try {
    // FormData 생성
    const formData = new FormData();
    formData.append('file', file);
    // API Route로 전송 (sharp 리사이징)
    const response = await fetch('/api/upload-thumbnail', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json();
    return result;
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
