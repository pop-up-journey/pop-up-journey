'use client';
import Button from '@/components/common/button';
import { LinkIcon } from '@heroui/react';
import { useParams } from 'next/navigation';
import { useClipboard } from 'react-haiku';
export default function ShareButton() {
  const params = useParams();
  const clipboard = useClipboard({ timeout: 2000 });
  const currentURL = `${process.env.NEXT_PUBLIC_API_URL_DEV}/event/${params.id}`;
  return (
    <>
      {/* 1024px 미만: 아이콘만 */}
      <Button
        onPress={() => clipboard.copy(currentURL)}
        isIconOnly
        className="flex items-center justify-center rounded-lg border border-white/30 bg-white/30 shadow-2xl backdrop-blur-2xl transition hover:scale-105 lg:hidden dark:text-white"
      >
        <LinkIcon />
      </Button>

      {/* 1024px 이상: 기존 버튼 */}
      <Button
        fullWidth
        onPress={() => clipboard.copy(currentURL)}
        className="hidden items-center justify-center rounded-lg border border-white/30 bg-white/30 font-semibold text-black shadow-2xl backdrop-blur-2xl transition hover:scale-105 lg:flex dark:text-white"
      >
        {clipboard.copied ? '링크 복사 완료!' : '공유하기'}
      </Button>
    </>
  );
}
