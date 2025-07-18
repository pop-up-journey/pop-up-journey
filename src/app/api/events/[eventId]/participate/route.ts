import {
  createEventParticipantSchema,
  eventParticipants,
  insertEventParticipantSchema,
  selectEventParticipantSchema,
} from '@/db/schema';
import { auth } from '@/libs/auth';
import { and, eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  // 로그인된 사용자만 신청 가능하도록 세션 검사
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;

  // body 파싱 & 검증
  const body = await req.json();
  const parsed = createEventParticipantSchema.safeParse({
    userId,
    eventId,
    participantStatus: body.participantStatus,
    tickets: Number(body.tickets),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  // insert 스키마를 통해 필드 타입 보장
  const toInsert = insertEventParticipantSchema.parse(parsed.data);

  // 중복 신청 방지
  const [{ cnt }] = await db
    .select({ cnt: sql<number>`count(*)::int` })
    .from(eventParticipants)
    .where(and(eq(eventParticipants.userId, userId), eq(eventParticipants.eventId, eventId)));
  if (cnt > 0) {
    return NextResponse.json({ error: '이미 신청하신 이벤트입니다.' }, { status: 409 });
  }

  // 삽입
  const [created] = await db.insert(eventParticipants).values(toInsert).returning();

  // 참가자 데이터 리턴
  const result = selectEventParticipantSchema.parse(created);
  return NextResponse.json(result, { status: 201 });
}

// 참여 취소
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  console.log(eventId);
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    await db
      .delete(eventParticipants)
      .where(and(eq(eventParticipants.userId, userId), eq(eventParticipants.eventId, eventId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting participant:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
