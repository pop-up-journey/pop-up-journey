import Chip from '@/components/common/chip';
import { formatDate } from '@/utils/dateformatter';
import { Card, CardBody, CardFooter, Image } from '@heroui/react';
import NextImage, { StaticImageData } from 'next/image';
import { If } from 'react-haiku';

interface CardProps {
  title: string;
  thumbnail: string | StaticImageData;
  tags: string[];
  event_start: string;
  event_end: string;
  variant?: 'default' | 'compact';
}

export default function CardComponent({ title, thumbnail, tags, event_start, event_end, variant }: CardProps) {
  const isCompact = variant === 'compact';
  return (
    <>
      <If isTrue={!isCompact}>
        <Card className="flex max-w-[240px] cursor-pointer flex-col overflow-hidden shadow-sm" radius="sm">
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
              {formatDate(event_start)} ~ {formatDate(event_end)}
            </small>
            <div className="flex gap-1">
              {tags.map((tag, index) => (
                <Chip key={index}>{tag}</Chip>
              ))}
            </div>
          </CardFooter>
        </Card>
      </If>
      <If isTrue={isCompact}>
        <Card
          className="bg-bgcolor max-w-[480px] rounded-3xl border border-white/20 bg-white/10 p-10 py-4 shadow-2xl backdrop-blur-2xl"
          shadow="none"
          radius="sm"
        >
          <CardBody className="relative grid grid-cols-6 gap-6 px-0 md:grid-cols-12 md:gap-4">
            {/* 이미지 영역 */}
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="썸네일"
                className="h-full w-full cursor-pointer object-cover"
                height={175}
                src={typeof thumbnail === 'string' ? thumbnail : thumbnail.src}
                width={140}
              />
            </div>

            {/* 우측 텍스트 영역 */}
            <div className="relative col-span-6 flex cursor-pointer flex-col justify-end gap-2 md:col-span-8">
              {/* 좋아요 아이콘 - 우측 상단 고정 */}
              <div className="text-default-400 absolute top-0 right-0 p-2 text-sm">❤️ 123</div>
              <div className="text-default-400 absolute top-0 right-15 p-2 text-sm">👁️ 123</div>

              {/* 나머지 정보 - 좌측 하단 정렬 */}
              <div className="flex flex-col gap-1">
                <h4 className="text-foreground text-base font-bold">{title}</h4>
                <p className="text-default-500 text-sm">📍 홍대입구역</p>
                <p className="text-default-400 text-sm">
                  {formatDate(event_start)} ~ {formatDate(event_end)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </If>
    </>
  );
}
