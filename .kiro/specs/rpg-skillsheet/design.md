# Design Document

## Overview 
**Purpose**: ポートフォリオサイトに訪れたユーザーに、開発者のスキルバランスを直感的に伝えるためのRPG風のスキルシート機能を提供する。
**Users**: ポートフォリオサイトの閲覧者（採用担当者や他のエンジニアなど）が、開発者の強みや専門性を楽しみながら確認できる。
**Impact**: 既存のテキストベースまたは無機質なスキル一覧を、ビジュアル豊かでインタラクティブなレーダーチャートとステータスUIに置き換える。

### Goals
- React + SVGを用いて、ライブラリに依存しない軽量かつRPGデザインに適合したアニメーション付きレーダーチャートを実装する。
- ユーザーがカテゴリをクリックして詳細な技術要素（ドリルダウン）を確認できるインタラクティブなUIを構築する。
- Tailwind CSSを利用し、既存プロジェクトのデザインシステムに統合する。

### Non-Goals
- スキルデータの動的な取得（CMSバックエンド構築）。データはフロントエンドで静的に定義する。
- レーダーチャート以外の複雑なグラフ機能（棒グラフや円グラフなど）の提供。

## Boundary Commitments

### This Spec Owns
- スキルデータの型定義と静的データの実装 (`src/data/skills.ts`)
- RPG風パラメータ表示のレイアウト・UIコンポーネント
- アニメーション付きSVGレーダーチャートコンポーネント
- クリックによるドリルダウン（階層展開）の状態管理

### Out of Boundary
- サイト全体のルーティングやレイアウト構成（対象コンポーネントを埋め込むページそのものの構築は含むが、ルーティング設計は他のSpecに依存）
- バックエンドAPIとの通信

### Allowed Dependencies
- React 19 (hooks: useState, useEffect, useRef)
- Tailwind CSS (スタイリング、アニメーション用ユーティリティクラス)

### Revalidation Triggers
- スキルデータの型定義（スキーマ）が変更された場合
- 表示に必要な階層（大項目→中項目→小項目）が拡張または削減された場合

## Architecture

### Architecture Pattern & Boundary Map
**Architecture Integration**:
- Selected pattern: **React Component Architecture with Static Data Layer**
  ReactのUIコンポーネントと、ドメインデータを分離。外部ライブラリ（Chart.js等）は用いず、React自身によるSVG描画でレーダーチャートを実現。
- Domain/feature boundaries: スキルデータ（定義）とUI（描画）を明確に分割する。
- New components rationale: `RadarChart` は汎用コンポーネントとしても切り出せるよう設計し、`SkillSheet` がRPG風のラッパーおよびドリルダウンの状態管理を担う。

### Technology Stack

| Layer | Choice / Version | Role in Feature | Notes |
|-------|------------------|-----------------|-------|
| Frontend | React 19 + SVG | レーダーチャート描画とUI | Chart.js等の依存を避け、カスタムSVGで完全制御 |
| Styling | Tailwind CSS v4 | UIのスタイリングとアニメーション | `transition-all` 等を用いたSVGパスのアニメーション |
| Data | Static TS Objects | スキルデータの保持 | 匿名化されたデータを静的に定義 |

## File Structure Plan

### Directory Structure
```
src/
├── components/
│   └── rpg-ui/
│       ├── SkillSheet.tsx        # スキルシートのルート・状態管理
│       ├── RadarChart.tsx        # SVGによるレーダーチャート描画（再利用可能）
│       └── StatusPanel.tsx       # RPG風ステータス詳細（テキスト一覧）
├── data/
│   └── skills.ts                 # スキルツリーの静的データ
└── types/
    └── skill.ts                  # スキルデータの型定義
```

## Requirements Traceability

| Requirement | Summary | Components | Interfaces | Flows |
|-------------|---------|------------|------------|-------|
| 1 | RPG風パラメータ表示 | `SkillSheet`, `StatusPanel` | `skill.ts` | ページ読み込み時 |
| 2 | アニメーション付きレーダーチャート | `RadarChart` | `RadarChartProps` | 画面侵入時にIntersectionObserver検知 |
| 3 | インタラクティブなスキルのドリルダウン表示 | `SkillSheet`, `RadarChart` | `skill.ts`階層データ | 大項目クリック時展開 |

## Components and Interfaces

| Component | Domain/Layer | Intent | Req Coverage | Key Dependencies | Contracts |
|-----------|--------------|--------|--------------|------------------|-----------|
| SkillSheet | UI | RPG風スキルUIのルートと状態管理 | 1, 3 | RadarChart, StatusPanel | State |
| RadarChart | UI | SVGベースのアニメーション付きチャート | 2, 3 | - | Component Props |
| StatusPanel | UI | クリックされたカテゴリの詳細テキスト表示 | 1, 3 | - | Component Props |

### UI Layer

#### RadarChart

| Field | Detail |
|-------|--------|
| Intent | SVGを用いたアニメーション付きレーダーチャートの描画 |
| Requirements | 2, 3 |

**Responsibilities & Constraints**
- 受け取ったデータ配列をもとに、多角形（Polygon）の各頂点を三角関数で計算して描画する。
- 初回表示時およびデータ変更時に、パスをアニメーションさせる（CSSトランジションを利用）。
- 軸のラベルを描画し、クリックイベントを親コンポーネントに伝播させる。

**Dependencies**
- Inbound: `SkillSheet` (Propsを通じてデータを受け取る)

**Contracts**: Component Props [x] / Event [x]

##### Component Props Interface
```typescript
interface RadarChartData {
  label: string;
  value: number; // 0 ~ 100
  id: string;
}

interface RadarChartProps {
  data: RadarChartData[];
  maxVal?: number; // default 100
  onLabelClick?: (id: string) => void;
}
```

#### SkillSheet

| Field | Detail |
|-------|--------|
| Intent | スキルツリーの状態管理とRPG風UI全体のオーケストレーション |
| Requirements | 1, 3 |

**Responsibilities & Constraints**
- 現在選択されているカテゴリ（ルートまたは特定のドリルダウンカテゴリ）の状態（`activeCategoryId`）を保持。
- `RadarChart` と `StatusPanel` へデータを渡し、表示を切り替える。
- RPG風デザインの枠や背景をレイアウトする。

**Contracts**: State [x] / Component Props [x]

##### State Management
- State model: `activeCategoryId: string | null`
- Persistence & consistency: メモリ内（再読み込みでルート要素にリセット）

## Data Models

### Domain Model
- **SkillNode**: スキルのツリー構造を表す。ID、表示名、スコア、そして任意で子ノード（`children`）を持つ。

### Logical Data Model

**Structure Definition**:
```typescript
export interface SkillNode {
  id: string;
  name: string;
  score: number; // 0 ~ 100
  children?: SkillNode[];
}
```

## Error Handling

### Error Strategy
- 静的データに基づくUIコンポーネントであるため、重大なシステムエラーは発生しにくい。
- データが空配列の場合や想定外の構造の場合は、フォールバックUI（「データがありません」またはチャートを非表示）を描画してクラッシュを防ぐ。

## Testing Strategy

- Unit Tests: `RadarChart` の頂点計算関数（三角関数を用いた座標算出）が正しい値を返すかテスト。
- E2E/UI Tests: レーダーチャートの軸ラベルをクリックした際、`SkillSheet` の状態が更新され、子項目が表示される（ドリルダウン機能）ことをテスト。
