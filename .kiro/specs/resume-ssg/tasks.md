# Implementation Plan: resume-ssg

- [ ] 1. Markdown パーサーとデータ型の定義
  - [ ] 1.1 職務経歴・実績データの TypeScript 型定義を `src/features/resume/types.ts` に作成する。 *(Observable: `Company`, `Project`, `ResumeData` 等の型が export されていること。)*
  - [ ] 1.2 Markdown ファイルをパースし `ResumeData` 型のオブジェクトを返す `parseResume()` 関数を `src/features/resume/utils/markdown.ts` に実装する。フロントマターと本文テキストを分離する。 *(Observable: テスト用 Markdown 文字列を入力し、正しい型のオブジェクトが返ること。)*
  - _Requirements: Requirement 1_
  - _Boundary: src/features/resume/types.ts, src/features/resume/utils/markdown.ts_

- [ ] 2. コンテンツファイルとルートの作成
  - [ ] 2.1 `src/content/resume.md` を新規作成し、フロントマターに職務経歴・実績データを記述する。 *(Observable: ファイルが存在し、有効な YAML フロントマターを持つこと。)*
  - [ ] 2.2 `src/routes/resume.tsx` を作成し、TanStack Router のローダーで `parseResume()` を呼び出して静的データを返す `/resume` ルートを定義する。 *(Observable: ローカル開発サーバーで `/resume` にアクセスした際にパースされたデータがコンポーネントに渡されること。)*
  - _Requirements: Requirement 1_
  - _Boundary: src/content/resume.md, src/routes/resume.tsx_

- [ ] 3. タイムラインと実績カードの UI 実装
  - [ ] 3.1 職歴を縦型タイムライン形式で表示する `Timeline.tsx` コンポーネントを `src/features/resume/components/` に実装する。モバイル（375px 以上）でもレイアウトが崩れないレスポンシブ対応を必須とする。 *(Observable: デスクトップ・モバイル双方で視覚的に整ったタイムラインが表示されること。)*
  - [ ] 3.2 プロジェクト実績を表示する `ProjectCard.tsx` コンポーネントを実装する。技術スタックタグ、説明、GitHub リンクを含む。ダークモード対応（Tailwind v4 CSS Variables）を行う。 *(Observable: ライト・ダークモード双方でコントラストが保たれたカード UI が表示されること。)*
  - [ ] 3.3 `ResumeView.tsx` を作成し、`Timeline` と `ProjectCard` を組み合わせた画面全体コンポーネントとして統合する。 *(Observable: `/resume` にアクセスした際に職歴タイムラインと実績カードが共に表示されること。)*
  - _Requirements: Requirement 2_
  - _Boundary: src/features/resume/components/_
