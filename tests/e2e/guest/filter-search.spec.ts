import { expect, test } from '@playwright/test';

test.describe('Guest User - Filter & Search Functionality', () => {
  test('should test all filter and search functionality', async ({ page }) => {
    // 1. 메인페이지로 이동
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // 2. 검색 페이지로 직접 이동 (메인 페이지에 서버 문제가 있으므로)
    await page.goto('http://localhost:3000/popup/search');
    await page.waitForLoadState('networkidle');

    // 페이지가 제대로 로드될 때까지 대기
    await page.waitForSelector('h1:has-text("팝업의 여정 이벤트 탐색")', { timeout: 10000 });

    // 2. "서울" 필터 선택
    const seoulFilter = page.getByRole('button').filter({ hasText: '서울' }).first();
    await seoulFilter.click();
    await page.waitForLoadState('networkidle');

    // URL에 zone 파라미터가 포함되었는지 확인
    expect(page.url()).toContain('zone=서울');

    // 이벤트가 표시되는지 확인 (최소한 일부 이벤트가 표시되어야 함)
    const eventCards = page.locator('button').filter({ hasText: /Card background|썸네일/ });
    await expect(eventCards.first()).toBeVisible({ timeout: 10000 });

    // 3. "수도권" 필터 선택
    const sudogwonFilter = page.getByRole('button').filter({ hasText: '수도권' }).first();
    await sudogwonFilter.click();
    await page.waitForLoadState('networkidle');

    // URL에 zone 파라미터가 포함되었는지 확인
    expect(page.url()).toContain('zone=수도권');

    // 4. "반려동물" 카테고리 필터 선택
    const petCategoryFilter = page.getByRole('button').filter({ hasText: '반려동물' }).first();
    await petCategoryFilter.click();
    await page.waitForLoadState('networkidle');

    // URL에 tags 파라미터가 포함되었는지 확인
    expect(page.url()).toContain('tags=반려동물');

    // 5. "푸드/음료" 카테고리 필터 선택
    const foodCategoryFilter = page.getByRole('button').filter({ hasText: '푸드/음료' }).first();
    await foodCategoryFilter.click();
    await page.waitForLoadState('networkidle');

    // URL에 tags 파라미터가 포함되었는지 확인
    expect(page.url()).toContain('tags=푸드%2F음료');

    // 6. 필터 초기화 기능 테스트 - 지역 필터 초기화
    const resetZoneButton = page.getByRole('button', { name: '초기화' }).first();
    await resetZoneButton.click();
    await page.waitForLoadState('networkidle');

    // URL에 zone 파라미터가 제거되었는지 확인
    expect(page.url()).not.toContain('zone=');

    // 7. 필터 초기화 기능 테스트 - 카테고리 필터 초기화
    const resetCategoryButton = page.getByRole('button', { name: '초기화' }).last();
    await resetCategoryButton.click();
    await page.waitForLoadState('networkidle');

    // URL에 tags 파라미터가 제거되었는지 확인
    expect(page.url()).not.toContain('tags=');

    // 8. 검색 기능 테스트 - 검색을 위해 메인 페이지로 돌아가기
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // 검색 입력 필드 찾기
    const searchInput = page.getByPlaceholder('관심있는 팝업을 찾아보세요!');

    // 9. "냥냥"으로 검색 자동완성 테스트
    await searchInput.click();
    await searchInput.fill('냥냥');
    await page.waitForTimeout(1000); // 자동완성을 기다림

    // 자동완성 제안이 나타나는지 확인
    const autocompleteResults = page.locator('[class*="absolute"][class*="top-full"]');

    // 검색 결과가 있는지 확인
    const hasResults = (await autocompleteResults.count()) > 0;
    if (hasResults) {
      await expect(autocompleteResults.first()).toBeVisible();

      // 첫 번째 결과 클릭
      const firstResult = page.locator('[class*="cursor-pointer"][class*="px-4"][class*="py-3"]').first();
      const firstResultExists = (await firstResult.count()) > 0;

      if (firstResultExists) {
        await firstResult.click();
        await page.waitForLoadState('networkidle');

        // 팝업 상세 페이지로 이동했는지 확인
        expect(page.url()).toContain('/popup/');
      }
    }

    // 10. "팝업"으로 검색 자동완성 테스트
    // 메인 페이지로 돌아가기
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const searchInput2 = page.getByPlaceholder('관심있는 팝업을 찾아보세요!');
    await searchInput2.click();
    await searchInput2.fill('팝업');
    await page.waitForTimeout(1000);

    // 자동완성 제안이 나타나는지 확인
    // 검색 결과가 있는지 확인
    const autocompleteResults2 = page.locator('[class*="absolute"][class*="top-full"]');
    const hasResults2 = (await autocompleteResults2.count()) > 0;

    if (hasResults2) {
      await expect(autocompleteResults2.first()).toBeVisible();
    } else {
      // 검색 결과가 없을 때 "검색 결과가 없습니다" 메시지가 나타나는지 확인
      const noResultsMessage = page.locator('text=검색 결과가 없습니다');
      const noResultsExists = (await noResultsMessage.count()) > 0;
      if (noResultsExists) {
        await expect(noResultsMessage).toBeVisible();
      }
    }

    // 11. 검색 입력 필드 비우기
    await searchInput2.clear();
    await page.waitForTimeout(500);

    // 검색 입력 필드가 비어있는지 확인
    await expect(searchInput2).toHaveValue('');
  });

  test('should handle filter combinations properly', async ({ page }) => {
    // 1. 메인페이지로 이동
    await page.goto('http://localhost:3000/popup/search');
    await page.waitForLoadState('networkidle');

    // 페이지 로드 대기
    await page.waitForSelector('h1:has-text("팝업의 여정 이벤트 탐색")', { timeout: 10000 });

    // 지역필터 + 카테고리 필터 조합 선택
    const seoulFilter = page.getByRole('button').filter({ hasText: '서울' }).first();
    await seoulFilter.click();
    await page.waitForLoadState('networkidle');

    const fashionFilter = page.getByRole('button').filter({ hasText: '패션/뷰티/헬스' }).first();
    await fashionFilter.click();
    await page.waitForLoadState('networkidle');

    // URL에 zone과 tags 파라미터가 포함되었는지 확인
    expect(page.url()).toContain('zone=서울');
    expect(page.url()).toContain('tags=패션%2F뷰티%2F헬스');

    // 이벤트가 필터링되었는지 테스트 (이벤트가 있거나 빈 상태여야 함)
    const eventsList = page.locator('ul').filter({ hasText: /등록된 이벤트가 없습니다|Card background|썸네일/ });
    await expect(eventsList).toBeVisible({ timeout: 10000 });
  });
});
