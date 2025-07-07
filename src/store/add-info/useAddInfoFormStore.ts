import { create } from 'zustand';

interface AddInfoFormState {
  name: string;
  email: string;
  phone: string;
  role: string;
  interests: string[];
  nameValid: boolean;
  emailValid: boolean;
  phoneValid: boolean;
}

interface AddInfoFormActions {
  setValue: (key: string, value: string) => void;
  setInterests: (interests: string[]) => void;
  setIsValid: (key: string, isValid: boolean) => void;
}

export const useAddInfoFormStore = create<AddInfoFormState & AddInfoFormActions>((set) => ({
  name: '',
  email: '',
  phone: '',
  role: '',
  interests: [],
  nameValid: false,
  emailValid: false,
  phoneValid: false,
  setIsValid: (key, isValid) => set({ [key]: isValid }),
  setValue: (key, value) => set({ [key]: value }),
  setInterests: (interests: string[]) => set({ interests: [...interests] }),
}));
