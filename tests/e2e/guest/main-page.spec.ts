import { expect, test } from '@playwright/test';

test.describe('Guest User - Main Page', () => {
  test('should load initial events and load more events when clicking the button', async ({ page }) => {
    // 1. 메인페이지로 이동
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // 2. 초기 이벤트 카드 수 확인 (정확히 6개)
    const eventCards = page.locator('button:has-text("Card background")');
    await expect(eventCards).toHaveCount(6);

    // 3. "더보기" 버튼 클릭
    const loadMoreButton = page.getByRole('button', { name: '더보기' });
    await loadMoreButton.click();

    // 4. "더보기" 클릭 후 네트워크가 유휴 상태가 될 때까지 대기
    await page.waitForLoadState('networkidle');

    // 전체 이벤트 카드 수가 6개 초과인지 확인
    const updatedEventCards = page.locator('button:has-text("Card background")');
    await expect(updatedEventCards).toHaveCount(8); // UpcomingPopupList의 pageSize가 4이므로 8개가 되어야 합니다.
  });
});
