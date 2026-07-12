import type React from 'react'
import type { TechNode } from '../../types/tech-stack'

interface StatusPanelProps {
  activeNode: TechNode | null
  rootNodes: TechNode[]
  onItemClick?: (node: TechNode) => void
  onBackClick?: () => void
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  activeNode,
  rootNodes,
  onItemClick,
  onBackClick,
}) => {
  const currentNodes = activeNode?.children || rootNodes
  const title = activeNode ? activeNode.name : '全体ステータス'

  return (
    <div className="w-full bg-slate-900 border-2 border-purple-500/50 rounded-lg p-4 font-mono text-slate-100 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-purple-500/30 pb-2 mb-4">
        <h3 className="text-sm font-bold tracking-wider text-purple-400">
          :: {title.toUpperCase()} ::
        </h3>
        {activeNode && (
          <button
            type="button"
            onClick={onBackClick}
            className="text-xs px-2 py-1 bg-purple-950/50 border border-purple-500/30 rounded hover:bg-purple-900/50 hover:border-purple-400 transition-all cursor-pointer"
          >
            ◀ BACK
          </button>
        )}
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
                  ? 'cursor-pointer hover:bg-purple-950/20 hover:border-purple-500/20'
                  : ''
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold flex items-center gap-1">
                  {hasChildren && <span className="text-purple-400">▶</span>}
                  {node.name}
                </span>
                <span className="text-xs text-purple-300 font-bold">LV.{node.score}</span>
              </div>

              {/* RPG HP/MP style gauge bar */}
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 transition-all duration-1000 ease-out"
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
