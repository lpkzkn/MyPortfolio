# MyPortfolio

フロントエンドエンジニアの職務経歴・実績紹介ポートフォリオサイト。

## 技術スタック

- ランタイム / パッケージ管理: [Bun](https://bun.sh/)
- フレームワーク: [TanStack Start](https://tanstack.com/start)（RC、静的プリレンダリング）
- スタイリング: [Tailwind CSS v4](https://tailwindcss.com/)
- バリアント管理: [class-variance-authority (cva)](https://cva.style/)
- Lint / Format: [Biome](https://biomejs.dev/)
- ホスティング: GitHub Pages + GitHub Actions

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

静的プリレンダリングにより、全ページがHTMLファイルとして書き出されます。

**重要**: 初回ビルド後、実際の出力ディレクトリ名（`dist` または `.output/public` など、TanStack StartのRCバージョンによって変わる可能性があります）を確認し、以下の2箇所を実際のパスに合わせてください。

- `.github/workflows/deploy.yml` の `upload-pages-artifact` の `path`

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

`main` ブランチへのpushで GitHub Actions が自動的にビルド・GitHub Pagesへのデプロイを行います（`.github/workflows/deploy.yml`）。

GitHub側でリポジトリの Settings → Pages → Source を「GitHub Actions」に設定してください。

公開URL: `https://<your-github-username>.github.io/MyPortfolio/`
