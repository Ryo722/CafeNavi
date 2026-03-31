import type { Translations } from "./types";

export const ja: Translations = {
  // common
  "common.appName": "CafeNavi",
  "common.tagline": "あなたにぴったりのコーヒーを見つけよう",
  "common.start": "始める",
  "common.back": "戻る",
  "common.next": "次へ",
  "common.submit": "診断する",
  "common.home": "ホーム",

  // nav
  "nav.home": "Home",
  "nav.questionnaire": "Questionnaire",
  "nav.guide": "Guide",
  "nav.history": "History",

  // home
  "home.beginnerMode": "かんたん診断",
  "home.beginnerDesc":
    "コーヒー初心者におすすめ。10問の質問であなたの好みを分析します。",
  "home.beginnerButton": "10問で診断する",
  "home.beginnerAria": "かんたん診断を始める",
  "home.advancedMode": "くわしく診断",
  "home.advancedDesc":
    "こだわり派に。20問の詳細な質問でより精密な診断結果をお届けします。",
  "home.advancedButton": "20問で診断する",
  "home.advancedAria": "くわしく診断を始める",
  "home.guideLink": "コーヒーガイドを見る",

  // questionnaire
  "questionnaire.beginnerLabel": "かんたん診断",
  "questionnaire.advancedLabel": "くわしく診断",

  // questionnaire slider labels
  "slider.bitternessPreference.left": "苦味が苦手",
  "slider.bitternessPreference.right": "苦味が好き",
  "slider.acidityPreference.left": "酸味が苦手",
  "slider.acidityPreference.right": "酸味が好き",
  "slider.sweetnessPreference.left": "甘さ控えめ",
  "slider.sweetnessPreference.right": "甘さ好き",
  "slider.bodyPreference.left": "軽い口当たり",
  "slider.bodyPreference.right": "重厚な口当たり",
  "slider.fruityPreference.left": "フルーティさ控えめ",
  "slider.fruityPreference.right": "フルーティ好き",
  "slider.milkPreference.left": "ブラック派",
  "slider.milkPreference.right": "ミルクたっぷり派",
  "slider.roastedPreference.left": "焙煎感控えめ",
  "slider.roastedPreference.right": "焙煎感が好き",
  "slider.floralPreference.left": "フローラル控えめ",
  "slider.floralPreference.right": "フローラル好き",
  "slider.nuttyPreference.left": "ナッツ感控えめ",
  "slider.nuttyPreference.right": "ナッツ感好き",
  "slider.chocolatePreference.left": "チョコ感控えめ",
  "slider.chocolatePreference.right": "チョコ感好き",

  // questions
  "question.q-bitterness": "苦味（ビターネス）はどの程度好きですか？",
  "question.q-bitterness.beginner":
    "コーヒーの苦味（ブラックコーヒーのような苦さ）はどの程度好きですか？",
  "question.q-acidity": "酸味（アシディティ）はどの程度好きですか？",
  "question.q-acidity.beginner":
    "コーヒーの酸味（フルーツのようなさわやかさ）はどの程度好きですか？",
  "question.q-sweetness": "甘み（スウィートネス）はどの程度好きですか？",
  "question.q-sweetness.beginner":
    "コーヒーの甘み（はちみつやキャラメルのような甘さ）はどの程度好きですか？",
  "question.q-body": "ボディ（口当たりの厚み）はどの程度好きですか？",
  "question.q-body.beginner":
    "コーヒーの濃さ（さらっと軽い〜どっしり濃厚）はどの程度好きですか？",
  "question.q-fruity": "フルーティな風味はどの程度好きですか？",
  "question.q-fruity.beginner":
    "フルーツのような味わい（ベリーや柑橘の香り）はどの程度好きですか？",
  "question.q-milk": "ミルクを入れて飲むことが多いですか？",
  "question.q-milk.beginner": "コーヒーにミルクを入れて飲むのは好きですか？",
  "question.q-dessert": "好きなお菓子のカテゴリを選んでください（複数可）",
  "question.q-dessert.beginner":
    "好きなお菓子を選んでください。コーヒーとの相性を参考にします（複数可）",
  "question.q-dessert2":
    "他に好きなお菓子カテゴリがあれば選んでください（複数可）",
  "question.q-dessert2.beginner":
    "他にもあれば選んでください（複数可・スキップ可）",
  "question.q-scene": "コーヒーを飲むシーンを選んでください（複数可）",
  "question.q-scene.beginner":
    "どんな時にコーヒーを飲みたいですか？（複数可）",
  "question.q-scene2":
    "他に当てはまるシーンがあれば選んでください（複数可）",
  "question.q-scene2.beginner":
    "他にもあれば選んでください（複数可・スキップ可）",
  "question.q-roasted":
    "ロースト感（焙煎由来の香ばしさ）はどの程度好きですか？",
  "question.q-roasted.beginner":
    "香ばしい焙煎の風味（トーストのような香り）はどの程度好きですか？",
  "question.q-floral":
    "フローラル（花のような香り）はどの程度好きですか？",
  "question.q-floral.beginner":
    "花のような華やかな香り（ジャスミンなど）はどの程度好きですか？",
  "question.q-nutty":
    "ナッティ（ナッツのような風味）はどの程度好きですか？",
  "question.q-nutty.beginner":
    "ナッツの風味（アーモンドやくるみの香り）はどの程度好きですか？",
  "question.q-chocolate": "チョコレートフレーバーはどの程度好きですか？",
  "question.q-chocolate.beginner":
    "チョコレートのような風味（カカオの香り）はどの程度好きですか？",
  "question.q-bitterness-detail":
    "苦味の質について：シャープな苦味とまろやかな苦味、どちらが好みですか？",
  "question.q-bitterness-detail.beginner":
    "苦味の種類：キリッとした苦味と、まろやかな苦味ではどちらが好きですか？",
  "question.q-acidity-detail":
    "酸味の質について：柑橘系の明るい酸味とベリー系のまろやかな酸味、どちらが好みですか？",
  "question.q-acidity-detail.beginner":
    "酸味の種類：レモンのようなすっきりした酸味と、いちごのようなやさしい酸味ではどちらが好きですか？",
  "question.q-sweetness-detail":
    "甘みの質について：フルーツ由来の甘みとキャラメル由来の甘み、どちらが好みですか？",
  "question.q-sweetness-detail.beginner":
    "甘みの種類：フルーツの甘さと、キャラメルの甘さではどちらが好きですか？",
  "question.q-body-detail":
    "ボディの質について：シルキーな質感とクリーミーな質感、どちらが好みですか？",
  "question.q-body-detail.beginner":
    "口当たりの種類：さらさらした舌触りと、クリーミーな舌触りではどちらが好きですか？",
  "question.q-cleanness":
    "クリーンカップ（雑味のなさ）はどの程度重視しますか？",
  "question.q-cleanness.beginner":
    "すっきりとした後味（クセのない飲みやすさ）はどの程度重視しますか？",
  "question.q-complexity":
    "複雑さ（フレーバーの重層感）はどの程度求めますか？",
  "question.q-complexity.beginner":
    "味の奥深さ（いろいろな風味が重なる感じ）はどの程度求めますか？",

  // question options
  "option.chocolate": "チョコレート系",
  "option.chocolate.beginner": "チョコレート",
  "option.nuts": "ナッツ系",
  "option.nuts.beginner": "ナッツ・アーモンド",
  "option.caramel": "キャラメル系",
  "option.caramel.beginner": "キャラメル・プリン",
  "option.citrusFruits": "柑橘フルーツ系",
  "option.citrusFruits.beginner": "レモンやオレンジのお菓子",
  "option.berries": "ベリー系",
  "option.berries.beginner": "いちご・ブルーベリー系",
  "option.wagashi": "和菓子",
  "option.wagashi.beginner": "和菓子（大福・羊羹など）",
  "option.butterPastry": "バター焼き菓子",
  "option.butterPastry.beginner": "クッキー・マドレーヌ",
  "option.spicedSweets": "スパイス系スイーツ",
  "option.spicedSweets.beginner": "シナモンロール・ジンジャークッキー",
  "option.cheese": "チーズ系",
  "option.cheese.beginner": "チーズケーキ・チーズ",
  "option.driedFruits": "ドライフルーツ",
  "option.driedFruits.beginner": "レーズン・ドライマンゴー",
  "option.morningRefresh": "朝のリフレッシュ",
  "option.morningRefresh.beginner": "朝、目を覚ましたい時",
  "option.workFocus": "仕事中の集中タイム",
  "option.workFocus.beginner": "仕事や勉強に集中したい時",
  "option.afterMeal": "食後のひととき",
  "option.afterMeal.beginner": "食事の後にゆっくり",
  "option.withDessert": "お菓子と一緒に",
  "option.withDessert.beginner": "おやつタイムに",
  "option.relax": "リラックスタイム",
  "option.relax.beginner": "のんびりくつろぎたい時",
  "option.strongWithMilk": "ミルクでしっかり飲む",
  "option.strongWithMilk.beginner": "カフェラテやカフェオレとして",

  // result
  "result.title": "診断結果",
  "result.subtitle": "あなたにぴったりのコーヒーが見つかりました",
  "result.saved": "履歴に保存しました",
  "result.fromHistory": "保存済みの診断結果",
  "result.sectionRecommended": "おすすめコーヒー",
  "result.sectionFlavorProfile": "味覚プロファイル",
  "result.sectionBrewing": "おすすめ設定",
  "result.sectionPairing": "相性の良いお菓子",
  "result.sectionAvoid": "避けた方がよい傾向",
  "result.matchScore": "マッチ度",
  "result.you": "あなた",
  "result.retryDiagnosis": "もう一度診断する",
  "result.viewGuide": "コーヒーガイドを見る",
  "result.viewHistory": "診断履歴を見る",
  "result.radarChartAria": "味覚プロファイルのレーダーチャート",

  // brewing recommendation
  "brewing.title": "おすすめ設定",
  "brewing.roastLevel": "焙煎度",
  "brewing.grindSize": "挽き目",
  "brewing.brewingMethod": "抽出方法",
  "brewing.lightRoast": "浅煎り",
  "brewing.darkRoast": "深煎り",

  // pairing
  "pairing.title": "相性の良いお菓子",

  // flavor labels
  "flavor.bitterness": "苦味",
  "flavor.acidity": "酸味",
  "flavor.sweetness": "甘み",
  "flavor.body": "コク",
  "flavor.fruitiness": "フルーティ",
  "flavor.floral": "フローラル",
  "flavor.nuttiness": "ナッツ感",
  "flavor.chocolaty": "チョコ感",
  "flavor.roastiness": "焙煎感",
  "flavor.cleanness": "クリーンさ",

  // roast levels
  "roastLevel.light": "浅煎り",
  "roastLevel.medium-light": "中浅煎り",
  "roastLevel.medium": "中煎り",
  "roastLevel.medium-dark": "中深煎り",
  "roastLevel.dark": "深煎り",

  // grind sizes
  "grindSize.extra-fine": "極細挽き",
  "grindSize.fine": "細挽き",
  "grindSize.medium-fine": "中細挽き",
  "grindSize.medium": "中挽き",
  "grindSize.coarse": "粗挽き",

  // brewing methods
  "brewingMethod.handDrip": "ハンドドリップ",
  "brewingMethod.espresso": "エスプレッソ",
  "brewingMethod.frenchPress": "フレンチプレス",
  "brewingMethod.coldBrew": "水出しコーヒー",

  // guide page
  "guide.title": "コーヒーガイド",
  "guide.subtitle": "コーヒーをもっと楽しむための基礎知識",
  "guide.origins": "産地ごとの特徴",
  "guide.roasting": "焙煎度の違い",
  "guide.grinding": "挽き目の違い",
  "guide.brewing": "抽出方法の違い",

  // guide roast descriptions
  "guide.roastDesc.light":
    "酸味が際立ち、フルーティでフローラルな風味が楽しめます。豆本来の個性が最もよく表れる焙煎度です。",
  "guide.roastDesc.medium-light":
    "酸味と甘みのバランスが良く、フルーツや花の香りを残しつつ、まろやかさも加わります。",
  "guide.roastDesc.medium":
    "酸味・甘み・苦味のバランスが取れた万能型。ナッツやチョコレートの風味が出始めます。",
  "guide.roastDesc.medium-dark":
    "苦味とコクが増し、チョコレートやキャラメルの風味が強くなります。酸味は控えめに。",
  "guide.roastDesc.dark":
    "強い苦味としっかりしたボディが特徴。スモーキーな香りとビターチョコの風味。ミルクとの相性が抜群です。",

  // guide grind descriptions
  "guide.grindDesc.extra-fine":
    "パウダー状。ターキッシュコーヒーなど特殊な抽出方法向け。",
  "guide.grindDesc.fine": "砂糖程度の細かさ。エスプレッソに最適です。",
  "guide.grindDesc.medium-fine":
    "グラニュー糖程度。ハンドドリップ（ペーパーフィルター）に最適です。",
  "guide.grindDesc.medium":
    "ザラメ程度。サイフォンやネルドリップに適しています。",
  "guide.grindDesc.coarse":
    "粗い粒。フレンチプレスや水出しコーヒーに適しています。抽出時間が長い方法向け。",

  // guide brewing descriptions
  "guide.brewingDesc.handDrip":
    "お湯を手動で注いでペーパーフィルターで抽出。クリーンで繊細な味わいが楽しめます。注ぎ方で味を調整できるのが魅力。",
  "guide.brewingDesc.espresso":
    "高圧で短時間抽出。濃厚でリッチな味わいが特徴。カフェラテやカプチーノのベースにも。",
  "guide.brewingDesc.frenchPress":
    "金属フィルターで抽出。コーヒーオイルが残り、ボディのある豊かな味わいに。簡単に淹れられるのも魅力です。",
  "guide.brewingDesc.coldBrew":
    "水で長時間（8-24時間）かけてゆっくり抽出。まろやかで甘みがあり、苦味が少ない仕上がりに。",

  // history
  "history.title": "診断履歴",
  "history.subtitle": "過去の診断結果を確認できます",
  "history.empty": "まだ診断履歴がありません",
  "history.emptyDesc": "コーヒー診断を受けると、結果がここに保存されます",
  "history.startDiagnosis": "診断を始める",
  "history.deleteAll": "すべての履歴を削除",
  "history.delete": "削除",
  "history.confirmDelete": "この診断履歴を削除しますか？",
  "history.confirmDeleteAll":
    "すべての診断履歴を削除しますか？この操作は取り消せません。",
  "history.backHome": "ホームに戻る",
  "history.beginner": "かんたん",
  "history.advanced": "くわしく",
  "history.matchScore": "マッチ度: {{score}}%",

  // footer
  "footer.copyright": "© {{year}} CafeNavi. All rights reserved.",

  // locale toggle
  "locale.switchTo": "Switch to English",

  // coffee profile descriptions
  "coffee.ethiopia-yirgacheffe.description":
    "エチオピア南部イルガチェフェ地区で栽培される、世界で最も華やかなコーヒーのひとつ。ジャスミンやベルガモットのようなフローラルアロマと、ブルーベリーを思わせるフルーティな味わいが特徴です。浅煎りでその繊細な風味が最大限に引き出されます。",
  "coffee.kenya-aa.description":
    "ケニア最高等級のAA規格。カシスやグレープフルーツのような鮮烈な酸味と、ベリーを思わせるジューシーな甘みが魅力です。しっかりとしたボディもあり、余韻が長く続きます。",
  "coffee.guatemala-antigua.description":
    "グアテマラの名産地アンティグア。火山灰土壌が育むリッチなチョコレートフレーバーとナッツの風味が特徴です。酸味と甘み、ボディのバランスが良く、中煎りで幅広い抽出方法に対応できる万能型です。",
  "coffee.colombia-huila.description":
    "コロンビア南部ウィラ県は高品質なスペシャルティコーヒーの産地として名高い地域です。キャラメルのような甘みとナッツの風味が調和し、クリーンで飲みやすい味わいが特徴です。初めてのスペシャルティコーヒーにもおすすめの一杯です。",
  "coffee.brazil-santos.description":
    "世界最大のコーヒー産出国ブラジルの代表銘柄。ナッツとチョコレートの風味が豊かで、酸味が穏やかなため万人に好まれる味わいです。どの抽出方法でも安定した美味しさが楽しめます。",
  "coffee.indonesia-mandheling.description":
    "スマトラ島北部で生産される重厚なコーヒー。どっしりとしたボディとスパイシーな香り、独特のアーシーな風味が特徴です。深煎りにすることでその個性が際立ち、ミルクとの相性も抜群です。",
  "coffee.costarica-tarrazu.description":
    "コスタリカのタラス地区は高品質コーヒーの名産地。非常にクリーンなカップが特徴で、はちみつのような甘みと上品な酸味が調和しています。朝の一杯にぴったりの爽やかな味わいです。",
  "coffee.yemen-mocha.description":
    "コーヒー発祥の地とも言われるイエメンの伝統的なモカ。赤ワインのような複雑な果実味とスパイス感が共存する、他にない個性的な味わいです。ナチュラル製法ならではの奥深いフレーバーが楽しめます。",
  "coffee.tanzania-kilimanjaro.description":
    "キリマンジャロ山麓の高地で栽培されるタンザニアの代表銘柄。柑橘系の明るい酸味とすっきりとしたクリーンな後味が特徴です。紅茶のような上品な飲み口で、軽やかに楽しめます。",
  "coffee.panama-geisha.description":
    "世界最高峰のコーヒー品種として名高いゲイシャ種。ジャスミンやローズのような華やかなフローラルアロマと、トロピカルフルーツを思わせる甘みが圧倒的です。繊細な風味を活かすため、浅煎り・ハンドドリップが最適です。",
  "coffee.hawaii-kona.description":
    "ハワイ島コナ地区の火山性土壌で栽培される希少なコーヒー。まろやかな口当たりとナッツの風味、上品な甘みが特徴です。クリーンで雑味が少なく、誰でも飲みやすい味わいが魅力です。",
  "coffee.jamaica-blue-mountain.description":
    "ジャマイカのブルーマウンテン山脈で栽培される世界三大コーヒーのひとつ。酸味・甘み・苦味・コクのすべてが高い次元で調和した「バランスの最高峰」と称されます。なめらかな口当たりとクリーンな余韻が絶品です。",
  "coffee.nicaragua.description":
    "中米ニカラグアの火山地帯で栽培されるコーヒー。キャラメルとチョコレートの甘い風味が特徴で、ミディアムボディの飲みやすい一杯です。エスプレッソにも適した安定感のある味わいが楽しめます。",
  "coffee.honduras.description":
    "中米の主要コーヒー産地ホンジュラス。キャラメルの甘みとフルーティな酸味がバランスよく調和し、クリーンで飲みやすい味わいです。多様な抽出方法に対応できる万能な一杯です。",
  "coffee.el-salvador.description":
    "中米エルサルバドルの高地で栽培されるコーヒー。チョコレートとはちみつのような甘みが特徴で、クリーミーな口当たりが魅力です。穏やかで優しい味わいは、食後のリラックスタイムに最適です。",
  "coffee.mexico.description":
    "メキシコ南部の山岳地帯で栽培されるコーヒー。ナッツとチョコレートの穏やかな風味が特徴で、軽やかな飲み口が魅力です。クセが少なく、日常使いにぴったりの親しみやすい味わいです。",
  "coffee.peru.description":
    "南米ペルーのアンデス山脈で栽培されるコーヒー。フローラルな香りとシトラスの爽やかな酸味、ミルクチョコレートのような甘みが調和しています。繊細で上品な味わいが楽しめます。",
  "coffee.bolivia.description":
    "南米ボリビアの高地で少量生産される希少なコーヒー。フルーティな果実味とフローラルな香りが複雑に絡み合う、繊細で奥深い味わいが特徴です。浅煎りでその個性が最大限に引き出されます。",
  "coffee.rwanda.description":
    "「千の丘の国」ルワンダの高地で栽培されるコーヒー。ベリーのようなジューシーな果実味とフローラルな香りが際立つ華やかな味わいです。アフリカンコーヒーらしい鮮やかな酸味が魅力です。",
  "coffee.burundi.description":
    "東アフリカ・ブルンジの高地で栽培されるコーヒー。ベリーの果実味とシトラスの爽やかな酸味、紅茶のような上品な風味が特徴です。軽やかで清涼感のある味わいが楽しめます。",
  "coffee.india-malabar.description":
    "インド・マラバール海岸のモンスーン気候で独自の精製を受けるコーヒー。スパイシーで重厚なボディと低い酸味が特徴です。独特の風味はエスプレッソブレンドにもよく使われます。",
  "coffee.myanmar.description":
    "東南アジア・ミャンマーのシャン高原で栽培される新興のコーヒー産地。ナッツとチョコレートの風味にハニーのような甘みが加わる、優しい味わいが特徴です。注目度が高まっている産地です。",
  "coffee.china-yunnan.description":
    "中国雲南省の高地で栽培されるアジアのスペシャルティコーヒー。フルーティな果実味とフローラルな香り、紅茶や中国茶を思わせる独特の繊細さが特徴です。近年急速に品質が向上しています。",
  "coffee.papua-new-guinea.description":
    "南太平洋の豊かな自然の中で栽培されるパプアニューギニアのコーヒー。トロピカルフルーツとスパイスの野性的な風味が特徴で、ワイルドな個性が楽しめます。力強いボディと複雑な味わいが魅力です。",
  "coffee.east-timor.description":
    "東南アジアの小国・東ティモールで有機栽培されるコーヒー。チョコレートの風味とアーシーな深み、ハーブのアクセントが特徴です。しっかりとしたボディで、中深煎りにすることで個性が引き立ちます。",

  // coffee names (ja)
  "coffee.ethiopia-yirgacheffe.name": "エチオピア イルガチェフェ",
  "coffee.kenya-aa.name": "ケニア AA",
  "coffee.guatemala-antigua.name": "グアテマラ アンティグア",
  "coffee.colombia-huila.name": "コロンビア ウィラ",
  "coffee.brazil-santos.name": "ブラジル サントス",
  "coffee.indonesia-mandheling.name": "インドネシア マンデリン",
  "coffee.costarica-tarrazu.name": "コスタリカ タラス",
  "coffee.yemen-mocha.name": "イエメン モカ",
  "coffee.tanzania-kilimanjaro.name": "タンザニア キリマンジャロ",
  "coffee.panama-geisha.name": "パナマ ゲイシャ",
  "coffee.hawaii-kona.name": "ハワイ コナ",
  "coffee.jamaica-blue-mountain.name": "ジャマイカ ブルーマウンテン",
  "coffee.nicaragua.name": "ニカラグア",
  "coffee.honduras.name": "ホンジュラス",
  "coffee.el-salvador.name": "エルサルバドル",
  "coffee.mexico.name": "メキシコ",
  "coffee.peru.name": "ペルー",
  "coffee.bolivia.name": "ボリビア",
  "coffee.rwanda.name": "ルワンダ",
  "coffee.burundi.name": "ブルンジ",
  "coffee.india-malabar.name": "インド マラバール",
  "coffee.myanmar.name": "ミャンマー",
  "coffee.china-yunnan.name": "中国 雲南",
  "coffee.papua-new-guinea.name": "パプアニューギニア",
  "coffee.east-timor.name": "東ティモール",

  // coffee notes
  "note.ジャスミン": "ジャスミン",
  "note.ベルガモット": "ベルガモット",
  "note.ブルーベリー": "ブルーベリー",
  "note.レモン": "レモン",
  "note.ピーチ": "ピーチ",
  "note.カシス": "カシス",
  "note.グレープフルーツ": "グレープフルーツ",
  "note.トマト": "トマト",
  "note.ブラックベリー": "ブラックベリー",
  "note.赤ワイン": "赤ワイン",
  "note.ミルクチョコレート": "ミルクチョコレート",
  "note.アーモンド": "アーモンド",
  "note.キャラメル": "キャラメル",
  "note.オレンジピール": "オレンジピール",
  "note.スパイス": "スパイス",
  "note.ヘーゼルナッツ": "ヘーゼルナッツ",
  "note.赤リンゴ": "赤リンゴ",
  "note.ブラウンシュガー": "ブラウンシュガー",
  "note.ミルクチョコ": "ミルクチョコ",
  "note.ピーナッツ": "ピーナッツ",
  "note.ダークチョコレート": "ダークチョコレート",
  "note.トースト": "トースト",
  "note.ほのかなスパイス": "ほのかなスパイス",
  "note.ダークチョコ": "ダークチョコ",
  "note.ハーブ": "ハーブ",
  "note.アーシー": "アーシー",
  "note.シダーウッド": "シダーウッド",
  "note.ハニー": "ハニー",
  "note.青リンゴ": "青リンゴ",
  "note.バニラ": "バニラ",
  "note.クリーン": "クリーン",
  "note.ドライフルーツ": "ドライフルーツ",
  "note.シナモン": "シナモン",
  "note.カカオ": "カカオ",
  "note.レーズン": "レーズン",
  "note.オレンジ": "オレンジ",
  "note.レモングラス": "レモングラス",
  "note.紅茶": "紅茶",
  "note.白桃": "白桃",
  "note.はちみつ": "はちみつ",
  "note.ローズ": "ローズ",
  "note.マンゴー": "マンゴー",
  "note.ライチ": "ライチ",
  "note.アールグレイ": "アールグレイ",
  "note.マカダミアナッツ": "マカダミアナッツ",
  "note.バター": "バター",
  "note.ほのかなシトラス": "ほのかなシトラス",
  "note.フローラル": "フローラル",
  "note.ナッツ": "ナッツ",
  "note.クリーミー": "クリーミー",
  "note.スイートシトラス": "スイートシトラス",
  "note.ほのかなベリー": "ほのかなベリー",
  "note.ベリー": "ベリー",
  "note.マスカット": "マスカット",
  "note.ラズベリー": "ラズベリー",
  "note.ジューシー": "ジューシー",
  "note.タバコ": "タバコ",
  "note.モルト": "モルト",
  "note.軽やかなシトラス": "軽やかなシトラス",
  "note.プラム": "プラム",
  "note.ジャスミン茶": "ジャスミン茶",
  "note.トロピカルフルーツ": "トロピカルフルーツ",
  "note.ワイルドベリー": "ワイルドベリー",

  // pairing items
  "pairing.レモンタルト": "レモンタルト",
  "pairing.マカロン": "マカロン",
  "pairing.フルーツゼリー": "フルーツゼリー",
  "pairing.ベリーのパンナコッタ": "ベリーのパンナコッタ",
  "pairing.ベリータルト": "ベリータルト",
  "pairing.チーズケーキ": "チーズケーキ",
  "pairing.マドレーヌ": "マドレーヌ",
  "pairing.フルーツケーキ": "フルーツケーキ",
  "pairing.チョコレートケーキ": "チョコレートケーキ",
  "pairing.アーモンドクッキー": "アーモンドクッキー",
  "pairing.カヌレ": "カヌレ",
  "pairing.くるみのタルト": "くるみのタルト",
  "pairing.キャラメルプリン": "キャラメルプリン",
  "pairing.ナッツブラウニー": "ナッツブラウニー",
  "pairing.バナナケーキ": "バナナケーキ",
  "pairing.どら焼き": "どら焼き",
  "pairing.チョコレート": "チョコレート",
  "pairing.ナッツクッキー": "ナッツクッキー",
  "pairing.カステラ": "カステラ",
  "pairing.シュークリーム": "シュークリーム",
  "pairing.ガトーショコラ": "ガトーショコラ",
  "pairing.羊羹": "羊羹",
  "pairing.チーズ": "チーズ",
  "pairing.ビターチョコレート": "ビターチョコレート",
  "pairing.フルーツタルト": "フルーツタルト",
  "pairing.バニラアイス": "バニラアイス",
  "pairing.スコーン": "スコーン",
  "pairing.パウンドケーキ": "パウンドケーキ",
  "pairing.ドライフルーツ": "ドライフルーツ",
  "pairing.スパイスクッキー": "スパイスクッキー",
  "pairing.赤ワインチョコ": "赤ワインチョコ",
  "pairing.デーツ": "デーツ",
  "pairing.レモンケーキ": "レモンケーキ",
  "pairing.柑橘系ゼリー": "柑橘系ゼリー",
  "pairing.クレープ": "クレープ",
  "pairing.ヨーグルトパフェ": "ヨーグルトパフェ",
  "pairing.ローズゼリー": "ローズゼリー",
  "pairing.白桃のコンポート": "白桃のコンポート",
  "pairing.上生菓子": "上生菓子",
  "pairing.ブラウニー": "ブラウニー",
  "pairing.おはぎ": "おはぎ",
  "pairing.ティラミス": "ティラミス",
  "pairing.くるみ餅": "くるみ餅",
  "pairing.マカダミアナッツクッキー": "マカダミアナッツクッキー",
  "pairing.フィナンシェ": "フィナンシェ",

  // recommendation reasons
  "reason.bitterMatch":
    "しっかりとした苦味がお好みなので、苦味のある{{name}}がおすすめです",
  "reason.bitterLow": "苦味控えめがお好みに合う、飲みやすい味わいです",
  "reason.acidityHigh": "フルーツのような明るい酸味が楽しめます",
  "reason.acidityLow": "酸味控えめで飲みやすい味わいです",
  "reason.fruityMatch": "フルーティな風味がお好みに合います",
  "reason.chocoMatch":
    "チョコレート系のお菓子がお好きなので、チョコレート感のある{{name}}がおすすめです",
  "reason.nutMatch":
    "ナッツ系のお菓子がお好きなので、ナッツの風味がある{{name}}が合います",
  "reason.fruitDessertMatch":
    "フルーツ系のお菓子がお好きなので、フルーティな味わいが楽しめます",
  "reason.wagashiMatch":
    "和菓子がお好きなので、クリーンな味わいとの相性が良いです",
  "reason.morningScene":
    "朝すっきり飲みたいシーンには、クリーンな味わいが最適です",
  "reason.workScene":
    "仕事中の集中タイムには、しっかりしたボディが頼りになります",
  "reason.relaxScene":
    "リラックスタイムには、甘みのある穏やかな味わいがぴったりです",
  "reason.milkMatch":
    "ミルクを入れても負けない、しっかりとしたボディがあります",
  "reason.floralMatch": "華やかなフローラルアロマが楽しめます",
  "reason.fallback": "お好みの味覚プロファイルとの相性が良い一杯です",

  // avoid notes
  "avoid.deepRoast":
    "深煎りの強い苦味は苦手かもしれません。浅煎り〜中煎りがおすすめです",
  "avoid.lightRoastAfrica":
    "酸味の強い浅煎りアフリカ産は合わない可能性があります",
  "avoid.heavyBody":
    "重厚なボディのコーヒー（マンデリンなど）は重く感じるかもしれません",
  "avoid.fruityFloral":
    "華やかでフルーティな浅煎りコーヒーは好みに合わない可能性があります",
  "avoid.strongRoast":
    "焙煎感の強い深煎りコーヒーは避けた方が良いでしょう",

  // compare
  "compare.title": "診断結果を比較",
  "compare.selectTwo": "2件の診断結果を選んでください",
  "compare.compare": "比較する",
  "compare.reselect": "選び直す",
  "compare.diagnosis1": "診断1",
  "compare.diagnosis2": "診断2",
  "compare.noHistory": "比較するには2件以上の診断が必要です",
  "compare.differences": "違いのある項目",
  "compare.same": "同じ",
  "compare.date": "診断日時",
  "compare.mode": "モード",
  "compare.topCoffee": "おすすめ1位",
  "compare.matchScore": "マッチ度",
  "compare.flavorProfile": "味覚プロファイル",
  "compare.roastLevel": "推薦焙煎度",
  "compare.grindSize": "推薦挽き目",
  "compare.brewingMethod": "推薦抽出方法",
  "compare.pairings": "相性の良いお菓子",
  "compare.selected": "{{count}}件選択中",
  "compare.backHome": "ホームに戻る",
  "compare.flavorScores": "味覚スコア詳細",
  "compare.axis": "味覚軸",
  "compare.change": "変化",
  "compare.increase": "↑",
  "compare.decrease": "↓",
  "compare.noChange": "→",
  "compare.significantChange": "大きな変化",
  "history.selectMode": "比較する診断を選択",
  "history.cancelSelect": "選択をキャンセル",
  "history.selectedCount": "{{count}}件選択中",
  "history.compareSelected": "選択した2件を比較",
  "nav.compare": "比較",
  "history.compare": "比較する",

  // brewing guide
  "brewingGuide.title": "淹れ方ガイド",
  "brewingGuide.subtitle": "焙煎度に合った美味しい淹れ方をマスターしよう",
  "brewingGuide.temperature": "温度",
  "brewingGuide.ratio": "豆と湯の比率",
  "brewingGuide.totalTime": "合計時間",
  "brewingGuide.steps": "手順",
  "brewingGuide.tips": "コツ",
  "brewingGuide.watchVideo": "YouTubeで動画を見る",
  "brewingGuide.filterAll": "すべて",
  "brewingGuide.noGuides": "この焙煎度のガイドはまだありません",
  "result.viewBrewingGuide": "この焙煎度の淹れ方を見る",

  // nav stats
  "nav.stats": "統計",

  // stats
  "stats.title": "診断統計",
  "stats.subtitle": "あなたの診断傾向を可視化",
  "stats.empty": "まだ診断データがありません",
  "stats.emptyDesc": "診断してみましょう！",
  "stats.startDiagnosis": "診断する",
  "stats.backHome": "ホームに戻る",
  "stats.totalDiagnoses": "総診断回数",
  "stats.topCoffee": "最多推薦コーヒー",
  "stats.favoriteRoast": "好みの焙煎度",
  "stats.averageProfile": "平均味覚プロファイル",
  "stats.topCoffees": "よく推薦されるコーヒー TOP5",
  "stats.roastDistribution": "焙煎度の分布",
  "stats.brewingDistribution": "抽出方法の分布",
  "stats.flavorTrend": "味覚の変遷",
  "stats.viewHistory": "診断履歴を見る",
  "stats.tasteType": "あなたの味覚タイプ",
  "stats.tasteTypeDistribution": "味覚タイプの分布",

  // taste type
  "tasteType.title": "あなたの味覚タイプ",
  "tasteType.secondary": "サブタイプ",
  "tasteType.fruity": "フルーティ派",
  "tasteType.bitter": "ビター派",
  "tasteType.choco-nut": "チョコ&ナッツ派",
  "tasteType.floral": "フローラル派",
  "tasteType.heavy-body": "ヘビーボディ派",
  "tasteType.sweet": "スイート派",
  "tasteType.balance": "バランス派",
  "tasteType.clean": "クリーン派",
  "tasteType.fruity.desc": "フルーツのような爽やかさを楽しむタイプ",
  "tasteType.bitter.desc": "深い苦味とコクを愛するタイプ",
  "tasteType.choco-nut.desc": "チョコやナッツの風味が好きなタイプ",
  "tasteType.floral.desc": "繊細な花の香りを楽しむタイプ",
  "tasteType.heavy-body.desc": "しっかりとした飲みごたえを求めるタイプ",
  "tasteType.sweet.desc": "甘みのあるコーヒーを好むタイプ",
  "tasteType.balance.desc": "バランスの良い万人向けタイプ",
  "tasteType.clean.desc": "雑味のないクリアな味わいを好むタイプ",

  // seasonal
  "seasonal.title": "季節のおすすめ",
  "seasonal.recommendedCoffees": "おすすめコーヒー",
  "seasonal.brewingMethods": "おすすめ抽出方法",
  "seasonal.pairings": "季節のペアリング",
  "seasonal.moreLink": "この季節のコーヒーをもっと見る",

  // serendipity (adventure slot)
  "result.serendipityLabel": "\uD83C\uDFB2 いつもと違う一杯",

  // cold start
  "coldStart.title": "初めての方におすすめ",
  "coldStart.description": "コーヒー初心者の方にも飲みやすい、バランスの良いコーヒーをご紹介します。",
  "coldStart.fallbackReason": "初めての方にもおすすめのバランスの良いコーヒーです",

  // seasonal bonus reason
  "reason.seasonalBonus": "この季節にぴったりの味わいです",

  // A/B test strategy
  "strategy.label": "推薦エンジン",
  "strategy.v1": "v1（旧）",
  "strategy.v2": "v2（新）",

  // share
  "share.title": "結果をシェアしよう",
  "share.xButton": "Xでシェア",
  "share.lineButton": "LINEでシェア",
  "share.copyLink": "リンクをコピー",
  "share.copied": "コピーしました",
  "share.nativeShare": "共有",
  "share.saveImage": "📷 結果を画像で保存",
  "share.saving": "保存中...",
  "share.saved": "保存しました！",
  "share.saveFailed": "保存に失敗しました",

  // feedback
  "feedback.surveyButton": "📝 アンケートに回答する",
  "feedback.surveyNote": "1-2分で完了します",

  // date format
  "date.format": "{{y}}年{{m}}月{{d}}日 {{h}}:{{min}}",
};
