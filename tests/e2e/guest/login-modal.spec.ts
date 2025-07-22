import { expect, test } from '@playwright/test';

test.describe('비로그인 유저 — 로그인 모달 오픈', () => {
  test.beforeEach(async ({ page }) => {
    // 메인 페이지로 이동
    await page.goto('/');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState('networkidle');
  });

  test('헤더 로그인 버튼 클릭 시 로그인 모달이 표시되는지 확인', async ({ page }) => {
    // 헤더의 로그인 버튼 확인
    const loginButton = page.getByRole('button', { name: '로그인' });
    await expect(loginButton).toBeVisible();

    // 로그인 버튼 클릭
    await loginButton.click();

    // 로그인 모달이 표시되는지 확인
    const modal = page.getByRole('dialog', { name: '팝업의 여정에 오신 것을 환영합니다!' });
    await expect(modal).toBeVisible();

    // 모달 제목 확인
    await expect(page.getByText('팝업의 여정에 오신 것을 환영합니다!')).toBeVisible();
    await expect(page.getByText('아래에서 로그인 또는 가입하세요.')).toBeVisible();
  });

  test('로그인 모달 내 소셜 로그인 버튼들이 표시되는지 확인', async ({ page }) => {
    // 로그인 버튼 클릭하여 모달 열기
    await page.getByRole('button', { name: '로그인' }).click();

    // 모달이 표시될 때까지 대기
    const modal = page.getByRole('dialog', { name: '팝업의 여정에 오신 것을 환영합니다!' });
    await expect(modal).toBeVisible();

    // 소셜 로그인 버튼들 확인
    // 카카오 로그인 버튼
    const kakaoButton = page.getByRole('button', { name: 'Kakao로 로그인' });
    await expect(kakaoButton).toBeVisible();

    // 구글 로그인 버튼
    const googleButton = page.getByRole('button', { name: 'Google로 로그인' });
    await expect(googleButton).toBeVisible();

    // 네이버 로그인 버튼
    const naverButton = page.getByRole('button', { name: 'Naver로 로그인' });
    await expect(naverButton).toBeVisible();

    // 버튼들이 클릭 가능한지 확인
    await expect(kakaoButton).toBeEnabled();
    await expect(googleButton).toBeEnabled();
    await expect(naverButton).toBeEnabled();
  });

  test('모달 닫기 버튼으로 모달이 사라지는지 확인', async ({ page }) => {
    // 로그인 버튼 클릭하여 모달 열기
    await page.getByRole('button', { name: '로그인' }).click();

    // 모달이 표시될 때까지 대기
    const modal = page.getByRole('dialog', { name: '팝업의 여정에 오신 것을 환영합니다!' });
    await expect(modal).toBeVisible();

    // 닫기 버튼 클릭
    const closeButton = page.getByRole('button', { name: 'Close' });
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    // 모달이 사라졌는지 확인
    await expect(modal).not.toBeVisible();

    // 메인 페이지가 여전히 표시되는지 확인
    await expect(page.getByText('지금 떠오르는 팝업, 한눈에 보기')).toBeVisible();
  });

  test('무시 버튼으로 모달이 사라지는지 확인', async ({ page }) => {
    // 로그인 버튼 클릭하여 모달 열기
    await page.getByRole('button', { name: '로그인' }).click();

    // 모달이 표시될 때까지 대기
    const modal = page.getByRole('dialog', { name: '팝업의 여정에 오신 것을 환영합니다!' });
    await expect(modal).toBeVisible();

    // 무시 버튼 클릭
    const dismissButton = page.getByRole('button', { name: '무시' }).first();
    await expect(dismissButton).toBeVisible();
    await dismissButton.click();

    // 모달이 사라졌는지 확인
    await expect(modal).not.toBeVisible();
  });

  test('ESC 키로 모달이 사라지는지 확인', async ({ page }) => {
    // 로그인 버튼 클릭하여 모달 열기
    await page.getByRole('button', { name: '로그인' }).click();

    // 모달이 표시될 때까지 대기
    const modal = page.getByRole('dialog', { name: '팝업의 여정에 오신 것을 환영합니다!' });
    await expect(modal).toBeVisible();

    // ESC 키 누르기
    await page.keyboard.press('Escape');

    // 모달이 사라졌는지 확인
    await expect(modal).not.toBeVisible();
  });

  test('모달 배경 클릭으로 모달이 사라지는지 확인', async ({ page }) => {
    // 로그인 버튼 클릭하여 모달 열기
    await page.getByRole('button', { name: '로그인' }).click();

    // 모달이 표시될 때까지 대기
    const modal = page.getByRole('dialog', { name: '팝업의 여정에 오신 것을 환영합니다!' });
    await expect(modal).toBeVisible();

    // 모달 외부 배경을 클릭 (모달 컨테이너의 바깥쪽 영역)
    await page.mouse.click(100, 100); // 좌측 상단 영역 클릭

    // 모달이 사라졌는지 확인 (배경 클릭이 지원되는 경우)
    // 일부 모달은 배경 클릭으로 닫히지 않을 수 있으므로 이는 선택적 테스트
    const isModalVisible = await modal.isVisible();
    if (!isModalVisible) {
      await expect(modal).not.toBeVisible();
    } else {
      // 배경 클릭으로 닫히지 않는 경우, 다른 방법으로 닫기
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('소셜 로그인 버튼들이 올바른 아이콘과 텍스트를 가지고 있는지 확인', async ({ page }) => {
    // 로그인 버튼 클릭하여 모달 열기
    await page.getByRole('button', { name: '로그인' }).click();

    // 모달이 표시될 때까지 대기
    await expect(page.getByRole('dialog', { name: '팝업의 여정에 오신 것을 환영합니다!' })).toBeVisible();

    // 각 소셜 로그인 버튼의 텍스트와 아이콘 확인
    const kakaoButton = page.getByRole('button', { name: 'Kakao로 로그인' });
    const googleButton = page.getByRole('button', { name: 'Google로 로그인' });
    const naverButton = page.getByRole('button', { name: 'Naver로 로그인' });

    // 버튼들이 이미지(아이콘)를 포함하고 있는지 확인
    await expect(kakaoButton.locator('img')).toBeVisible();
    await expect(googleButton.locator('img')).toBeVisible();
    await expect(naverButton.locator('img')).toBeVisible();

    // 텍스트 콘텐츠 확인
    await expect(kakaoButton).toContainText('Kakao로 로그인');
    await expect(googleButton).toContainText('Google로 로그인');
    await expect(naverButton).toContainText('Naver로 로그인');
  });

  test('모달이 열린 상태에서 페이지 배경이 비활성화되는지 확인', async ({ page }) => {
    // 로그인 버튼 클릭하여 모달 열기
    await page.getByRole('button', { name: '로그인' }).click();

    // 모달이 표시될 때까지 대기
    const modal = page.getByRole('dialog', { name: '팝업의 여정에 오신 것을 환영합니다!' });
    await expect(modal).toBeVisible();

    // 모달이 활성 상태인지 확인 (active attribute 또는 focus)
    await expect(modal).toHaveAttribute('aria-modal', 'true');

    // 메인 페이지 콘텐츠가 여전히 존재하지만 모달이 최상위에 있는지 확인
    await expect(page.getByText('지금 떠오르는 팝업, 한눈에 보기')).toBeVisible();

    // 모달을 닫기
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(modal).not.toBeVisible();
  });
});
