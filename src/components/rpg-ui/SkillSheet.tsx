import React, { useState } from 'react'
import { techStackData } from '../../data/tech-stack'
import type { TechNode } from '../../types/tech-stack'
import { RadarChart } from './RadarChart'
import type { RadarChartData } from './RadarChart'
import { StatusPanel } from './StatusPanel'

export const SkillSheet: React.FC = () => {
  const [activeNode, setActiveNode] = useState<TechNode | null>(null)
  const [history, setHistory] = useState<TechNode[]>([])

  const currentNodes = activeNode ? activeNode.children || [] : techStackData

  const chartData: RadarChartData[] = currentNodes.map((node) => ({
    id: node.id,
    label: node.name,
    value: node.score,
  }))

  const handleItemClick = (node: TechNode) => {
    if (node.id === activeNode?.id) return
    if (node.children && node.children.length > 0) {
      setHistory((prev) => (activeNode ? [...prev, activeNode] : []))
      setActiveNode(node)
    }
  }

  const handleLabelClick = (id: string) => {
    const targetNode = currentNodes.find((n) => n.id === id)
    if (targetNode) {
      handleItemClick(targetNode)
    }
  }

  const handleBreadcrumbClick = (node: TechNode | null, index: number) => {
    if (node?.id === activeNode?.id) return
    const newHistory = index > 0 ? history.slice(0, index - 1) : []
    setHistory(newHistory)
    setActiveNode(node)
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
              onClick={() => handleBreadcrumbClick(bc.node, idx)}
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
            rootNodes={techStackData}
            onItemClick={handleItemClick}
          />
        </div>
      </div>
    </div>
  )
}
export default SkillSheet
