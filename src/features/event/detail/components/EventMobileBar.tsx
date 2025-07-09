import Button from '@/components/common/button';
import ShareButton from '@/features/event/detail/components/ShareButton';
import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EventMobileBarProps {
  priceLabel: string;
  onToggleSave?: () => void;
  saved?: boolean;
  eventId: string;
}

export default function EventMobileBar({ priceLabel, eventId }: EventMobileBarProps) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center rounded-2xl bg-white/20 p-4 shadow-xl backdrop-blur-lg lg:hidden">
      {/* 가격 정보 */}
      <div className="flex-1 flex-shrink-0 flex-col items-center justify-center">
        <p className="text-xs text-gray-500">티켓 가격</p>
        <p className="text-lg font-semibold text-gray-800">{priceLabel}</p>
      </div>
      {/* 버튼 그룹  */}
      <div className="flex items-center space-x-3">
        {/* 관심 팝업(하트) */}
        <Button isIconOnly>
          <HeartIcon className="h-5 w-5 text-red-500" />
        </Button>
        {/* 링크 공유 */}
        <ShareButton />
        {/* 신청 버튼 */}
        <Link href={`/event/${eventId}/participate`}>
          <Button className="rounded-lg bg-gradient-to-r from-pink-400 to-blue-400 px-8 font-semibold text-white shadow-2xl backdrop-blur-2xl transition hover:scale-105 dark:text-white">
            {/* 신청하기 버튼 Glowy 효과 */}
            <div className="pointer-events-none absolute top-0 left-0 h-2 w-full animate-pulse bg-gradient-to-b from-white/50 to-transparent px-4" />
            신청하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
