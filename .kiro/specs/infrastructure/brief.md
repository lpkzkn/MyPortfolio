# Brief: infrastructure

## Problem
ポートフォリオの開発を開始するにあたり、一貫したディレクトリ設計（`features`構成など）、Tailwind CSS v4によるデザインシステムトークンの定義、共通のレイアウト、およびGitHub Pages（静的配信）へのデプロイパイプラインが定義されていないため、開発の基盤と品質監査の仕組みを整える必要があります。

## Current State
- `package.json` に React 19, Tailwind v4, TanStack Start/Router などの依存関係はインストール済みだが、具体的なディレクトリ構成や設定ファイル（Viteのプレレンダリング設定、GitHub Actionsなど）が未設定。

## Desired Outcome
- `src/features/`, `src/components/`, `src/hooks/`, `src/utils/` に基づくクリーンなディレクトリ構造が定義されていること。
- Tailwind v4 を使用したグローバルスタイル（カラーパレット、タイポグラフィ、ダークモード等）が動作すること。
- GitHub Pages 向けに静的ビルド（SSG）され、正しくデプロイできるパイプライン（GitHub Actions）およびローカルビルド検証が完了していること。
- Biome / Markuplint による静的解析チェックが機能していること。

## Approach
- Vite / TanStack の静的プレレンダリング設定を行い、GitHub Pages 上でルーティングエラーにならないようなビルド設定（`.nojekyll` の配置やSPAフォールバック等）を行います。
- アプリケーション全体の基本シェルレイアウト（ヘッダー、フッター、メイン領域、ダークモードトグル）を作成します。

## Scope
- **In**:
  - `src/` 配下の共通ディレクトリ設計
  - Tailwind v4 の CSS-first 設定（CSSファイルのインポート、基本カラーやアニメーション定義）
  - アプリケーション全体の基本シェルレイアウト（ナビゲーションを含む）
  - GitHub Pages 向けのデプロイ設定（GitHub Actions ワークフローファイル）
  - Biome / Markuplint / TypeScript の厳密なチェック環境
- **Out**:
  - 個別のコンテンツ（職務経歴やGitHub実績）の作り込み
  - 個別の詳細UIコンポーネント

## Boundary Candidates
- `src/components/ui/`: アプリケーション共通のUIパーツ（ボタン、カード等）
- `src/routes/`: ルート定義（TanStack Router のファイルベースルーティング）

## Out of Boundary
- ドメイン固有のロジック（GitHub APIフェッチや職務経歴パース処理）

## Upstream / Downstream
- **Upstream**: なし
- **Downstream**: `resume-ssg`, `component-catalog`

## Existing Spec Touchpoints
- **Extends**: なし
- **Adjacent**: なし

## Constraints
- GitHub Pages でルーティングが壊れないよう、パス設計（ベースURLなど）に配慮する。
- Tailwind v4 の CSS 設定は JS 設定ファイルではなく CSS 内の定義に寄せる。
