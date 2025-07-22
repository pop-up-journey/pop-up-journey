import { getViewCount } from '@/services/getViewCount';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/events/{eventId}/views:
 *   get:
 *     tags:
 *       - events
 *     summary: 이벤트 조회수 조회
 *     description: eventId에 해당하는 이벤트의 누적 조회수를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: 이벤트의 고유 ID
 *     responses:
 *       200:
 *         description: 조회수 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 viewCount:
 *                   type: integer
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */

export async function GET(_req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const { eventId } = await params;

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const viewCount = await getViewCount(eventId);

    return NextResponse.json({ viewCount });
  } catch (error) {
    console.error('Error fetching view count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
