import { users } from '@/db/schema';
import { type UpdateUserDto } from '@/types/user';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(process.env.DATABASE_URL!);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - users
 *     summary: 개별 유저 조회
 *     description: userId에 해당하는 유저 정보를 반환합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 유저의 고유 ID
 *     responses:
 *       200:
 *         description: 유저 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: 유저의 고유 ID
 *                 name:
 *                   type: string
 *                   description: 유저 이름
 *                 email:
 *                   type: string
 *                   nullable: true
 *                   description: 유저 이메일
 *                 emailVerified:
 *                   type: string
 *                   nullable: true
 *                   description: 이메일 인증 일시
 *                 image:
 *                   type: string
 *                   description: 프로필 이미지 URL
 *                 role:
 *                   type: string
 *                   nullable: true
 *                   description: 유저 역할
 *                 phone:
 *                   type: string
 *                   nullable: true
 *                   description: 전화번호
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: 생성일시
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: 수정일시
 *       404:
 *         description: 유저를 찾을 수 없음
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  try {
    const userArr = await db.select().from(users).where(eq(users.id, userId));
    const user = userArr[0];
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/users/{userId}:
 *   post:
 *     tags:
 *       - users
 *     summary: 유저 정보 수정
 *     description: userId에 해당하는 유저의 정보를 수정합니다. body에 포함된 값만 변경됩니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 유저의 고유 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 유저 이름
 *               email:
 *                 type: string
 *                 description: 유저 이메일
 *               phone:
 *                 type: string
 *                 description: 전화번호
 *               role:
 *                 type: string
 *                 description: 유저 역할
 *     responses:
 *       200:
 *         description: 유저 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 role:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 유저를 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const body: UpdateUserDto = await req.json();

  try {
    // TODO: 빈값이 있는지 validation 필요.
    const updateData = {
      ...(body.name && { name: body.name }),
      ...(body.email && { email: body.email }),
      ...(body.phone && { phone: body.phone }),
      ...(body.role && { role: body.role }),
    };

    const user = await db.update(users).set(updateData).where(eq(users.id, userId)).returning();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     tags:
 *       - users
 *     summary: 유저 삭제
 *     description: userId에 해당하는 유저를 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 유저의 고유 ID
 *     responses:
 *       200:
 *         description: 유저 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: 유저를 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  try {
    await db.delete(users).where(eq(users.id, userId));
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
