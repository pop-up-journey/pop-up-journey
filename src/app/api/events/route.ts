import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    // 이벤트 상태에 따라 불러오기
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 10);

    const allowedStatus = ['upcoming', 'ongoing', 'ended'] as const;
    const baseQuery = db.select().from(events);

    if (status && allowedStatus.includes(status as any)) {
      baseQuery.where(eq(events.eventStatus, status as (typeof allowedStatus)[number]));
    }

    //페이지네이션 계산
    const countRows = await baseQuery.execute();
    const totalCount = countRows.length;
    //페이지네이션 적용
    const offset = (page - 1) * pageSize;
    const paginatedQuery = baseQuery.limit(pageSize).offset(offset);

    const result = await paginatedQuery.execute();

    return NextResponse.json({
      events: result,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
