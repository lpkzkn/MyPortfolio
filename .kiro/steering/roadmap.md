# ロードマップ

## 概要
本プロジェクトは、React 19、TanStack Start/Router、および Tailwind CSS v4 を使用して構築されるポートフォリオサイトです。ホスティング先として GitHub Pages（静的ホスティング）を採用する制約の下で、「設計・アーキテクチャの美しさ」と「パフォーマンス・最適化」を最大限にアピールするための設計を行います。

具体的には、職務経歴データなどはビルド時にプレレンダリング（SSG）し、初期表示パフォーマンス（LCP/FCP）に優れた高速なポートフォリオサイトを実現します。

## アプローチ決定
- **採用アプローチ**: 静的サイト生成（SSG）による型安全なアーキテクチャ
- **選定理由**: 
  - GitHub Pages による静的配信に対応しつつ、Lighthouse 満点を狙える超高速な初期表示を実現するため。
  - TanStack Router の型安全なルーティング・ローダー設計による設計美アピールを両立するため。
- **却下された代替案**:
  - オンデマンド SSR: GitHub Pages の静的ホスティング制約により却下。
  - 純粋な SPA (完全な CSR): 初回ロード時のパフォーマンス（FCP/LCP）および SEO の観点から、静的コンテンツについてはプレレンダリングを行う方が技術アピールとして強いため却下。

## スコープ
- **In**:
  - `src/features/` に基づく機能別コロケーション設計
  - Tailwind CSS v4 を用いた共通デザインシステムおよびコンポーネント設計
  - JSON ファイルからビルド時に読み込んで静的プレレンダリングする職務経歴・実績表示機能
  - サイト内で動作する自作のコンポーネントカタログ（Storybook風）
  - Biome / Markuplint によるコード品質とアクセシビリティの静的検証
- **Out**:
  - サーバーサイド of データベース連携や動的な認証・認可機能
  - 独自のCMS管理画面の作成（データソースは基本 Git 管理の Markdown/JSON とする）

## 制約
- ホスティング環境は GitHub Pages（Node.js ランタイムなしの静的配信）。
- パッケージマネージャーは Bun を使用する。
- 静的検証ルール（Biome, Markuplint）および型チェックがビルド前に通過すること。

## 境界戦略
- **分割の理由**: 
  - まずベースとなるインフラとデザインシステムの基盤を固め、その上に個別の機能（静的コンテンツ生成、ショーケースUI）を独立したスペックとして積み上げることで、並行開発やレビューを容易にし、設計の独立性を保つため。
- **注視すべき共通的の境界**:
  - デザインシステムコンポーネントと、各 feature 内にコロケーションされる特化型コンポーネントの依存関係ルール。

## 仕様（依存順）
- [x] [infrastructure](file:///Users/fujisakikazuhiko/Project/MyPortfolio/.kiro/specs/infrastructure/brief.md) -- プロジェクト全体のディレクトリ設計、ベースレイアウト、Tailwind v4デザインシステム定義、およびGitHub Pages向けビルド・デプロイ設定。 Dependencies: なし
- [x] [resume-ssg](file:///Users/fujisakikazuhiko/Project/MyPortfolio/.kiro/specs/resume-ssg/brief.md) -- JSONベースの職務経歴・実績データの読み込みと、ビルド時の静的プレレンダリング機能の実装。 Dependencies: infrastructure
- [x] [component-catalog](file:///Users/fujisakikazuhiko/Project/MyPortfolio/.kiro/specs/component-catalog/brief.md) -- 自作デザインシステムコンポーネントの一覧およびインタラクティブな動作検証ができるコンポーネントカタログページの作成。 Dependencies: infrastructure, resume-ssg
