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
    const response = await fetch('/api/events/all');
    const data = await response.json();
    console.log(data);
    set({ popupSummaryData: data });
  },
}));

usePopupSummaryDataStore.getState().fetchPopupSummaryData();
