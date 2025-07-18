import { events, eventTags, tags } from '@/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    // 이벤트 상태에 따라 불러오기
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const tagQuery = searchParams.get('tags');
    const selectedTags = tagQuery ? tagQuery.split(',') : [];
    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 10);
    const allowedStatus = ['upcoming', 'ongoing', 'ended'] as const;

    const baseQuery = db.select().from(events);
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

    if (whereConds.length > 0) {
      baseQuery.where(and(...whereConds));
    }

    //페이지네이션 계산
    const countRows = await baseQuery.execute();
    const totalCount = countRows.length;
    //페이지네이션 적용
    const offset = (page - 1) * pageSize;
    const paginatedQuery = baseQuery.limit(pageSize).offset(offset);

    let eventsResult = await paginatedQuery.execute();

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
