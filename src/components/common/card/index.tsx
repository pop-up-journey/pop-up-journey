import { Card, CardBody, CardFooter, Chip, Image } from '@heroui/react';
import NextImage from 'next/image';

interface CardProps {
  title: string;
  thumbnail: string;
  tags: string[];
  date: string;
}

export default function CardComponent({ title, thumbnail, tags, date }: CardProps) {
  return (
    <Card className="flex max-w-[240px] cursor-pointer flex-col overflow-hidden shadow-sm" radius="sm">
      <CardBody className="overflow-x-auto p-0">
        <Image
          isZoomed
          as={NextImage}
          alt="Card background"
          className="z-0 aspect-[4/5] w-full object-cover"
          src={thumbnail}
          radius="none"
          width={240}
          height={300}
          loading="eager"
        />
      </CardBody>

      <CardFooter className="absolute bottom-0 z-10 flex-col items-start bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <small className="text-default-400">{date}</small>
        <h4 className="mb-1 font-bold text-white">{title}</h4>
        <div className="flex gap-1">
          {tags.map((tag, index) => (
            <Chip key={index} size="sm" radius="sm" variant="flat" color="danger">
              {tag}
            </Chip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
