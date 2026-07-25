# MyPortfolio

フロントエンドエンジニアの職務経歴・実績紹介ポートフォリオサイト。

## 技術スタック

![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-FF4154?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

- **ランタイム / パッケージ管理**: [Bun](https://bun.sh/)
- **フレームワーク**: [TanStack Start](https://tanstack.com/start)（React 19 / 静的プリレンダリング）
- **スタイリング**: [Tailwind CSS v4](https://tailwindcss.com/)
- **バリアント管理**: [class-variance-authority (cva)](https://cva.style/)
- **Lint / Format**: [Biome](https://biomejs.dev/)
- **ホスティング**: [Cloudflare Pages](https://pages.cloudflare.com/)

## セットアップ

```bash
bun install
bun run dev
```

`http://localhost:3000` で起動します（初回起動時にTanStack Routerが`src/routeTree.gen.ts`を自動生成します。これはGit管理対象外です）。

## ビルド

```bash
bun run build
```

静的プリレンダリングにより、全ページがHTMLファイルとして書き出されます（`dist/client` 内）。

## デザインシステム

色はPrimitive（生の値）→ Semantic（意味づけ）の2層構造で `src/styles/tokens.css` に定義しています。コンポーネント側は必ずSemanticトークン（`--color-action-primary` など）のみを参照し、生の色を直接書きません。

### テーマの追加方法

1. `src/styles/themes/<theme-name>.css` を作成し、`[data-theme='<theme-name>']` スコープで全Semanticトークンを上書きする（既存ファイルをコピーするのが早い）
2. `src/styles/themes/index.css` に `@import` を1行追加する
3. `src/lib/theme.ts` の `THEMES` 配列と `THEME_LABELS` に追加する

現在用意されているテーマ: `light` / `happy-orange` / `gaming-red` / `sakura-pink`

### コンポーネント設計

- 形状ごとにコンポーネントを分離（`SimpleButton`, `RoundButton`）し、Atomic Designのような見た目の粒度分類ではなく、機能・形状単位で構造化しています。
- 各コンポーネント内部では `cva` で色・サイズのバリアントのみを型安全に管理し、loading/disabled等のロジックや`fullWidth`等のレイアウト調整はcvaの外（コンポーネント側のJSX）で扱う方針にしています（cvaのvariants肥大化を防ぐため）。
- 呼び出し側からは Compound Components パターン（`<SimpleButton.Primary>` など）でバリエーションを選択します。

## ディレクトリ構成

```
src/
  routes/              # TanStack Routerのファイルベースルーティング
  features/            # ドメイン単位（career, works, theme）
  components/
    ui/                # 汎用UIコンポーネント（feature非依存）
    layout/            # Header, Footerなど
  styles/
    tokens.css         # デザイントークンのベース定義
    themes/             # テーマごとのCSSファイル
  lib/                  # 汎用ユーティリティ・型定義
```

## デプロイ

`main` ブランチへマージされると、Cloudflare Pages により自動的にビルドと本番環境へのデプロイが実行されます。

