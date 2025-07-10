import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EventTitleProps {
  title: string;
  hostName: string;
  hostLink: string;
}

export default function EventTitle({ title, hostName, hostLink }: EventTitleProps) {
  return (
    <section className="flex items-baseline space-x-3">
      <strong className="text-3xl drop-shadow-lg">{title}</strong>
      {/* 1024px 미만 반응형: 주최자명 */}
      <Link href={hostLink} className="inline-flex items-center space-x-1 text-sm text-gray-500 lg:hidden">
        <span className="truncate font-medium">{hostName}</span>
        <ChevronDoubleRightIcon className="h-4 w-4" />
      </Link>
    </section>
  );
}
