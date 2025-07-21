import { handlers } from '@/libs/auth';

/**
 * @swagger
 * /api/auth/[...nextauth]:
 *   get:
 *     tags:
 *       - auth
 *     summary: 인증 관련 GET 핸들러
 *     description: NextAuth에서 사용되는 기본 GET 핸들러입니다.
 *     responses:
 *       200:
 *         description: 인증 처리 성공
 *   post:
 *     tags:
 *       - auth
 *     summary: 인증 관련 POST 핸들러
 *     description: NextAuth에서 사용되는 기본 POST 핸들러입니다.
 *     responses:
 *       200:
 *         description: 인증 처리 성공
 */

export const { GET, POST } = handlers;
