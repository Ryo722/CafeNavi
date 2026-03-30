import type {
  BeanInput,
  BrewingAdvice,
  BrewingMethod,
  CoffeeProfile,
  FlavorScores,
  GrindSize,
  RoastLevel,
} from "../types/coffee";
import { coffeeProfiles } from "../data/coffeeProfiles";
import { roastCharacteristics } from "../data/roastProfiles";
import { pairingByRoast } from "../data/pairingData";

/** 焙煎度ごとの基本温度レンジ */
const temperatureByRoast: Record<RoastLevel, Record<BrewingMethod, string>> = {
  light: {
    handDrip: "85-90℃",
    espresso: "90-93℃",
    frenchPress: "88-92℃",
    coldBrew: "水出し（常温〜冷水）",
  },
  "medium-light": {
    handDrip: "87-91℃",
    espresso: "90-93℃",
    frenchPress: "89-93℃",
    coldBrew: "水出し（常温〜冷水）",
  },
  medium: {
    handDrip: "88-92℃",
    espresso: "90-94℃",
    frenchPress: "90-94℃",
    coldBrew: "水出し（常温〜冷水）",
  },
  "medium-dark": {
    handDrip: "89-93℃",
    espresso: "91-94℃",
    frenchPress: "91-95℃",
    coldBrew: "水出し（常温〜冷水）",
  },
  dark: {
    handDrip: "90-95℃",
    espresso: "92-96℃",
    frenchPress: "92-96℃",
    coldBrew: "水出し（常温〜冷水）",
  },
};

/** 抽出方法ごとの挽き目 */
const grindByMethod: Record<BrewingMethod, GrindSize> = {
  espresso: "fine",
  handDrip: "medium-fine",
  frenchPress: "coarse",
  coldBrew: "coarse",
};

/** 抽出方法ごとの比率 */
const ratioByMethod: Record<BrewingMethod, string> = {
  handDrip: "1:15（豆15g:お湯225ml）",
  espresso: "1:2（豆18g:抽出36ml）",
  frenchPress: "1:12（豆20g:お湯240ml）",
  coldBrew: "1:8（豆30g:水240ml）",
};

/** 抽出方法の日本語名 */
export const brewingMethodNameJa: Record<BrewingMethod, string> = {
  handDrip: "ハンドドリップ",
  espresso: "エスプレッソ",
  frenchPress: "フレンチプレス",
  coldBrew: "水出しコーヒー",
};

/** 焙煎度の日本語名 */
export const roastLevelNameJa: Record<RoastLevel, string> = {
  light: "浅煎り",
  "medium-light": "中浅煎り",
  medium: "中煎り",
  "medium-dark": "中深煎り",
  dark: "深煎り",
};

/** 挽き目の日本語名 */
export const grindSizeNameJa: Record<GrindSize, string> = {
  "extra-fine": "極細挽き",
  fine: "細挽き",
  "medium-fine": "中細挽き",
  medium: "中挽き",
  coarse: "粗挽き",
};

/**
 * 味覚スコアに焙煎特性を適用した実効スコアを算出する。
 */
function getEffectiveScores(
  base: FlavorScores,
  roastLevel: RoastLevel,
): FlavorScores {
  const modifier = roastCharacteristics[roastLevel];
  const result = { ...base };
  for (const [key, val] of Object.entries(modifier)) {
    const k = key as keyof FlavorScores;
    result[k] = Math.max(0, Math.min(10, result[k] + (val ?? 0)));
  }
  return result;
}

/**
 * 「その他」産地用の汎用フレーバースコア（焙煎度ベース）。
 */
function getGenericScores(roastLevel: RoastLevel): FlavorScores {
  const base: FlavorScores = {
    bitterness: 5,
    acidity: 5,
    sweetness: 5,
    body: 5,
    fruitiness: 5,
    floral: 5,
    nuttiness: 5,
    chocolaty: 5,
    roastiness: 5,
    cleanness: 5,
  };
  return getEffectiveScores(base, roastLevel);
}

