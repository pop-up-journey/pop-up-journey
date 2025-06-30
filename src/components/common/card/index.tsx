import Chip from '@/components/common/chip';
import { formatDate } from '@/utils/dateformatter';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react';
import NextImage, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { If } from 'react-haiku';

interface CardProps {
  id: number;
  title?: string;
  thumbnail: string | StaticImageData;
  tags?: string[];
  eventStart?: string;
  eventEnd?: string;
  variant?: 'default' | 'compact';
  isFavorite?: boolean;
  onToggleFav?: (id: number) => void;
}

export default function CardComponent({
  id,
  title,
  thumbnail,
  tags,
  eventStart,
  eventEnd,
  variant = 'default',
  isFavorite,
  onToggleFav,
}: CardProps) {
  const isCompact = variant === 'compact';

  const handleFavClick = () => {
    if (onToggleFav) {
      onToggleFav(id);
    }
  };

  const router = useRouter();
  return (
    <>
      <If isTrue={!isCompact}>
        <Card
          isPressable
          className="relative flex max-w-[240px] cursor-pointer flex-col overflow-hidden shadow-sm"
          radius="sm"
          onPress={() => router.push(`/event/${id}`)}
        >
          <CardHeader className="absolute top-1 z-10 flex-col items-end">
            <Button isIconOnly variant="light" radius="full" onPress={handleFavClick}>
              {isFavorite ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIconOutline className="h-6 w-6 text-[#ffc0d4]" />
              )}
            </Button>
          </CardHeader>
          <CardBody className="overflow-x-auto p-0">
            <Image
              isZoomed
              as={NextImage}
              alt="Card background"
              className="z-0 aspect-[4/5] w-full object-cover"
              src={typeof thumbnail === 'string' ? thumbnail : thumbnail.src}
              radius="none"
              width={240}
              height={300}
              loading="eager"
            />
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
      <If isTrue={isCompact}>
        <Card
          className="bg-bgcolor max-w-[480px] rounded-3xl border border-white/20 bg-white/10 p-10 py-4 shadow-2xl backdrop-blur-2xl"
          shadow="none"
          radius="sm"
          onPress={() => router.push(`/event/${id}`)}
        >
          <CardBody className="relative grid grid-cols-6 gap-6 px-0 md:grid-cols-12 md:gap-4">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="썸네일"
                className="h-full w-full cursor-pointer object-cover"
                height={175}
                src={typeof thumbnail === 'string' ? thumbnail : thumbnail.src}
                width={140}
              />
            </div>
            <div className="relative col-span-6 flex cursor-pointer flex-col justify-end gap-2 md:col-span-8">
              {/* 좋아요/조회수 아이콘 (compact) */}
              <div className="text-default-400 absolute top-0 right-0 p-2 text-sm">❤️ {isFavorite ? '' : '123'}</div>
              <div className="text-default-400 absolute top-0 right-15 p-2 text-sm">👁️ 123</div>
              <div className="flex flex-col gap-1">
                <h4 className="text-foreground text-base font-bold">{title}</h4>
                <p className="text-default-500 text-sm">📍 홍대구역</p>
                <p className="text-default-400 text-sm">
                  {eventStart && `~ ${formatDate(eventStart)}`} {eventEnd && `~ ${formatDate(eventEnd)}`}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </If>
    </>
  );
}
