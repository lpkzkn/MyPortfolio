# Implementation Plan

- [x] 1. スキルデータの型定義と静的データ作成 (P)
  - `src/types/tech-stack.ts` に `TechNode` などの型定義を追加する。
  - `src/data/tech-stack.ts` にポートフォリオ用の技術スタック（大項目・中項目・小項目）の静的データを実装する。
  - Observable: `tech-stack.ts` の型とデータが作成され、型エラーが出ない状態でエキスポートされていること。
  - _Requirements: 1, 3_
  - _Boundary: Data Layer_

- [ ] 2. RadarChartコンポーネントの基本描画実装 (P)
  - `src/components/rpg-ui/RadarChart.tsx` を作成する。
  - 三角関数を用いてデータを多角形の頂点座標に変換し、`<svg>`タグ内で `<polygon>` や軸線を描画するロジックを実装する。
  - Observable: 静的なレーダーチャートがブラウザ上で描画されること。
  - _Requirements: 2_
  - _Boundary: RadarChart_

- [ ] 3. RadarChartのシーケンシャルアニメーションとインタラクション実装
  - `IntersectionObserver` を用いて、ビューポート侵入時に以下の順番で描画されるアニメーションを実装する（`setTimeout` によるフェーズ管理やCSSディレイを活用）。
    1. 外枠となる円の出現
    2. 中心から放射状に伸びる罫線の出現
    3. 割り振られた値（多角形）が中心から拡大して描画
  - 軸ラベルのクリックイベント（`onLabelClick`）を親へ伝播させる処理を追加する。
  - Observable: 画面スクロール時にチャートが順序立てて（円→線→値の順で）美しく描画され、クリック時にコールバックが発火すること。
  - _Requirements: 2, 3_
  - _Depends: 2_
  - _Boundary: RadarChart_

- [ ] 4. StatusPanelコンポーネントの実装 (P)
  - `src/components/rpg-ui/StatusPanel.tsx` を作成し、選択されたカテゴリの詳細情報をRPGステータス画面風のリストレイアウトで表示する。
  - Observable: プロパティとして渡したデータが、RPG風の装飾枠やフォントスタイルで正しく表示されること。
  - _Requirements: 1, 3_
  - _Boundary: StatusPanel_

- [ ] 5. SkillSheet統合とドリルダウン状態管理の実装
  - `src/components/rpg-ui/SkillSheet.tsx` を作成し、`activeCategoryId` の状態（State）を管理する。
  - `RadarChart` と `StatusPanel` を内包し、クリックイベントに応じて表示するカテゴリ階層（大項目→中項目など）を切り替えるドリルダウンを実装する。
  - データの匿名化方針に則り、実名を出さないUI構成を保証する。
  - Observable: レーダーチャートの項目をクリックした際、選択したカテゴリに対応するデータでチャートとパネルが連動して更新されること。
  - _Requirements: 1, 2, 3_
  - _Depends: 1, 3, 4_
  - _Boundary: SkillSheet_

- [ ] 6. 座標計算ロジックのUnitテスト実装
  - レーダーチャートの頂点計算ロジックをテストするためのユニットテスト（`RadarChart.test.ts` 等）を追加する。
  - Observable: `vitest` 等のテストランナーで対象のテストがPASSすること。
  - _Requirements: 2_
