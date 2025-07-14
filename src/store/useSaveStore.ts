import debounce from 'lodash.debounce';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toggleSavedPopup } from '../utils/toggleSavedPopup';

const syncSave = debounce(toggleSavedPopup, 400);
interface SavedStoreState {
  savedStores: string[];
  toggleSaveStore: (id: string) => void;
  setSavedStores: (ids: string[]) => void;
  toggleAndSyncSave: (id: string, userId?: string) => void;
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
      toggleAndSyncSave: (id: string, userId?: string) =>
        set((state) => {
          const isNowSaved = !state.savedStores.includes(id);
          const next = isNowSaved ? [...state.savedStores, id] : state.savedStores.filter((f) => f !== id);
          syncSave(id, userId ?? '', isNowSaved);
          return { savedStores: next };
        }),
    }),
    { name: 'savedEvents' }
  )
);