/**
 * 抽出方法をスコアリングして上位を返す。
 */
function scoreBrewingMethods(
  scores: FlavorScores,
  roastLevel: RoastLevel,
): { method: BrewingMethod; score: number }[] {
  const roastIdx = ["light", "medium-light", "medium", "medium-dark", "dark"].indexOf(roastLevel);

  const methods: { method: BrewingMethod; score: number }[] = [
    {
      method: "handDrip",
      score:
        scores.acidity * 1.5 +
        scores.floral * 1.2 +
        scores.cleanness * 1.3 +
        scores.fruitiness +
        (roastIdx <= 2 ? 5 : 0), // 浅〜中煎りボーナス
    },
    {
      method: "espresso",
      score:
        scores.body * 1.5 +
        scores.bitterness * 1.2 +
        scores.roastiness * 1.3 +
        scores.chocolaty +
        (roastIdx >= 3 ? 5 : 0), // 中深〜深煎りボーナス
    },
    {
      method: "frenchPress",
      score:
        scores.body * 1.5 +
        scores.sweetness * 1.2 +
        scores.nuttiness +
        scores.chocolaty +
        (roastIdx >= 2 ? 3 : 0), // 中煎り以上ボーナス
    },
    {
      method: "coldBrew",
      score:
        scores.sweetness * 1.3 +
        scores.cleanness +
        scores.body * 0.8 +
        (10 - scores.bitterness) * 0.5 +
        2, // 基本点（どの焙煎でも可）
    },
  ];

  methods.sort((a, b) => b.score - a.score);
  return methods;
}

/**
 * 抽出方法ごとのtipsを生成する。
 */
function getTips(
  method: BrewingMethod,
  scores: FlavorScores,
  roastLevel: RoastLevel,
): string {
  const roastIdx = ["light", "medium-light", "medium", "medium-dark", "dark"].indexOf(roastLevel);

  switch (method) {
    case "handDrip":
      if (scores.floral >= 7 || scores.fruitiness >= 7) {
        return "ゆっくり丁寧に注ぎ、華やかなアロマとフルーツ感を引き出しましょう";
      }
      if (roastIdx <= 1) {
        return "蒸らし時間を30秒ほど取り、繊細な風味を十分に抽出しましょう";
      }
      if (roastIdx >= 3) {
        return "やや速めに注ぎ、苦味が出過ぎないようにしましょう";
      }
      return "蒸らし30秒、2分半〜3分で抽出すると、バランスの良い味わいになります";

    case "espresso":
      if (scores.body >= 7) {
        return "しっかりとしたクレマを目指し、25-30秒で抽出しましょう";
      }
      return "抽出時間25秒前後を目安に、濃厚な一杯を楽しみましょう";

    case "frenchPress":
      if (scores.nuttiness >= 6 || scores.chocolaty >= 6) {
        return "4分間じっくり浸漬し、ナッツやチョコレートのコクを引き出しましょう";
      }
      return "4分間浸漬後、ゆっくりプレスしてオイル感のある豊かな味わいを楽しみましょう";

    case "coldBrew":
      if (roastIdx >= 3) {
        return "8-12時間冷蔵庫で抽出。深煎りの甘みが際立つまろやかな味わいになります";
      }
      return "12-16時間冷蔵庫でじっくり抽出すると、すっきりした甘みが楽しめます";
  }
}

/**
 * 期待できる味わいの説明を生成する。
 */
