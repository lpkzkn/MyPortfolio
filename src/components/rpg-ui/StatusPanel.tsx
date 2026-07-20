import React from 'react'
import type { TechNode } from '../../types/tech-stack'

interface StatusPanelProps {
  activeNode: TechNode | null
  rootNodes: TechNode[]
  onItemClick?: (node: TechNode) => void
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ activeNode, rootNodes, onItemClick }) => {
  const [selectedId, setSelectedId] = React.useState<string | undefined>(undefined)
  const currentNodes = activeNode?.children || rootNodes
  const title = activeNode ? activeNode.name : '全体ステータス'

  // Reset selectedId when activeNode changes (e.g. drilling down/up)
  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset selectedId on activeNode change
  React.useEffect(() => {
    setSelectedId(undefined)
  }, [activeNode?.id])

  return (
    <div className="w-full bg-surface border-2 border-action-primary/30 rounded-lg p-4 font-mono text-text-default shadow-sm transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border pb-2 mb-4">
        <h3 className="text-sm font-bold tracking-wider text-action-primary">
          :: {title.toUpperCase()} ::
        </h3>
      </div>

      {/* Nodes List */}
      <div className="space-y-3">
        {currentNodes.map((node) => {
          const hasChildren = !!node.children?.length
          const isSelected = selectedId === node.id
          return (
            /* biome-ignore lint/a11y/useKeyWithClickEvents: non-interactive items don't have hover styles anyway */
            <div
              key={node.id}
              onClick={() => {
                if (hasChildren) {
                  onItemClick?.(node)
                } else if (node.comment) {
                  setSelectedId(isSelected ? undefined : node.id)
                }
              }}
              className={`p-2 rounded border transition-all ${
                hasChildren
                  ? 'cursor-pointer hover:bg-action-primary/10 border-transparent hover:border-action-primary/20'
                  : node.comment
                    ? 'cursor-pointer hover:bg-action-primary/5 border-transparent'
                    : 'border-transparent'
              } ${isSelected ? 'bg-action-primary/10 border-action-primary/30!' : ''}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold flex items-center gap-1">
                  {hasChildren && <span className="text-action-primary">▶</span>}
                  {node.name}
                </span>
                <span className="text-xs text-action-primary font-bold">{node.score}</span>
              </div>

              {/* RPG HP/MP style gauge bar */}
              <div className="w-full h-2 bg-surface-subtle rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-action-primary transition-all duration-1000 ease-out"
                  style={{ width: `${node.score}%` }}
                />
              </div>

              {/* Flavor text / Comment inside the item */}
              {isSelected && node.comment && (
                <div className="mt-2 p-2 bg-action-primary/5 border border-dashed border-action-primary/20 rounded text-[11px] text-text-muted italic leading-relaxed">
                  &gt; {node.comment}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default StatusPanel
