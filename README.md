# ☕ CafeNavi - コーヒー診断アプリ

> あなたにぴったりのコーヒーを見つけよう / Find your perfect coffee

![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.x-646cff?logo=vite)
![Tests](https://img.shields.io/badge/tests-68%20unit%20%2B%2014%20e2e-green)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌐 デモ

**👉 [CafeNavi を試す](https://ryo722.github.io/CafeNavi/)**

味の好みやお菓子の好みに関する質問に答えるだけで、25種類のコーヒー豆からあなたにぴったりの1杯を提案します。初心者モード（10問）と中級者モード（20問）を切り替えて、自分に合った深さで診断できます。

---

## ✨ 特徴

- 🎯 **パーソナライズ診断** - 味覚プロファイルに基づくコサイン類似度マッチング
- 🔄 **逆引き豆診断** - コーヒー豆からフレーバーを比較
- 📊 **統計ダッシュボード** - 診断履歴のトレンド分析・味覚タイプ分類
- 📖 **コーヒーガイド** - 抽出方法・焙煎度の解説
- 🌍 **多言語対応** - 日本語 / English
- 🎨 **ダーク/ライトテーマ** - システム設定に追従
- ♿ **アクセシビリティ** - ARIA ラベル・キーボード操作対応
- ⚡ **高速** - Lazy Loading・コード分割・Vite によるビルド最適化

---

## 🎯 主な機能

### コーヒー診断

好みの苦味・酸味・甘み・ボディ・フルーティさなどをスライダーで回答。お菓子の好みや飲用シーンも考慮して、25種のコーヒー豆からベストマッチを提案します。

- **初心者モード**: 10問（わかりやすい表現で質問）
- **中級者モード**: 20問（フローラル・ナッティ・チョコレート感など詳細軸を追加）

### 豆の比較（逆引き）

複数のコーヒー豆をレーダーチャートで並べて比較。フレーバースコアの違いを視覚的に確認できます。

### 統計ダッシュボード

- 診断回数・味覚傾向のトレンドチャート
- 8つの味覚タイプ分類（フルーティ派、ビター派、チョコナッツ派、フローラル派、ヘビーボディ派、スイート派、クリーン派、バランス派）
- 棒グラフ・折れ線グラフによる可視化

### コーヒーガイド

ハンドドリップ・コールドブリューなどの抽出方法ガイドと、焙煎度別の特徴解説。季節のおすすめも掲載。

---

## 🛠 技術スタック

| カテゴリ | 技術 |
|---|---|
| **フレームワーク** | React 19 |
| **言語** | TypeScript 5.9 |
| **ビルドツール** | Vite 8 |
| **スタイリング** | Tailwind CSS 4 |
| **ルーティング** | React Router v7（Hash Router） |
| **テスト（Unit）** | Vitest + Testing Library |
| **テスト（E2E）** | Playwright |
| **リンター** | ESLint 9 |
| **フォーマッター** | Prettier |
| **ホスティング** | GitHub Pages |

---

## 📂 プロジェクト構成

```
src/
├── app/                    # アプリ設定（レイアウト、ルーター）
├── components/
│   ├── charts/             # レーダーチャート、棒グラフ、トレンドチャート
│   ├── result/             # 診断結果カード、ペアリング、抽出推奨
│   ├── taste/              # スライダー、デザートセレクター、シーンセレクター
│   └── ui/                 # 共通UI（Button, Card, Header, Footer, Loading...）
├── data/
│   ├── coffeeProfiles.ts   # 25種のコーヒー豆プロファイル
│   ├── brewingGuides.ts    # 抽出方法ガイド
│   ├── flavorMappings.ts   # フレーバーマッピング
│   ├── pairingData.ts      # ペアリングデータ
│   ├── roastProfiles.ts    # 焙煎度プロファイル
│   └── seasonalRecommendations.ts  # 季節のおすすめ
├── features/
│   └── questionnaire/      # 診断質問（20問）
├── lib/
│   ├── i18n/               # 国際化（日本語・英語）
│   ├── scoring.ts          # スコアリングアルゴリズム
│   ├── similarity.ts       # コサイン類似度計算
│   ├── explanation.ts      # 診断結果の説明文生成
│   ├── stats.ts            # 統計計算
│   ├── storage.ts          # LocalStorage 永続化
│   └── tasteType.ts        # 味覚タイプ分類（8タイプ）
├── pages/                  # 7ページ（Home, Questionnaire, Result, Guide, History, Compare, Stats）
├── styles/                 # グローバルCSS
└── types/                  # 型定義（coffee, questionnaire）

e2e/                        # Playwright E2Eテスト（4ファイル）
```

---

## 🚀 セットアップ

### 前提条件

- **Node.js** >= 18
- **npm** >= 9

### インストール

```bash
git clone https://github.com/Ryo722/CafeNavi.git
cd CafeNavi
npm install
```

### 開発サーバー

```bash
npm run dev
```

http://localhost:5173 でアプリが起動します。

### ビルド

```bash
npm run build
```

`dist/` ディレクトリにプロダクションビルドが出力されます。

### プレビュー

```bash
npm run preview
```

---

## 🧪 テスト

### ユニットテスト（Vitest）

```bash
# 一括実行
npm run test

# ウォッチモード
npm run test:watch
```

**68テスト** / 8テストファイル - スコアリング、類似度計算、説明文生成、ストレージ、統計、味覚タイプ分類、コーヒープロファイル検証、質問データ検証をカバー。

### E2Eテスト（Playwright）

```bash
# ヘッドレス実行
npm run e2e

# ブラウザ表示あり
npm run e2e:headed

# UIモード
npm run e2e:ui
```

**14テスト** / 4テストファイル - 診断フロー、ナビゲーション、コーヒーガイド、豆診断（逆引き）の統合テスト。

---

## 📊 データ

| 項目 | 数量 |
|---|---|
| コーヒー豆プロファイル | 25種 |
| 産地（オリジン） | 25ヶ国（エチオピア、ケニア、コロンビア、ブラジル、パナマ、イエメンなど） |
| 焙煎度 | 5段階（light / medium-light / medium / medium-dark / dark） |
| 診断質問数 | 20問（初心者モード: 10問 / 中級者モード: 20問） |
| フレーバー評価軸 | 10軸（苦味、酸味、甘み、ボディ、フルーティ、フローラル、ナッティ、チョコレート、ロースト、クリーンネス） |
| 味覚タイプ | 8タイプ |

---

## 🌍 対応言語

| 言語 | ステータス |
|---|---|
| 🇯🇵 日本語 | ネイティブ対応 |
| 🇺🇸 English | 対応済み |

アプリ内のロケール切替ボタンで即時切り替え可能です。

---

## 🎨 テーマ

- ☀️ **ライトモード**
- 🌙 **ダークモード**
- 🖥️ **システム設定に追従**

Tailwind CSS のダークモードクラスを使用し、システムのカラースキーム設定に自動で追従します。

---

## ♿ アクセシビリティ

- ARIA ラベル・ロールの適切な設定
- キーボード操作対応
- スクリーンリーダー対応
- フォーカス管理
- 十分なカラーコントラスト

---

## 📄 ライセンス

MIT License

---

## 🙏 謝辞

- コーヒーの風味プロファイルデータは、SCA（Specialty Coffee Association）の評価基準を参考に作成
- UIデザインは Tailwind CSS のユーティリティクラスを活用

---

<p align="center">
  Made with ☕ and ❤️
</p>
