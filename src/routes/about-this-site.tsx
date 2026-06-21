import { createFileRoute } from '@tanstack/react-router'
import { RoundButton } from '~/components/ui/RoundButton'
import { SimpleButton } from '~/components/ui/SimpleButton'

export const Route = createFileRoute('/about-this-site')({
  component: AboutThisSitePage,
})

function AboutThisSitePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-display font-bold text-text-default">このサイトについて</h1>
      <p className="mt-4 max-w-2xl text-body text-text-muted">
        このポートフォリオサイト自体が、再利用可能で保守性の高いUIアーキテクチャを設計する力を
        示すための題材になっています。
      </p>

      <section className="mt-12">
        <h2 className="text-heading font-bold text-text-default">技術スタック</h2>
        <ul className="mt-4 grid grid-cols-1 gap-2 text-body text-text-muted sm:grid-cols-2">
          <li>ランタイム / パッケージ管理: Bun</li>
          <li>フレームワーク: TanStack Start（静的プリレンダリング）</li>
          <li>スタイリング: Tailwind CSS v4</li>
          <li>バリアント管理: class-variance-authority (cva)</li>
          <li>Lint / Format: Biome</li>
          <li>ホスティング: GitHub Pages + GitHub Actions</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-heading font-bold text-text-default">デザイントークン設計</h2>
        <p className="mt-4 max-w-2xl text-body text-text-muted">
          色はPrimitive（生の値）→ Semantic（意味づけ）の2層構造でCSS変数として管理しています。
          コンポーネント側はSemanticトークンのみを参照するため、テーマファイルを1つ追加するだけで
          コンポーネント側の変更なしに新しい配色を全体に反映できます。
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-heading font-bold text-text-default">UIコンポーネントカタログ</h2>
        <p className="mt-4 max-w-2xl text-body text-text-muted">
          形状ごとにコンポーネントを分離し（SimpleButton / RoundButton）、それぞれの内部で
          cvaにより色・サイズのバリアントを型安全に管理しています。Compound
          Componentsパターンにより、呼び出し側は<code>variant="primary"</code>
          のような文字列ではなく<code>{'<SimpleButton.Primary>'}</code>
          という形でバリエーションを選択します。
        </p>

        <div className="mt-6 space-y-8">
          <div>
            <h3 className="text-body font-medium text-text-muted">SimpleButton</h3>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <SimpleButton.Primary>Primary</SimpleButton.Primary>
              <SimpleButton.Secondary>Secondary</SimpleButton.Secondary>
              <SimpleButton.Danger>Danger</SimpleButton.Danger>
              <SimpleButton.Primary size="sm">Small</SimpleButton.Primary>
              <SimpleButton.Primary size="lg">Large</SimpleButton.Primary>
              <SimpleButton.Primary loading>Loading</SimpleButton.Primary>
            </div>
          </div>

          <div>
            <h3 className="text-body font-medium text-text-muted">RoundButton</h3>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RoundButton.Primary aria-label="追加">＋</RoundButton.Primary>
              <RoundButton.Secondary aria-label="閉じる">×</RoundButton.Secondary>
              <RoundButton.Danger aria-label="削除">×</RoundButton.Danger>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-heading font-bold text-text-default">ソースコード</h2>
        <p className="mt-4 max-w-2xl text-body text-text-muted">
          このサイトのソースコードはGitHubで公開しています。
        </p>
        <a
          href="https://github.com/lpkzkn/MyPortfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-body text-text-muted underline underline-offset-4 hover:text-text-default transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          github.com/lpkzkn/MyPortfolio
        </a>
      </section>
    </div>
  )
}
