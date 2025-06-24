import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);
/**
 * @swagger
 * /api/host/{hostId}:
 *   get:
 *     tags:
 *       - host
 *     summary: 호스트별 이벤트 조회
 *     description: 특정 호스트(hostId)가 주최한 모든 이벤트를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: hostId
 *         required: true
 *         schema:
 *           type: string
 *         description: 호스트의 고유 ID
 *     responses:
 *       200:
 *         description: 호스트 이벤트 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: 이벤트의 고유 ID
 *                   title:
 *                     type: string
 *                     description: 이벤트 제목
 *                   description:
 *                     type: string
 *                     description: 이벤트 설명
 *                   hostId:
 *                     type: string
 *                     description: 호스트 ID
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     description: 이벤트 시작일
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                     description: 이벤트 종료일
 *                   location:
 *                     type: string
 *                     description: 이벤트 장소
 *                   status:
 *                     type: string
 *                     description: 이벤트 상태
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: 생성일시
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: 수정일시
 *       404:
 *         description: 호스트를 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ hostId: string }> }) {
  const { hostId } = await params;

  try {
    const hostEvents = await db.select().from(events).where(eq(events.hostId, hostId));
    return NextResponse.json(hostEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ hostId: string }> }) {
  const { hostId } = await params;

  function parseDate(val: any) {
    if (!val) return undefined;
    if (val instanceof Date) return val;
    if (typeof val === 'string') return new Date(val);
    if (typeof val === 'object' && val.year && val.month && val.day) {
      return new Date(val.year, val.month - 1, val.day);
    }
    return undefined;
  }

  try {
    const data = await req.json();
    console.log('클라이언트에서 받은 데이터:', data);
    console.log('data.title', data.title);

    const eventStart = parseDate(data.eventStart) ?? new Date();
    const eventEnd = parseDate(data.eventEnd) ?? new Date();

    const eventDataDto = {
      hostId,
      title: data.title,
      thumbnail: data.thumbnail,
      email: data.email,
      description: data.description,
      address: [data.zonecode, data.address, data.extraAddress].filter(Boolean).join(', '),
      capacity: typeof data.capacity === 'number' ? data.capacity : Number(data.capacity),
      eventStart,
      eventEnd,
      participationMode: Array.isArray(data.recruitmentMethod)
        ? data.recruitmentMethod[0]
        : data.recruitmentMethod || 'auto',
      extraInfo: Array.isArray(data.selectedInfo) ? data.selectedInfo.join(',') : '',
      //TODO: 이벤트 상태 추적하는 로직 필요 upcoming, ongoing, ended 이걸 추적해야함
      eventStatus: 'upcoming' as const,
    };
    console.log('DB에 저장할 eventDataDto:', eventDataDto);

    const result = await db.insert(events).values(eventDataDto).returning();
    return NextResponse.json({ success: true, event: result[0] }, { status: 201 });
  } catch (error) {
    console.error('Error inserting event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
