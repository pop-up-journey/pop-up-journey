import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedStoreState {
  savedStores: number[];
  toggleSaveStore: (id: number) => void;
  setSavedStores: (ids: number[]) => void;
}

export const useSaveStore = create(
  persist<SavedStoreState>(
    (set) => ({
      savedStores: [],
      toggleSaveStore: (id) =>
        set((state) =>
          state.savedStores.includes(id)
            ? { savedStores: state.savedStores.filter((f) => f !== id) }
            : { savedStores: [...state.savedStores, id] }
        ),
      setSavedStores: (ids) => set({ savedStores: ids }),
    }),
    { name: 'savedEvents' }
  )
);
