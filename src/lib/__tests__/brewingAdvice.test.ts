import { describe, it, expect } from "vitest";
import { getBrewingAdvice } from "../brewingAdvice";
import type { BeanInput, RoastLevel } from "../../types/coffee";

describe("getBrewingAdvice", () => {
  it("浅煎りエチオピア → ハンドドリップが推薦に含まれる", () => {
    const input: BeanInput = {
      origin: "ethiopia-yirgacheffe",
      roastLevel: "light",
    };
    const advice = getBrewingAdvice(input);
    const methods = advice.recommendedMethods.map((m) => m.method);
    expect(methods).toContain("handDrip");
  });

  it("深煎りインドネシア → エスプレッソまたはフレンチプレスが推薦に含まれる", () => {
    const input: BeanInput = {
      origin: "indonesia-mandheling",
      roastLevel: "dark",
    };
    const advice = getBrewingAdvice(input);
    const methods = advice.recommendedMethods.map((m) => m.method);
    const hasEspressoOrFrenchPress =
      methods.includes("espresso") || methods.includes("frenchPress");
    expect(hasEspressoOrFrenchPress).toBe(true);
  });

  it('"other" 産地でもアドバイスが返る', () => {
    const input: BeanInput = {
      origin: "other",
      roastLevel: "medium",
    };
    const advice = getBrewingAdvice(input);
    expect(advice.recommendedMethods.length).toBeGreaterThanOrEqual(2);
    expect(advice.flavorExpectation).toBeTruthy();
  });

  it("全焙煎度でアドバイスが空でない", () => {
    const roastLevels: RoastLevel[] = [
      "light",
      "medium-light",
      "medium",
      "medium-dark",
      "dark",
    ];
    for (const roastLevel of roastLevels) {
      const advice = getBrewingAdvice({
        origin: "brazil-santos",
        roastLevel,
      });
      expect(advice.recommendedMethods.length).toBeGreaterThan(0);
      expect(advice.flavorExpectation).toBeTruthy();
      expect(advice.avoidNotes.length).toBeGreaterThan(0);
    }
  });

  it("pairings が空でない", () => {
    // プロファイルありの場合
    const advice1 = getBrewingAdvice({
      origin: "guatemala-antigua",
      roastLevel: "medium",
    });
    expect(advice1.pairings.length).toBeGreaterThan(0);

    // "other"の場合
    const advice2 = getBrewingAdvice({
      origin: "other",
      roastLevel: "dark",
    });
    expect(advice2.pairings.length).toBeGreaterThan(0);
  });

  it("各推薦メソッドに温度・比率・コツが含まれる", () => {
    const advice = getBrewingAdvice({
      origin: "colombia-huila",
      roastLevel: "medium",
    });
    for (const m of advice.recommendedMethods) {
      expect(m.temperature).toBeTruthy();
      expect(m.ratio).toBeTruthy();
      expect(m.tips).toBeTruthy();
      expect(m.grindSize).toBeTruthy();
    }
  });
});
