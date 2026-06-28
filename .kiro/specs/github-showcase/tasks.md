# Implementation Plan: github-showcase

- [ ] 1. GitHub API クライアントと型定義
  - [ ] 1.1 `src/features/github/api/types.ts` に GitHub REST API のレスポンス型（`GitHubRepo` 等）を定義する。 *(Observable: 型が正しく export され、TypeScript のエラーが出ないこと。)*
  - [ ] 1.2 `src/features/github/api/client.ts` に、GitHub API から自身のパブリックリポジトリ一覧を取得するフェッチ関数を実装する。HTTP ステータスコードでレートリミット（403/429）を検知し、カスタムエラーを throw する。 *(Observable: `fetchGitHubRepos()` が正常なデータを返し、エラー時は適切なエラーオブジェクトを throw すること。)*
  - _Requirements: Requirement 1_
  - _Boundary: src/features/github/api/_

- [ ] 2. TanStack Query フックの実装
  - [ ] 2.1 TanStack Query の依存関係をプロジェクトに追加し（`bun add @tanstack/react-query`）、`QueryClient` の初期化をアプリエントリー（`__root.tsx` や `entry-client.tsx`）に組み込む。 *(Observable: `QueryClientProvider` がアプリルートでセットアップされていること。)*
  - [ ] 2.2 `src/features/github/hooks/useGitHubRepos.ts` に `useQuery` を使ったカスタムフックを実装する。`staleTime: 600_000`（10分）を設定する。 *(Observable: フックが `{ data, isLoading, isError }` を返し、同一セッション中の再フェッチが staleTime 内で発生しないこと。)*
  - _Requirements: Requirement 1.2_
  - _Boundary: src/features/github/hooks/useGitHubRepos.ts, entry-client.tsx_

- [ ] 3. Skeleton UI と RepoCard コンポーネント
  - [ ] 3.1 `src/features/github/components/SkeletonCard.tsx` を作成する。CSS `@keyframes` で shimmer（光るアニメーション）を実装し、リポジトリカードと同一のレイアウトを持つスケルトンを表示する。 *(Observable: ローディング状態で shimmer アニメーション付きのプレースホルダーが表示されること。)*
  - [ ] 3.2 `src/features/github/components/RepoCard.tsx` を作成する。リポジトリ名、説明、言語、スター数、GitHub リンクをカード形式で表示し、ダークモード対応を実装する。 *(Observable: リポジトリ情報がレスポンシブに表示され、ダークモードでもコントラストが保たれること。)*
  - _Requirements: Requirement 2_
  - _Boundary: src/features/github/components/_

- [ ] 4. GitHubView 統合コンポーネントとルート
  - [ ] 4.1 `src/features/github/components/GitHubView.tsx` を作成する。`useGitHubRepos` の状態（loading / error / success）に応じて Skeleton / Error Fallback（再試行ボタン付き）/ RepoCard グリッドを条件分岐して描画する。 *(Observable: ローディング → データ表示の遷移がフェードインアニメーションで行われ、エラー時には再試行ボタンが表示されること。)*
  - [ ] 4.2 `src/routes/github.tsx` を作成し、`GitHubView` コンポーネントを描画する `/github` ルートを定義する。 *(Observable: `/github` にアクセスした際にリポジトリ一覧または Skeleton / Error UI が表示されること。)*
  - _Requirements: Requirement 1.3, 2.3_
  - _Boundary: src/features/github/components/GitHubView.tsx, src/routes/github.tsx_
