// components/event/EventButtons.tsx
'use client';

import Button from '@/components/common/button';
import ShareButton from '@/features/event/detail/components/ShareButton';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface EventActionButtonsProps {
  onToggleLike?: () => void;
}

export default function EventActionButtons({ onToggleLike }: EventActionButtonsProps) {
  const { eventId } = useParams();

  return (
    <section className="mt-4 flex flex-col gap-2">
      <Link href={`/event/${eventId}/participate`}>
        <Button fullWidth>신청하기</Button>
      </Link>
      <div className="flex flex-row items-center gap-6">
        <Button fullWidth onPress={onToggleLike}>
          관심 행사
        </Button>
        <ShareButton />
      </div>
    </section>
  );
}
