import { describe, it, expect } from "vitest";
import { coffeeProfiles } from "../coffeeProfiles";
import type { FlavorScores } from "../../types/coffee";

describe("coffeeProfiles", () => {
  it("プロファイルが10件あること", () => {
    expect(coffeeProfiles).toHaveLength(10);
  });

  it("各プロファイルのflavorScoresの値が1-10の範囲内であること", () => {
    for (const profile of coffeeProfiles) {
      const keys = Object.keys(
        profile.flavorScores,
      ) as (keyof FlavorScores)[];
      for (const key of keys) {
        const value = profile.flavorScores[key];
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(10);
      }
    }
  });

  it("各プロファイルにid, name, nameJa, originsが設定されていること", () => {
    for (const profile of coffeeProfiles) {
      expect(profile.id).toBeTruthy();
      expect(typeof profile.id).toBe("string");
      expect(profile.name).toBeTruthy();
      expect(typeof profile.name).toBe("string");
      expect(profile.nameJa).toBeTruthy();
      expect(typeof profile.nameJa).toBe("string");
      expect(Array.isArray(profile.origins)).toBe(true);
      expect(profile.origins.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("重複IDがないこと", () => {
    const ids = coffeeProfiles.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
