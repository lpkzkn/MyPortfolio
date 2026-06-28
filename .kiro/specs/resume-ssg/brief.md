# Brief: resume-ssg

## Problem
職務経歴やプロジェクト実績といったテキストメインの情報を、クライアントサイドのJavaScriptでのみパース・レンダリング（CSR）すると、検索エンジン（SEO）からのクロールが弱くなり、また初期ロード時間（FCP/LCP）に悪影響を及ぼします。これらをビルド時にプレレンダリングする仕組みが必要です。

## Current State
- 職務経歴データ自体がまだ存在せず、これをレンダリングする機能もない。

## Desired Outcome
- 職務経歴書（履歴書）および実績紹介が Markdown ファイルで管理され、ビルド時に自動的に HTML へ変換されプレレンダリング（SSG）されること。
- 静的生成されたページが高速かつSEOフレンドリーに配信され、Lighthouse の SEO および Performance スコアが最高水準（95+）に達すること。

## Approach
- `src/features/resume/` 内に職務経歴書関連のコードをコロケーションします。
- `src/content/resume.md` のような Markdown ファイルをデータソースとし、ビルド時にローダー経由でデータを読み込んで HTML にパースします。
- 静的ルーティングに対応したプレレンダリング設計を TanStack Router に組み込みます。

## Scope
- **In**:
  - `resume` 機能ディレクトリ（`src/features/resume/`）の作成
  - Markdown ファイル（職務経歴書、実績リスト）のデータソース設計
  - ビルド時パース処理（MD/MDXパーサーの導入とローダー設計）
  - 経歴データを表示するレスポンシブなタイムラインUI / カードUI
  - 静的プレレンダリングの動作検証
- **Out**:
  - GitHub 等の外部 API からの動的なリアルタイムデータフェッチ（`github-showcase`で対応）

## Boundary Candidates
- `src/features/resume/components/`: タイムラインや実績カードなどの専用UI
- `src/features/resume/utils/`: Markdown パースユーティリティ

## Out of Boundary
- 外部APIとの通信処理

## Upstream / Downstream
- **Upstream**: `infrastructure`
- **Downstream**: `component-catalog`

## Existing Spec Touchpoints
- **Extends**: なし
- **Adjacent**: `github-showcase`（同じポートフォリオ内の実績表示だが、こちらは静的処理）

## Constraints
- ビルドプロセス中に Markdown パースエラーが発生した場合、適切にビルドエラーとして検知されること。
