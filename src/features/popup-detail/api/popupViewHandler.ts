import db from '@/db';
import { eventViewCounts, eventViews } from '@/db/schema/event-views';
import { and, eq, sql } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function createPopupView(eventId: string, visitorId: string) {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';

    // 이미 같은 방문자가 같은 이벤트를 본 기록이 있는지 확인
    const existingView = await db
      .select()
      .from(eventViews)
      .where(and(eq(eventViews.eventId, eventId), eq(eventViews.visitorId, visitorId)))
      .limit(1);

    // 이미 본 기록이 있으면 조회수 증가하지 않음
    if (existingView.length > 0) {
      return { success: true, message: 'Already viewed' };
    }

    // 새로운 조회 기록 생성
    await db.insert(eventViews).values({
      eventId,
      visitorId,
      userAgent,
      isProcessed: 0,
    });

    // eventViewCounts 테이블 업데이트 (실시간 조회수 증가)
    const existingCount = await db.select().from(eventViewCounts).where(eq(eventViewCounts.eventId, eventId)).limit(1);

    if (existingCount.length > 0) {
      // 기존 조회수 레코드가 있으면 +1 증가
      await db
        .update(eventViewCounts)
        .set({
          viewCount: sql`${eventViewCounts.viewCount} + 1`,
          lastUpdated: new Date().toISOString(),
        })
        .where(eq(eventViewCounts.eventId, eventId));
    } else {
      // 기존 조회수 레코드가 없으면 새로 생성 (1로 시작)
      await db.insert(eventViewCounts).values({
        eventId,
        viewCount: 1,
      });
    }

    return { success: true, message: 'View recorded' };
  } catch (error) {
    console.error('Error creating popup view:', error);
    return { success: false, error: 'Failed to record view' };
  }
}
