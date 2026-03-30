import type { CoffeeProfile } from "../types/coffee";

export const coffeeProfiles: CoffeeProfile[] = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    nameJa: "エチオピア イルガチェフェ",
    origins: ["Ethiopia"],
    roastLevel: "light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 2,   // SCA: 浅煎りのため苦味は抑えめ
      acidity: 8,       // SCA: 明るいシトリック/マリック酸
      sweetness: 7,     // SCA: フルーツ由来の甘み
      body: 3,          // SCA: ティーライクな軽いボディ
      fruitiness: 9,    // SCA: ブルーベリー、ストーンフルーツ
      floral: 9,        // SCA: ジャスミン、ベルガモット
      nuttiness: 2,
      chocolaty: 1,
      roastiness: 1,
      cleanness: 8,     // SCA: ウォッシュドの高いクリーンカップ
      aftertaste: 8,    // 長く華やかな余韻
      balance: 7,       // フローラル/フルーツに偏るが高品質
    },
    process: ["washed", "natural"],
    pairings: [
      "レモンタルト",
      "マカロン",
      "フルーツゼリー",
      "ベリーのパンナコッタ",
    ],
    notes: [
      "ジャスミン",
      "ベルガモット",
      "ブルーベリー",
      "レモン",
      "ピーチ",
    ],
    description:
      "エチオピア南部イルガチェフェ地区で栽培される、世界で最も華やかなコーヒーのひとつ。ジャスミンやベルガモットのようなフローラルアロマと、ブルーベリーを思わせるフルーティな味わいが特徴です。浅煎りでその繊細な風味が最大限に引き出されます。",
    confidence: 0.8,       // 世界的に著名な産地、データ豊富
    altitude: "1,700-2,200m",
    variety: ["Heirloom"],
    brewingCompatibility: {
      handDrip: 10,        // 繊細な風味を最大限に引き出す
      espresso: 4,         // 浅煎りのためエスプレッソには不向き
      frenchPress: 5,      // ボディが薄いため控えめ
      coldBrew: 7,         // フルーティさが冷たくても活きる
    },
    milkCompatibility: 3,  // 繊細な風味がミルクで消される
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "kenya-aa",
    name: "Kenya AA",
    nameJa: "ケニア AA",
    origins: ["Kenya"],
    roastLevel: "medium-light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 9,       // SCA: 鮮烈なリン酸系酸味
      sweetness: 6,
      body: 5,          // SCA: AAグレードはボディもしっかり
      fruitiness: 8,    // SCA: カシス、グレープフルーツ
      floral: 4,
      nuttiness: 2,
      chocolaty: 2,
      roastiness: 2,
      cleanness: 7,
      aftertaste: 8,    // 長く鮮烈な酸の余韻
      balance: 6,       // 酸味が突出するがそれが個性
    },
    process: ["washed"],
    pairings: [
      "ベリータルト",
      "チーズケーキ",
      "マドレーヌ",
      "フルーツケーキ",
    ],
    notes: [
      "カシス",
      "グレープフルーツ",
      "トマト",
      "ブラックベリー",
      "赤ワイン",
    ],
    description:
      "ケニア最高等級のAA規格。カシスやグレープフルーツのような鮮烈な酸味と、ベリーを思わせるジューシーな甘みが魅力です。しっかりとしたボディもあり、余韻が長く続きます。",
    confidence: 0.8,
    altitude: "1,500-2,100m",
    variety: ["SL28", "SL34"],
    brewingCompatibility: {
      handDrip: 9,
      espresso: 5,
      frenchPress: 6,
      coldBrew: 7,
    },
    milkCompatibility: 4,
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "guatemala-antigua",
    name: "Guatemala Antigua",
    nameJa: "グアテマラ アンティグア",
    origins: ["Guatemala"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      espresso: "fine",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 4,
      acidity: 5,       // SCA: 適度なリンゴ酸
      sweetness: 6,
      body: 6,          // SCA: 火山灰土壌由来のしっかりボディ
      fruitiness: 3,
      floral: 3,
      nuttiness: 7,     // SCA: アーモンド、くるみ
      chocolaty: 7,     // SCA: ミルクチョコレート
      roastiness: 4,
      cleanness: 6,
      aftertaste: 7,    // ナッツ/チョコの心地よい余韻
      balance: 8,       // 非常にバランスの良い産地
    },
    process: ["washed"],
    pairings: [
      "チョコレートケーキ",
      "アーモンドクッキー",
      "カヌレ",
      "くるみのタルト",
    ],
    notes: [
      "ミルクチョコレート",
      "アーモンド",
      "キャラメル",
      "オレンジピール",
      "スパイス",
    ],
    description:
      "グアテマラの名産地アンティグア。火山灰土壌が育むリッチなチョコレートフレーバーとナッツの風味が特徴です。酸味と甘み、ボディのバランスが良く、中煎りで幅広い抽出方法に対応できる万能型です。",
    confidence: 0.75,
    altitude: "1,500-1,700m",
    variety: ["Bourbon", "Caturra"],
    brewingCompatibility: {
      handDrip: 8,
      espresso: 7,
      frenchPress: 8,
      coldBrew: 6,
    },
    milkCompatibility: 7,
    seasonalAffinity: ["autumn", "winter"],
  },
  {
    id: "colombia-huila",
    name: "Colombia Huila",
    nameJa: "コロンビア ウィラ",
    origins: ["Colombia"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      espresso: "fine",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 5,
      sweetness: 7,     // SCA: キャラメル/ブラウンシュガー
      body: 5,
      fruitiness: 4,
      floral: 3,
      nuttiness: 6,
      chocolaty: 5,
      roastiness: 3,
      cleanness: 7,
      aftertaste: 7,    // クリーンで甘い余韻
      balance: 8,       // 全体的に高いバランス
    },
    process: ["washed", "honey"],
    pairings: [
      "キャラメルプリン",
      "ナッツブラウニー",
      "バナナケーキ",
      "どら焼き",
    ],
    notes: [
      "キャラメル",
      "ヘーゼルナッツ",
      "赤リンゴ",
      "ブラウンシュガー",
      "ミルクチョコ",
    ],
    description:
      "コロンビア南部ウィラ県は高品質なスペシャルティコーヒーの産地として名高い地域です。キャラメルのような甘みとナッツの風味が調和し、クリーンで飲みやすい味わいが特徴です。初めてのスペシャルティコーヒーにもおすすめの一杯です。",
    confidence: 0.8,
    altitude: "1,500-2,000m",
    variety: ["Castillo", "Caturra", "Colombia"],
    brewingCompatibility: {
      handDrip: 9,
      espresso: 7,
      frenchPress: 7,
      coldBrew: 7,
    },
    milkCompatibility: 7,
    seasonalAffinity: ["spring", "autumn"],
  },
  {
    id: "brazil-santos",
    name: "Brazil Santos",
    nameJa: "ブラジル サントス",
    origins: ["Brazil"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      espresso: "fine",
      frenchPress: "coarse",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 4,
      acidity: 3,       // SCA: 低酸味が特徴
      sweetness: 6,
      body: 6,
      fruitiness: 2,
      floral: 1,
      nuttiness: 8,     // SCA: ピーナッツ、アーモンド
      chocolaty: 7,     // SCA: ダークチョコ
      roastiness: 5,
      cleanness: 5,
      aftertaste: 6,    // ナッツの心地よい余韻
      balance: 7,       // 万人向けの良バランス
    },
    process: ["natural", "honey"],
    pairings: [
      "チョコレート",
      "ナッツクッキー",
      "カステラ",
      "シュークリーム",
    ],
    notes: [
      "ピーナッツ",
      "ダークチョコレート",
      "キャラメル",
      "トースト",
      "ほのかなスパイス",
    ],
    description:
      "世界最大のコーヒー産出国ブラジルの代表銘柄。ナッツとチョコレートの風味が豊かで、酸味が穏やかなため万人に好まれる味わいです。どの抽出方法でも安定した美味しさが楽しめます。",
    confidence: 0.8,
    altitude: "800-1,300m",
    variety: ["Mundo Novo", "Catuai"],
    brewingCompatibility: {
      handDrip: 7,
      espresso: 9,       // ブラジルはエスプレッソブレンドの王道
      frenchPress: 8,
      coldBrew: 8,
    },
    milkCompatibility: 8, // ミルクとの相性が非常に良い
    seasonalAffinity: ["autumn", "winter"],
  },
  {
    id: "indonesia-mandheling",
    name: "Indonesia Mandheling",
    nameJa: "インドネシア マンデリン",
    origins: ["Indonesia"],
    roastLevel: "dark",
    grindRecommendation: {
      espresso: "fine",
      frenchPress: "coarse",
      handDrip: "medium",
    },
    flavorScores: {
      bitterness: 8,    // SCA: 深煎りの強い苦味
      acidity: 2,
      sweetness: 4,
      body: 9,          // SCA: 非常に重厚なボディ
      fruitiness: 2,
      floral: 1,
      nuttiness: 5,
      chocolaty: 6,
      roastiness: 8,
      cleanness: 3,     // SCA: アーシーさがクリーンカップを下げる
      aftertaste: 7,    // スパイシーで長い余韻
      balance: 5,       // 苦味/ボディに偏る個性派
    },
    process: ["natural"],
    pairings: [
      "ガトーショコラ",
      "羊羹",
      "チーズ",
      "ビターチョコレート",
    ],
    notes: [
      "ダークチョコ",
      "スパイス",
      "ハーブ",
      "アーシー",
      "シダーウッド",
    ],
    description:
      "スマトラ島北部で生産される重厚なコーヒー。どっしりとしたボディとスパイシーな香り、独特のアーシーな風味が特徴です。深煎りにすることでその個性が際立ち、ミルクとの相性も抜群です。",
    confidence: 0.75,
    altitude: "1,000-1,500m",
    variety: ["Typica", "Catimor"],
    brewingCompatibility: {
      handDrip: 6,
      espresso: 9,
      frenchPress: 9,
      coldBrew: 5,
    },
    milkCompatibility: 9, // ミルクに負けない力強さ
    seasonalAffinity: ["autumn", "winter"],
  },
  {
    id: "costarica-tarrazu",
    name: "Costa Rica Tarrazu",
    nameJa: "コスタリカ タラス",
    origins: ["Costa Rica"],
    roastLevel: "medium-light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 6,
      sweetness: 7,     // SCA: ハニーのような甘み
      body: 4,
      fruitiness: 5,
      floral: 4,
      nuttiness: 4,
      chocolaty: 4,
      roastiness: 2,
      cleanness: 9,     // SCA: 非常にクリーンなカップ
      aftertaste: 7,    // 甘くクリーンな余韻
      balance: 8,       // 高いバランス
    },
    process: ["washed", "honey"],
    pairings: [
      "フルーツタルト",
      "バニラアイス",
      "スコーン",
      "パウンドケーキ",
    ],
    notes: [
      "ハニー",
      "青リンゴ",
      "バニラ",
      "ミルクチョコ",
      "クリーン",
    ],
    description:
      "コスタリカのタラス地区は高品質コーヒーの名産地。非常にクリーンなカップが特徴で、はちみつのような甘みと上品な酸味が調和しています。朝の一杯にぴったりの爽やかな味わいです。",
    confidence: 0.75,
    altitude: "1,200-1,900m",
    variety: ["Caturra", "Catuai"],
    brewingCompatibility: {
      handDrip: 9,
      espresso: 5,
      frenchPress: 6,
      coldBrew: 8,
    },
    milkCompatibility: 5,
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "yemen-mocha",
    name: "Yemen Mocha",
    nameJa: "イエメン モカ",
    origins: ["Yemen"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium-fine",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 4,
      acidity: 6,
      sweetness: 6,
      body: 6,
      fruitiness: 7,    // SCA: ドライフルーツ、ワイニー
      floral: 5,
      nuttiness: 3,
      chocolaty: 6,     // SCA: カカオ
      roastiness: 4,
      cleanness: 4,     // SCA: ナチュラルの野性味
      aftertaste: 8,    // 複雑で長い余韻が特徴
      balance: 6,       // 個性的だがまとまりあり
    },
    process: ["natural"],
    pairings: [
      "ドライフルーツ",
      "スパイスクッキー",
      "赤ワインチョコ",
      "デーツ",
    ],
    notes: [
      "赤ワイン",
      "ドライフルーツ",
      "シナモン",
      "カカオ",
      "レーズン",
    ],
    description:
      "コーヒー発祥の地とも言われるイエメンの伝統的なモカ。赤ワインのような複雑な果実味とスパイス感が共存する、他にない個性的な味わいです。ナチュラル製法ならではの奥深いフレーバーが楽しめます。",
    confidence: 0.7,
    altitude: "1,500-2,500m",
    variety: ["Heirloom"],
    brewingCompatibility: {
      handDrip: 8,
      espresso: 6,
      frenchPress: 8,
      coldBrew: 5,
    },
    milkCompatibility: 5,
    seasonalAffinity: ["autumn", "winter"],
  },
  {
    id: "tanzania-kilimanjaro",
    name: "Tanzania Kilimanjaro",
    nameJa: "タンザニア キリマンジャロ",
    origins: ["Tanzania"],
    roastLevel: "medium-light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 7,       // SCA: シトリック酸主体の明るい酸味
      sweetness: 5,
      body: 4,
      fruitiness: 6,    // SCA: オレンジ、白桃
      floral: 3,
      nuttiness: 3,
      chocolaty: 3,
      roastiness: 2,
      cleanness: 7,
      aftertaste: 6,    // 紅茶のような上品な余韻
      balance: 7,       // 酸味主体だがバランス良好
    },
    process: ["washed"],
    pairings: [
      "レモンケーキ",
      "柑橘系ゼリー",
      "クレープ",
      "ヨーグルトパフェ",
    ],
    notes: [
      "オレンジ",
      "レモングラス",
      "紅茶",
      "白桃",
      "はちみつ",
    ],
    description:
      "キリマンジャロ山麓の高地で栽培されるタンザニアの代表銘柄。柑橘系の明るい酸味とすっきりとしたクリーンな後味が特徴です。紅茶のような上品な飲み口で、軽やかに楽しめます。",
    confidence: 0.75,
    altitude: "1,400-2,000m",
    variety: ["Bourbon", "Kent"],
    brewingCompatibility: {
      handDrip: 9,
      espresso: 4,
      frenchPress: 5,
      coldBrew: 7,
    },
    milkCompatibility: 4,
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "panama-geisha",
    name: "Panama Geisha",
    nameJa: "パナマ ゲイシャ",
    origins: ["Panama"],
    roastLevel: "light",
    grindRecommendation: {
      handDrip: "medium-fine",
    },
    flavorScores: {
      bitterness: 1,
      acidity: 7,
      sweetness: 8,     // SCA: トロピカルフルーツの甘み
      body: 3,
      fruitiness: 8,    // SCA: マンゴー、ライチ
      floral: 10,       // SCA: ゲイシャ種の圧倒的フローラル
      nuttiness: 1,
      chocolaty: 1,
      roastiness: 1,
      cleanness: 9,
      aftertaste: 9,    // 非常に長く華やかな余韻
      balance: 7,       // フローラル突出だが調和あり
    },
    process: ["washed", "natural"],
    pairings: [
      "マカロン",
      "ローズゼリー",
      "白桃のコンポート",
      "上生菓子",
    ],
    notes: [
      "ジャスミン",
      "ローズ",
      "マンゴー",
      "ライチ",
      "アールグレイ",
    ],
    description:
      "世界最高峰のコーヒー品種として名高いゲイシャ種。ジャスミンやローズのような華やかなフローラルアロマと、トロピカルフルーツを思わせる甘みが圧倒的です。繊細な風味を活かすため、浅煎り・ハンドドリップが最適です。",
    confidence: 0.8,
    altitude: "1,600-1,800m",
    variety: ["Geisha"],
    brewingCompatibility: {
      handDrip: 10,
      espresso: 3,
      frenchPress: 4,
      coldBrew: 6,
    },
    milkCompatibility: 2, // 繊細すぎてミルクには不向き
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "hawaii-kona",
    name: "Hawaii Kona",
    nameJa: "ハワイ コナ",
    origins: ["Hawaii"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 4,
      sweetness: 7,     // SCA: ブラウンシュガー、バニラ
      body: 5,
      fruitiness: 3,
      floral: 2,
      nuttiness: 7,     // SCA: マカダミアナッツ
      chocolaty: 4,
      roastiness: 3,
      cleanness: 8,
      aftertaste: 7,    // まろやかで持続する甘い余韻
      balance: 9,       // 全要素が高次元で調和
    },
    process: ["washed"],
    pairings: [
      "マカダミアナッツクッキー",
      "バニラアイス",
      "パウンドケーキ",
      "カステラ",
    ],
    notes: [
      "マカダミアナッツ",
      "ブラウンシュガー",
      "バター",
      "バニラ",
      "ほのかなシトラス",
    ],
    description:
      "ハワイ島コナ地区の火山性土壌で栽培される希少なコーヒー。まろやかな口当たりとナッツの風味、上品な甘みが特徴です。クリーンで雑味が少なく、誰でも飲みやすい味わいが魅力です。",
    confidence: 0.75,
    altitude: "300-900m",
    variety: ["Typica"],
    brewingCompatibility: {
      handDrip: 9,
      espresso: 5,
      frenchPress: 7,
      coldBrew: 7,
    },
    milkCompatibility: 6,
    seasonalAffinity: ["summer"],
  },
  {
    id: "jamaica-blue-mountain",
    name: "Jamaica Blue Mountain",
    nameJa: "ジャマイカ ブルーマウンテン",
    origins: ["Jamaica"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 5,
      sweetness: 8,     // SCA: 非常に甘い
      body: 5,
      fruitiness: 4,
      floral: 4,
      nuttiness: 5,
      chocolaty: 5,
      roastiness: 3,
      cleanness: 9,     // SCA: 世界屈指のクリーンカップ
      aftertaste: 8,    // なめらかで長い余韻
      balance: 10,      // 「バランスの最高峰」と称される
    },
    process: ["washed"],
    pairings: [
      "バニラアイス",
      "シュークリーム",
      "フィナンシェ",
      "カステラ",
    ],
    notes: [
      "ミルクチョコ",
      "フローラル",
      "ナッツ",
      "クリーミー",
      "スイートシトラス",
    ],
    description:
      "ジャマイカのブルーマウンテン山脈で栽培される世界三大コーヒーのひとつ。酸味・甘み・苦味・コクのすべてが高い次元で調和した「バランスの最高峰」と称されます。なめらかな口当たりとクリーンな余韻が絶品です。",
    confidence: 0.8,
    altitude: "900-1,700m",
    variety: ["Typica"],
    brewingCompatibility: {
      handDrip: 10,
      espresso: 6,
      frenchPress: 7,
      coldBrew: 7,
    },
    milkCompatibility: 6,
    seasonalAffinity: ["spring", "autumn"],
  },
  {
    id: "nicaragua",
    name: "Nicaragua",
    nameJa: "ニカラグア",
    origins: ["Nicaragua"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      espresso: "fine",
    },
    flavorScores: {
      bitterness: 4,
      acidity: 4,
      sweetness: 6,
      body: 6,
      fruitiness: 3,
      floral: 2,
      nuttiness: 5,
      chocolaty: 7,     // SCA: チョコレート主体
      roastiness: 4,
      cleanness: 6,
      aftertaste: 6,    // チョコの心地よい余韻
      balance: 7,
    },
    process: ["washed", "honey"],
    pairings: [
      "キャラメルプリン",
      "チョコレートケーキ",
      "ナッツブラウニー",
      "バナナケーキ",
    ],
    notes: [
      "キャラメル",
      "ミルクチョコレート",
      "ブラウンシュガー",
      "トースト",
      "ほのかなベリー",
    ],
    description:
      "中米ニカラグアの火山地帯で栽培されるコーヒー。キャラメルとチョコレートの甘い風味が特徴で、ミディアムボディの飲みやすい一杯です。エスプレッソにも適した安定感のある味わいが楽しめます。",
    confidence: 0.65,
    altitude: "1,200-1,500m",
    variety: ["Caturra", "Bourbon"],
    brewingCompatibility: {
      handDrip: 7,
      espresso: 8,
      frenchPress: 7,
      coldBrew: 6,
    },
    milkCompatibility: 7,
    seasonalAffinity: ["autumn", "winter"],
  },
  {
    id: "honduras",
    name: "Honduras",
    nameJa: "ホンジュラス",
    origins: ["Honduras"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      espresso: "fine",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 5,
      sweetness: 7,
      body: 5,
      fruitiness: 5,
      floral: 3,
      nuttiness: 4,
      chocolaty: 5,
      roastiness: 3,
      cleanness: 7,
      aftertaste: 6,
      balance: 8,       // バランスの良い万能型
    },
    process: ["washed", "honey"],
    pairings: [
      "キャラメルプリン",
      "フルーツタルト",
      "スコーン",
      "マドレーヌ",
    ],
    notes: [
      "キャラメル",
      "ピーチ",
      "オレンジ",
      "ブラウンシュガー",
      "ハニー",
    ],
    description:
      "中米の主要コーヒー産地ホンジュラス。キャラメルの甘みとフルーティな酸味がバランスよく調和し、クリーンで飲みやすい味わいです。多様な抽出方法に対応できる万能な一杯です。",
    confidence: 0.65,
    altitude: "1,100-1,600m",
    variety: ["Catuai", "Lempira"],
    brewingCompatibility: {
      handDrip: 8,
      espresso: 7,
      frenchPress: 7,
      coldBrew: 7,
    },
    milkCompatibility: 6,
    seasonalAffinity: ["spring", "autumn"],
  },
  {
    id: "el-salvador",
    name: "El Salvador",
    nameJa: "エルサルバドル",
    origins: ["El Salvador"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      espresso: "fine",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 4,
      sweetness: 7,     // SCA: はちみつ、キャラメル
      body: 6,
      fruitiness: 3,
      floral: 2,
      nuttiness: 4,
      chocolaty: 7,
      roastiness: 3,
      cleanness: 7,
      aftertaste: 6,    // クリーミーで甘い余韻
      balance: 8,
    },
    process: ["washed", "honey"],
    pairings: [
      "ガトーショコラ",
      "キャラメルプリン",
      "シュークリーム",
      "フィナンシェ",
    ],
    notes: [
      "ミルクチョコレート",
      "はちみつ",
      "クリーミー",
      "キャラメル",
      "アーモンド",
    ],
    description:
      "中米エルサルバドルの高地で栽培されるコーヒー。チョコレートとはちみつのような甘みが特徴で、クリーミーな口当たりが魅力です。穏やかで優しい味わいは、食後のリラックスタイムに最適です。",
    confidence: 0.65,
    altitude: "1,200-1,800m",
    variety: ["Bourbon", "Pacamara"],
    brewingCompatibility: {
      handDrip: 8,
      espresso: 7,
      frenchPress: 7,
      coldBrew: 6,
    },
    milkCompatibility: 7,
    seasonalAffinity: ["autumn", "winter"],
  },
  {
    id: "mexico",
    name: "Mexico",
    nameJa: "メキシコ",
    origins: ["Mexico"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      frenchPress: "coarse",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 4,
      sweetness: 5,
      body: 4,
      fruitiness: 2,
      floral: 2,
      nuttiness: 7,
      chocolaty: 6,
      roastiness: 3,
      cleanness: 7,
      aftertaste: 5,    // 穏やかな余韻
      balance: 7,       // 穏やかでバランス良好
    },
    process: ["washed"],
    pairings: [
      "ナッツクッキー",
      "チョコレート",
      "カステラ",
      "どら焼き",
    ],
    notes: [
      "ヘーゼルナッツ",
      "ミルクチョコ",
      "ブラウンシュガー",
      "軽やかなシトラス",
      "トースト",
    ],
    description:
      "メキシコ南部の山岳地帯で栽培されるコーヒー。ナッツとチョコレートの穏やかな風味が特徴で、軽やかな飲み口が魅力です。クセが少なく、日常使いにぴったりの親しみやすい味わいです。",
    confidence: 0.6,
    altitude: "900-1,400m",
    variety: ["Typica", "Bourbon"],
    brewingCompatibility: {
      handDrip: 7,
      espresso: 6,
      frenchPress: 7,
      coldBrew: 8,
    },
    milkCompatibility: 6,
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "peru",
    name: "Peru",
    nameJa: "ペルー",
    origins: ["Peru"],
    roastLevel: "medium-light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 2,
      acidity: 5,
      sweetness: 6,
      body: 4,
      fruitiness: 5,
      floral: 5,
      nuttiness: 3,
      chocolaty: 5,
      roastiness: 2,
      cleanness: 7,
      aftertaste: 6,    // フローラルでクリーンな余韻
      balance: 7,
    },
    process: ["washed", "natural"],
    pairings: [
      "フルーツタルト",
      "マカロン",
      "レモンケーキ",
      "バニラアイス",
    ],
    notes: [
      "フローラル",
      "シトラス",
      "ミルクチョコレート",
      "ピーチ",
      "ハニー",
    ],
    description:
      "南米ペルーのアンデス山脈で栽培されるコーヒー。フローラルな香りとシトラスの爽やかな酸味、ミルクチョコレートのような甘みが調和しています。繊細で上品な味わいが楽しめます。",
    confidence: 0.6,
    altitude: "1,200-1,800m",
    variety: ["Typica", "Bourbon", "Caturra"],
    brewingCompatibility: {
      handDrip: 8,
      espresso: 5,
      frenchPress: 6,
      coldBrew: 7,
    },
    milkCompatibility: 5,
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "bolivia",
    name: "Bolivia",
    nameJa: "ボリビア",
    origins: ["Bolivia"],
    roastLevel: "light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 2,
      acidity: 6,
      sweetness: 7,
      body: 4,
      fruitiness: 7,    // SCA: ベリー、ストーンフルーツ
      floral: 6,
      nuttiness: 2,
      chocolaty: 3,
      roastiness: 1,
      cleanness: 7,
      aftertaste: 7,    // フルーティで繊細な余韻
      balance: 7,
    },
    process: ["washed", "natural"],
    pairings: [
      "フルーツゼリー",
      "マカロン",
      "ベリータルト",
      "白桃のコンポート",
    ],
    notes: [
      "ベリー",
      "ジャスミン",
      "ピーチ",
      "マスカット",
      "紅茶",
    ],
    description:
      "南米ボリビアの高地で少量生産される希少なコーヒー。フルーティな果実味とフローラルな香りが複雑に絡み合う、繊細で奥深い味わいが特徴です。浅煎りでその個性が最大限に引き出されます。",
    confidence: 0.6,
    altitude: "1,400-2,000m",
    variety: ["Typica", "Caturra"],
    brewingCompatibility: {
      handDrip: 9,
      espresso: 4,
      frenchPress: 5,
      coldBrew: 7,
    },
    milkCompatibility: 3,
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "rwanda",
    name: "Rwanda",
    nameJa: "ルワンダ",
    origins: ["Rwanda"],
    roastLevel: "medium-light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 2,
      acidity: 6,
      sweetness: 7,
      body: 4,
      fruitiness: 8,    // SCA: ベリー系の鮮やかな果実味
      floral: 6,
      nuttiness: 2,
      chocolaty: 2,
      roastiness: 2,
      cleanness: 7,
      aftertaste: 7,    // ジューシーなベリーの余韻
      balance: 7,
    },
    process: ["washed", "natural"],
    pairings: [
      "ベリータルト",
      "フルーツゼリー",
      "マカロン",
      "ヨーグルトパフェ",
    ],
    notes: [
      "ラズベリー",
      "ブルーベリー",
      "ジャスミン",
      "オレンジ",
      "ジューシー",
    ],
    description:
      "「千の丘の国」ルワンダの高地で栽培されるコーヒー。ベリーのようなジューシーな果実味とフローラルな香りが際立つ華やかな味わいです。アフリカンコーヒーらしい鮮やかな酸味が魅力です。",
    confidence: 0.7,
    altitude: "1,500-2,000m",
    variety: ["Bourbon"],
    brewingCompatibility: {
      handDrip: 9,
      espresso: 4,
      frenchPress: 5,
      coldBrew: 7,
    },
    milkCompatibility: 3,
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "burundi",
    name: "Burundi",
    nameJa: "ブルンジ",
    origins: ["Burundi"],
    roastLevel: "medium-light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 2,
      acidity: 7,
      sweetness: 6,
      body: 4,
      fruitiness: 7,
      floral: 4,
      nuttiness: 2,
      chocolaty: 2,
      roastiness: 2,
      cleanness: 7,
      aftertaste: 6,    // 柑橘系の爽やかな余韻
      balance: 7,
    },
    process: ["washed"],
    pairings: [
      "ベリータルト",
      "レモンケーキ",
      "クレープ",
      "柑橘系ゼリー",
    ],
    notes: [
      "ブラックベリー",
      "レモン",
      "紅茶",
      "オレンジ",
      "フローラル",
    ],
    description:
      "東アフリカ・ブルンジの高地で栽培されるコーヒー。ベリーの果実味とシトラスの爽やかな酸味、紅茶のような上品な風味が特徴です。軽やかで清涼感のある味わいが楽しめます。",
    confidence: 0.6,
    altitude: "1,500-2,000m",
    variety: ["Bourbon"],
    brewingCompatibility: {
      handDrip: 9,
      espresso: 4,
      frenchPress: 5,
      coldBrew: 7,
    },
    milkCompatibility: 3,
    seasonalAffinity: ["spring", "summer"],
  },
  {
    id: "india-malabar",
    name: "India Malabar",
    nameJa: "インド マラバール",
    origins: ["India"],
    roastLevel: "medium-dark",
    grindRecommendation: {
      espresso: "fine",
      frenchPress: "coarse",
      handDrip: "medium",
    },
    flavorScores: {
      bitterness: 6,
      acidity: 2,
      sweetness: 4,
      body: 8,          // SCA: モンスーン処理による重厚ボディ
      fruitiness: 1,
      floral: 1,
      nuttiness: 5,
      chocolaty: 6,
      roastiness: 7,
      cleanness: 4,
      aftertaste: 6,    // スパイシーで個性的な余韻
      balance: 5,       // 重厚/スパイシーに偏る個性派
    },
    process: ["natural"],
    pairings: [
      "ガトーショコラ",
      "スパイスクッキー",
      "チーズ",
      "ビターチョコレート",
    ],
    notes: [
      "スパイス",
      "ダークチョコ",
      "シダーウッド",
      "タバコ",
      "モルト",
    ],
    description:
      "インド・マラバール海岸のモンスーン気候で独自の精製を受けるコーヒー。スパイシーで重厚なボディと低い酸味が特徴です。独特の風味はエスプレッソブレンドにもよく使われます。",
    confidence: 0.65,
    altitude: "1,000-1,500m",
    variety: ["Kent", "S795"],
    brewingCompatibility: {
      handDrip: 5,
      espresso: 9,
      frenchPress: 8,
      coldBrew: 4,
    },
    milkCompatibility: 8,
    seasonalAffinity: ["autumn", "winter"],
  },
  {
    id: "myanmar",
    name: "Myanmar",
    nameJa: "ミャンマー",
    origins: ["Myanmar"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 3,
      acidity: 4,
      sweetness: 6,
      body: 5,
      fruitiness: 3,
      floral: 2,
      nuttiness: 7,
      chocolaty: 6,
      roastiness: 3,
      cleanness: 6,
      aftertaste: 5,    // ナッツの穏やかな余韻
      balance: 7,
    },
    process: ["washed", "honey"],
    pairings: [
      "ナッツクッキー",
      "チョコレート",
      "どら焼き",
      "カステラ",
    ],
    notes: [
      "ヘーゼルナッツ",
      "ミルクチョコ",
      "ハニー",
      "ブラウンシュガー",
      "ほのかなスパイス",
    ],
    description:
      "東南アジア・ミャンマーのシャン高原で栽培される新興のコーヒー産地。ナッツとチョコレートの風味にハニーのような甘みが加わる、優しい味わいが特徴です。注目度が高まっている産地です。",
    confidence: 0.6,
    altitude: "1,000-1,500m",
    variety: ["Catimor", "SL34"],
    brewingCompatibility: {
      handDrip: 7,
      espresso: 6,
      frenchPress: 7,
      coldBrew: 6,
    },
    milkCompatibility: 6,
    seasonalAffinity: ["autumn"],
  },
  {
    id: "china-yunnan",
    name: "China Yunnan",
    nameJa: "中国 雲南",
    origins: ["China"],
    roastLevel: "medium-light",
    grindRecommendation: {
      handDrip: "medium-fine",
      coldBrew: "coarse",
    },
    flavorScores: {
      bitterness: 2,
      acidity: 5,
      sweetness: 6,
      body: 4,
      fruitiness: 6,
      floral: 5,
      nuttiness: 3,
      chocolaty: 3,
      roastiness: 2,
      cleanness: 7,
      aftertaste: 6,    // 紅茶のような繊細な余韻
      balance: 7,
    },
    process: ["washed", "natural"],
    pairings: [
      "フルーツゼリー",
      "マカロン",
      "上生菓子",
      "レモンケーキ",
    ],
    notes: [
      "フローラル",
      "シトラス",
      "プラム",
      "紅茶",
      "ジャスミン茶",
    ],
    description:
      "中国雲南省の高地で栽培されるアジアのスペシャルティコーヒー。フルーティな果実味とフローラルな香り、紅茶や中国茶を思わせる独特の繊細さが特徴です。近年急速に品質が向上しています。",
    confidence: 0.6,
    altitude: "1,200-1,800m",
    variety: ["Catimor", "Typica"],
    brewingCompatibility: {
      handDrip: 8,
      espresso: 4,
      frenchPress: 5,
      coldBrew: 7,
    },
    milkCompatibility: 4,
    seasonalAffinity: ["spring"],
  },
  {
    id: "papua-new-guinea",
    name: "Papua New Guinea",
    nameJa: "パプアニューギニア",
    origins: ["Papua New Guinea"],
    roastLevel: "medium",
    grindRecommendation: {
      handDrip: "medium",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 4,
      acidity: 5,
      sweetness: 5,
      body: 6,
      fruitiness: 5,
      floral: 2,
      nuttiness: 4,
      chocolaty: 4,
      roastiness: 4,
      cleanness: 5,
      aftertaste: 6,    // スパイシーでワイルドな余韻
      balance: 6,
    },
    process: ["washed", "natural"],
    pairings: [
      "スパイスクッキー",
      "フルーツケーキ",
      "ナッツブラウニー",
      "チーズケーキ",
    ],
    notes: [
      "トロピカルフルーツ",
      "スパイス",
      "ブラウンシュガー",
      "ハーブ",
      "ワイルドベリー",
    ],
    description:
      "南太平洋の豊かな自然の中で栽培されるパプアニューギニアのコーヒー。トロピカルフルーツとスパイスの野性的な風味が特徴で、ワイルドな個性が楽しめます。力強いボディと複雑な味わいが魅力です。",
    confidence: 0.6,
    altitude: "1,300-1,800m",
    variety: ["Typica", "Bourbon"],
    brewingCompatibility: {
      handDrip: 7,
      espresso: 6,
      frenchPress: 8,
      coldBrew: 5,
    },
    milkCompatibility: 6,
    seasonalAffinity: ["autumn", "winter"],
  },
  {
    id: "east-timor",
    name: "East Timor",
    nameJa: "東ティモール",
    origins: ["East Timor"],
    roastLevel: "medium-dark",
    grindRecommendation: {
      handDrip: "medium",
      espresso: "fine",
      frenchPress: "coarse",
    },
    flavorScores: {
      bitterness: 5,
      acidity: 3,
      sweetness: 5,
      body: 7,
      fruitiness: 2,
      floral: 1,
      nuttiness: 4,
      chocolaty: 7,     // SCA: ダークチョコレート
      roastiness: 5,
      cleanness: 5,
      aftertaste: 6,    // チョコとハーブの余韻
      balance: 6,
    },
    process: ["natural", "washed"],
    pairings: [
      "ガトーショコラ",
      "チョコレート",
      "羊羹",
      "ブラウニー",
    ],
    notes: [
      "ダークチョコレート",
      "アーシー",
      "ハーブ",
      "スパイス",
      "トースト",
    ],
    description:
      "東南アジアの小国・東ティモールで有機栽培されるコーヒー。チョコレートの風味とアーシーな深み、ハーブのアクセントが特徴です。しっかりとしたボディで、中深煎りにすることで個性が引き立ちます。",
    confidence: 0.6,
    altitude: "1,200-1,800m",
    variety: ["Typica", "Hibrido de Timor"],
    brewingCompatibility: {
      handDrip: 6,
      espresso: 8,
      frenchPress: 8,
      coldBrew: 5,
    },
    milkCompatibility: 7,
    seasonalAffinity: ["autumn", "winter"],
  },
];
