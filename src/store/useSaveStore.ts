import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedStoreState {
  savedStores: number[];
  addSaveStore: (id: number) => void;
  removeSaveStore: (id: number) => void;
  toggleSaveStore: (id: number) => void;
  setSavedStores: (ids: number[]) => void;
}

export const useSaveStore = create(
  persist<SavedStoreState>(
    (set) => ({
      savedStores: [],
      addSaveStore: (id) =>
        set((state) => (state.savedStores.includes(id) ? state : { savedStores: [...state.savedStores, id] })),
      removeSaveStore: (id) => set((state) => ({ savedStores: state.savedStores.filter((f) => f !== id) })),
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
