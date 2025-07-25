'use client';

import Chip from '@/components/common/chip';
import { formatDate } from '@/utils/dateformatter';
import { EyeIcon, HeartIcon as HeartIconOutline, MapPinIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { If } from 'react-haiku';

interface CardProps {
  id: string;
  title?: string;
  thumbnail?: string | StaticImageData | null;
  tags?: string[];
  address?: string;
  eventStart?: string | Date;
  eventEnd?: string | Date;
  variant?: 'default' | 'compact';
  savedCount?: number | null;
  isSaved?: boolean;
  viewCount?: number | null;

  onToggleSave?: (id: string) => void;
  onRemoveAction?: () => void;
}

function CardComponent({
  id,
  title,
  thumbnail,
  tags,
  address,
  eventStart,
  eventEnd,
  variant = 'default',
  savedCount,
  isSaved,
  viewCount,
  onToggleSave,
  onRemoveAction,
}: CardProps) {
  const isCompact = variant === 'compact';
  const router = useRouter();

  const handleFavClick = () => {
    if (onToggleSave) {
      onToggleSave(id);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveAction?.();
  };

  return (
    <>
      {/* ───── Default variant ───── */}
      <If isTrue={!isCompact}>
        <Card
          isPressable
          className="relative flex w-[240px] cursor-pointer flex-col overflow-hidden shadow-sm"
          radius="sm"
          onPress={() => router.push(`/popup/${id}`)}
        >
          <CardHeader className="absolute top-1 z-10 flex-col items-end">
            <span
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleFavClick();
              }}
            >
              {isSaved ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIconOutline className="h-6 w-6 text-[#ffc0d4]" />
              )}
            </span>
          </CardHeader>
          <CardBody className="overflow-x-auto p-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                alt="Card background"
                src={typeof thumbnail === 'string' ? thumbnail : (thumbnail?.src ?? '/default-image.png')}
                // fill
                priority
                width={240}
                height={300}
                loading="eager"
                className="object-cover"
              />
            </div>
          </CardBody>
          <CardFooter className="absolute bottom-0 z-10 flex-col items-start bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <h4 className="mb-1 font-bold text-white">{title}</h4>
            <small className="text-default-600 mb-1">
              {formatDate(eventStart ?? '')} ~ {formatDate(eventEnd ?? '')}
            </small>
            <div className="flex gap-1">
              {tags &&
                tags.map((tag, idx) => (
                  <Chip key={idx} variant="solid">
                    {tag}
                  </Chip>
                ))}
            </div>
          </CardFooter>
        </Card>
      </If>
      {/* ───── Compact variant ───── */}
      <If isTrue={isCompact}>
        <Card
          isPressable
          className="bg-bgcolor rounded-3xl border border-white/20 bg-white/10 p-10 py-4 shadow-2xl backdrop-blur-2xl"
          shadow="none"
          radius="sm"
          onPress={() => router.push(`/popup/${id}`)}
        >
          <CardBody className="relative grid grid-cols-4 gap-6 px-0 sm:grid-cols-10 md:grid-cols-12">
            <div className="relative col-span-4 aspect-[4/5] w-full overflow-hidden">
              <Image
                alt="썸네일"
                src={typeof thumbnail === 'string' ? thumbnail : (thumbnail?.src ?? '/default-image.png')}
                // fill
                height={175}
                width={140}
                loading="eager"
                priority
                className="cursor-pointer object-cover"
              />
            </div>
            <div className="relative col-span-6 flex cursor-pointer flex-col justify-end gap-2 md:col-span-8">
              {/* 좋아요/조회수 아이콘 (compact) */}
              <div className="text-default-400 absolute top-0 right-0 flex items-center gap-3 text-xs">
                {/* TODO: 조회수 렌더링 필요 */}
                <div className="flex items-center gap-1 p-2 text-sm">
                  <EyeIcon className="size-5" />
                  <span>{viewCount ?? 0}</span>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavClick();
                  }}
                  className="flex items-center gap-1 p-2 text-sm"
                >
                  {isSaved ? (
                    <HeartIconSolid className="size-5 cursor-pointer text-red-500 transition-all duration-300 hover:scale-130" />
                  ) : (
                    <HeartIconOutline className="size-5 cursor-pointer text-[#ffc0d4] transition-all duration-300 hover:scale-130" />
                  )}
                  <span>{savedCount ?? ''}</span>
                </div>
                {/* 좋아요·조회수·삭제 버튼 (호버 시 삭제만 나타남) */}
                {onRemoveAction && (
                  <span
                    onClick={handleRemove}
                    className="rounded-full p-1 opacity-100 hover:bg-white/20"
                    aria-label="관심 팝업 삭제"
                  >
                    <TrashIcon className="text-default-400 h-4 w-4 cursor-pointer hover:text-red-500" />
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-foreground text-base font-bold">{title}</h4>

                <p className="text-default-500 flex items-center gap-1 text-sm">
                  <MapPinIcon className="size-5" /> {address}
                </p>
                <p className="text-default-400 text-sm">
                  {eventStart && `${formatDate(eventStart)}`} {eventEnd && `~ ${formatDate(eventEnd)}`}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </If>
    </>
  );
}

export default CardComponent;
