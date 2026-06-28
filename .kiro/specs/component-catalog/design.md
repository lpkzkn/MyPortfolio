# Design Document: component-catalog

## Overview
本ドキュメントは、ポートフォリオ内の `/catalog` ページに自作デザインシステムのコンポーネントとトークンを展示するカタログ画面の設計を定義します。外部ライブラリ（Storybook等）に依存せず、TanStack Router のルートとして完全にアプリ内に統合したシンプルかつ美しいショーケースを構築します。

### Goals
- 全共通 UI コンポーネントのバリアントとインタラクティブ状態をデモとして表示
- Tailwind v4 デザイントークン（CSS Variables）のビジュアルリファレンスページを提供
- カタログ画面自体の UIクオリティが技術力のアピールポイントになる設計

### Non-Goals
- Storybook、Docz 等の外部ツールの導入・ビルド出力
- コンポーネント自体の実装（`src/components/ui/` が ownership を持つ）

## Boundary Commitments

### This Spec Owns
- `src/features/catalog/` 配下の全コード
- `src/routes/catalog.tsx` のルート定義
- `/catalog` 画面の全レイアウトとデモレンダリングロジック

### Out of Boundary
- `src/components/ui/` の各コンポーネント実装本体（infrastructure が所有）

### Allowed Dependencies
- `src/components/ui/*` — デモ対象コンポーネント（読み取り専用の依存）
- Tailwind CSS v4（CSS Variables 経由でのデザイントークン参照）

### Revalidation Triggers
- `src/components/ui/` に新しいコンポーネントが追加されたとき（カタログへの追加が必要）
- デザインシステムトークン（CSS Variables のキー名）の変更

## Architecture

```mermaid
graph LR
    CatalogRoute["/catalog ルート (catalog.tsx)"] -->|renders| CatalogView[CatalogView.tsx]
    CatalogView -->|section: components| ComponentSection[ComponentSection.tsx]
    CatalogView -->|section: tokens| TokenSection[TokenSection.tsx]
    ComponentSection -->|renders demos| UIComponents[src/components/ui/*]
    TokenSection -->|reads| CSSVars[CSS Variables (Tailwind v4)]
```

### Technology Stack

| Layer | Choice | Role |
|-------|--------|------|
| Routing | TanStack Router | `/catalog` ルートの定義 |
| Styling | Tailwind CSS v4 | カタログページのレイアウトとデザインシステム表示 |

## File Structure Plan

```
src/
├── features/
│   └── catalog/
│       ├── components/
│       │   ├── CatalogView.tsx       # /catalog 画面全体
│       │   ├── ComponentSection.tsx  # コンポーネントデモセクション
│       │   ├── DemoBlock.tsx         # 1コンポーネントのデモ枠（バリアント一覧 + コードスニペット）
│       │   └── TokenSection.tsx      # デザイントークン（カラー・タイポ）リファレンス
│       └── data/
│           └── catalog-items.ts      # コンポーネントデモの定義データ（デモ名・バリアント・コード例）
└── routes/
    └── catalog.tsx                   # /catalog ルート
```

## Components and Interfaces

| Component | Intent | Req Coverage |
|-----------|--------|--------------|
| `CatalogView` | カタログページ全体の構成。サイドバーによるセクションナビと、ComponentSection / TokenSection の配置 | Req 1.1 |
| `ComponentSection` | `catalog-items.ts` を参照し、各コンポーネントのデモセクションをリストアップする | Req 1.1, 1.2 |
| `DemoBlock` | 1コンポーネントの全バリアントを描画し、読み取り専用コードスニペットをその下に表示する | Req 1.2, 1.3 |
| `TokenSection` | CSS Variables のカラーパレットとタイポグラフィスケールを視覚的に一覧表示する | Req 2.1, 2.2, 2.3 |

### `catalog-items.ts` データ設計

```typescript
interface CatalogItem {
  name: string;           // コンポーネント名（例: "Button"）
  description: string;    // 1行説明
  demos: {
    label: string;        // バリアント名（例: "Primary"）
    snippet: string;      // コードスニペット（表示用文字列）
    render: React.ReactNode; // 実際に描画するデモコンポーネント
  }[];
}
```

## Error Handling
- `TokenSection` は CSS Variables の値を `getComputedStyle` で動的に読み取るため、SSG 時（サーバー環境）では `document` が存在しない。`typeof document !== "undefined"` のガードを設けるか、クライアントサイドのみで描画する `ClientOnly` ラッパーを使用する。

## Testing Strategy
- **ビジュアル検証**: 全コンポーネントのバリアントが `/catalog` 画面上で正しくレンダリングされることをブラウザで目視確認。
- **ダークモード連動確認**: ダークモードトグル操作時に、カラーパレット表示が連動して変化することを確認。
- **型チェック**: `catalog-items.ts` の `CatalogItem` 型定義が `tsc --noEmit` で通過すること。
