import { createEventSaveSchema, eventSave, insertEventSaveSchema } from '@/db/schema';
import { auth } from '@/libs/auth';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(_req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const { eventId } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const parsed = createEventSaveSchema.safeParse({ userId, eventId });

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const toInsert = insertEventSaveSchema.parse(parsed.data);

    await db.insert(eventSave).values(toInsert).onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating save-store:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const { eventId } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    await db.delete(eventSave).where(and(eq(eventSave.userId, userId), eq(eventSave.eventId, eventId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting save-store:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
