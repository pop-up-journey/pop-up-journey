'use client';

import Button from '@/components/common/button';
import ShareButton from '@/features/popup-detail/components/ShareButton';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import useHandleSave from '@/hooks/useHandleSave';
import { getSavedPopupIds } from '@/services/getSavedPopupIds';
import { useSaveStore } from '@/store/save/useSaveStore';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PopupActionButtons() {
  const { popupId } = useParams() as { popupId: string };
  const { userInfo } = useGetUserInfo();
  const userId = userInfo?.id;
  const { isSaved, toggle } = useHandleSave(popupId, userId);
  const setSavedStores = useSaveStore((s) => s.setSavedStores);
  useEffect(() => {
    let mounted = true;
    if (userId) {
      getSavedPopupIds(userId).then((ids = []) => {
        if (mounted && Array.isArray(ids)) {
          setSavedStores(ids);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [userId, setSavedStores]);

  {
    /* HACK : 관심팝업 등록이 되어 있는 상태에서 새로고침을 하면
    문구가 '관심팝업 등록' 이었다가 '취소'로 바뀜. hydration 처리를 해줘야할듯*/
  }

  return (
    <section className="mt-4 flex flex-col gap-3">
      <Link href={`/popup/${popupId}/participate`}>
        <Button fullWidth>신청하기</Button>
      </Link>
      <div className="flex flex-row items-center gap-3">
        <Button fullWidth onPress={toggle}>
          {isSaved ? '관심 행사 취소' : '관심 행사 등록'}
        </Button>
        <ShareButton />
      </div>
    </section>
  );
}
