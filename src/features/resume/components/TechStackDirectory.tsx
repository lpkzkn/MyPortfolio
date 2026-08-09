import type { TechNode } from '~/types/tech-stack'

interface TechStackDirectoryProps {
  techStack: TechNode[]
}

export function TechStackDirectory({ techStack }: TechStackDirectoryProps) {
  // フラットまたは階層的に全スキルをセマンティックに展開する
  const renderNodes = (nodes: TechNode[], level = 0) => {
    return (
      <ul className={`space-y-3 ${level > 0 ? 'mt-2 pl-4 border-l border-border' : ''}`}>
        {nodes.map((node) => (
          <li key={node.id} className="text-body">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-text-default flex items-center gap-2">
                <span className="text-action-primary text-xs">●</span>
                {node.name}
              </span>
              <span className="text-caption font-bold text-action-primary bg-action-secondary px-2 py-0.5 rounded">
                スコア: {node.score}/100
              </span>
            </div>
            {node.comment && (
              <p className="mt-1 text-caption text-text-muted leading-relaxed">{node.comment}</p>
            )}
            {node.children && node.children.length > 0 && renderNodes(node.children, level + 1)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="mt-8 border-t border-border pt-8">
      <details className="group rounded-xl border border-border bg-surface p-4 transition-colors">
        <summary className="flex cursor-pointer items-center justify-between font-bold text-text-default hover:text-action-primary">
          <span className="text-heading text-sm sm:text-base flex items-center gap-2">
            📋 全技術スタック・スキル詳細一覧（テキスト版）
          </span>
          <span className="text-caption text-text-muted group-open:rotate-180 transition-transform duration-200">
            ▼
          </span>
        </summary>
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-caption text-text-muted mb-4">
            ※
            上記のインタラクティブ・レーダーチャートに含まれる全技術スタックのスコアと解説の一覧です。
          </p>
          {renderNodes(techStack)}
        </div>
      </details>
    </div>
  )
}
