import type { User } from '@/types/user';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user: User) => {
    set({ user });
  },
  logout: () => {
    set({ user: null, error: null });
  },
}));
