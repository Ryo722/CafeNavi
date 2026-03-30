import { test, expect } from "@playwright/test";

test.describe("ナビゲーション", () => {
  test("トップページが表示される", async ({ page }) => {
    await page.goto("/#/");
    await expect(page.getByRole("heading", { name: "CafeNavi" })).toBeVisible();
  });

  test("タイトルに「CafeNavi」が含まれる", async ({ page }) => {
    await page.goto("/#/");
    await expect(page).toHaveTitle(/cafenavi/i);
  });

  test("ナビリンクからガイドページに遷移できる", async ({ page }) => {
    await page.goto("/#/");
    await page.getByRole("link", { name: "Guide" }).first().click();
    await expect(page).toHaveURL(/\/#\/guide/);
    await expect(
      page.getByRole("heading", { name: "コーヒーガイド" })
    ).toBeVisible();
  });

  test("ナビリンクから履歴ページに遷移できる", async ({ page }) => {
    await page.goto("/#/");
    await page.getByRole("link", { name: "History" }).first().click();
    await expect(page).toHaveURL(/\/#\/history/);
  });

  test("ナビリンクから統計ページに遷移できる", async ({ page }) => {
    await page.goto("/#/");
    await page.getByRole("link", { name: "統計" }).first().click();
    await expect(page).toHaveURL(/\/#\/stats/);
  });

  test("存在しないページで適切に表示される", async ({ page }) => {
    await page.goto("/#/nonexistent-page");
    // HashRouter の未定義ルートは 404 エラーページを表示する
    await expect(page.getByText("404").or(page.getByText("Not Found"))).toBeVisible();
  });
});
