# Brief: github-showcase

## Problem
ポートフォリオとして、最新の開発実績や活発な開発状況を示すために、GitHubのリアルタイムな情報（スター数や最近のコミット履歴など）を表示したいですが、静的配信（GitHub Pages）ではAPIサーバーを建てられないため、ブラウザ側でのセキュアで高速なAPIフェッチと適切なキャッシュ処理を構築する必要があります。

## Current State
- GitHub API との連携ロジックや、それらを表示するUIパーツは存在しない。

## Desired Outcome
- ブラウザから GitHub API（パブリックデータ）をフェッチし、最新のリポジトリ一覧や特定リポジトリのコミット履歴を表示できること。
- ロード中の Skeleton UI による快適なUXと、APIのレートリミットを考慮した TanStack Query 等によるクライアントキャッシュが適切に動作していること。
- エラー時（APIレート制限やネットワークエラー）のフォールバック表示が適切に行われること。

## Approach
- `src/features/github/` 内に GitHub 連携ロジックとUIコンポーネントをコロケーションします。
- クライアントサイドでの非同期状態管理のために TanStack Query（またはそれに準ずる軽量フェッチ・キャッシュ機構）を導入します。
- ローディング中やエラー状態のUXを重視し、CSSアニメーションによる高品質なスケルトンスクリーンを作成します。

## Scope
- **In**:
  - `github` 機能ディレクトリ（`src/features/github/`）の作成
  - GitHub REST/GraphQL API（パブリック情報）とのフェッチロジック
  - クライアントサイドでのフェッチキャッシュ・ stale タイム制御
  - Skeleton UI コンポーネントおよびエラーハンドリング用フォールバック UI
  - 動的リポジトリカードおよびコミット履歴アクティビティUI
- **Out**:
  - GitHub のプライベート情報へのアクセスや、認証を要する API の呼び出し（パブリックデータのみを対象とする）

## Boundary Candidates
- `src/features/github/api/`: GitHub API クライアント
- `src/features/github/components/`: リポジトリカード、SkeletonUI

## Out of Boundary
- 静的な実績データの管理（`resume-ssg`が担当）

## Upstream / Downstream
- **Upstream**: `infrastructure`
- **Downstream**: なし

## Existing Spec Touchpoints
- **Extends**: なし
- **Adjacent**: `resume-ssg`

## Constraints
- クライアント側の環境変数（`VITE_GITHUB_TOKEN`等）は、パブリックデータの表示において基本的に不要（トークンなしのゲストアクセス）な設計とするか、オプションとしてローカル開発時のみ読み込む形式にする。レートリミットへの対策が必須。
