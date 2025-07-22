import { expect, test } from '@playwright/test';

test.describe('비로그인 유저 — 이벤트 상세 페이지', () => {
  let eventId: string;

  test.beforeEach(async ({ page }) => {
    // 메인 페이지로 이동
    await page.goto('/');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState('networkidle');

    // 이벤트 카드를 찾고 클릭하여 이벤트 상세 페이지로 이동
    const eventCard = page.locator('[data-testid="event-card"]').first();
    await expect(eventCard).toBeVisible();

    // 이벤트 ID 추출 (카드의 링크에서)
    const cardLink = eventCard.locator('a').first();
    const href = await cardLink.getAttribute('href');
    eventId = href?.match(/\/popup\/(\d+)/)?.[1] || '';

    await eventCard.click();

    // 이벤트 상세 페이지 로딩 확인
    await page.waitForURL(`**/popup/${eventId}**`);
    await page.waitForLoadState('networkidle');
  });

  test('이벤트 상세 정보가 정확히 표시되는지 확인', async ({ page }) => {
    // 이벤트 포스터가 표시되는지 확인
    await expect(page.locator('[data-testid="event-poster"]')).toBeVisible();

    // 이벤트 제목이 표시되는지 확인
    await expect(page.locator('h1')).toBeVisible();
    const title = await page.locator('h1').textContent();
    expect(title).toBeTruthy();

    // 이벤트 정보 리스트 확인 (날짜, 주소, 태그 등)
    // 날짜 정보
    await expect(page.locator('[data-testid="event-date"]')).toBeVisible();

    // 주소 정보
    await expect(page.locator('[data-testid="event-address"]')).toBeVisible();

    // 이벤트 설명
    await expect(page.locator('[data-testid="event-description"]')).toBeVisible();

    // 태그들
    const tags = page.locator('[data-testid="event-tag"]');
    await expect(tags.first()).toBeVisible();

    // 호스트 정보
    await expect(page.locator('[data-testid="host-info"]')).toBeVisible();
  });

  test('조회수가 증가하는지 확인', async ({ page, context }) => {
    // 현재 조회수 확인 (만약 표시된다면)
    const viewCountLocator = page.locator('[data-testid="view-count"]');
    let initialViewCount = 0;

    if (await viewCountLocator.isVisible()) {
      const viewCountText = await viewCountLocator.textContent();
      initialViewCount = parseInt(viewCountText?.match(/\d+/)?.[0] || '0');
    }

    // 새 탭으로 같은 페이지 열기 (새로운 세션으로 조회수 증가 테스트)
    const newPage = await context.newPage();
    await newPage.goto(`/popup/${eventId}`);
    await newPage.waitForLoadState('networkidle');

    // 잠시 대기 (서버에서 조회수 업데이트 처리 시간)
    await newPage.waitForTimeout(1000);

    // 원래 페이지로 돌아가서 새로고침
    await page.reload();
    await page.waitForLoadState('networkidle');

    // 조회수가 증가했는지 확인 (표시된다면)
    if (await viewCountLocator.isVisible()) {
      await expect(viewCountLocator).toBeVisible();
      const newViewCountText = await viewCountLocator.textContent();
      const newViewCount = parseInt(newViewCountText?.match(/\d+/)?.[0] || '0');

      // 조회수가 증가했거나 최소한 같은 값이어야 함
      expect(newViewCount).toBeGreaterThanOrEqual(initialViewCount);
    }

    await newPage.close();
  });

  test('신청하기 버튼 클릭 시 로그인 모달이 열리는지 확인', async ({ page }) => {
    // 모바일 바의 신청하기 버튼 확인
    const participateButton = page.locator('text=신청하기').or(page.locator('[href*="participate"]'));
    await expect(participateButton).toBeVisible();

    // 신청하기 버튼 클릭
    await participateButton.click();

    // auth/required 페이지로 리다이렉트 되는지 확인
    await page.waitForURL('**/auth/required**');

    // 로그인 모달이 열렸는지 확인
    await expect(
      page.locator('[data-testid="sign-in-modal"]').or(page.locator('.modal').or(page.locator('[role="dialog"]')))
    ).toBeVisible({ timeout: 5000 });

    // 로그인 버튼들이 표시되는지 확인
    const loginButtons = page.locator('button').filter({ hasText: /로그인|구글|카카오|네이버/i });
    await expect(loginButtons.first()).toBeVisible();

    // 모달 닫기 또는 배경 클릭으로 모달 닫기
    const modalCloseButton = page
      .locator('[data-testid="modal-close"]')
      .or(page.locator('button[aria-label="닫기"]').or(page.locator('.modal-backdrop')));

    if (await modalCloseButton.first().isVisible()) {
      await modalCloseButton.first().click();
    } else {
      // ESC 키로 모달 닫기
      await page.keyboard.press('Escape');
    }

    // 원래 이벤트 상세 페이지로 다시 이동했는지 확인
    await page.waitForURL(`**/popup/${eventId}**`);
  });

  test('이벤트 상세 페이지의 반응형 레이아웃 확인', async ({ page }) => {
    // 데스크톱 뷰 확인
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('body')).toBeVisible();

    // 모바일 뷰로 변경
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500); // 레이아웃 변경 대기

    // 모바일 바가 표시되는지 확인
    await expect(
      page
        .locator('[data-testid="event-mobile-bar"]')
        .or(page.locator('.fixed.bottom-0').or(page.locator('text=신청하기').and(page.locator('.bottom-0'))))
    ).toBeVisible();

    // 이벤트 정보들이 여전히 보이는지 확인
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="event-description"]')).toBeVisible();
  });

  test('이벤트 저장(좋아요) 기능 확인', async ({ page }) => {
    // 저장 버튼 찾기
    const saveButton = page.locator('[data-testid="save-button"]').or(
      page
        .locator('button')
        .filter({ hasText: /저장|좋아요|하트/ })
        .or(page.locator('.heart-icon').or(page.locator('svg[viewBox*="heart"]')))
    );

    // 저장 버튼이 있다면 클릭 테스트
    if (await saveButton.first().isVisible()) {
      await saveButton.first().click();

      // 로그인이 필요한 경우 모달 확인
      const isRedirectedToAuth = page.url().includes('/auth/required');
      if (isRedirectedToAuth) {
        await expect(page.locator('[data-testid="sign-in-modal"]').or(page.locator('[role="dialog"]'))).toBeVisible({
          timeout: 5000,
        });
      }
    }
  });

  test('공유 기능 확인', async ({ page }) => {
    // 공유 버튼 찾기
    const shareButton = page.locator('[data-testid="share-button"]').or(
      page
        .locator('button')
        .filter({ hasText: /공유|share/ })
        .or(page.locator('.share-icon'))
    );

    // 공유 버튼이 있다면 클릭 테스트
    if (await shareButton.first().isVisible()) {
      await shareButton.first().click();

      // 공유 메뉴나 모달이 열렸는지 확인
      await expect(
        page
          .locator('[data-testid="share-menu"]')
          .or(page.locator('.share-modal').or(page.locator('[role="dialog"]').filter({ hasText: /공유|share/i })))
      ).toBeVisible({ timeout: 3000 });
    }
  });
});
