import { test, expect } from "@playwright/test";

/**
 * 質問ページで「次へ」をクリックして進む。
 * multiSelect の質問では最初の選択肢をクリックしてから次へ進む。
 * slider の質問はデフォルト値のまま次へ進む。
 */
async function answerAndProceed(
  page: import("@playwright/test").Page,
  isLast: boolean
) {
  // multiSelect の選択肢ボタンがあれば最初のものをクリック
  // DessertSelector / SceneSelector はボタン要素で選択肢を表示
  const selectableOptions = page.locator(
    'button[class*="rounded-xl"][class*="border"][class*="text-left"]'
  );
  const count = await selectableOptions.count();
  if (count > 0) {
    await selectableOptions.first().click();
  }

  // 「次へ」または「診断する」をクリック
  const buttonText = isLast ? "診断する" : "次へ";
  await page.getByRole("button", { name: buttonText }).click();

  // アニメーション待ち
  await page.waitForTimeout(400);
}

test.describe("かんたん診断フロー", () => {
  test("全10問を回答して結果が表示される", async ({ page }) => {
    // 1. トップページへ
    await page.goto("/#/");
    await expect(page.getByRole("heading", { name: "CafeNavi" })).toBeVisible();

    // 2. 「かんたん診断」をクリック（aria-labelで特定）
    await page.getByLabel("かんたん診断を始める").click();
    await expect(page).toHaveURL(/\/#\/questionnaire/);

    // 3. 質問ページが表示される
    await expect(page.getByText("かんたん診断")).toBeVisible();

    // 4. 進捗バーが表示される
    await expect(page.getByText("1 / 10")).toBeVisible();

    // 5. 全10問を回答（最後の問は「診断する」）
    for (let i = 0; i < 10; i++) {
      const isLast = i === 9;
      await answerAndProceed(page, isLast);
    }

    // 6. 結果ページが表示される
    await expect(page).toHaveURL(/\/#\/result/);
    await expect(
      page.getByRole("heading", { name: "診断結果" })
    ).toBeVisible();

    // 7. おすすめコーヒー名が表示される（セクション）
    await expect(
      page.locator('section[aria-label="おすすめコーヒー"]')
    ).toBeVisible();

    // 8. レーダーチャートが表示される（SVG / canvas）
    await expect(
      page.locator('section[aria-label="味覚プロファイル"] svg').first()
    ).toBeVisible();

    // 9. 味覚タイプが表示される
    await expect(
      page.locator('section[aria-label="あなたの味覚タイプ"]')
    ).toBeVisible();

    // 10. 「もう一度診断する」でトップに戻れる
    await page.getByRole("button", { name: "もう一度診断する" }).click();
    await expect(page).toHaveURL(/\/#\/$/);
    await expect(page.getByRole("heading", { name: "CafeNavi" })).toBeVisible();
  });
});

test.describe("くわしく診断フロー", () => {
  test("全20問を回答して結果が表示される", async ({ page }) => {
    await page.goto("/#/");

    // 「くわしく診断」をクリック
    await page.getByLabel("くわしく診断を始める").click();
    await expect(page).toHaveURL(/\/#\/questionnaire/);
    await expect(page.getByText("くわしく診断")).toBeVisible();
    await expect(page.getByText("1 / 20")).toBeVisible();

    // 全20問を回答
    for (let i = 0; i < 20; i++) {
      const isLast = i === 19;
      await answerAndProceed(page, isLast);
    }

    // 結果が表示される
    await expect(page).toHaveURL(/\/#\/result/);
    await expect(
      page.getByRole("heading", { name: "診断結果" })
    ).toBeVisible();
  });
});
