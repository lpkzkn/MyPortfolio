import type { CatalogItem } from '../data/catalog-items'

interface DemoBlockProps {
  item: CatalogItem
}

export function DemoBlock({ item }: DemoBlockProps) {
  return (
    <div
      id={item.name}
      className="scroll-mt-20 border border-border bg-surface rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-heading font-bold text-text-default mb-2">{item.name}</h3>
      <p className="text-body text-text-muted mb-8 leading-relaxed">{item.description}</p>

      <div className="space-y-8">
        {item.demos.map((demo) => (
          <div
            key={demo.label}
            className="border border-border rounded-xl overflow-hidden bg-surface-subtle"
          >
            {/* Header / Label */}
            <div className="border-b border-border bg-surface px-4 py-2.5 flex items-center justify-between">
              <span className="text-caption font-bold text-text-default tracking-wider">
                {demo.label}
              </span>
            </div>

            {/* Preview Area */}
            <div className="p-6 md:p-8 flex items-center justify-center min-h-[120px] bg-surface">
              <div className="flex flex-wrap gap-4 items-center justify-center">{demo.render}</div>
            </div>

            {/* Code Snippet Area */}
            <div className="border-t border-border bg-surface-subtle p-4 font-mono text-caption text-text-muted overflow-x-auto whitespace-pre">
              <code>{demo.snippet}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
