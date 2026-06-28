# Requirements Document: infrastructure

## Introduction
本仕様は、React 19、TanStack Start/Router、および Tailwind CSS v4 を使用したポートフォリオ開発における基盤（インフラ）と品質監査体制を確立するためのものです。一貫したディレクトリ構成ルール、共通スタイル、シェルレイアウト、そして GitHub Pages への自動デプロイワークフローを定義します。

## Boundary Context
- **In scope**:
  - `src/features/`, `src/components/ui/`, `src/hooks/`, `src/utils/` ディレクトリ構造の定義と統一
  - Tailwind CSS v4 を適用したグローバルスタイル（カラーパレット、フォント、ダークモード）の設定
  - アプリ全体の基本シェルレイアウト（ナビゲーションヘッダー、フッター）の構築
  - GitHub Pages 向けの静的プレレンダリング（SSG）用ビルド・デプロイ設定（GitHub Actions）
  - Biome、Markuplint、TypeScript による静的解析および型チェックの CI 統合
- **Out of scope**:
  - 各 feature（職務経歴表示、GitHub連携、コンポーネントカタログ）の具体的な内部ロジックや個別UIの実装
  - Storybook の設定

## Requirements

### Requirement 1: ディレクトリ構造と品質監査の統一
**Objective:** 開発者として、一貫したディレクトリ構成と静的検証ルールが定義されていることで、迷わず高品質なコードを記述し、ソースコード自体を技術ショーケースとして見せられるようにしたい。

#### Acceptance Criteria
1. `src/features/` 配下に機能別ディレクトリを切り、コンポーネントやロジックをコロケーションできる構造であること。
2. Biome によるコードフォーマット・Lint チェックが全ソースコードに対して正常に機能し、`bun run lint` で検証できること。
3. Markuplint による JSX/TSX のアクセシビリティおよび構文チェックが `bun run lint:markup` で動作すること。
4. TypeScript の厳密な型チェックが `bun run typecheck` (`tsc --noEmit`) で正常にパスすること。

### Requirement 2: Tailwind CSS v4 と基本シェルレイアウト
**Objective:** ポートフォリオの訪問者として、美しく統一感のあるデザイン（ダークモード対応）とレスポンシブなヘッダー・フッターを持つレイアウトを通じて、快適にコンテンツを閲覧したい。

#### Acceptance Criteria
1. Tailwind v4 を使用し、CSS ファイル内でグローバルなカラーテーマ（プライマリ、セカンダリ、背景色等）が定義されていること。
2. ナビゲーションヘッダーおよびフッターを備えたアプリ全体の基本シェルレイアウトが実装されていること。
3. システム設定またはトグルスイッチによって切り替え可能なダークモード（CSS Variablesによる切り替え）が実装されていること。

### Requirement 3: GitHub Pages 向け SSG / デプロイ設定
**Objective:** 開発者として、コードを GitHub にプッシュするだけで、GitHub Pages（静的ホスティング）に自動的に SSG ビルドおよびデプロイが行われ、ルーティングが崩れないようにしたい。

#### Acceptance Criteria
1. TanStack Start/Router の設定により、ローカルでのビルド (`bun run build`) 時にすべての定義済みルートが静的HTMLとして出力（SSG）されること。
2. GitHub Pages 上でサブディレクトリ（またはカスタムドメイン）配下に配置された場合でも、アセットのパス解決やルーティングが正しく動作すること（Base URL 設定）。
3. `.github/workflows/deploy.yml` により、`main` ブランチへのプッシュ時に GitHub Actions が起動し、自動ビルドと GitHub Pages への静的デプロイが成功すること。
