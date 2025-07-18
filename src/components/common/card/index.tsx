'use client';
import Chip from '@/components/common/chip';
import { formatDate } from '@/utils/dateformatter';
import { EyeIcon, HeartIcon as HeartIconOutline, MapPinIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react';
import NextImage, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { If } from 'react-haiku';

interface CardProps {
  id: string;
  title?: string;
  thumbnail?: string | StaticImageData | null;
  tags?: string[];
  location?: string;
  eventStart?: string | Date;
  eventEnd?: string | Date;
  variant?: 'default' | 'compact';
  savedCount?: number | null;
  isSaved?: boolean;
  viewCount?: number | null;

  onToggleSave?: (id: string) => void;
  onRemoveFavorite?: () => void;
}

export default function CardComponent({
  id,
  title,
  thumbnail,
  tags,
  location,
  eventStart,
  eventEnd,
  variant = 'default',
  savedCount,
  isSaved,
  viewCount,
  onToggleSave,
  onRemoveFavorite,
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
    onRemoveFavorite?.();
  };

  return (
    <>
      {/* ───── Default variant ───── */}
      <If isTrue={!isCompact}>
        <Card
          isPressable
          className="relative flex max-w-[240px] cursor-pointer flex-col overflow-hidden shadow-sm"
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
            <div className="relative aspect-[4/5] w-full">
              <Image
                isZoomed
                as={NextImage}
                alt="Card background"
                className="z-0 h-full w-full object-cover"
                src={typeof thumbnail === 'string' ? thumbnail : thumbnail?.src}
                radius="none"
                width={240}
                height={300}
                loading="eager"
              />
            </div>
          </CardBody>
          <CardFooter className="absolute bottom-0 z-10 flex-col items-start bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <h4 className="mb-1 font-bold text-white">{title}</h4>
            <small className="text-default-400">
              {formatDate(eventStart ?? '')} ~ {formatDate(eventEnd ?? '')}
            </small>
            <div className="flex gap-1">{tags && tags.map((tag, idx) => <Chip key={idx}>{tag}</Chip>)}</div>
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
          <CardBody className="relative grid grid-cols-6 gap-6 px-0 md:grid-cols-12 md:gap-4">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="썸네일"
                className="h-full w-full cursor-pointer object-cover"
                height={175}
                src={typeof thumbnail === 'string' ? thumbnail : thumbnail?.src}
                width={140}
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
                <div className="flex items-center gap-1 p-2 text-sm">
                  {isSaved ? (
                    <HeartIconSolid className="size-5 cursor-pointer text-red-500 transition-all duration-300 hover:scale-130" />
                  ) : (
                    <HeartIconOutline className="size-5 cursor-pointer text-[#ffc0d4] transition-all duration-300 hover:scale-130" />
                  )}
                  <span>{savedCount ?? 0}</span>
                </div>
                {/* 좋아요·조회수·삭제 버튼 (호버 시 삭제만 나타남) */}
                {onRemoveFavorite && (
                  <button
                    onClick={handleRemove}
                    className="rounded-full p-1 opacity-100 hover:bg-white/20"
                    aria-label="관심 팝업 삭제"
                  >
                    <TrashIcon className="text-default-400 h-4 w-4 cursor-pointer hover:text-red-500" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-foreground text-base font-bold">{title}</h4>

                <p className="text-default-500 flex items-center gap-1 text-sm">
                  <MapPinIcon className="size-5" /> {location}
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
