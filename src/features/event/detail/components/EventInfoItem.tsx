'use client';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface EventInfoItemProps {
  icon: ReactNode; // 왼쪽 아이콘 영역
  label: ReactNode; // 텍스트 또는 JSX
  href?: string; // 링크가 필요할 때
  external?: boolean; // 새 창 여부
}

export default function EventInfoItem({ icon, label, href, external = false }: EventInfoItemProps) {
  const content = <span className="text-sm text-gray-500">{label}</span>;

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded">{icon}</div>
      {href ? (
        <Link href={href} target={external ? '_blank' : undefined} className="inline-flex items-center gap-1">
          {content}
          {external && <ArrowTopRightOnSquareIcon className="h-5 w-5 lg:hidden" />}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
