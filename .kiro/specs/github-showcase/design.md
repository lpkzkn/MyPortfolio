# Design Document: github-showcase

## Overview
本ドキュメントは、GitHub REST API（パブリックエンドポイント）へのクライアントサイドフェッチと TanStack Query によるキャッシュ管理、Skeleton UI によるローディング体験を組み合わせた GitHub ショーケース機能の設計を定義します。

### Goals
- GitHub API フェッチロジックと UI のクリーンなコロケーション設計（`src/features/github/`）
- TanStack Query による効率的なデータキャッシュと stale-time 設計の実証
- `shimmer` アニメーションを持つ高品質 Skeleton UI の実装
- レートリミットおよびネットワーク障害への堅牢なエラーハンドリング

### Non-Goals
- GitHub の認証・プライベートリポジトリへのアクセス
- サーバーサイドプロキシを使った API リクエスト中継

## Boundary Commitments

### This Spec Owns
- `src/features/github/` 配下の全コード（APIクライアント、フック、UIコンポーネント）
- `src/routes/github.tsx` のルート定義（ルートのデータ取得戦略を含む）
- GitHub API の型定義（レスポンススキーマ型）

### Out of Boundary
- Markdown ベースの静的な実績データ（`resume-ssg`が担当）
- TanStack Query の `QueryClient` の初期化設定（インフラ層が担当）

### Allowed Dependencies
- **ライブラリ**: `@tanstack/react-query`（TanStack Query v5）
- **API**: GitHub REST API v3（パブリック、認証不要）
- **スタイル**: Tailwind CSS v4（shimmer アニメーション）

### Revalidation Triggers
- GitHub API レスポンスのスキーマ変更（フィールド名の変更等）

## Architecture

```mermaid
graph LR
    subgraph Client (CSR)
        Hook[useGitHubRepos hook] -->|TanStack Query| Cache[(Query Cache)]
        Hook -->|fetch| GitHubAPI[GitHub REST API]
        Component[RepoCard / SkeletonCard] -->|reads| Hook
    end
    subgraph Error States
        GitHubAPI -->|4xx / 5xx| ErrorBoundary[Error Fallback UI]
    end
```

### Technology Stack

| Layer | Choice | Role |
|-------|--------|------|
| Data Fetching | TanStack Query v5 (`useQuery`) | キャッシュ・stale time 管理 |
| API Client | Fetch API (native) | GitHub REST API 呼び出し |
| Animation | CSS (`@keyframes shimmer`) | Skeleton UI のシマーアニメーション |

## File Structure Plan

```
src/
├── features/
│   └── github/
│       ├── api/
│       │   ├── client.ts         # GitHub API フェッチ関数
│       │   └── types.ts          # GitHub API レスポンス型定義
│       ├── components/
│       │   ├── RepoCard.tsx      # リポジトリカード UI
│       │   ├── SkeletonCard.tsx  # ローディング Skeleton
│       │   └── GitHubView.tsx    # セクション全体の統合コンポーネント
│       └── hooks/
│           └── useGitHubRepos.ts # TanStack Query 統合フック
└── routes/
    └── github.tsx               # /github ルート
```

## Components and Interfaces

| Component | Intent | Req Coverage | Key Dependencies |
|-----------|--------|--------------|------------------|
| `useGitHubRepos` | TanStack Query で GitHub API を叩き、`isLoading`/`isError`/`data` を返すカスタムフック | Req 1.1, 1.2 | TanStack Query, `client.ts` |
| `RepoCard` | 1リポジトリの情報（名前、説明、言語、スター、URL）を表示するカード | Req 1.1 | — |
| `SkeletonCard` | `RepoCard` と同じレイアウトを shimmer アニメーション付きで表示するローディングプレースホルダー | Req 2.1, 2.2 | — |
| `GitHubView` | `useGitHubRepos` の state に応じて Skeleton / RepoCard / Error UI を条件分岐して描画する | Req 1.3, 2.1, 2.3 | `useGitHubRepos`, `RepoCard`, `SkeletonCard` |

### `useGitHubRepos` Hook

```typescript
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

// useGitHubRepos の返り値は TanStack Query の UseQueryResult<GitHubRepo[], Error> に準拠
```

**staleTime**: `1000 * 60 * 10`（10分）でキャッシュが有効とし、同一セッション内での不要なリフェッチを防止します。

## Error Handling

| エラー種別 | 検知方法 | UI 表示 |
|-----------|---------|---------|
| ネットワークエラー | `isError` フラグ + error.message | 「データを取得できませんでした。」+ 再試行ボタン |
| API レートリミット（403/429） | レスポンスステータスコード判定 | 「アクセスが集中しています。後ほどご確認ください。」 |

## Testing Strategy
- **ユニットテスト**: `client.ts` のフェッチ関数に対して、`msw`（Mock Service Worker）等でAPIレスポンスをモックし、正常系・エラー系を検証。
- **ビジュアル検証**: ローカルでネットワーク速度をスロットリングし、Skeleton UI の挙動を目視確認。
