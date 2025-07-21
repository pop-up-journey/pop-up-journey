import { eventSave } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/users/{userId}/event-saves:
 *   get:
 *     tags:
 *       - users
 *     summary: 사용자의 저장한 이벤트 조회
 *     description: userId가 저장한 이벤트 ID 목록을 반환합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: 서버 에러
 */

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
