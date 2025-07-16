// NOTE: 카테고리 시드 생성
// npx tsx src/db/seed.ts

import { categories } from '@/configs/category';
import db from '@/db';
import { tags } from '@/db/schema';
import 'dotenv/config';

export async function seedTags() {
  try {
    console.log('Seeding tags...');

    // 기존 태그 삭제 (선택사항)
    await db.delete(tags);

    // 카테고리별 태그 생성
    const tagData = categories.map((category) => ({
      name: category,
    }));

    await db.insert(tags).values(tagData);

    console.log('Tags seeded successfully!');
    console.log(
      'Created tags:',
      tagData.map((tag) => tag.name)
    );
  } catch (error) {
    console.error('Error seeding tags:', error);
  }
}

// 실행
if (require.main === module) {
  seedTags().then(() => process.exit(0));
}
