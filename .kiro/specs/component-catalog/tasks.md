# Implementation Plan: component-catalog

- [ ] 1. カタログデータ定義と基本ルートの作成
  - [ ] 1.1 `src/features/catalog/data/catalog-items.ts` を作成し、`CatalogItem` 型を定義する。`src/components/ui/` に実装済みの共通コンポーネント（Button, Card, Badge 等）のデモ定義を記述する。 *(Observable: `CatalogItem[]` 型の配列が export され、`tsc --noEmit` が通過すること。)*
  - [ ] 1.2 `src/routes/catalog.tsx` を作成し、`CatalogView` コンポーネントを描画する `/catalog` ルートを定義する。 *(Observable: `/catalog` にアクセスした際にページが表示されること。)*
  - _Requirements: Requirement 1_
  - _Boundary: src/features/catalog/data/catalog-items.ts, src/routes/catalog.tsx_

- [ ] 2. DemoBlock と ComponentSection の実装
  - [ ] 2.1 `DemoBlock.tsx` を `src/features/catalog/components/` に作成する。1コンポーネントに対して、全バリアントをグリッド形式でレンダリングし、その下に読み取り専用のコードスニペット表示エリアを配置する。 *(Observable: Button の Primary / Secondary / Ghost バリアントが並んで表示され、対応するコードスニペットがその下に表示されること。)*
  - [ ] 2.2 `ComponentSection.tsx` を作成し、`catalog-items.ts` のデータを元に各コンポーネントの `DemoBlock` を一覧表示するセクションを実装する。 *(Observable: 定義した全コンポーネントのデモが `/catalog` 上に一覧で表示されること。)*
  - _Requirements: Requirement 1.1, 1.2, 1.3_
  - _Boundary: src/features/catalog/components/_

- [ ] 3. TokenSection（デザイントークン）の実装
  - [ ] 3.1 `TokenSection.tsx` を作成する。Tailwind v4 で定義したカラーパレット（CSS Variables）を色見本と変数名と共に表示し、タイポグラフィスケールをサンプルテキストで示すセクションを実装する。SSG 対応のため `typeof document !== "undefined"` または `ClientOnly` ラッパーで `getComputedStyle` の使用を guard する。 *(Observable: `/catalog` のトークンセクションにカラー見本と変数名が表示され、ダークモード切り替え時に連動して変化すること。)*
  - _Requirements: Requirement 2_
  - _Boundary: src/features/catalog/components/TokenSection.tsx_

- [ ] 4. CatalogView の統合とサイドバーナビゲーション
  - [ ] 4.1 `CatalogView.tsx` を作成し、`ComponentSection` と `TokenSection` を統合する。サイドバー（または見出しナビ）を設けてセクション間のスムーズなスクロールナビゲーションを実装する。画面全体がレスポンシブに動作すること。 *(Observable: デスクトップ・モバイル双方でカタログ画面が崩れずに表示され、ナビリンクで各セクションにジャンプできること。)*
  - _Requirements: Requirement 1.1, 2.2_
  - _Boundary: src/features/catalog/components/CatalogView.tsx_
