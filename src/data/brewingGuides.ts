import type { BrewingMethod, RoastLevel } from "../types/coffee";

export type BrewingGuideStep = {
  step: number;
  instruction: string;
  instructionEn: string;
  duration?: string;
};

export type BrewingGuide = {
  id: string;
  method: BrewingMethod;
  roastLevel: RoastLevel;
  title: string;
  titleEn: string;
  steps: BrewingGuideStep[];
  tips: string[];
  tipsEn: string[];
  temperature: string;
  ratio: string;
  totalTime: string;
  videoKeyword: string;
};

export const brewingGuides: BrewingGuide[] = [
  // ハンドドリップ - 浅煎り
  {
    id: "handdrip-light",
    method: "handDrip",
    roastLevel: "light",
    title: "浅煎りのハンドドリップ",
    titleEn: "Light Roast Pour Over",
    steps: [
      {
        step: 1,
        instruction: "中細挽きの豆15gをドリッパーにセットし、93〜96℃のお湯を用意します",
        instructionEn: "Set 15g of medium-fine ground coffee in the dripper and prepare water at 93-96°C",
        duration: "30秒",
      },
      {
        step: 2,
        instruction: "30mlのお湯で蒸らします。全体が均一に湿るように、ゆっくり円を描くように注ぎます",
        instructionEn: "Bloom with 30ml of water. Pour slowly in a circular motion to evenly saturate all grounds",
        duration: "30秒",
      },
      {
        step: 3,
        instruction: "蒸らし後、中心から外側に向かってゆっくり円を描きながら注ぎます。一度に大量に注がず、少量ずつ注ぎ足します",
        instructionEn: "After blooming, pour slowly in circles from center to outer edge. Add water in small increments",
        duration: "1分",
      },
      {
        step: 4,
        instruction: "合計240mlになるまで2〜3回に分けて注ぎます。ドリッパー内の湯面を一定に保つのがコツです",
        instructionEn: "Pour in 2-3 stages until reaching 240ml total. Keep the water level consistent in the dripper",
        duration: "1分30秒",
      },
      {
        step: 5,
        instruction: "落ちきったら完成。すぐにドリッパーを外し、過抽出を防ぎます",
        instructionEn: "Once fully drained, remove the dripper immediately to prevent over-extraction",
      },
    ],
    tips: [
      "浅煎りは高めの温度（93〜96℃）で抽出すると、フルーティな風味が引き出されます",
      "注ぎのスピードはゆっくりめに。急いで注ぐと酸味が突出しやすくなります",
      "新鮮な豆ほど蒸らしでよく膨らみます。膨らみが少ない場合は豆の鮮度を確認しましょう",
    ],
    tipsEn: [
      "Use higher temperature (93-96°C) for light roasts to bring out fruity flavors",
      "Pour slowly. Rushing the pour can result in overly sharp acidity",
      "Fresh beans expand more during blooming. If there's little expansion, check bean freshness",
    ],
    temperature: "93〜96℃",
    ratio: "1:16（豆15g : 湯240ml）",
    totalTime: "3〜3分30秒",
    videoKeyword: "浅煎り ハンドドリップ 淹れ方",
  },
  // ハンドドリップ - 中煎り
  {
    id: "handdrip-medium",
    method: "handDrip",
    roastLevel: "medium",
    title: "中煎りのハンドドリップ",
    titleEn: "Medium Roast Pour Over",
    steps: [
      {
        step: 1,
        instruction: "中細挽きの豆15gをドリッパーにセットし、88〜92℃のお湯を用意します",
        instructionEn: "Set 15g of medium-fine ground coffee in the dripper and prepare water at 88-92°C",
        duration: "30秒",
      },
      {
        step: 2,
        instruction: "30mlのお湯を中心から円を描くように注いで蒸らします",
        instructionEn: "Bloom with 30ml of water, pouring in circles from the center",
        duration: "30秒",
      },
      {
        step: 3,
        instruction: "中心付近に細くお湯を注ぎます。「の」の字を書くイメージで、ゆっくりと",
        instructionEn: "Pour a thin stream near the center in a spiral pattern, slowly and steadily",
        duration: "1分",
      },
      {
        step: 4,
        instruction: "合計250mlになるまで3回に分けて注ぎます。各回の間に少し間を置きます",
        instructionEn: "Pour in 3 stages until reaching 250ml. Pause briefly between each pour",
        duration: "1分30秒",
      },
    ],
    tips: [
      "中煎りはバランスが命。温度を88〜92℃に保つことで甘みとコクが引き出されます",
      "ペーパーフィルターを事前に湯通しすると、紙の匂いが取れてよりクリーンな味に",
      "注ぐ位置は中心寄りをキープすると、均一な抽出になりやすいです",
    ],
    tipsEn: [
      "Balance is key for medium roasts. Keeping temperature at 88-92°C brings out sweetness and body",
      "Pre-wet the paper filter to remove paper taste for a cleaner cup",
      "Keep your pour near the center for more even extraction",
    ],
    temperature: "88〜92℃",
    ratio: "1:16.7（豆15g : 湯250ml）",
    totalTime: "3分〜3分30秒",
    videoKeyword: "中煎り ハンドドリップ コーヒー 淹れ方",
  },
  // ハンドドリップ - 深煎り
  {
    id: "handdrip-dark",
    method: "handDrip",
    roastLevel: "dark",
    title: "深煎りのハンドドリップ",
    titleEn: "Dark Roast Pour Over",
    steps: [
      {
        step: 1,
        instruction: "中挽き〜中粗挽きの豆18gをドリッパーにセットし、82〜86℃のお湯を用意します",
        instructionEn: "Set 18g of medium to medium-coarse ground coffee and prepare water at 82-86°C",
        duration: "30秒",
      },
      {
        step: 2,
        instruction: "40mlのお湯で蒸らします。深煎りはガスが多いので、しっかり膨らむまで待ちます",
        instructionEn: "Bloom with 40ml of water. Dark roasts release more gas, so wait until fully expanded",
        duration: "40秒",
      },
      {
        step: 3,
        instruction: "太めの湯を中心に静かに注ぎます。ゆっくりと、ドリッパーの壁に当てないように",
        instructionEn: "Pour a slightly thicker stream to the center. Keep it slow, avoiding the dripper walls",
        duration: "1分",
      },
      {
        step: 4,
        instruction: "合計270mlになるまで注ぎます。深煎りは抽出スピードが速いので、注ぐペースを調整します",
        instructionEn: "Pour until reaching 270ml. Dark roasts extract faster, so adjust your pace accordingly",
        duration: "1分",
      },
    ],
    tips: [
      "深煎りは低めの温度（82〜86℃）がポイント。高温だと苦味が強くなりすぎます",
      "やや粗めの挽き目にすると、苦味を抑えてコクのある味わいに仕上がります",
      "最後の数滴は雑味が多いので、落ちきる前にドリッパーを外すとクリーンに",
    ],
    tipsEn: [
      "Lower temperature (82-86°C) is key for dark roasts. Too hot makes it overly bitter",
      "Slightly coarser grind reduces bitterness while maintaining body",
      "Remove the dripper before the last few drops to avoid astringent flavors",
    ],
    temperature: "82〜86℃",
    ratio: "1:15（豆18g : 湯270ml）",
    totalTime: "2分30秒〜3分",
    videoKeyword: "深煎り ハンドドリップ コーヒー 淹れ方",
  },
  // フレンチプレス - 中煎り
  {
    id: "frenchpress-medium",
    method: "frenchPress",
    roastLevel: "medium",
    title: "中煎りのフレンチプレス",
    titleEn: "Medium Roast French Press",
    steps: [
      {
        step: 1,
        instruction: "粗挽きの豆17gをフレンチプレスに入れます。プレス容器はお湯で温めておきましょう",
        instructionEn: "Add 17g of coarsely ground coffee to the French press. Pre-heat the press with hot water",
        duration: "30秒",
      },
      {
        step: 2,
        instruction: "92℃のお湯を270ml注ぎ、豆全体が浸るようにします",
        instructionEn: "Pour 270ml of water at 92°C, ensuring all grounds are submerged",
        duration: "15秒",
      },
      {
        step: 3,
        instruction: "蓋をせずに1分待ち、スプーンで表面をかき混ぜて粉を沈めます",
        instructionEn: "Wait 1 minute without the lid, then stir the surface to sink the grounds",
        duration: "1分",
      },
      {
        step: 4,
        instruction: "蓋をして3分間浸漬させます。この間は触らずに待ちます",
        instructionEn: "Put the lid on and let it steep for 3 minutes. Don't disturb it",
        duration: "3分",
      },
      {
        step: 5,
        instruction: "プランジャーをゆっくり押し下げ、カップに注ぎます。最後の底の部分は注がないのがコツ",
        instructionEn: "Slowly press the plunger down and pour. Avoid pouring the very last bit at the bottom",
      },
    ],
    tips: [
      "フレンチプレスは粗挽きが基本。細かすぎるとフィルターを通り抜けて粉っぽくなります",
      "抽出後はすぐにカップに移しましょう。プレスに残すと抽出が進み過ぎます",
      "金属フィルターなのでコーヒーオイルが残り、まろやかでリッチな味わいに",
    ],
    tipsEn: [
      "Coarse grind is essential for French press. Too fine and grounds pass through the filter",
      "Pour into cups immediately after brewing. Leaving coffee in the press causes over-extraction",
      "The metal filter retains coffee oils, resulting in a smooth, rich flavor",
    ],
    temperature: "92℃",
    ratio: "1:16（豆17g : 湯270ml）",
    totalTime: "4分30秒",
    videoKeyword: "フレンチプレス 中煎り コーヒー 淹れ方",
  },
  // フレンチプレス - 深煎り
  {
    id: "frenchpress-dark",
    method: "frenchPress",
    roastLevel: "dark",
    title: "深煎りのフレンチプレス",
    titleEn: "Dark Roast French Press",
    steps: [
      {
        step: 1,
        instruction: "粗挽きの豆20gをフレンチプレスに入れます。容器はお湯で温めておきます",
        instructionEn: "Add 20g of coarsely ground coffee to a pre-heated French press",
        duration: "30秒",
      },
      {
        step: 2,
        instruction: "88℃のお湯を300ml注ぎます。深煎りは低めの温度で苦味をコントロール",
        instructionEn: "Pour 300ml of water at 88°C. Lower temperature controls bitterness in dark roasts",
        duration: "15秒",
      },
      {
        step: 3,
        instruction: "蓋をせずに1分待ち、表面を軽くかき混ぜます",
        instructionEn: "Wait 1 minute without the lid, then gently stir the surface",
        duration: "1分",
      },
      {
        step: 4,
        instruction: "蓋をして2分30秒浸漬させます。深煎りは抽出が早いので中煎りより短めに",
        instructionEn: "Cover and steep for 2 minutes 30 seconds. Dark roasts extract faster, so steep shorter",
        duration: "2分30秒",
      },
      {
        step: 5,
        instruction: "プランジャーをゆっくり押し下げ、カップに注ぎます",
        instructionEn: "Slowly press the plunger down and pour into cups",
      },
    ],
    tips: [
      "深煎りは抽出が速いので、浸漬時間を短めにすると苦味のバランスが良くなります",
      "ミルクやクリームを加えてカフェオレにするのもおすすめです",
      "豆を多めにして濃いめに抽出すると、力強いボディが楽しめます",
    ],
    tipsEn: [
      "Dark roasts extract quickly, so shorter steep time keeps bitterness balanced",
      "Adding milk or cream for cafe au lait is also a great option",
      "Using more beans for a stronger brew brings out a powerful body",
    ],
    temperature: "88℃",
    ratio: "1:15（豆20g : 湯300ml）",
    totalTime: "4分",
    videoKeyword: "フレンチプレス 深煎り コーヒー 淹れ方",
  },
  // エスプレッソ - 中深煎り
  {
    id: "espresso-medium-dark",
    method: "espresso",
    roastLevel: "medium-dark",
    title: "中深煎りのエスプレッソ",
    titleEn: "Medium-Dark Roast Espresso",
    steps: [
      {
        step: 1,
        instruction: "細挽きの豆18gをポルタフィルターに詰めます。平らに均一にタンピングします",
        instructionEn: "Dose 18g of finely ground coffee into the portafilter. Tamp evenly and level",
        duration: "30秒",
      },
      {
        step: 2,
        instruction: "マシンを安定温度（約93℃）に温めてからポルタフィルターを装着します",
        instructionEn: "Warm the machine to stable temperature (~93°C), then lock in the portafilter",
        duration: "15秒",
      },
      {
        step: 3,
        instruction: "抽出ボタンを押し、約36mlのエスプレッソを25〜30秒で抽出します",
        instructionEn: "Start extraction, aiming for about 36ml of espresso in 25-30 seconds",
        duration: "25〜30秒",
      },
      {
        step: 4,
        instruction: "抽出されたエスプレッソのクレマ（表面の泡）が均一な茶金色なら成功です",
        instructionEn: "A successful shot has uniform golden-brown crema on the surface",
      },
    ],
    tips: [
      "挽き目の微調整が味を大きく左右します。苦すぎれば粗く、薄ければ細かく調整しましょう",
      "中深煎りはチョコレートやキャラメルの風味が出やすく、ラテやカプチーノにも最適",
      "タンピングは約15kgの力で均一に。傾きがあると片流れで味にムラが出ます",
    ],
    tipsEn: [
      "Fine-tuning the grind size greatly affects taste. Coarser if too bitter, finer if too weak",
      "Medium-dark roasts bring out chocolate and caramel notes, perfect for lattes and cappuccinos",
      "Tamp with about 15kg of pressure evenly. Uneven tamping causes channeling and uneven flavor",
    ],
    temperature: "約93℃（9気圧）",
    ratio: "1:2（豆18g : 抽出36ml）",
    totalTime: "25〜30秒",
    videoKeyword: "エスプレッソ 中深煎り 淹れ方 抽出",
  },
  // エスプレッソ - 深煎り
  {
    id: "espresso-dark",
    method: "espresso",
    roastLevel: "dark",
    title: "深煎りのエスプレッソ",
    titleEn: "Dark Roast Espresso",
    steps: [
      {
        step: 1,
        instruction: "細挽きの豆20gをポルタフィルターに詰め、均一にタンピングします",
        instructionEn: "Dose 20g of finely ground coffee into the portafilter and tamp evenly",
        duration: "30秒",
      },
      {
        step: 2,
        instruction: "マシンの温度を90〜92℃に設定します。深煎りはやや低めの温度が最適",
        instructionEn: "Set machine temperature to 90-92°C. Slightly lower temperature is best for dark roasts",
        duration: "15秒",
      },
      {
        step: 3,
        instruction: "約40mlを25〜30秒で抽出します。深煎りはやや多めの湯量で甘みを引き出します",
        instructionEn: "Extract about 40ml in 25-30 seconds. Slightly more volume brings out sweetness in dark roasts",
        duration: "25〜30秒",
      },
    ],
    tips: [
      "深煎りエスプレッソはミルクとの相性が抜群。カフェラテやカプチーノがおすすめです",
      "新鮮な豆を使うとクレマがしっかり出ます。焙煎後2週間以内がベスト",
      "苦味が強すぎる場合は、抽出量をやや増やす（ルンゴ気味にする）と飲みやすくなります",
    ],
    tipsEn: [
      "Dark roast espresso pairs wonderfully with milk. Try lattes and cappuccinos",
      "Fresh beans produce better crema. Best within 2 weeks of roasting",
      "If too bitter, increase the extraction volume slightly (lungo-style) for easier drinking",
    ],
    temperature: "90〜92℃（9気圧）",
    ratio: "1:2（豆20g : 抽出40ml）",
    totalTime: "25〜30秒",
    videoKeyword: "深煎り エスプレッソ 抽出 淹れ方",
  },
  // 水出し（コールドブリュー） - 中煎り
  {
    id: "coldbrew-medium",
    method: "coldBrew",
    roastLevel: "medium",
    title: "中煎りの水出しコーヒー",
    titleEn: "Medium Roast Cold Brew",
    steps: [
      {
        step: 1,
        instruction: "粗挽きの豆60gを容器に入れます。専用のコールドブリューポットがあると便利です",
        instructionEn: "Add 60g of coarsely ground coffee to a container. A dedicated cold brew pot is handy",
      },
      {
        step: 2,
        instruction: "常温の水700mlを注ぎ、粉全体が浸るように軽くかき混ぜます",
        instructionEn: "Pour 700ml of room temperature water and stir gently to ensure all grounds are wet",
        duration: "1分",
      },
      {
        step: 3,
        instruction: "蓋をして冷蔵庫に入れ、12〜16時間浸漬させます",
        instructionEn: "Cover and refrigerate for 12-16 hours",
        duration: "12〜16時間",
      },
      {
        step: 4,
        instruction: "ペーパーフィルターや茶漉しで濾して粉を取り除きます",
        instructionEn: "Filter through paper filter or fine mesh strainer to remove grounds",
        duration: "5分",
      },
      {
        step: 5,
        instruction: "グラスに氷を入れ、水出しコーヒーを注いで完成。お好みで水や牛乳で割っても",
        instructionEn: "Pour over ice in a glass. Dilute with water or milk to taste",
      },
    ],
    tips: [
      "中煎りの水出しは甘みとフルーティさのバランスが絶妙。そのまま飲むのがおすすめ",
      "濃いめに作って牛乳で割ると、すっきりしたカフェオレ風に楽しめます",
      "作り置きは冷蔵庫で3日以内に飲み切りましょう。時間が経つと風味が落ちます",
    ],
    tipsEn: [
      "Medium roast cold brew has a perfect balance of sweetness and fruitiness. Best enjoyed as-is",
      "Brew it strong and dilute with milk for a refreshing cafe au lait style drink",
      "Consume within 3 days when stored in the refrigerator. Flavor degrades over time",
    ],
    temperature: "常温水〜冷水",
    ratio: "1:12（豆60g : 水700ml）",
    totalTime: "12〜16時間",
    videoKeyword: "水出しコーヒー 中煎り 作り方",
  },
  // 水出し（コールドブリュー） - 深煎り
  {
    id: "coldbrew-dark",
    method: "coldBrew",
    roastLevel: "dark",
    title: "深煎りの水出しコーヒー",
    titleEn: "Dark Roast Cold Brew",
    steps: [
      {
        step: 1,
        instruction: "粗挽きの豆70gを容器に入れます。深煎りは多めの豆でしっかりとした味わいに",
        instructionEn: "Add 70g of coarsely ground coffee. More beans for a richer flavor with dark roasts",
      },
      {
        step: 2,
        instruction: "常温の水700mlを注ぎ、全体を軽くかき混ぜます",
        instructionEn: "Pour 700ml of room temperature water and stir gently",
        duration: "1分",
      },
      {
        step: 3,
        instruction: "蓋をして冷蔵庫で8〜12時間浸漬させます。深煎りは抽出が早いので短めでOK",
        instructionEn: "Cover and refrigerate for 8-12 hours. Dark roasts extract faster, so shorter time is fine",
        duration: "8〜12時間",
      },
      {
        step: 4,
        instruction: "フィルターで濾して粉を取り除きます",
        instructionEn: "Filter to remove the grounds",
        duration: "5分",
      },
      {
        step: 5,
        instruction: "氷を入れたグラスに注いで完成。ミルクとの相性が抜群です",
        instructionEn: "Pour over ice. Pairs excellently with milk",
      },
    ],
    tips: [
      "深煎りの水出しは苦味がまろやかになり、チョコレートのような甘みが楽しめます",
      "牛乳やバニラアイスと合わせてアフォガート風にするのもおすすめ",
      "浸漬時間が長すぎると渋みが出るので、12時間を超えないようにしましょう",
    ],
    tipsEn: [
      "Cold brewing dark roasts mellows the bitterness and brings out chocolate-like sweetness",
      "Try pairing with milk or vanilla ice cream for an affogato-style treat",
      "Don't steep longer than 12 hours to avoid astringent flavors",
    ],
    temperature: "常温水〜冷水",
    ratio: "1:10（豆70g : 水700ml）",
    totalTime: "8〜12時間",
    videoKeyword: "水出しコーヒー 深煎り アイスコーヒー 作り方",
  },
];

