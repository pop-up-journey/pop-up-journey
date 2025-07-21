import Button from '@/components/common/button';
import ShareButton from '@/features/popup-detail/components/ShareButton';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import useHandleSave from '@/hooks/useHandleSave';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface PopupMobileBarProps {
  eventId: string;
}

export default function PopupMobileBar({ eventId }: PopupMobileBarProps) {
  const { userInfo } = useGetUserInfo();
  const userId = userInfo?.id;
  const { isSaved, toggle } = useHandleSave(eventId, userId);

  return (
    <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 rounded-3xl bg-black/50 px-5 py-3 font-medium text-white shadow-md backdrop-blur-md transition-all duration-300 ease-in-out md:right-8 md:left-auto md:translate-x-0 lg:hidden">
      {/* 버튼 그룹  */}
      <div className="flex items-center space-x-3">
        {/* 관심 팝업(하트) */}
        <Button isIconOnly onPress={toggle} variant="light" className="hover:scale-105">
          {isSaved ? (
            <HeartSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartOutline className="h-5 w-5 text-red-500" />
          )}
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
