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
    </div>
  )
}
