'use client';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface PopupInfoItemProps {
  icon: ReactNode;
  label: ReactNode;
  href?: string;
  external?: boolean;
}

export default function PopupInfoItem({ icon, label, href, external = false }: PopupInfoItemProps) {
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
