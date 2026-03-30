import { test, expect } from "@playwright/test";

/**
 * 豆診断（bean-advisor）専用ページは現在存在しないため、
 * ガイドページの産地・焙煎度セクションを使って豆の情報確認テストを行う。
 */
test.describe("豆情報（ガイドページ内）", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/guide");
  });

  test("産地一覧が表示される", async ({ page }) => {
    // 「産地ごとの特徴」アコーディオンはデフォルトで開いている
    const originsAccordion = page.getByRole("button", {
      name: /産地ごとの特徴/,
    });
    await expect(originsAccordion).toHaveAttribute("aria-expanded", "true");

    // コーヒー産地の情報が表示されている（日本語名）
    await expect(
      page.getByText("エチオピア イルガチェフェ").first()
    ).toBeVisible();
  });

  test("焙煎度を選択できる（焙煎度アコーディオン）", async ({ page }) => {
    // 焙煎度アコーディオンを開く
    const roastAccordion = page.getByRole("button", { name: /焙煎度の違い/ });
    await roastAccordion.click();
    await expect(roastAccordion).toHaveAttribute("aria-expanded", "true");

    // 焙煎度の情報が表示される
    await expect(page.getByText("浅煎り").first()).toBeVisible();
  });

  test("淹れ方ガイドで焙煎度フィルタを切り替えられる", async ({ page }) => {
    // 淹れ方ガイドアコーディオンを開く
    const brewingAccordion = page.getByRole("button", { name: "淹れ方ガイド" });
    await brewingAccordion.click();
    await expect(brewingAccordion).toHaveAttribute("aria-expanded", "true");

    // 焙煎度フィルタの「すべて」ボタンが表示される
    const allButton = page.getByRole("button", { name: /すべて/ });
    await expect(allButton).toBeVisible();

    // フィルタボタンが複数存在する
    const filterButtons = page.locator("#brewing-guides button.rounded-full");
    const buttonCount = await filterButtons.count();
    expect(buttonCount).toBeGreaterThan(1);

    // 2番目のフィルタ（特定の焙煎度）をクリック
    if (buttonCount > 1) {
      await filterButtons.nth(1).click();
      await page.waitForTimeout(300);
    }
  });
});
