import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedStoreState {
  savedStores: string[];
  toggleSaveStore: (id: string) => void;
  setSavedStores: (ids: string[]) => void;
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
