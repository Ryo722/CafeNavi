import type { FlavorScores } from "./coffee";

export type UserMode = "beginner" | "advanced";

export type TasteProfileInput = {
  bitternessPreference: number;
  acidityPreference: number;
  sweetnessPreference: number;
  bodyPreference: number;
  fruityPreference: number;
  roastedPreference: number;
  floralPreference: number;
  nuttyPreference: number;
  chocolatePreference: number;
  milkPreference: number;
  dessertPreference: string[];
  drinkScenes: string[];
};

export type Question = {
  id: string;
  text: string;
  textBeginner: string;
  type: "slider" | "multiSelect";
  field: keyof TasteProfileInput;
  options?: { value: string; label: string; labelBeginner: string }[];
  min?: number;
  max?: number;
  step?: number;
  mode: "both" | "beginner" | "advanced";
};

// FlavorScoresのキーをFlavorModifierとして再利用
export type FlavorModifier = Partial<Record<keyof FlavorScores, number>>;
