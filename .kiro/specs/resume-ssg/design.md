# Design Document: resume-ssg

## Overview
本ドキュメントは、ローカルの JSON ファイルから職務経歴およびプロジェクトデータを読み込み、ビルド時にプレレンダリング（SSG）して `/resume` 画面でタイムラインUIとして美しく描画するための設計を定義します。

### Goals
- JSON を用いた保守性の高いデータソース設計
- ビルドプロセス（Vite / TanStack Start）に統合された静的データ読み込みの構築
- セマンティックでレスポンシブなタイムラインUIおよびプロジェクトカードUIの実装

### Non-Goals
- オンデマンド（ランタイム）でのデータベース接続や、外部CMSからのデータ取得

## Boundary Commitments

### This Spec Owns
- `src/features/resume/` 配下のコンポーネント、型定義
- `src/content/resume.json` のデータソース
- `/resume` ルート配下の表示およびレイアウト

### Out of Boundary
- 外部動的データのAPI連携

### Allowed Dependencies
- **スタイル**: Tailwind CSS v4
- **フレームワーク**: TanStack Router (ローダー機能)

### Revalidation Triggers
- JSON ファイルのデータスキーマの変更
- ルートパス `/resume` の変更

## Architecture

### Architecture Pattern & Boundary Map
```mermaid
graph LR
    subgraph Build Time (SSG)
        JSON[JSON File] -->|Imported into| Route[resume/route.tsx Loader]
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
| Data Source | JSON | 経歴・実績の構造データ、自己紹介文の格納 | `src/content/resume.json` |
| Router Loader | TanStack Router Loader | ビルド時に静的データをロード | `routeTree` に統合 |

## File Structure Plan

### Directory Structure
```
src/
├── content/
│   └── resume.json         # 経歴データソース
├── features/
│   └── resume/
│       ├── components/
│       │   ├── Timeline.tsx      # 時系列タイムライン
│       │   ├── ProjectCard.tsx   # 実績カード
│       │   └── ResumeView.tsx    # 画面全体の統合コンポーネント
│       └── types.ts              # 経歴データの型定義
└── routes/
    └── resume.tsx          # /resume ルート定義（ローダーでのデータ取得）
```

### Modified / New Files
- **[NEW]** `src/content/resume.json` — 経歴データの JSON ファイル
- **[NEW]** `src/features/resume/` 配下の全ファイル
- **[NEW]** `src/routes/resume.tsx` — 経歴画面のルート

## Components and Interfaces

| Component | Layer | Intent | Req Coverage | Key Dependencies |
|-----------|-------|--------|--------------|------------------|
| ResumeView | Feature Layout | `/resume` の全体の構成をまとめ、タイムラインと実績カードを配置する | Req 2.1, 2.2 | Timeline, ProjectCard |
| Timeline | Feature Component | 時系列で並んだ職歴（社名、期間、役割、業務詳細）を縦型タイムラインで描画 | Req 2.1 | なし |
| ProjectCard | Feature Component | 実績紹介のカード。タグやGitHubリンク等を美しくレイアウト | Req 2.2 | なし |

## Data Models

### Domain Model / Schema
JSON ファイルのデータ構造設計。

```json
{
  "companies": [
    {
      "name": "株式会社サンプル",
      "period": "2024.04 - 現在",
      "role": "リードエンジニア",
      "details": [
        "React 19 と TanStack を使った新規ポートフォリオ設計",
        "CI/CD パイプラインの最適化"
      ]
    }
  ],
  "projects": [
    {
      "title": "My Portfolio",
      "description": "本ポートフォリオサイト。",
      "tech": ["React", "TanStack Router", "Tailwind CSS v4"],
      "github": "https://github.com/..."
    }
  ],
  "introduction": "ここには自己紹介などのテキストが入ります。"
}
```

## Error Handling
- データインポート時の型検証: `types.ts` で定義された型を満たすようにアサーションを行い、不正なデータの場合は型エラーを検知します。

## Testing Strategy
- **ビジュアル検証**: レスポンシブ対応およびダークモードでのコントラストをブラウザ上で目視検証。
