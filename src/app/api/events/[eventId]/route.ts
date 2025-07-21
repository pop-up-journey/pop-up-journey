import { events, eventSave, eventTags, eventViewCounts, tags, users } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/events/{eventId}:
 *   get:
 *     tags:
 *       - events
 *     summary: 이벤트 상세 조회
 *     description: eventId에 해당하는 이벤트의 상세 정보를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: 이벤트의 고유 ID
 *     responses:
 *       200:
 *         description: 이벤트 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                 viewCount:
 *                   type: integer
 *       404:
 *         description: 이벤트를 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(_req: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  try {
    // 먼저 이벤트 기본 정보를 가져옴
    const eventResult = await db
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
        saveCount: sql<number>`COUNT(DISTINCT ${eventSave.id})`.as('saveCount'),
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
        hostName: users.name,
      })
      .from(events)
      .leftJoin(users, eq(events.hostId, users.id))
      .leftJoin(eventSave, eq(events.id, eventSave.eventId))
      .where(eq(events.id, eventId))
      .groupBy(
        events.id,
        events.hostId,
        events.title,
        events.thumbnail,
        events.email,
        events.description,
        events.address,
        events.capacity,
        events.eventStatus,
        events.participationMode,
        events.extraInfo,
        events.eventStart,
        events.eventEnd,
        events.createdAt,
        events.updatedAt,
        users.name
      )
      .limit(1);

    const event = eventResult[0];
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // 태그 정보를 별도로 가져옴
    const tagsResult = await db
      .select({
        tagId: tags.id,
        tagName: tags.name,
      })
      .from(eventTags)
      .innerJoin(tags, eq(eventTags.tagId, tags.id))
      .where(eq(eventTags.eventId, eventId));

    // 조회수 정보를 별도로 가져옴
    const viewCountResult = await db
      .select({
        viewCount: eventViewCounts.viewCount,
      })
      .from(eventViewCounts)
      .where(eq(eventViewCounts.eventId, eventId))
      .limit(1);

    const eventWithTags = {
      ...event,
      tags: tagsResult.map((tag) => ({
        id: tag.tagId,
        name: tag.tagName,
      })),
      viewCount: viewCountResult[0]?.viewCount || 0,
    };

    return NextResponse.json(eventWithTags);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
