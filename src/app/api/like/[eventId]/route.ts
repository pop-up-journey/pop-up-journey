import { createEventSaveSchema, eventSave, insertEventSaveSchema } from '@/db/schema';
import { auth } from '@/libs/auth';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/like/{eventId}:
 *   post:
 *     tags:
 *       - events
 *     summary: 이벤트 좋아요 추가
 *     description: 로그인한 사용자가 이벤트를 저장(좋아요)합니다.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: 이벤트의 고유 ID
 *     responses:
 *       200:
 *         description: 저장 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 필요
 *       500:
 *         description: 서버 에러
 *   delete:
 *     tags:
 *       - events
 *     summary: 이벤트 좋아요 취소
 *     description: 로그인한 사용자가 이벤트 저장을 취소합니다.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: 이벤트의 고유 ID
 *     responses:
 *       200:
 *         description: 취소 성공
 *       401:
 *         description: 인증 필요
 *       500:
 *         description: 서버 에러
 */

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(_req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const { eventId } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const parsed = createEventSaveSchema.safeParse({ userId, eventId });

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const toInsert = insertEventSaveSchema.parse(parsed.data);

    await db.insert(eventSave).values(toInsert).onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating save-store:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const { eventId } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    await db.delete(eventSave).where(and(eq(eventSave.userId, userId), eq(eventSave.eventId, eventId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting save-store:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
