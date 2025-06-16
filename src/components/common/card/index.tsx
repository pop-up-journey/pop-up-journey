import { Card, CardBody, CardFooter, Chip, Image } from '@heroui/react';

interface CardProps {
  title: string;
  thumbnail: string;
  tags: string[];
  date: string;
}

export default function CardComponent({ title, thumbnail, tags, date }: CardProps) {
  return (
    <Card className="flex h-[345px] w-[260px] flex-col justify-between overflow-hidden shadow-sm" radius="sm">
      <CardBody className="overflow-visible p-0">
        <Image
          alt="Card background"
          className="h-[245px] w-full object-cover"
          src={thumbnail}
          width="100%"
          radius="none"
        />
      </CardBody>
      <CardFooter className="flex-col items-start px-4 py-2">
        <small className="text-default-500 mb-1">{date}</small>
        <h4 className="text-large mb-1 font-bold">{title}</h4>
        <div className="mb-1 flex gap-1">
          {tags.map((tag, index) => (
            <Chip key={index} size="sm" radius="sm" variant="flat" color="default">
              {tag}
            </Chip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
