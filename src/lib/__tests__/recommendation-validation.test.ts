import { describe, it, expect } from "vitest";
import type { TasteProfileInput } from "../../types/questionnaire";
import type { RoastLevel, BrewingMethod } from "../../types/coffee";
import { coffeeProfiles } from "../../data/coffeeProfiles";
import { runRecommendationPipeline } from "../recommendation";

/** デフォルト入力 */
function createInput(overrides: Partial<TasteProfileInput> = {}): TasteProfileInput {
  return {
    bitternessPreference: 3,
    acidityPreference: 3,
    sweetnessPreference: 3,
    bodyPreference: 3,
    fruityPreference: 3,
    roastedPreference: 3,
    floralPreference: 3,
    nuttyPreference: 3,
    chocolatePreference: 3,
    milkPreference: 3,
    dessertPreference: [],
    drinkScenes: [],
    ...overrides,
  };
}

type ValidationCase = {
  name: string;
  description: string;
  input: TasteProfileInput;
  expectations: {
    topCoffeeShouldInclude?: string[];
    topCoffeeShouldExclude?: string[];
    expectedRoastRange?: RoastLevel[];
    expectedBrewingMethods?: BrewingMethod[];
    reasonsShouldContain?: string[];
  };
};

const validationCases: ValidationCase[] = [
  // 1. スタバのカフェラテ好き
  {
    name: "スタバのカフェラテ好き",
    description: "苦味・ミルク好き、深煎り寄り、ブラジル/コロンビア系が上位に来るべき",
    input: createInput({
      bitternessPreference: 4,
      bodyPreference: 4,
      sweetnessPreference: 4,
      roastedPreference: 4,
      chocolatePreference: 4,
      milkPreference: 5,
      drinkScenes: ["strongWithMilk", "workFocus"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["brazil-santos", "colombia-huila", "guatemala-antigua", "indonesia-mandheling"],
      expectedRoastRange: ["medium", "medium-dark", "dark"],
    },
  },

  // 2. 朝すっきり紅茶感覚
  {
    name: "朝すっきり紅茶感覚",
    description: "浅煎り、エチオピア/ケニア系が推薦されるべき",
    input: createInput({
      acidityPreference: 4,
      fruityPreference: 4,
      floralPreference: 4,
      bitternessPreference: 1,
      bodyPreference: 1,
      milkPreference: 1,
      drinkScenes: ["morningRefresh"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["ethiopia-yirgacheffe", "kenya-aa", "panama-geisha", "costarica-tarrazu"],
      expectedRoastRange: ["light", "medium-light"],
    },
  },

  // 3. 苦味好き集中モード
  {
    name: "苦味好き集中モード",
    description: "深煎り、インドネシア/ブラジル系",
    input: createInput({
      bitternessPreference: 5,
      bodyPreference: 5,
      roastedPreference: 5,
      acidityPreference: 1,
      fruityPreference: 1,
      floralPreference: 1,
      milkPreference: 1,
      drinkScenes: ["workFocus"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["indonesia-mandheling", "india-malabar", "east-timor"],
      topCoffeeShouldExclude: ["panama-geisha", "ethiopia-yirgacheffe"],
      expectedRoastRange: ["dark", "medium-dark"],
    },
  },

  // 4. フルーティ好き酸味OK
  {
    name: "フルーティ好き酸味OK",
    description: "浅煎り、エチオピア/パナマ/ルワンダ系",
    input: createInput({
      fruityPreference: 5,
      acidityPreference: 5,
      floralPreference: 4,
      sweetnessPreference: 4,
      bitternessPreference: 1,
      roastedPreference: 1,
      milkPreference: 1,
      dessertPreference: ["berries", "citrusFruits"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["ethiopia-yirgacheffe", "panama-geisha", "rwanda", "kenya-aa", "bolivia"],
      expectedRoastRange: ["light", "medium-light"],
    },
  },

  // 5. チョコ好きナッツ好き
  {
    name: "チョコ好きナッツ好き",
    description: "中煎り〜中深煎り、コロンビア/インドマラバール/東ティモール等のチョコ系",
    input: createInput({
      chocolatePreference: 5,
      nuttyPreference: 5,
      sweetnessPreference: 4,
      bodyPreference: 4,
      dessertPreference: ["chocolate", "nuts"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["colombia-huila", "india-malabar", "east-timor", "guatemala-antigua", "brazil-santos", "nicaragua"],
      expectedRoastRange: ["medium", "medium-dark"],
    },
  },

  // 6. 和菓子好きすっきり
  {
    name: "和菓子好きすっきり",
    description: "中煎り、クリーン系、コスタリカ/コロンビア系",
    input: createInput({
      sweetnessPreference: 4,
      floralPreference: 3,
      bitternessPreference: 2,
      bodyPreference: 2,
      milkPreference: 1,
      dessertPreference: ["wagashi"],
      drinkScenes: ["afterMeal"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["costarica-tarrazu", "colombia-huila", "jamaica-blue-mountain", "hawaii-kona"],
      expectedRoastRange: ["medium-light", "medium"],
    },
  },

  // 7. ベリー系お菓子好き
  {
    name: "ベリー系お菓子好き",
    description: "浅〜中煎り、ケニア/ルワンダ系",
    input: createInput({
      fruityPreference: 5,
      acidityPreference: 4,
      sweetnessPreference: 4,
      dessertPreference: ["berries"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["rwanda", "kenya-aa", "ethiopia-yirgacheffe", "burundi", "bolivia"],
      expectedRoastRange: ["light", "medium-light", "medium"],
    },
  },

  // 8. 完全ブラック派深煎り
  {
    name: "完全ブラック派深煎り",
    description: "深煎り、インドネシア/インド系",
    input: createInput({
      bitternessPreference: 5,
      roastedPreference: 5,
      bodyPreference: 5,
      acidityPreference: 1,
      fruityPreference: 1,
      floralPreference: 1,
      milkPreference: 1,
    }),
    expectations: {
      topCoffeeShouldInclude: ["indonesia-mandheling", "india-malabar", "east-timor"],
      expectedRoastRange: ["dark", "medium-dark"],
    },
  },

  // 9. ミルクたっぷり甘党
  {
    name: "ミルクたっぷり甘党",
    description: "深煎り、ブラジル/コロンビア系、エスプレッソ",
    input: createInput({
      milkPreference: 5,
      sweetnessPreference: 5,
      bodyPreference: 4,
      chocolatePreference: 4,
      bitternessPreference: 3,
      roastedPreference: 3,
      drinkScenes: ["strongWithMilk"],
      dessertPreference: ["caramel"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["brazil-santos", "colombia-huila", "guatemala-antigua", "indonesia-mandheling"],
      expectedRoastRange: ["medium", "medium-dark", "dark"],
      expectedBrewingMethods: ["espresso"],
    },
  },

  // 10. 食後リラックス
  {
    name: "食後リラックス",
    description: "中煎り系、甘み、クリーン",
    input: createInput({
      sweetnessPreference: 4,
      chocolatePreference: 4,
      bodyPreference: 3,
      drinkScenes: ["afterMeal", "relax"],
    }),
    expectations: {
      expectedRoastRange: ["medium-light", "medium", "medium-dark"],
    },
  },

  // 11. 夏のアイスコーヒー
  {
    name: "夏のアイスコーヒー（すっきり系）",
    description: "水出し向き、すっきり系",
    input: createInput({
      sweetnessPreference: 4,
      acidityPreference: 3,
      bitternessPreference: 2,
      bodyPreference: 2,
      milkPreference: 1,
      drinkScenes: ["morningRefresh"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["costarica-tarrazu", "colombia-huila", "jamaica-blue-mountain", "hawaii-kona"],
      expectedRoastRange: ["light", "medium-light", "medium"],
    },
  },

  // 12. 柑橘系フルーツ好き
  {
    name: "柑橘系フルーツ好き",
    description: "浅煎り、タンザニア/ケニア系",
    input: createInput({
      acidityPreference: 5,
      fruityPreference: 5,
      floralPreference: 3,
      dessertPreference: ["citrusFruits"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["kenya-aa", "tanzania-kilimanjaro", "ethiopia-yirgacheffe", "burundi"],
      expectedRoastRange: ["light", "medium-light"],
    },
  },

  // 13. キャラメル系スイーツ好き
  {
    name: "キャラメル系スイーツ好き",
    description: "中煎り〜中深煎り、甘み/ボディ重視",
    input: createInput({
      sweetnessPreference: 5,
      chocolatePreference: 4,
      bodyPreference: 4,
      dessertPreference: ["caramel", "butterPastry"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["colombia-huila", "guatemala-antigua", "honduras", "el-salvador", "indonesia-mandheling", "india-malabar", "east-timor"],
      expectedRoastRange: ["medium", "medium-dark"],
    },
  },

  // 14. スパイシーで複雑
  {
    name: "スパイシーで複雑",
    description: "イエメン/インド系",
    input: createInput({
      roastedPreference: 4,
      bodyPreference: 4,
      bitternessPreference: 3,
      fruityPreference: 4,
      dessertPreference: ["spicedSweets"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["yemen-mocha", "india-malabar", "papua-new-guinea"],
    },
  },

  // 15. 花の香り繊細派
  {
    name: "花の香り繊細派",
    description: "浅煎り、パナマゲイシャ/エチオピア系",
    input: createInput({
      floralPreference: 5,
      acidityPreference: 4,
      sweetnessPreference: 4,
      fruityPreference: 4,
      bitternessPreference: 1,
      bodyPreference: 1,
      roastedPreference: 1,
      milkPreference: 1,
    }),
    expectations: {
      topCoffeeShouldInclude: ["panama-geisha", "ethiopia-yirgacheffe", "bolivia"],
      expectedRoastRange: ["light", "medium-light"],
    },
  },

  // 16. ワイン好き
  {
    name: "ワイン好き",
    description: "イエメン/エチオピアナチュラル系",
    input: createInput({
      fruityPreference: 5,
      acidityPreference: 4,
      bodyPreference: 4,
      sweetnessPreference: 4,
      dessertPreference: ["driedFruits"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["yemen-mocha", "ethiopia-yirgacheffe", "rwanda", "kenya-aa"],
    },
  },

  // 17. 酸味完全NG
  {
    name: "酸味完全NG",
    description: "深煎り、低acidity必須",
    input: createInput({
      acidityPreference: 1,
      bitternessPreference: 4,
      bodyPreference: 4,
      roastedPreference: 4,
      chocolatePreference: 4,
    }),
    expectations: {
      topCoffeeShouldExclude: ["kenya-aa", "ethiopia-yirgacheffe", "burundi"],
      expectedRoastRange: ["medium", "medium-dark", "dark"],
    },
  },

  // 18. 初心者万人向け
  {
    name: "初心者万人向け",
    description: "中煎りバランス型、コロンビア/グアテマラ等",
    input: createInput({
      // 全て中間値のデフォルト
    }),
    expectations: {
      topCoffeeShouldInclude: ["brazil-santos", "colombia-huila", "guatemala-antigua", "jamaica-blue-mountain", "honduras", "yemen-mocha"],
      expectedRoastRange: ["medium", "medium-light", "medium-dark"],
    },
  },

  // 19. エスプレッソマニア
  {
    name: "エスプレッソマニア",
    description: "深煎り、body高、エスプレッソ適性高",
    input: createInput({
      bitternessPreference: 5,
      bodyPreference: 5,
      roastedPreference: 5,
      chocolatePreference: 4,
      acidityPreference: 1,
      milkPreference: 2,
      drinkScenes: ["workFocus"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["indonesia-mandheling", "india-malabar", "brazil-santos"],
      expectedRoastRange: ["dark", "medium-dark"],
      expectedBrewingMethods: ["espresso"],
    },
  },

  // 20. デザートとペアリング重視
  {
    name: "デザートとペアリング重視",
    description: "甘み/チョコ/ナッツ、中深煎り",
    input: createInput({
      sweetnessPreference: 5,
      chocolatePreference: 5,
      nuttyPreference: 4,
      bodyPreference: 4,
      dessertPreference: ["chocolate", "nuts", "caramel"],
      drinkScenes: ["withDessert"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["guatemala-antigua", "brazil-santos", "colombia-huila", "nicaragua", "el-salvador"],
      expectedRoastRange: ["medium", "medium-dark"],
    },
  },

  // 21. フローラル×リラックス
  {
    name: "フローラル×リラックス",
    description: "フローラル重視でリラックスシーン",
    input: createInput({
      floralPreference: 5,
      sweetnessPreference: 4,
      acidityPreference: 3,
      milkPreference: 1,
      drinkScenes: ["relax"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["panama-geisha", "ethiopia-yirgacheffe", "bolivia", "china-yunnan"],
    },
  },

  // 22. チーズ好き重厚派
  {
    name: "チーズ好き重厚派",
    description: "ボディ重視、中深煎り〜深煎り",
    input: createInput({
      bodyPreference: 5,
      nuttyPreference: 4,
      bitternessPreference: 4,
      roastedPreference: 4,
      dessertPreference: ["cheese"],
    }),
    expectations: {
      topCoffeeShouldInclude: ["indonesia-mandheling", "india-malabar", "brazil-santos"],
      expectedRoastRange: ["medium-dark", "dark"],
    },
  },
];

describe("推薦パイプラインバリデーション", () => {
  for (const testCase of validationCases) {
    describe(testCase.name, () => {
      const result = runRecommendationPipeline(testCase.input, coffeeProfiles);
      const topIds = result.recommendation.topMatches.map((m) => m.coffeeId);

      it(`正しく推薦される: ${testCase.description}`, () => {
        // topMatchesが3件あること
        expect(result.recommendation.topMatches).toHaveLength(3);

        // 各マッチにスコアと理由があること
        for (const match of result.recommendation.topMatches) {
          expect(match.score).toBeGreaterThan(0);
          expect(match.reasons.length).toBeGreaterThanOrEqual(1);
        }
      });

      if (testCase.expectations.topCoffeeShouldInclude) {
        it("期待するコーヒーが上位に含まれる", () => {
          const expected = testCase.expectations.topCoffeeShouldInclude!;
          const hasExpected = topIds.some((id) => expected.includes(id));
          expect(hasExpected).toBe(true);
        });
      }

      if (testCase.expectations.topCoffeeShouldExclude) {
        it("除外すべきコーヒーが上位に含まれない", () => {
          const excluded = testCase.expectations.topCoffeeShouldExclude!;
          const hasExcluded = topIds.some((id) => excluded.includes(id));
          expect(hasExcluded).toBe(false);
        });
      }

      if (testCase.expectations.expectedRoastRange) {
        it("推薦焙煎度が期待範囲内", () => {
          const range = testCase.expectations.expectedRoastRange!;
          expect(range).toContain(result.recommendation.recommendedRoast);
        });
      }

      if (testCase.expectations.expectedBrewingMethods) {
        it("推薦抽出方法に期待する方法が含まれる", () => {
          const expected = testCase.expectations.expectedBrewingMethods!;
          const hasExpected = result.recommendation.recommendedBrewingMethods.some(
            (m) => expected.includes(m),
          );
          expect(hasExpected).toBe(true);
        });
      }
    });
  }

  // 追加: 全テストケースで推薦結果の整合性チェック
  describe("全テストケースの整合性", () => {
    it("全ケースでtopMatchesが3件かつ非冒険枠はスコア降順", () => {
      for (const testCase of validationCases) {
        const result = runRecommendationPipeline(testCase.input, coffeeProfiles);
        expect(result.recommendation.topMatches).toHaveLength(3);

        // 冒険枠（serendipity）を除外したスコアが降順であることを確認
        const nonSerendipityMatches = result.recommendation.topMatches.filter(
          (m) => !m.isSerendipity,
        );
        for (let i = 0; i < nonSerendipityMatches.length - 1; i++) {
          expect(nonSerendipityMatches[i].score).toBeGreaterThanOrEqual(
            nonSerendipityMatches[i + 1].score,
          );
        }
      }
    });

    it("全ケースで推薦理由が空でない", () => {
      for (const testCase of validationCases) {
        const result = runRecommendationPipeline(testCase.input, coffeeProfiles);
        for (const match of result.recommendation.topMatches) {
          expect(match.reasons.length).toBeGreaterThanOrEqual(1);
          for (const reason of match.reasons) {
            expect(reason.length).toBeGreaterThan(0);
          }
        }
      }
    });

    it("全ケースで推薦焙煎度が有効な値", () => {
      const validRoasts: RoastLevel[] = ["light", "medium-light", "medium", "medium-dark", "dark"];
      for (const testCase of validationCases) {
        const result = runRecommendationPipeline(testCase.input, coffeeProfiles);
        expect(validRoasts).toContain(result.recommendation.recommendedRoast);
      }
    });
  });
});
