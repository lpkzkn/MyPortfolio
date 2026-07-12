import type React from 'react'
import { useState } from 'react'
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

  const handleBackClick = () => {
    if (history.length > 0) {
      const newHistory = [...history]
      const prev = newHistory.pop() || null
      setHistory(newHistory)
      setActiveNode(prev)
    } else {
      setActiveNode(null)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-950 border-4 border-double border-purple-900/50 rounded-xl font-mono text-slate-100 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
      {/* Title Header */}
      <div className="text-center mb-8 border-b-4 border-double border-purple-900/30 pb-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          CHARACTER ABILITY STATUS
        </h2>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
          Anonymized developer tech-stack parameters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Radar Chart */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-900/40 p-4 rounded-lg border border-slate-800">
          {chartData.length > 0 ? (
            <RadarChart data={chartData} onLabelClick={handleLabelClick} />
          ) : (
            <div className="w-full max-w-[300px] aspect-square flex items-center justify-center border border-slate-800 rounded bg-slate-950/50 text-slate-500">
              No Data Available
            </div>
          )}
          <p className="text-[10px] text-slate-500 mt-2 text-center">
            {activeNode
              ? '* Click sub-categories to explore (if expandable)'
              : '* Click major categories to drill down'}
          </p>
        </div>

        {/* Right Side: Status Details */}
        <div className="md:col-span-7 h-full flex flex-col justify-start">
          <StatusPanel
            activeNode={activeNode}
            rootNodes={techStackData}
            onItemClick={handleItemClick}
            onBackClick={handleBackClick}
          />
        </div>
      </div>
    </div>
  )
}
export default SkillSheet
