import { DateValue } from '@/types/dateValue';
import { create } from 'zustand';

interface FileWithPreview extends File {
  preview: string;
}

interface PopupRegisterFormState {
  title: string;
  description: string;
  email: string;
  recruitmentMethod: string;
  capacity: number;
  extraInfo: string[];
  eventStart: DateValue;
  eventEnd: DateValue;
  zonecode: string;
  address: string;
  extraAddress: string;
  thumbnail: FileWithPreview[];
  uploadedThumbnail: string;
  tags: string[];
}

interface PopupRegisterFormActions {
  setValue: (key: string, value: string | number) => void;
  setIsValid: (key: string, isValid: boolean) => void;
  setThumbnail: (thumbnail: FileWithPreview[]) => void;
  setDate: (key: string, date: DateValue) => void;
  setExtraInfo: (info: string[]) => void;
}

export const usePopupRegisterFormStore = create<PopupRegisterFormState & PopupRegisterFormActions>((set) => ({
  title: '',
  description: '',
  email: '',
  recruitmentMethod: '',
  capacity: 0,
  extraInfo: [],
  eventStart: null,
  eventEnd: null,
  zonecode: '',
  address: '',
  extraAddress: '',
  thumbnail: [],
  uploadedThumbnail: '',
  tags: [],
  setValue: (key, value) => set({ [key]: value }),
  setIsValid: (key, isValid) => set({ [`${key}Valid`]: isValid }),
  setThumbnail: (thumbnail: FileWithPreview[]) => set({ thumbnail }),
  setDate: (key, date: DateValue) => set({ [key]: date }),
  setExtraInfo: (info) => set({ extraInfo: info }),
}));
