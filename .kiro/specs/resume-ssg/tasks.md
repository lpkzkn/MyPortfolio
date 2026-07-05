# Implementation Plan: resume-ssg

- [x] 1. JSON データソースとデータ型の定義
  - [x] 1.1 職務経歴・実績データの TypeScript 型定義を `src/features/resume/types.ts` に作成する。 *(Observable: `Company`, `Project`, `ResumeData` 等の型が export されていること。)*
  - _Requirements: Requirement 1_
  - _Boundary: src/features/resume/types.ts_

- [x] 2. コンテンツファイルとルートの作成
  - [x] 2.1 `src/content/resume.json` を新規作成し、職務経歴・実績データを記述する。 *(Observable: 有効な JSON 形式で定義されていること。)*
  - [x] 2.2 `src/routes/resume.tsx` を作成し、`/resume` ルートを定義して `resume.json` のデータを返すようにする。 *(Observable: ローカル開発サーバーで `/resume` にアクセスした際にデータがコンポーネントに渡されること。)*
  - _Requirements: Requirement 1_
  - _Boundary: src/content/resume.json, src/routes/resume.tsx_

- [x] 3. タイムラインと実績カードの UI 実装
  - [x] 3.1 職歴を縦型タイムライン形式で表示する `Timeline.tsx` コンポーネントを `src/features/resume/components/` に実装する。モバイル（375px 以上）でもレイアウトが崩れないレスポンシブ対応を必須とする。 *(Observable: デスクトップ・モバイル双方で視覚的に整ったタイムラインが表示されること。)*
  - [x] 3.2 プロジェクト実績を表示する `ProjectCard.tsx` コンポーネントを実装する。技術スタックタグ、説明、GitHub リンクを含む。ダークモード対応（Tailwind v4 CSS Variables）を行う。 *(Observable: ライト・ダークモード双方でコントラストが保たれたカード UI が表示されること。)*
  - [x] 3.3 `ResumeView.tsx` を作成し、`Timeline` と `ProjectCard` を組み合わせた画面全体コンポーネントとして統合する。 *(Observable: `/resume` にアクセスした際に職歴タイムラインと実績カードが共に表示されること。)*
  - _Requirements: Requirement 2_
  - _Boundary: src/features/resume/components/_
