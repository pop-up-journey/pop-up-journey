import { create } from 'zustand';

interface EventParticipateFormState {
  name: string;
  email: string;
  phone: string;
  tickets: number;
  nameValid: boolean;
  emailValid: boolean;
  phoneValid: boolean;
}

interface EventParticipateFormActions {
  setValue: (key: string, value: string) => void;
  setIsValid: (key: string, isValid: boolean) => void;
}

export const useEventParticipateFormStore = create<EventParticipateFormState & EventParticipateFormActions>((set) => ({
  name: '',
  email: '',
  phone: '',
  tickets: 1,
  nameValid: false,
  emailValid: false,
  phoneValid: false,
  setValue: (key, value) => set({ [key]: value }),
  setIsValid: (key, isValid) => set({ [`${key}Valid`]: isValid }),
}));
