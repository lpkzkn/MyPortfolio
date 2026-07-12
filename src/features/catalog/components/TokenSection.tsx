const COLORS = [
  {
    name: '--color-surface',
    label: 'Surface',
    desc: '主要な背景色。カードやコンテンツセクション用。',
  },
  {
    name: '--color-surface-subtle',
    label: 'Surface Subtle',
    desc: '控えめな背景色。ヘッダーやフッター、コード領域用。',
  },
  { name: '--color-border', label: 'Border', desc: '境界線や分割線用のカラー。' },
  {
    name: '--color-text-default',
    label: 'Text Default',
    desc: 'メインとなる標準テキスト用カラー。高いコントラスト。',
  },
  {
    name: '--color-text-muted',
    label: 'Text Muted',
    desc: 'サブテキスト、説明文などの控えめな文字用カラー。',
  },
  {
    name: '--color-text-on-action',
    label: 'Text On Action',
    desc: 'アクションボタン等の背景上のテキスト用。',
  },
  {
    name: '--color-action-primary',
    label: 'Action Primary',
    desc: 'プライマリボタンやブランドアクセント色。',
  },
  {
    name: '--color-action-secondary',
    label: 'Action Secondary',
    desc: 'セカンダリの補助的なボタン用。',
  },
  {
    name: '--color-action-danger',
    label: 'Action Danger',
    desc: '削除などの注意を促すアクション用。',
  },
]

const TYPOGRAPHY = [
  {
    name: 'text-display',
    size: '2.5rem (40px)',
    label: 'Display (大見出し)',
    sample: 'Display Title',
  },
  {
    name: 'text-heading',
    size: '1.5rem (24px)',
    label: 'Heading (中見出し)',
    sample: 'Heading Title',
  },
  {
    name: 'text-body',
    size: '1.0rem (16px)',
    label: 'Body (本文)',
    sample: 'これは本文用のテキストサンプルです。',
  },
  {
    name: 'text-caption',
    size: '0.75rem (12px)',
    label: 'Caption (注釈)',
    sample: '※注釈や詳細情報用のキャプション',
  },
]

export function TokenSection() {
  return (
    <div id="design-tokens" className="scroll-mt-20 space-y-16">
      {/* Section Header */}
      <div>
        <h2 className="text-display font-bold text-text-default mb-2">デザインシステム基盤</h2>
        <p className="text-body text-text-muted leading-relaxed">
          デジタル庁デザインシステム（DADS）のFoundationsを参考に設計された、本プロジェクトのカラー、タイポグラフィ、およびコーディング規則のリファレンスです。
        </p>
      </div>

      {/* Colors */}
      <div id="tokens-color" className="scroll-mt-20 space-y-6">
        <h3 className="text-heading font-bold text-text-default pl-2 border-l-4 border-action-primary">
          カラーパレット (Semantic Colors)
        </h3>
        <p className="text-body text-text-muted">
          セマンティック（意味・役割）に基づいて定義されたCSS変数群です。テーマセレクターを切り替えると各色見本の色も連動して変化します。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {COLORS.map((color) => (
            <div
              key={color.name}
              className="border border-border rounded-xl p-4 bg-surface flex flex-col gap-4 shadow-sm"
            >
              {/* Preview Box */}
              <div
                className="w-full h-16 rounded-lg border border-border transition-colors duration-200"
                style={{ backgroundColor: `var(${color.name})` }}
              />
              {/* Info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-body font-bold text-text-default">{color.label}</span>
                  <code className="text-caption text-action-primary font-mono">{color.name}</code>
                </div>
                <p className="text-caption text-text-muted leading-relaxed">{color.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div id="tokens-typography" className="scroll-mt-20 space-y-6">
        <h3 className="text-heading font-bold text-text-default pl-2 border-l-4 border-action-primary">
          タイポグラフィ (Typography)
        </h3>
        <p className="text-body text-text-muted">
          サイト内で定義されているフォントサイズスケール。Tailwind v4 の `@theme`
          定義から、以下のユーティリティクラスが利用可能です。
        </p>
        <div className="border border-border bg-surface rounded-xl divide-y divide-border overflow-hidden shadow-sm">
          {TYPOGRAPHY.map((typo) => (
            <div
              key={typo.name}
              className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between"
            >
              {/* Scale Info */}
              <div className="md:w-1/3">
                <div className="flex items-baseline gap-2 mb-1">
                  <code className="text-body font-bold text-action-primary font-mono">
                    {typo.name}
                  </code>
                  <span className="text-caption text-text-muted">({typo.size})</span>
                </div>
                <div className="text-caption font-medium text-text-default">{typo.label}</div>
              </div>
              {/* Sample */}
              <div className="flex-1 overflow-hidden">
                <span className={`${typo.name} font-bold text-text-default truncate block`}>
                  {typo.sample}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout & Corner Radius Guidelines */}
      <div id="tokens-layout" className="scroll-mt-20 space-y-6">
        <h3 className="text-heading font-bold text-text-default pl-2 border-l-4 border-action-primary">
          レイアウト・角丸設計規約 (Spacing & Corner Radius)
        </h3>
        <div className="border border-border bg-surface rounded-xl p-6 md:p-8 space-y-4 shadow-sm">
          <p className="text-body text-text-default leading-relaxed">
            デザインシステムを一貫させつつ、コードの肥大化を防ぐため、**余白（間隔）や角丸の指定は独自の変数化をせず、Tailwind
            CSS v4の標準ユーティリティクラスに完全に依存します。**
          </p>
          <ul className="list-disc list-inside space-y-2 text-body text-text-muted pl-2">
            <li>
              <strong className="text-text-default">余白 (Margin / Padding)</strong>: 主に `p-4`,
              `p-6`, `p-8` / `gap-4`, `gap-6`
              等を使用し、要素同士の規則的なジャンプ（4の倍数ピクセル）を徹底します。
            </li>
            <li>
              <strong className="text-text-default">角丸 (Border Radius)</strong>: カード類は
              `rounded-xl`、バッジ等は `rounded-full`
              を適用して、プロダクトに一貫したソフトな印象を与えます。
            </li>
          </ul>
        </div>
      </div>

      {/* Accessibility & Icon Guidelines */}
      <div id="tokens-accessibility" className="scroll-mt-20 space-y-6">
        <h3 className="text-heading font-bold text-text-default pl-2 border-l-4 border-action-primary">
          アクセシビリティ・アイコン規約 (Accessibility & Icons)
        </h3>
        <div className="border border-border bg-surface rounded-xl p-6 md:p-8 space-y-4 shadow-sm">
          <p className="text-body text-text-default leading-relaxed">
            デジタル庁（DADS）のアクセシビリティ設計方針にならい、情報がすべての人に正しく伝わるよう実装します。
          </p>
          <ul className="list-disc list-inside space-y-3 text-body text-text-muted pl-2">
            <li>
              <strong className="text-text-default">アイコン用SVGマークアップ</strong>:
              装飾目的のアイコンには `aria-hidden="true"` を必ず付与します。
            </li>
            <li>
              <strong className="text-text-default">代替テキストの提供</strong>:
              文字を含まないアイコンのみのボタン（例: `RoundButton`）では、必ず適切な `aria-label`
              を渡して何をおこなうボタンかをスクリーンリーダーに明示します。
            </li>
            <li>
              <strong className="text-text-default">コントラスト比</strong>:
              すべての背景色とテキスト色の組み合わせは、WCAG 2.1
              レベルAA（コントラスト比4.5:1以上）を保証します。
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
