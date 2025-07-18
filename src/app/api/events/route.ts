import { events, eventViewCounts } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    // 이벤트 상태에 따라 불러오기
    const { searchParams } = req.nextUrl;
    const status = searchParams.get('status');
    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 10);

    const allowedStatus = ['upcoming', 'ongoing', 'ended'] as const;

    // 조회수를 포함한 기본 쿼리
    const baseQuery = db
      .select({
        id: events.id,
        hostId: events.hostId,
        title: events.title,
        thumbnail: events.thumbnail,
        email: events.email,
        description: events.description,
        address: events.address,
        capacity: events.capacity,
        eventStatus: events.eventStatus,
        participationMode: events.participationMode,
        extraInfo: events.extraInfo,
        eventStart: events.eventStart,
        eventEnd: events.eventEnd,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
        viewCount: sql<number>`COALESCE(${eventViewCounts.viewCount}, 0)`.as('viewCount'),
      })
      .from(events)
      .leftJoin(eventViewCounts, eq(events.id, eventViewCounts.eventId));

    if (status && allowedStatus.includes(status as any)) {
      baseQuery.where(eq(events.eventStatus, status as (typeof allowedStatus)[number]));
    }

    // 전체 개수 조회
    const countQuery = db.select({ count: sql<number>`count(*)` }).from(events);
    if (status && allowedStatus.includes(status as any)) {
      countQuery.where(eq(events.eventStatus, status as (typeof allowedStatus)[number]));
    }
    const countResult = await countQuery.execute();
    const totalCount = countResult[0].count;

    // 페이지네이션 적용
    const offset = (page - 1) * pageSize;
    const result = await baseQuery.limit(pageSize).offset(offset).execute();

    return NextResponse.json({
      events: result,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
