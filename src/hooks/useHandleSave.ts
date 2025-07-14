import { useSaveStore } from '../store/useSaveStore';

export default function useHandleSave(eventId: string, userId?: string) {
  const savedStores = useSaveStore((s) => s.savedStores);
  const toggleAndSync = useSaveStore((s) => s.toggleAndSyncSave);
  const isSaved = savedStores.includes(eventId);
  return { isSaved, toggle: () => toggleAndSync(eventId, userId!) };
}
