import { events } from '@/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/events/all:
 *   get:
 *     tags:
 *       - events
 *     summary: 모든 이벤트 목록 조회
 *     description: 모든 이벤트의 기본 정보를 배열로 반환합니다.
 *     responses:
 *       200:
 *         description: 이벤트 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: 서버 에러
 */

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(_req: NextRequest) {
  try {
    const result = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
      })
      .from(events);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
