import { events, eventSave, eventTags, users } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(_req: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  try {
    const result = await db
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
        tags: eventTags.tagId,
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

    const event = result[0];
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
