import { clientApi } from '@/libs/api';
import { create } from 'zustand';

interface PopupSummaryDataState {
  popupSummaryData: any;
}

interface PopupSummaryDataAction {
  fetchPopupSummaryData: () => Promise<void>;
}

export const usePopupSummaryDataStore = create<PopupSummaryDataState & PopupSummaryDataAction>((set) => ({
  popupSummaryData: [],
  fetchPopupSummaryData: async () => {
    const data = await clientApi<undefined>('/api/search', { method: 'GET' });
    set({ popupSummaryData: data });
  },
}));
