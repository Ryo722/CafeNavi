import type { BrewingMethod, RoastLevel } from "../types/coffee";

export type Season = "spring" | "summer" | "autumn" | "winter";

export type SeasonalRecommendation = {
  season: Season;
  nameJa: string;
  nameEn: string;
  months: number[];
  description: string;
  descriptionEn: string;
  recommendedCoffeeIds: string[];
  recommendedBrewingMethods: BrewingMethod[];
  recommendedRoastLevels: RoastLevel[];
  mood: string;
  moodEn: string;
  pairings: string[];
  pairingsEn: string[];
};

export const seasonalRecommendations: SeasonalRecommendation[] = [
  {
    season: "spring",
    nameJa: "春",
    nameEn: "Spring",
    months: [3, 4, 5],
    description:
      "花が咲き誇る春は、フローラルでフルーティな浅煎り〜中煎りのコーヒーがぴったり。ハンドドリップで丁寧に淹れて、桜の下で楽しむ一杯は格別です。",
    descriptionEn:
      "Spring is the perfect time for floral and fruity light to medium roasts. A carefully hand-dripped cup enjoyed under cherry blossoms is truly special.",
    recommendedCoffeeIds: [
      "ethiopia-yirgacheffe",
      "panama-geisha",
      "rwanda",
    ],
    recommendedBrewingMethods: ["handDrip"],
    recommendedRoastLevels: ["light", "medium-light"],
    mood: "桜舞う季節に、華やかなコーヒーを",
    moodEn: "Elegant coffee for the cherry blossom season",
    pairings: ["桜餅", "いちご大福", "マカロン", "フルーツサンド"],
    pairingsEn: [
      "Sakura mochi",
      "Strawberry daifuku",
      "Macaron",
      "Fruit sandwich",
    ],
  },
  {
    season: "summer",
    nameJa: "夏",
    nameEn: "Summer",
    months: [6, 7, 8],
    description:
      "暑い夏は水出しやアイスコーヒーですっきりと。クリーンで爽やかな味わいのコーヒーが涼を運びます。深煎りのアイスコーヒーもまた格別。",
    descriptionEn:
      "Beat the heat with cold brew and iced coffee. Clean, refreshing flavors bring a cool breeze. Deep-roasted iced coffee is also a summer treat.",
    recommendedCoffeeIds: [
      "tanzania-kilimanjaro",
      "kenya-aa",
      "costarica-tarrazu",
    ],
    recommendedBrewingMethods: ["coldBrew", "handDrip"],
    recommendedRoastLevels: ["medium-light", "medium", "dark"],
    mood: "涼を求めて、すっきり爽やかな一杯を",
    moodEn: "A refreshing cup to cool down the summer heat",
    pairings: [
      "かき氷",
      "水ようかん",
      "レモンケーキ",
      "フルーツゼリー",
    ],
    pairingsEn: [
      "Shaved ice",
      "Mizu yokan",
      "Lemon cake",
      "Fruit jelly",
    ],
  },
  {
    season: "autumn",
    nameJa: "秋",
    nameEn: "Autumn",
    months: [9, 10, 11],
    description:
      "読書の秋にはナッツやチョコレートを感じる中煎り〜中深煎りがおすすめ。フレンチプレスでオイル感を楽しみながら、ゆったりとした時間を過ごしましょう。",
    descriptionEn:
      "Autumn calls for nutty, chocolaty medium to medium-dark roasts. Enjoy the oils through a French press and savor a leisurely moment.",
    recommendedCoffeeIds: [
      "guatemala-antigua",
      "colombia-huila",
      "brazil-santos",
    ],
    recommendedBrewingMethods: ["frenchPress", "handDrip"],
    recommendedRoastLevels: ["medium", "medium-dark"],
    mood: "深まる秋に、ナッツ香るあたたかな一杯を",
    moodEn: "A warm, nutty cup for the deepening autumn",
    pairings: [
      "モンブラン",
      "アップルパイ",
      "ナッツブラウニー",
      "スイートポテト",
    ],
    pairingsEn: [
      "Mont blanc",
      "Apple pie",
      "Nut brownie",
      "Sweet potato",
    ],
  },
  {
    season: "winter",
    nameJa: "冬",
    nameEn: "Winter",
    months: [12, 1, 2],
    description:
      "寒い冬はスパイシーで重厚な深煎りコーヒーで温まりましょう。エスプレッソやミルク系のアレンジも冬ならではの楽しみ方です。",
    descriptionEn:
      "Warm up with spicy, full-bodied dark roasts in winter. Espresso-based drinks and milk arrangements are winter specialties.",
    recommendedCoffeeIds: [
      "indonesia-mandheling",
      "yemen-mocha",
      "india-malabar",
    ],
    recommendedBrewingMethods: ["espresso", "frenchPress"],
    recommendedRoastLevels: ["medium-dark", "dark"],
    mood: "冬の夜に、重厚でスパイシーな一杯を",
    moodEn: "A rich, spicy cup for cold winter nights",
    pairings: [
      "シュトーレン",
      "ガトーショコラ",
      "スパイスクッキー",
      "焼きりんご",
    ],
    pairingsEn: [
      "Stollen",
      "Gateau chocolat",
      "Spice cookie",
      "Baked apple",
    ],
  },
];

export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1; // 0-indexed -> 1-indexed
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export function getSeasonalRecommendation(): SeasonalRecommendation {
  const season = getCurrentSeason();
  return seasonalRecommendations.find((r) => r.season === season)!;
}
