import {
  createEventSchema,
  eventParticipants,
  events,
  eventSave,
  eventTags,
  insertEventSchema,
  tags,
  validateEventDates,
} from '@/db/schema';
import { eq, inArray, sql } from 'drizzle-orm';
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
 *                   address:
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
    const hostEvents = await db
      .select({
        id: events.id,
        title: events.title,
        thumbnail: events.thumbnail,
        hostId: events.hostId,
        eventStart: events.eventStart,
        eventEnd: events.eventEnd,
        address: events.address,
        eventStatus: events.eventStatus,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
        participantCount: sql<number>`COUNT(DISTINCT ${eventParticipants.id})`.as('participantCount'),
        saveCount: sql<number>`COUNT(DISTINCT ${eventSave.id})`.as('saveCount'),
      })
      .from(events)
      .where(eq(events.hostId, hostId))
      .leftJoin(eventParticipants, eq(events.id, eventParticipants.eventId))
      .leftJoin(eventSave, eq(events.id, eventSave.eventId))
      .groupBy(
        events.id,
        events.title,
        events.description,
        events.hostId,
        events.eventStart,
        events.eventEnd,
        events.address,
        events.eventStatus,
        events.createdAt,
        events.updatedAt
      );

    return NextResponse.json(hostEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/host/{hostId}:
 *   post:
 *     tags:
 *       - host
 *     summary: 이벤트 생성
 *     description: 특정 호스트가 새 이벤트를 등록합니다.
 *     parameters:
 *       - in: path
 *         name: hostId
 *         required: true
 *         schema:
 *           type: string
 *         description: 호스트 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               eventStart:
 *                 type: string
 *                 format: date-time
 *               eventEnd:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: 이벤트 생성 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */

export async function POST(req: NextRequest, { params }: { params: Promise<{ hostId: string }> }) {
  const { hostId } = await params;

  function parseDate(val: any) {
    if (!val) return undefined;
    if (val instanceof Date) return val;
    if (typeof val === 'string' || typeof val === 'number') return new Date(val);
    if (typeof val === 'object' && val.year && val.month && val.day) {
      return new Date(val.year, val.month - 1, val.day);
    }
    return undefined;
  }

  function computeEventStatus(start: Date, end: Date): 'upcoming' | 'ongoing' | 'ended' {
    const now = new Date();
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'ongoing';
    return 'ended';
  }

  try {
    const rawData = await req.json();

    const eventStart = parseDate(rawData.eventStart) ?? new Date();
    const eventEnd = parseDate(rawData.eventEnd) ?? new Date();

    // 날짜 유효성 검사 (종료일 > 시작일)
    validateEventDates({ eventStart, eventEnd });
    // 이벤트 상태 분류
    const eventStatus = computeEventStatus(eventStart, eventEnd);

    // 데이터 검증
    const validatedData = createEventSchema.parse({
      hostId,
      title: rawData.title,
      thumbnail: rawData.thumbnail,
      email: rawData.email,
      description: rawData.description,
      address: [rawData.zonecode, rawData.address, rawData.extraAddress].filter(Boolean).join(', '),
      capacity: typeof rawData.capacity === 'number' ? rawData.capacity : Number(rawData.capacity),
      eventStart,
      eventEnd,
      participationMode: Array.isArray(rawData.recruitmentMethod)
        ? rawData.recruitmentMethod[0]
        : rawData.recruitmentMethod || 'auto',
      eventStatus,
      extraInfo: Array.isArray(rawData.selectedInfo) ? rawData.selectedInfo.join(',') : '',
    });

    // 검증된 데이터 삽입
    const insertData = insertEventSchema.parse(validatedData);

    // 트랜잭션으로 이벤트와 태그를 함께 처리
    const result = await db.transaction(async (tx) => {
      // 1. 이벤트 생성
      const [newEvent] = await tx.insert(events).values(insertData).returning();

      // 2. 태그 처리 (선택된 태그가 있는 경우)
      if (rawData.selectedTags && Array.isArray(rawData.selectedTags) && rawData.selectedTags.length > 0) {
        // 선택된 태그명으로 태그 ID 조회
        const tagIds = await tx.select({ id: tags.id }).from(tags).where(inArray(tags.name, rawData.selectedTags));

        // 이벤트-태그 연결 생성
        if (tagIds.length > 0) {
          const eventTagData = tagIds.map((tag) => ({
            eventId: newEvent.id,
            tagId: tag.id,
          }));

          await tx.insert(eventTags).values(eventTagData);
        }
      }

      return newEvent;
    });

    return NextResponse.json({ success: true, event: result }, { status: 201 });
  } catch (error) {
    console.error('Error inserting event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
