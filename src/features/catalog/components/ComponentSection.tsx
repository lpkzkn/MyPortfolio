import { catalogItems } from '../data/catalog-items'
import { DemoBlock } from './DemoBlock'

export function ComponentSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-display font-bold text-text-default mb-2">共通コンポーネント</h2>
        <p className="text-body text-text-muted leading-relaxed">
          ポートフォリオサイト全体で使用されている再利用可能な UI パーツ群です。 CVA (Class Variance
          Authority) と Tailwind v4 を活用し、高い拡張性と型安全性を実現しています。
        </p>
      </div>

      <div className="space-y-16">
        {catalogItems.map((item) => (
          <DemoBlock key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}
