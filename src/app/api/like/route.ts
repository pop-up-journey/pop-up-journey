import { eventSave } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return Response.json([], { status: 200 }); // 비로그인 시 빈 배열

  // 좋아요(eventSave) 테이블에서 해당 userId의 eventId만 조회
  const liked = await db.select({ eventId: eventSave.eventId }).from(eventSave).where(eq(eventSave.userId, userId));

  // [{ eventId: ... }, ...] → [ ... ]
  return Response.json(liked.map((row) => row.eventId));
}
