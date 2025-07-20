import { eventParticipants, events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(_req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  try {
    const rows = await db
      .select({
        participantId: eventParticipants.id,
        eventId: events.id,
        title: events.title,
        thumbnail: events.thumbnail,
        address: events.address,
        eventStart: events.eventStart,
        eventEnd: events.eventEnd,
        participantStatus: eventParticipants.participantStatus,
        tickets: eventParticipants.tickets,
      })
      .from(eventParticipants)
      .leftJoin(events, eq(eventParticipants.eventId, events.id))
      .where(eq(eventParticipants.userId, userId));

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch participations:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
