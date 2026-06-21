import { Link, createFileRoute } from '@tanstack/react-router'
import { SimpleButton } from '~/components/ui/SimpleButton'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-caption text-text-muted">Frontend Engineer</p>
      <h1 className="mt-2 text-display font-bold text-text-default">
        フロントエンドエンジニアの
        <br />
        ポートフォリオサイトです
      </h1>
      <p className="mt-6 max-w-2xl text-body text-text-muted">
        TanStack Start・Tailwind CSS・cvaを用いて構築しています。右上のテーマ切り替えから、
        見た目のバリエーションを試せます。
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/career">
          <SimpleButton.Primary>職務経歴を見る</SimpleButton.Primary>
        </Link>
        <Link to="/works">
          <SimpleButton.Secondary>実績を見る</SimpleButton.Secondary>
        </Link>
      </div>
    </div>
  )
}
