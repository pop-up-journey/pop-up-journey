import { eventSave } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(_req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) return NextResponse.json([], { status: 200 }); // 비로그인 시 빈 배열

  // 좋아요(eventSave) 테이블에서 해당 userId의 eventId만 조회
  try {
    const rows = await db.select({ eventId: eventSave.eventId }).from(eventSave).where(eq(eventSave.userId, userId));
    const eventIds = rows.map((r) => r.eventId);

    return NextResponse.json(eventIds, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch saved events:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
