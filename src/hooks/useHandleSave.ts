import { useSignInModal } from '@/features/sign-in/SignInModalContext';
import { useSaveStore } from '@/store/useSaveStore';

export default function useHandleSave(eventId: string, userId?: string) {
  const { open: openSignInModal } = useSignInModal();

  const savedStores = useSaveStore((s) => s.savedStores);
  const toggleAndSync = useSaveStore((s) => s.toggleAndSyncSave);
  const isSaved = savedStores.includes(eventId);

  const toggle = () => {
    if (!userId) {
      // 비로그인 → 모달 열기
      openSignInModal();
    } else {
      // 로그인 → 저장/해제 + 서버 동기화
      toggleAndSync(eventId, userId);
    }
  };

  return { isSaved, toggle };
}
