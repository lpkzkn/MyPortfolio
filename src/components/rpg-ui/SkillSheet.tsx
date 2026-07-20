import React, { useState } from 'react'
import type { TechNode } from '../../types/tech-stack'
import { RadarChart } from './RadarChart'
import type { RadarChartData } from './RadarChart'
import { StatusPanel } from './StatusPanel'

interface SkillSheetProps {
  techStack: TechNode[]
  activeNodeId?: string
  onChangeActiveNodeId?: (id: string | undefined) => void
}

export const SkillSheet: React.FC<SkillSheetProps> = ({
  techStack,
  activeNodeId: propActiveNodeId,
  onChangeActiveNodeId,
}) => {
  const isControlled = propActiveNodeId !== undefined || onChangeActiveNodeId !== undefined
  const [localActiveNodeId, setLocalActiveNodeId] = useState<string | undefined>(undefined)

  const activeNodeId = isControlled ? propActiveNodeId : localActiveNodeId

  const handleSetActiveNodeId = (id: string | undefined) => {
    if (isControlled) {
      onChangeActiveNodeId?.(id)
    } else {
      setLocalActiveNodeId(id)
    }
  }

  // Helper to find target node and its parents
  const findNodeAndParents = React.useCallback(
    (
      nodes: TechNode[],
      targetId: string,
      parents: TechNode[] = [],
    ): { node: TechNode; parents: TechNode[] } | null => {
      for (const node of nodes) {
        if (node.id === targetId) {
          return { node, parents }
        }
        if (node.children) {
          const result = findNodeAndParents(node.children, targetId, [...parents, node])
          if (result) return result
        }
      }
      return null
    },
    [],
  )

  const { activeNode, history } = React.useMemo(() => {
    if (!activeNodeId) {
      return { activeNode: null, history: [] }
    }
    const result = findNodeAndParents(techStack, activeNodeId)
    if (result) {
      return { activeNode: result.node, history: result.parents }
    }
    return { activeNode: null, history: [] }
  }, [activeNodeId, findNodeAndParents, techStack])

  const currentNodes = activeNode ? activeNode.children || [] : techStack

  const chartData: RadarChartData[] = currentNodes.map((node) => ({
    id: node.id,
    label: node.name,
    value: node.score,
  }))

  const handleItemClick = (node: TechNode) => {
    if (node.id === activeNode?.id) return
    if (node.children && node.children.length > 0) {
      handleSetActiveNodeId(node.id)
    }
  }

  const handleLabelClick = (id: string) => {
    const targetNode = currentNodes.find((n) => n.id === id)
    if (targetNode) {
      handleItemClick(targetNode)
    }
  }

  const handleBreadcrumbClick = (node: TechNode | null) => {
    if (node?.id === activeNode?.id) return
    handleSetActiveNodeId(node ? node.id : undefined)
  }

  // Generate breadcrumb path
  const getBreadcrumbs = () => {
    const path: { name: string; node: TechNode | null }[] = [{ name: '全体ステータス', node: null }]
    for (let i = 0; i < history.length; i++) {
      const hNode = history[i]
      if (hNode) {
        path.push({ name: hNode.name, node: hNode })
      }
    }
    if (activeNode) {
      path.push({ name: activeNode.name, node: activeNode })
    }
    return path
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-surface border-4 border-double border-action-primary/30 rounded-xl font-mono text-text-default shadow-sm transition-all duration-300">
      {/* Title Header */}
      <div className="text-center mb-6 border-b border-border pb-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-widest text-action-primary drop-shadow-[0_0_8px_var(--color-action-primary)]">
          能力ステータス
        </h2>
        <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
          技術スタックの習得レベルとバランス
        </p>
      </div>

      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-text-muted mb-6">
        {getBreadcrumbs().map((bc, idx, arr) => (
          <React.Fragment key={bc.node ? bc.node.id : 'root'}>
            {idx > 0 && <span className="text-border">/</span>}
            <button
              type="button"
              onClick={() => handleBreadcrumbClick(bc.node)}
              className={`hover:text-action-primary transition-colors cursor-pointer ${
                idx === arr.length - 1 ? 'text-action-primary font-bold' : ''
              }`}
            >
              {bc.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Radar Chart */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-surface-subtle p-4 rounded-lg border border-border">
          {chartData.length > 0 ? (
            <RadarChart
              key={activeNode ? activeNode.id : 'root'}
              data={chartData}
              onLabelClick={handleLabelClick}
            />
          ) : (
            <div className="w-full max-w-[300px] aspect-square flex items-center justify-center border border-border rounded bg-surface text-text-muted">
              No Data Available
            </div>
          )}
          <p className="text-[10px] text-text-muted mt-2 text-center">
            {activeNode
              ? '* 下位項目をクリックしてさらに探索'
              : '* 項目名をクリックしてドリルダウン'}
          </p>
        </div>

        {/* Right Side: Status Details */}
        <div className="md:col-span-7 h-full flex flex-col justify-start">
          <StatusPanel
            activeNode={activeNode}
            rootNodes={techStack}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
    </div>
  )
}
export default SkillSheet