function generateFlavorExpectation(
  profile: CoffeeProfile | null,
  scores: FlavorScores,
  roastLevel: RoastLevel,
): string {
  if (profile) {
    const notesStr = profile.notes.slice(0, 3).join("、");
    const roastName = roastLevelNameJa[roastLevel];
    return `${profile.nameJa}を${roastName}で淹れると、${notesStr}のような風味が楽しめます。${profile.description.slice(0, 60)}...`;
  }

  // 汎用
  const dominant: string[] = [];
  if (scores.acidity >= 7) dominant.push("明るい酸味");
  if (scores.fruitiness >= 7) dominant.push("フルーティさ");
  if (scores.floral >= 7) dominant.push("華やかな香り");
  if (scores.bitterness >= 7) dominant.push("しっかりした苦味");
  if (scores.body >= 7) dominant.push("どっしりしたボディ");
  if (scores.sweetness >= 7) dominant.push("豊かな甘み");
  if (scores.chocolaty >= 7) dominant.push("チョコレート感");
  if (scores.nuttiness >= 7) dominant.push("ナッツの風味");

  const roastName = roastLevelNameJa[roastLevel];
  if (dominant.length > 0) {
    return `${roastName}の豆からは、${dominant.join("と")}が期待できます。抽出方法によって味わいのバランスが変わりますので、お好みに合わせてお試しください。`;
  }
  return `${roastName}の豆はバランスの取れた味わいが特徴です。まずはハンドドリップで試してみることをおすすめします。`;
}

/**
 * 避けた方がよいことを生成する。
 */
function generateAvoidNotes(
  scores: FlavorScores,
  roastLevel: RoastLevel,
): string[] {
  const notes: string[] = [];
  const roastIdx = ["light", "medium-light", "medium", "medium-dark", "dark"].indexOf(roastLevel);

  if (roastIdx <= 1) {
    notes.push("沸騰直後の高温で淹れると、渋みやえぐみが出やすくなります");
    notes.push("深煎り用の短時間抽出では、この豆の良さが引き出せません");
  }
  if (roastIdx >= 3) {
    notes.push("抽出時間が長すぎると苦味が強くなりすぎます");
  }
  if (scores.floral >= 7 || scores.fruitiness >= 7) {
    notes.push("エスプレッソでは繊細なフローラル・フルーツの風味が埋もれやすくなります");
  }
  if (scores.body >= 8 && roastIdx >= 3) {
    notes.push("薄めに淹れると物足りない味になりがちです。濃いめの抽出がおすすめです");
  }
  if (notes.length === 0) {
    notes.push("特に大きな注意点はありませんが、初めは推奨レシピ通りに試してみましょう");
  }

  return notes;
}

/**
 * 手持ちの豆情報からおすすめ抽出条件を返す。
 */
export function getBrewingAdvice(input: BeanInput): BrewingAdvice {
  // 産地からプロファイル取得
  const profile =
    input.origin !== "other"
      ? coffeeProfiles.find((p) => p.id === input.origin) ?? null
      : null;

  // 実効フレーバースコア
  const scores = profile
    ? getEffectiveScores(profile.flavorScores, input.roastLevel)
    : getGenericScores(input.roastLevel);

  // 抽出方法スコアリング（上位3件）
  const rankedMethods = scoreBrewingMethods(scores, input.roastLevel).slice(0, 3);

  // 推薦メソッド組み立て
  const recommendedMethods = rankedMethods.map(({ method }) => ({
    method,
    grindSize: profile?.grindRecommendation[method] ?? grindByMethod[method],
    temperature: temperatureByRoast[input.roastLevel][method],
    ratio: ratioByMethod[method],
    tips: getTips(method, scores, input.roastLevel),
  }));

  // ペアリング（プロファイルがあればそこから、なければ焙煎度ベース）
  const pairings = profile
    ? profile.pairings
    : pairingByRoast[input.roastLevel] ?? [];

  // 味わいの説明
  const flavorExpectation = generateFlavorExpectation(profile, scores, input.roastLevel);

  // 避けた方がよいこと
  const avoidNotes = generateAvoidNotes(scores, input.roastLevel);

  return {
    recommendedMethods,
    pairings,
    flavorExpectation,
    avoidNotes,
  };
}
