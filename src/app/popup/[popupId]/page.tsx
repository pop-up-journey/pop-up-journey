import { getEventById } from '@/features/popup-detail/api/getEventById';
import { getHostByEventId } from '@/features/popup-detail/api/getHostByEventId';
import { createPopupView } from '@/features/popup-detail/api/popupViewHandler';
import WrapperPopupDetail from '@/features/popup-detail/WrapperPopupDetail';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { popupId: string } }): Promise<Metadata> {
  const { popupId } = params;
  const popup = await getEventById(popupId);

  if (!popup) return {};

  return {
    title: `팝업의 여정 - ${popup.title}`,
    description: popup.description ?? '팝업의 여정 - 팝업 상세 페이지',
    openGraph: {
      images: [
        {
          url: popup.thumbnail ?? '/logo.png',
          width: 1200,
          height: 630,
          alt: popup.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: popup.title,
      description: popup.description ?? '팝업의 여정 - 팝업 상세 페이지',
      images: [popup.thumbnail ?? '/logo.png'],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ popupId: string }> }) {
  const { popupId } = await params;
  const popup = await getEventById(popupId);

  if (!popup) notFound();

  const host = await getHostByEventId(popup.hostId);
  if (!host) notFound();

  // 조회수 기록 (비동기로 처리하여 페이지 로딩을 지연시키지 않음)
  const cookieStore = await cookies();
  const visitorId = cookieStore.get('popup_journey_visitor')?.value;

  if (visitorId) {
    // 조회수 기록을 백그라운드에서 처리
    createPopupView(popupId, visitorId).catch((error: unknown) => {
      console.error('Failed to record popup view:', error);
    });
  }

  return <WrapperPopupDetail popup={popup} host={host} />;
}
