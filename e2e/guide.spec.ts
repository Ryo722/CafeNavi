import { test, expect } from "@playwright/test";

test.describe("ガイドページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/guide");
  });

  test("ガイドページが表示される", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "コーヒーガイド" })
    ).toBeVisible();
    await expect(page.getByText("コーヒーをもっと楽しむための基礎知識")).toBeVisible();
  });

  test("アコーディオンが開閉する", async ({ page }) => {
    // 「焙煎度」のアコーディオンをクリックして開く
    const roastAccordion = page.getByRole("button", { name: /焙煎/ });
    await roastAccordion.click();

    // アコーディオンが開いた状態（aria-expanded=true）
    await expect(roastAccordion).toHaveAttribute("aria-expanded", "true");

    // 再度クリックして閉じる
    await roastAccordion.click();
    await expect(roastAccordion).toHaveAttribute("aria-expanded", "false");
  });

  test("淹れ方ガイドセクションが表示される", async ({ page }) => {
    // 「淹れ方ガイド」アコーディオンを開く
    const brewingAccordion = page.getByRole("button", { name: "淹れ方ガイド" });
    await brewingAccordion.click();
    await expect(brewingAccordion).toHaveAttribute("aria-expanded", "true");

    // フィルタボタン「すべて」が表示される
    await expect(page.getByRole("button", { name: /すべて/ })).toBeVisible();
  });
});
