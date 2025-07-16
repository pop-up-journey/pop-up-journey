```tsx
import { events } from '@/db/schema';
import { eventStatusEnum } from '@/db/schema/enums';
import { asc, desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = Number(searchParams.get('page') || 1);
    const pageSize = Number(searchParams.get('pageSize') || 10);
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // 입력값 검증
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters. Page must be >= 1, pageSize must be between 1 and 100.' },
        { status: 400 }
      );
    }

    // 정렬 필드 검증
    const allowedSortFields = ['createdAt', 'eventStart', 'title', 'saveCount'] as const;
    const allowedSortOrders = ['asc', 'desc'] as const;

    if (!allowedSortFields.includes(sortBy as any)) {
      return NextResponse.json(
        { error: `Invalid sortBy parameter. Allowed values: ${allowedSortFields.join(', ')}` },
        { status: 400 }
      );
    }

    if (!allowedSortOrders.includes(sortOrder as any)) {
      return NextResponse.json(
        { error: `Invalid sortOrder parameter. Allowed values: ${allowedSortOrders.join(', ')}` },
        { status: 400 }
      );
    }

    // 상태 필터링
    let whereClause = undefined;
    if (status) {
      if (!eventStatusEnum.enumValues.includes(status as any)) {
        return NextResponse.json(
          { error: `Invalid status parameter. Allowed values: ${eventStatusEnum.enumValues.join(', ')}` },
          { status: 400 }
        );
      }
      whereClause = eq(events.eventStatus, status as any);
    }

    // 정렬 설정
    let orderBy;
    switch (sortBy) {
      case 'createdAt':
        orderBy = sortOrder === 'desc' ? desc(events.createdAt) : asc(events.createdAt);
        break;
      case 'eventStart':
        orderBy = sortOrder === 'desc' ? desc(events.eventStart) : asc(events.eventStart);
        break;
      case 'title':
        orderBy = sortOrder === 'desc' ? desc(events.title) : asc(events.title);
        break;
      case 'saveCount':
        orderBy = sortOrder === 'desc' ? desc(events.saveCount) : asc(events.saveCount);
        break;
      default:
        orderBy = desc(events.createdAt);
    }

    // 전체 개수 조회
    const countQuery = db.select({ count: events.id }).from(events);
    if (whereClause) {
      countQuery.where(whereClause);
    }
    const countResult = await countQuery.execute();
    const totalCount = countResult.length;

    // 페이지네이션 계산
    const offset = (page - 1) * pageSize;
    const totalPages = Math.ceil(totalCount / pageSize);

    // 데이터 조회
    const dataQuery = db.select().from(events);
    if (whereClause) {
      dataQuery.where(whereClause);
    }
    const result = await dataQuery.orderBy(orderBy).limit(pageSize).offset(offset).execute();

    return NextResponse.json({
      events: result,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);

    // 데이터베이스 연결 오류 등 구체적인 에러 처리
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Database error occurred', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```
