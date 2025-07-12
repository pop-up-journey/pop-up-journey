'use client';

import Button from '@/components/common/button';
import ShareButton from '@/features/popup-detail/components/ShareButton';
import useHandleSave from '@/hooks/useHandleSave';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EventActionButtons() {
  const { popupId } = useParams() as { popupId: string };
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { isSaved, toggle } = useHandleSave(popupId, userId);

  {
    /* HACK : 관심팝업 등록이 되어 있는 상태에서 새로고침을 하면
    문구가 '관심팝업 등록' 이었다가 '취소'로 바뀜. hydration 처리를 해줘야할듯*/
  }

  return (
    <section className="mt-4 flex flex-col gap-2">
      <Link href={`/popup/${popupId}/participate`}>
        <Button fullWidth>신청하기</Button>
      </Link>
      <div className="flex flex-row items-center gap-6">
        <Button fullWidth onPress={toggle}>
          {/* NOTE: 뭔가 심심함.. */}
          {isSaved ? '관심 행사 취소' : '관심 행사 등록'}
        </Button>
        <ShareButton />
      </div>
    </section>
  );
}
