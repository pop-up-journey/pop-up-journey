import { users } from '@/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     summary: 전체 유저 조회
 *     description: 모든 유저의 정보를 배열로 반환합니다.
 *     responses:
 *       200:
 *         description: 유저 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: 유저의 고유 ID
 *                   name:
 *                     type: string
 *                     description: 유저 이름
 *                   email:
 *                     type: string
 *                     nullable: true
 *                     description: 유저 이메일
 *                   emailVerified:
 *                     type: string
 *                     nullable: true
 *                     description: 이메일 인증 일시
 *                   image:
 *                     type: string
 *                     description: 프로필 이미지 URL
 *                   role:
 *                     type: string
 *                     nullable: true
 *                     description: 유저 역할
 *                   phone:
 *                     type: string
 *                     nullable: true
 *                     description: 전화번호
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: 생성일시
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: 수정일시
 */
export async function GET(_req: NextRequest) {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