/** 焙煎度に合致するガイドを取得 */
export function getGuidesByRoastLevel(roastLevel: RoastLevel): BrewingGuide[] {
  return brewingGuides.filter((g) => g.roastLevel === roastLevel);
}

/** 焙煎度にマッチするガイドを取得（近い焙煎度も含む） */
export function getGuidesForRoastLevel(roastLevel: RoastLevel): BrewingGuide[] {
  const exact = getGuidesByRoastLevel(roastLevel);
  if (exact.length > 0) return exact;

  // 完全一致がない場合、近い焙煎度のガイドを返す
  const roastOrder: RoastLevel[] = ["light", "medium-light", "medium", "medium-dark", "dark"];
  const idx = roastOrder.indexOf(roastLevel);
  // 近い方を探す
  for (let d = 1; d < roastOrder.length; d++) {
    if (idx + d < roastOrder.length) {
      const found = getGuidesByRoastLevel(roastOrder[idx + d]);
      if (found.length > 0) return found;
    }
    if (idx - d >= 0) {
      const found = getGuidesByRoastLevel(roastOrder[idx - d]);
      if (found.length > 0) return found;
    }
  }
  return [];
}

/** YouTube検索URLを生成 */
export function getYouTubeSearchUrl(keyword: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
}

/** ガイドデータに含まれる焙煎度一覧を取得 */
export function getAvailableRoastLevels(): RoastLevel[] {
  const levels = new Set(brewingGuides.map((g) => g.roastLevel));
  const order: RoastLevel[] = ["light", "medium-light", "medium", "medium-dark", "dark"];
  return order.filter((l) => levels.has(l));
}
