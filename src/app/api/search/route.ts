import { events } from '@/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

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
