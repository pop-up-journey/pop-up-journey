'use client';

import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@heroui/react';
import Link from 'next/link';

interface OrganizerInfoProps {
  organizer: string;
  avatarSrc?: string;
  hostLink?: string;
}

export default function OrganizerInfo({ organizer, avatarSrc, hostLink = '/host-center' }: OrganizerInfoProps) {
  return (
    // TODO: Link -> 이메일로 대체
    // TODO : avatar 링크 db에서 제대로 받아오기
    <Link href={hostLink} className="mt-4 mb-2 flex items-center gap-2">
      <Avatar src={avatarSrc} showFallback as="button" className="h-7 w-7 cursor-pointer" color="danger" />
      <h4 className="text-lg font-semibold text-gray-500">{organizer}</h4>
      <ChevronDoubleRightIcon className="h-5 w-5 text-gray-500" />
    </Link>
  );
}
