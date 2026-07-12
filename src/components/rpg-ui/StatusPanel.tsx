import type React from 'react'
import type { TechNode } from '../../types/tech-stack'

interface StatusPanelProps {
  activeNode: TechNode | null
  rootNodes: TechNode[]
  onItemClick?: (node: TechNode) => void
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ activeNode, rootNodes, onItemClick }) => {
  const currentNodes = activeNode?.children || rootNodes
  const title = activeNode ? activeNode.name : '全体ステータス'

  return (
    <div className="w-full bg-surface border-2 border-action-primary/30 rounded-lg p-4 font-mono text-text-default shadow-sm transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border pb-2 mb-4">
        <h3 className="text-sm font-bold tracking-wider text-action-primary">
          :: {title.toUpperCase()} ::
        </h3>
      </div>

      {/* Nodes List */}
      <div className="space-y-4">
        {currentNodes.map((node) => {
          const hasChildren = !!node.children?.length
          return (
            /* biome-ignore lint/a11y/useKeyWithClickEvents: non-interactive items don't have hover styles anyway */
            <div
              key={node.id}
              onClick={() => hasChildren && onItemClick?.(node)}
              className={`p-2 rounded border border-transparent transition-all ${
                hasChildren
                  ? 'cursor-pointer hover:bg-action-primary/10 hover:border-action-primary/20'
                  : ''
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold flex items-center gap-1">
                  {hasChildren && <span className="text-action-primary">▶</span>}
                  {node.name}
                </span>
                <span className="text-xs text-action-primary font-bold">LV.{node.score}</span>
              </div>

              {/* RPG HP/MP style gauge bar */}
              <div className="w-full h-2 bg-surface-subtle rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-action-primary transition-all duration-1000 ease-out"
                  style={{ width: `${node.score}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default StatusPanel
