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

    let result;
    const allowedStatus = ['upcoming', 'ongoing', 'ended'] as const;
    if (status && allowedStatus.includes(status as any)) {
      result = await db
        .select()
        .from(events)
        .where(eq(events.eventStatus, status as (typeof allowedStatus)[number]));
    } else {
      result = await db.select().from(events);
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
