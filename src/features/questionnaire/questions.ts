import type { Question } from "../../types/questionnaire";

export const questions: Question[] = [
  // ===== 基本質問（初心者・中級者共通: 10問） =====

  // 1. 苦味
  {
    id: "q-bitterness",
    text: "苦味（ビターネス）はどの程度好きですか？",
    textBeginner:
      "コーヒーの苦味（ブラックコーヒーのような苦さ）はどの程度好きですか？",
    type: "slider",
    field: "bitternessPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "both",
  },
  // 2. 酸味
  {
    id: "q-acidity",
    text: "酸味（アシディティ）はどの程度好きですか？",
    textBeginner:
      "コーヒーの酸味（フルーツのようなさわやかさ）はどの程度好きですか？",
    type: "slider",
    field: "acidityPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "both",
  },
  // 3. 甘み
  {
    id: "q-sweetness",
    text: "甘み（スウィートネス）はどの程度好きですか？",
    textBeginner:
      "コーヒーの甘み（はちみつやキャラメルのような甘さ）はどの程度好きですか？",
    type: "slider",
    field: "sweetnessPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "both",
  },
  // 4. ボディ
  {
    id: "q-body",
    text: "ボディ（口当たりの厚み）はどの程度好きですか？",
    textBeginner:
      "コーヒーの濃さ（さらっと軽い〜どっしり濃厚）はどの程度好きですか？",
    type: "slider",
    field: "bodyPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "both",
  },
  // 5. フルーティ
  {
    id: "q-fruity",
    text: "フルーティな風味はどの程度好きですか？",
    textBeginner:
      "フルーツのような味わい（ベリーや柑橘の香り）はどの程度好きですか？",
    type: "slider",
    field: "fruityPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "both",
  },
  // 6. ミルク
  {
    id: "q-milk",
    text: "ミルクを入れて飲むことが多いですか？",
    textBeginner: "コーヒーにミルクを入れて飲むのは好きですか？",
    type: "slider",
    field: "milkPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "both",
  },
  // 7. お菓子の好み（1）
  {
    id: "q-dessert",
    text: "好きなお菓子のカテゴリを選んでください（複数可）",
    textBeginner:
      "好きなお菓子を選んでください。コーヒーとの相性を参考にします（複数可）",
    type: "multiSelect",
    field: "dessertPreference",
    options: [
      {
        value: "chocolate",
        label: "チョコレート系",
        labelBeginner: "チョコレート",
      },
      {
        value: "nuts",
        label: "ナッツ系",
        labelBeginner: "ナッツ・アーモンド",
      },
      {
        value: "caramel",
        label: "キャラメル系",
        labelBeginner: "キャラメル・プリン",
      },
      {
        value: "citrusFruits",
        label: "柑橘フルーツ系",
        labelBeginner: "レモンやオレンジのお菓子",
      },
      {
        value: "berries",
        label: "ベリー系",
        labelBeginner: "いちご・ブルーベリー系",
      },
      {
        value: "wagashi",
        label: "和菓子",
        labelBeginner: "和菓子（大福・羊羹など）",
      },
      {
        value: "butterPastry",
        label: "バター焼き菓子",
        labelBeginner: "クッキー・マドレーヌ",
      },
    ],
    mode: "both",
  },
  // 8. お菓子の好み（2）
  {
    id: "q-dessert2",
    text: "他に好きなお菓子カテゴリがあれば選んでください（複数可）",
    textBeginner:
      "他にもあれば選んでください（複数可・スキップ可）",
    type: "multiSelect",
    field: "dessertPreference",
    options: [
      {
        value: "spicedSweets",
        label: "スパイス系スイーツ",
        labelBeginner: "シナモンロール・ジンジャークッキー",
      },
      {
        value: "cheese",
        label: "チーズ系",
        labelBeginner: "チーズケーキ・チーズ",
      },
      {
        value: "driedFruits",
        label: "ドライフルーツ",
        labelBeginner: "レーズン・ドライマンゴー",
      },
    ],
    mode: "both",
  },
  // 9. 飲用シーン（1）
  {
    id: "q-scene",
    text: "コーヒーを飲むシーンを選んでください（複数可）",
    textBeginner:
      "どんな時にコーヒーを飲みたいですか？（複数可）",
    type: "multiSelect",
    field: "drinkScenes",
    options: [
      {
        value: "morningRefresh",
        label: "朝のリフレッシュ",
        labelBeginner: "朝、目を覚ましたい時",
      },
      {
        value: "workFocus",
        label: "仕事中の集中タイム",
        labelBeginner: "仕事や勉強に集中したい時",
      },
      {
        value: "afterMeal",
        label: "食後のひととき",
        labelBeginner: "食事の後にゆっくり",
      },
    ],
    mode: "both",
  },
  // 10. 飲用シーン（2）
  {
    id: "q-scene2",
    text: "他に当てはまるシーンがあれば選んでください（複数可）",
    textBeginner:
      "他にもあれば選んでください（複数可・スキップ可）",
    type: "multiSelect",
    field: "drinkScenes",
    options: [
      {
        value: "withDessert",
        label: "お菓子と一緒に",
        labelBeginner: "おやつタイムに",
      },
      {
        value: "relax",
        label: "リラックスタイム",
        labelBeginner: "のんびりくつろぎたい時",
      },
      {
        value: "strongWithMilk",
        label: "ミルクでしっかり飲む",
        labelBeginner: "カフェラテやカフェオレとして",
      },
    ],
    mode: "both",
  },

  // ===== 中級者モード追加質問（10問） =====

  // 11. 焙煎感
  {
    id: "q-roasted",
    text: "ロースト感（焙煎由来の香ばしさ）はどの程度好きですか？",
    textBeginner:
      "香ばしい焙煎の風味（トーストのような香り）はどの程度好きですか？",
    type: "slider",
    field: "roastedPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  // 12. フローラル
  {
    id: "q-floral",
    text: "フローラル（花のような香り）はどの程度好きですか？",
    textBeginner:
      "花のような華やかな香り（ジャスミンなど）はどの程度好きですか？",
    type: "slider",
    field: "floralPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  // 13. ナッティ
  {
    id: "q-nutty",
    text: "ナッティ（ナッツのような風味）はどの程度好きですか？",
    textBeginner:
      "ナッツの風味（アーモンドやくるみの香り）はどの程度好きですか？",
    type: "slider",
    field: "nuttyPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  // 14. チョコレート感
  {
    id: "q-chocolate",
    text: "チョコレートフレーバーはどの程度好きですか？",
    textBeginner:
      "チョコレートのような風味（カカオの香り）はどの程度好きですか？",
    type: "slider",
    field: "chocolatePreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  // 15-20: 各軸の詳細な好みを深掘り（スライダー）
  {
    id: "q-bitterness-detail",
    text: "苦味の質について：シャープな苦味とまろやかな苦味、どちらが好みですか？",
    textBeginner:
      "苦味の種類：キリッとした苦味と、まろやかな苦味ではどちらが好きですか？",
    type: "slider",
    field: "bitternessPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  {
    id: "q-acidity-detail",
    text: "酸味の質について：柑橘系の明るい酸味とベリー系のまろやかな酸味、どちらが好みですか？",
    textBeginner:
      "酸味の種類：レモンのようなすっきりした酸味と、いちごのようなやさしい酸味ではどちらが好きですか？",
    type: "slider",
    field: "acidityPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  {
    id: "q-sweetness-detail",
    text: "甘みの質について：フルーツ由来の甘みとキャラメル由来の甘み、どちらが好みですか？",
    textBeginner:
      "甘みの種類：フルーツの甘さと、キャラメルの甘さではどちらが好きですか？",
    type: "slider",
    field: "sweetnessPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  {
    id: "q-body-detail",
    text: "ボディの質について：シルキーな質感とクリーミーな質感、どちらが好みですか？",
    textBeginner:
      "口当たりの種類：さらさらした舌触りと、クリーミーな舌触りではどちらが好きですか？",
    type: "slider",
    field: "bodyPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  {
    id: "q-cleanness",
    text: "クリーンカップ（雑味のなさ）はどの程度重視しますか？",
    textBeginner:
      "すっきりとした後味（クセのない飲みやすさ）はどの程度重視しますか？",
    type: "slider",
    field: "sweetnessPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
  {
    id: "q-complexity",
    text: "複雑さ（フレーバーの重層感）はどの程度求めますか？",
    textBeginner:
      "味の奥深さ（いろいろな風味が重なる感じ）はどの程度求めますか？",
    type: "slider",
    field: "fruityPreference",
    min: 1,
    max: 5,
    step: 1,
    mode: "advanced",
  },
];

/** 初心者モード用の質問を取得（10問） */
export function getBeginnerQuestions(): Question[] {
  return questions.filter((q) => q.mode === "both" || q.mode === "beginner");
}

/** 中級者モード用の質問を取得（全20問） */
export function getAdvancedQuestions(): Question[] {
  return questions.filter((q) => q.mode === "both" || q.mode === "advanced");
}
