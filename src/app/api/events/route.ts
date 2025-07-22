import { events, eventTags, eventViewCounts, tags } from '@/db/schema';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - events
 *     summary: 이벤트 목록 조회
 *     description: "상태(status), 태그(tags), 페이지(page) 등의 쿼리 파라미터를 사용하여 이벤트 목록을 조회합니다."
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [upcoming, ongoing, ended]
 *         description: 이벤트 상태 필터
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: 콤마로 구분된 태그 목록
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: 페이지 크기
 *     responses:
 *       200:
 *         description: 이벤트 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       viewCount:
 *                         type: integer
 *                 totalCount:
 *                   type: integer
 *       500:
 *         description: 서버 에러
 */

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const status = searchParams.get('status');
    const tagQuery = searchParams.get('tags');
    const selectedTags = tagQuery ? tagQuery.split(',') : [];
    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 10);
    const allowedStatus = ['upcoming', 'ongoing', 'ended'] as const;

    const whereConds = [] as any[];

    if (status && allowedStatus.includes(status as any)) {
      whereConds.push(eq(events.eventStatus, status as (typeof allowedStatus)[number]));
    }

    if (selectedTags.length > 0) {
      const tagEventIds = await db
        .selectDistinct({ id: eventTags.eventId })
        .from(eventTags)
        .innerJoin(tags, eq(eventTags.tagId, tags.id))
        .where(inArray(tags.name, selectedTags));

      const ids = tagEventIds.map((row) => row.id);
      if (ids.length === 0) {
        return NextResponse.json({ events: [], totalCount: 0 });
      }
      whereConds.push(inArray(events.id, ids));
    }

    // 이벤트 + 조회수
    const baseQuery = db
      .select({
        id: events.id,
        hostId: events.hostId,
        title: events.title,
        thumbnail: events.thumbnail,
        email: events.email,
        description: events.description,
        address: events.address,
        capacity: events.capacity,
        eventStatus: events.eventStatus,
        participationMode: events.participationMode,
        extraInfo: events.extraInfo,
        eventStart: events.eventStart,
        eventEnd: events.eventEnd,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
        viewCount: sql<number>`COALESCE(${eventViewCounts.viewCount}, 0)`.as('viewCount'),
      })
      .from(events)
      .leftJoin(eventViewCounts, eq(events.id, eventViewCounts.eventId));

    if (whereConds.length > 0) {
      baseQuery.where(and(...whereConds));
    }

    // 총 개수 쿼리
    const countQuery = db.select({ count: sql<number>`count(*)` }).from(events);
    if (status && allowedStatus.includes(status as any)) {
      countQuery.where(eq(events.eventStatus, status as (typeof allowedStatus)[number]));
    }
    const countResult = await countQuery.execute();
    const totalCount = countResult[0].count;

    const offset = (page - 1) * pageSize;
    let eventsResult = await baseQuery.limit(pageSize).offset(offset).execute();

    // 각 이벤트의 태그 정보 조회
    if (eventsResult.length > 0) {
      const ids = eventsResult.map((e) => e.id);
      const tagRows = await db
        .select({ eventId: eventTags.eventId, tagName: tags.name })
        .from(eventTags)
        .innerJoin(tags, eq(eventTags.tagId, tags.id))
        .where(inArray(eventTags.eventId, ids));

      const tagMap: Record<string, string[]> = {};
      for (const row of tagRows) {
        if (!tagMap[row.eventId]) tagMap[row.eventId] = [];
        tagMap[row.eventId].push(row.tagName);
      }

      eventsResult = eventsResult.map((evt) => ({
        ...evt,
        tags: tagMap[evt.id] ?? [],
      }));
    }

    return NextResponse.json({
      events: eventsResult,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
