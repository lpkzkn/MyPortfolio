# Research & Design Decisions

## Summary
- **Feature**: `career-resume-consolidation`
- **Discovery Scope**: Extension
- **Key Findings**:
  - 重複する経歴ルートを整理するため、`/career` への直接アクセスを TanStack Router の `beforeLoad` 機能で `/resume` へ恒久的にリダイレクトする手法を採用。これにより、静的ホスティング（GitHub Pages）であってもクライアントサイドで確実な遷移が担保される。
  - 最新の職歴（ECサービス開発やゲーム開発実績）は、複雑な箇条書きやサブプロジェクト構成をサポートできるよう、既存の `Company` 型定義を `projects` 配列付きに拡張して構造化する。
  - 公開ポートフォリオとしてのプライバシー要件（固有名詞の非表示）を満たすため、すべての実在の企業名および製品名は一般用語（例：「ECサービス運営企業」）に変換したデータを `resume.json` に配置する。

## Research Log

### TanStack Router でのクライアントサイド・リダイレクト
- **Context**: 静的配信環境（GitHub Pages）で、旧パス `/career` から新パス `/resume` へのリダイレクトを安全に行う方法の調査。
- **Sources Consulted**: TanStack Router 開発ドキュメント (Routing - Redirects)
- **Findings**:
  - `beforeLoad` フックの中で `throw redirect({ to: '/resume', replace: true })` を呼び出すことで、レンダリング開始前に遷移させることが可能。
  - TanStack Start のビルド時プレレンダリング（SSG）においても、このリダイレクト設定は正常に検出され、静的クローラーの対象外またはリダイレクト情報として適切にビルドされる。
- **Implications**: `/career` ルートファイルを削除するのではなく、リダイレクト専用の定義ファイルとして `src/routes/career.tsx` を残すアプローチを取る。

### データ構造（ResumeData）の拡張
- **Context**: 元の職務経歴書にある詳細なプロジェクト記述を表現するための型定義の拡張。
- **Findings**:
  - 既存の `Company` 型は `details: string[]` のみのフラットな配列であったが、同一企業内での「Web版リプレイス開発」や「モバイルアプリ開発」のように期間や役割が異なるサブプロジェクトを構造化して表示する必要がある。
  - 拡張後の型として、各プロジェクト情報を持つ `CompanyProject` 型を定義し、`Company` がその配列を持てるようにする。
- **Implications**: `types.ts` を更新し、`resume.json` の形式を追従させる。また、UIコンポーネント（`Timeline.tsx`）をネスト構造を適切にレンダリングできるように書き換える。

## Design Decisions

### Decision: `career` ルートのリダイレクト化とナビゲーションからの削除
- **Context**: ユーザーが `/career` と `/resume` の両方を混同しないようにする。
- **Alternatives Considered**:
  1. `/career` 関連ファイルを完全に削除する (旧URLからのアクセスが 404 になるリスクがある)。
  2. `/career` から `/resume` へのクライアントサイドリダイレクトを設定し、ヘッダーのナビゲーションからはリンクを消す。
- **Selected Approach**: オプション2。
- **Rationale**: 過去のリンクやブックマークからの流入時に 404 エラーを発生させるのを防ぐ。ナビゲーションからは消去することで、重複したUI導線は完全に解消される。
- **Trade-offs**: `/career` 用のルートファイルが極小のコードでリポジトリに残り続けるが、保守コストはほぼゼロである。

### Decision: 職歴データの完全な一般化（匿名化）
- **Context**: 機密情報および企業ブランドの直接的な掲載を防止する。
- **Selected Approach**: 元データにあった「menu株式会社」や「PlayStation」、「Blu-ray」の商標をすべて除外し、データソース（`resume.json`）の作成段階で完全に一般化されたテキストのみを記述する。
- **Rationale**: リポジトリのコミット履歴や差分情報においても機密情報が一切残らないように、ソースコードそのものに変換前の会社名などを最初から書き込まない設計にする。
- **Trade-offs**: ポートフォリオの具体性は若干薄れるが、「ECサービス」「ゲーム開発」といったドメイン知識や、リーダーシップなどの実務実績は詳細に記述されているため、技術アピールとしての価値は十分に保たれる。

## Risks & Mitigations
- **SSGビルドエラーのリスク**: データ構造変更により型チェック（tsc）が通らずビルドが失敗するリスク。
  - *対策*: `types.ts` の型拡張を行い、`resume.json` のデータを修正した直後に `bun typecheck` を実行してエラーを即座に修正する。
- **リダイレクトの動作不良リスク**: GitHub Pages 配信時のベースパス（`/MyPortfolio/`）によってリダイレクト先が不正確になるリスク。
  - *対策*: TanStack Router の組み込み `redirect` を使用することで、Vite 設定のベースパスが自動的に付与されるため、相対パスとして安全に解決される。

## References
- [TanStack Router Redirects](https://tanstack.com/router/latest/docs/framework/react/guide/redirects)
