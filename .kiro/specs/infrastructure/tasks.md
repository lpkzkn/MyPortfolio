# Implementation Plan: infrastructure

- [x] 1. プロジェクト構造とコード品質監査の設定
  - [x] 1.1 プロジェクト配下に `src/features/`, `src/components/ui/`, `src/hooks/`, `src/utils/` ディレクトリを作成する。 *(Observable: 各ディレクトリが存在すること。)*
  - [x] 1.2 `bun run lint` (Biome) および `bun run lint:markup` (Markuplint) が正常に動作し、既存ファイルがすべてパスするか検証する。 *(Observable: コマンドがエラーなしで完了すること。)*
  - _Requirements: Requirement 1_

- [x] 2. デザインシステムと基本レイアウトの構築
  - [x] 2.1 `src/global.css` を編集し、Tailwind v4 の `@import "tailwindcss";` と共に、カラーパレット、フォント、ダークモード用の CSS Variables を定義する。 *(Observable: ダークモード/ライトモードで値が変わる CSS Variables が定義されていること。)*
  - [x] 2.2 `src/routes/__root.tsx` を修正し、ヘッダー（ナビゲーションリンク）、フッター、ダークモードトグル（ThemeToggle）を含むレスポンシブな基本シェルレイアウトを構築する。 *(Observable: 画面にヘッダーとフッターが表示され、ダークモードトグルで `html` に `dark` クラスがトグルされること。)*
  - _Requirements: Requirement 2_
  - _Boundary: src/routes/__root.tsx, src/global.css_

- [x] 3. GitHub Pages 向け SSG & CI/CD パイプライン設定
  - [x] 3.1 `vite.config.ts` もしくは TanStack Start のビルド設定を修正し、GitHub Pages のサブディレクトリ（リポジトリ名）配下でもアセットパスが正しく解決されるようベースパスを設定し、静的ターゲット（SSG）ビルドができるようにする。 *(Observable: `bun run build` を実行した際、`dist/` 内に静的 HTML 群がプレレンダリングされ、ベースパス付きの相対パスでアセットが読み込まれていること。)*
  - [x] 3.2 `.github/workflows/deploy.yml` を新規作成し、`main` ブランチへのプッシュ時に `bun install` -> `bun run lint` -> `bun run typecheck` -> `bun run build` を実行し、`actions/deploy-pages` で GitHub Pages にデプロイするワークフローを定義する。 *(Observable: ワークフローファイルが追加され、CI 構文エラーがないこと。)*
  - _Requirements: Requirement 3_
  - _Boundary: vite.config.ts, .github/workflows/deploy.yml_
