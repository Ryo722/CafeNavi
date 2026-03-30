import type {
  BrewingMethod,
  CoffeeProfile,
  RoastLevel,
} from "../../types/coffee";
import type { AnalyzedPreference, RoastEstimation, BrewingSelection, BrewingParams } from "./types";

/** 焙煎度による温度推奨 */
function getTemperatureRange(roast: RoastLevel): string {
  switch (roast) {
    case "light": return "85-88℃";
    case "medium-light": return "87-90℃";
    case "medium": return "88-92℃";
    case "medium-dark": return "90-94℃";
    case "dark": return "92-96℃";
  }
}

/** 各抽出方法のベースパラメータ */
function getBaseBrewingParams(
  method: BrewingMethod,
  roast: RoastLevel,
  coffee: CoffeeProfile,
): BrewingParams {
  const temp = getTemperatureRange(roast);

  switch (method) {
    case "handDrip":
      return {
        grindSize: roast === "light" || roast === "medium-light" ? "medium-fine" : "medium",
        temperature: temp,
        ratio: "1:15",
        bloomTime: roast === "light" ? "30-40秒" : "20-30秒",
        totalTime: "2:30-3:30",
        tips: generateHandDripTips(roast, coffee),
      };
    case "espresso":
      return {
        grindSize: "fine",
        temperature: roast === "dark" ? "92-94℃" : "93-96℃",
        ratio: "1:2",
        totalTime: "25-30秒",
        tips: generateEspressoTips(roast, coffee),
      };
    case "frenchPress":
      return {
        grindSize: "coarse",
        temperature: temp,
        ratio: "1:12",
        totalTime: "4:00",
        tips: generateFrenchPressTips(roast, coffee),
      };
    case "coldBrew":
      return {
        grindSize: "coarse",
        temperature: "常温水",
        ratio: "1:8",
        totalTime: "12-18時間",
        tips: generateColdBrewTips(coffee),
      };
  }
}

function generateHandDripTips(roast: RoastLevel, coffee: CoffeeProfile): string[] {
  const tips: string[] = [];
  if (roast === "light" || roast === "medium-light") {
    tips.push("低温でゆっくり注ぐことでフルーティな風味を引き出せます");
    tips.push("蒸らし時間を長めにとると甘みが増します");
  }
  if (roast === "dark" || roast === "medium-dark") {
    tips.push("高温で素早く注ぐとクリーンな苦味が得られます");
    tips.push("注湯量を減らすと濃厚な仕上がりになります");
  }
  if (coffee.flavorScores.cleanness >= 8) {
    tips.push("クリーンな特性を活かすため、ペーパーフィルターがおすすめ");
  }
  if (coffee.flavorScores.body >= 7) {
    tips.push("コクを活かすため、やや細挽き寄りで淹れるのもおすすめ");
  }
  return tips;
}

function generateEspressoTips(roast: RoastLevel, coffee: CoffeeProfile): string[] {
  const tips: string[] = [];
  if (roast === "light" || roast === "medium-light") {
    tips.push("浅煎りの場合、通常より細かめに挽いて抽出時間を長めにとると良い");
  }
  if (coffee.flavorScores.body >= 8) {
    tips.push("重厚なボディを活かすため、ダブルショットがおすすめ");
  }
  if (coffee.milkCompatibility >= 7) {
    tips.push("ミルクとの相性が良い豆なので、ラテやカプチーノもおすすめ");
  }
  return tips;
}

function generateFrenchPressTips(roast: RoastLevel, coffee: CoffeeProfile): string[] {
  const tips: string[] = [];
  tips.push("4分間抽出後、すぐにカップに注いでください（過抽出防止）");
  if (coffee.flavorScores.body >= 7) {
    tips.push("ボディの豊かさが最大限に楽しめる抽出法です");
  }
  if (roast === "dark") {
    tips.push("深煎りの場合は3分30秒程度に短縮すると雑味を抑えられます");
  }
  return tips;
}

function generateColdBrewTips(coffee: CoffeeProfile): string[] {
  const tips: string[] = [];
  tips.push("冷蔵庫で12-18時間浸漬させてください");
  if (coffee.flavorScores.fruitiness >= 6) {
    tips.push("フルーティな風味が冷たくても楽しめます");
  }
  if (coffee.flavorScores.sweetness >= 7) {
    tips.push("水出しにすると甘みがより引き立ちます");
  }
  tips.push("濃い場合は水や牛乳で1:1に希釈して楽しめます");
  return tips;
}

/**
 * Step 4: 抽出方法と精緻なパラメータを選択する
 */
export function selectBrewingMethods(
  pref: AnalyzedPreference,
  roast: RoastEstimation,
  coffee: CoffeeProfile,
): BrewingSelection {
  const p = pref.combinedProfile;
  const methods: BrewingMethod[] = ["handDrip", "espresso", "frenchPress", "coldBrew"];

  const scored = methods.map((method) => {
    let score = 0;
    let reason = "";

    // brewingCompatibilityスコアを基本スコアとして使用
    score += coffee.brewingCompatibility[method] * 3;

    switch (method) {
      case "handDrip":
        score += p.cleanness * 1.5 + p.acidity * 0.5 + p.floral * 0.5;
        reason = "クリーンで繊細な風味を引き出せるハンドドリップ";
        break;
      case "espresso":
        score += p.body * 1.5 + p.bitterness * 0.5 + p.roastiness * 0.5;
        if (pref.drinkStyle === "milk") {
          score += 10;
          reason = "ミルクとの相性が良いエスプレッソ";
        } else {
          reason = "濃厚な味わいのエスプレッソ";
        }
        break;
      case "frenchPress":
        score += p.body * 1.5 + p.sweetness * 0.5 + p.nuttiness * 0.5;
        reason = "ボディの豊かさを楽しめるフレンチプレス";
        break;
      case "coldBrew":
        score += p.cleanness * 0.5 + p.sweetness * 1.5 + (10 - p.bitterness) * 0.5;
        reason = "まろやかで飲みやすい水出しコーヒー";
        if (pref.drinkStyle === "iced") score += 10;
        break;
    }

    // シーン補正
    for (const factor of pref.sceneFactors) {
      if (factor.scene === "morningRefresh" && method === "handDrip") score += 3;
      if (factor.scene === "strongWithMilk" && method === "espresso") score += 5;
      if (factor.scene === "relax" && method === "frenchPress") score += 3;
    }

    return {
      method,
      score,
      reason,
      params: getBaseBrewingParams(method, roast.primary, coffee),
    };
  });

  // スコア順にソート
  scored.sort((a, b) => b.score - a.score);

  return { methods: scored };
}
