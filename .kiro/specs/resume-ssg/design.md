# Design Document: resume-ssg

## Overview
本ドキュメントは、ローカルの Markdown ファイルから職務経歴およびプロジェクトデータを読み込み、ビルド時にプレレンダリング（SSG）して `/resume` 画面でタイムラインUIとして美しく描画するための設計を定義します。

### Goals
- Markdown を用いた保守性の高いデータソース設計
- ビルドプロセス（Vite / TanStack Start）に統合された Markdown パース処理の構築
- セマンティックでレスポンシブなタイムラインUIおよびプロジェクトカードUIの実装

### Non-Goals
- オンデマンド（ランタイム）でのデータベース接続や、外部CMSからのデータ取得

## Boundary Commitments

### This Spec Owns
- `src/features/resume/` 配下のコンポーネント、フック、ユーティリティ
- `src/content/resume/` 配下の Markdown 形式のデータソース
- `/resume` ルート配下の表示およびレイアウト
- ビルド時における Markdown から HTML へのパーサーロジック（Marked や Unified などのライブラリ使用）

### Out of Boundary
- GitHub API などの外部動的データの連携（`github-showcase`で対応）

### Allowed Dependencies
- **ライブラリ**: `marked` (または `unified`/`remark`/`rehype` 等の Markdown パーサーライブラリ)
- **スタイル**: Tailwind CSS v4, Lucide React (タイムラインアイコン用)
- **フレームワーク**: TanStack Router (ローダー機能)

### Revalidation Triggers
- Markdown ファイルのデータスキーマ（フロントマターなど）の変更
- ルートパス `/resume` の変更

## Architecture

### Architecture Pattern & Boundary Map
```mermaid
graph LR
    subgraph Build Time (SSG)
        MD[Markdown Files] -->|Parsed by| Parser[Markdown Parser / Loader]
        Parser -->|Injected into| Route[resume/route.tsx Loader]
    end
    subgraph Client Runtime
        Route -->|Passes props to| ResumeFeature[src/features/resume/components/*]
        ResumeFeature -->|Renders| Timeline[Timeline UI]
        ResumeFeature -->|Renders| ProjectCards[Project Cards]
    end
```

### Technology Stack

| Layer | Choice / Version | Role in Feature | Notes |
|-------|------------------|-----------------|-------|
| Parser | `marked` (または `gray-matter` + `unified`) | Markdown ファイルのパース、メタデータの抽出 | フロントマターでメタデータ（社名、期間等）を管理 |
| Router Loader | TanStack Router Loader | ビルド時にパースされた静的データをロード | `routeTree` に統合 |

## File Structure Plan

### Directory Structure
```
src/
├── content/
│   └── resume.md           # 経歴データソース
├── features/
│   └── resume/
│       ├── components/
│       │   ├── Timeline.tsx      # 時系列タイムライン
│       │   ├── ProjectCard.tsx   # 実績カード
│       │   └── ResumeView.tsx    # 画面全体の統合コンポーネント
│       ├── utils/
│       │   └── markdown.ts       # Markdown パース処理
│       └── types.ts              # 経歴データの型定義
└── routes/
    └── resume.tsx          # /resume ルート定義（ローダーでのデータ取得）
```

### Modified / New Files
- **[NEW]** `src/content/resume.md` — 経歴データの Markdown ファイル
- **[NEW]** `src/features/resume/` 配下の全ファイル
- **[NEW]** `src/routes/resume.tsx` — 経歴画面のルート

## Components and Interfaces

| Component | Layer | Intent | Req Coverage | Key Dependencies |
|-----------|-------|--------|--------------|------------------|
| ResumeView | Feature Layout | `/resume` の全体の構成をまとめ、タイムラインと実績カードを配置する | Req 2.1, 2.2 | Timeline, ProjectCard |
| Timeline | Feature Component | 時系列で並んだ職歴（社名、期間、役割、業務詳細）を縦型タイムラインで描画 | Req 2.1 | Lucide React |
| ProjectCard | Feature Component | 実績紹介のカード。タグやGitHubリンク等を美しくレイアウト | Req 2.2 | UI Common (Card, Badge) |

## Data Models

### Domain Model / Schema
Markdown ファイルのフロントマター（YAML）と本分のデータ構造設計。

```markdown
---
companies:
  - name: "株式会社サンプル"
    period: "2024.04 - 現在"
    role: "リードエンジニア"
    details:
      - "React 19 と TanStack を使った新規ポートフォリオ設計"
      - "CI/CD パイプラインの最適化"
projects:
  - title: "My Portfolio"
    description: "本ポートフォリオサイト。"
    tech: ["React", "TanStack Router", "Tailwind CSS v4"]
    github: "https://github.com/..."
---
# 自己紹介
ここには自己紹介などのテキストが入ります。
```

## Error Handling
- Markdown パース時のエラー: ビルド時にパースエラーが発生した場合、コンソールに警告を出力し、不正なデータ部分は空のUI（またはフォールバック文言）をレンダリングしてアプリ全体のクラッシュを防ぎます。

## Testing Strategy
- **ユニットテスト**: `markdown.ts` によるパース処理が正しく Markdown 構文をオブジェクト構造に変換できるか検証（モックした Markdown データを用いてテスト）。
- **ビジュアル検証**: レスポンシブ対応およびダークモードでのコントラストをブラウザ上で目視検証。
