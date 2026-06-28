# Brief: component-catalog

## Problem
ポートフォリオのコードの美しさやデザインシステムの品質をアピールするためには、ソースコードを読んでもらうだけでなく、動作するコンポーネントのデザインとインタラクティブ性を直接一覧できる「ショーケース（カタログ）」画面がポートフォリオ内に必要です。

## Current State
- 共通UIパーツはまだ作成されておらず、カタログ画面も存在しない。

## Desired Outcome
- ポートフォリオサイト内に `/catalog` などの専用ルートがあり、そこで使われているすべての共通UIコンポーネント（ボタン、入力フォーム、カード、ダイアログ、タイムライン等）の実物と、そのAPI（Props）やインタラクティブな状態変化（Hover, Active, Focus, Disabled等）を確認できること。
- カタログ自体が美しく整理されたドキュメントになっており、技術力の高さを伝えるショーケースとして機能すること。

## Approach
- `src/features/catalog/` 内にコンポーネントカタログ用のビューを構築します。
- 共通コンポーネント（`src/components/ui/` 配下）を取り込み、それぞれのバリエーション（Variant）をレンダリングするギャラリーを作成します。
- Tailwind v4 のスタイルがどのように各コンポーネントに反映されているかを示す設計書の役割も兼ねる構成にします。

## Scope
- **In**:
  - `catalog` 機能ディレクトリ（`src/features/catalog/`）の作成
  - 共通UIコンポーネントの網羅的な展示（インタラクティブなデモプレビュー）
  - Tailwind v4 トークン（カラー、フォント、間隔等）のビジュアルリファレンス
  - アクセシビリティ対応（キーボード操作やスクリーンリーダー対応）の動作デモ
- **Out**:
  - Storybook のライブラリビルド（今回はポートフォリオアプリ内に自作のルーティングビューとして統合するため、外部カタログとしての出力は対象外）

## Boundary Candidates
- `src/features/catalog/components/`: カタログ表示用のヘルパー（コードプレビュー等）

## Out of Boundary
- 各コンポーネント自体の実装（`src/components/ui/` が所有）

## Upstream / Downstream
- **Upstream**: `infrastructure`, `resume-ssg`
- **Downstream**: なし

## Existing Spec Touchpoints
- **Extends**: なし
- **Adjacent**: `infrastructure`

## Constraints
- カタログ自体もレスポンシブであり、コンポーネントが様々な画面幅でどう振る舞うか確認しやすくする。
