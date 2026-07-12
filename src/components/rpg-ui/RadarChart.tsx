import React from 'react'
import { getRadarPoints } from '../../utils/radar'

export interface RadarChartData {
  id: string
  label: string
  value: number
}

interface RadarChartProps {
  data: RadarChartData[]
  maxVal?: number
  onLabelClick?: (id: string) => void
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, maxVal = 100, onLabelClick }) => {
  const cx = 150
  const cy = 150
  const rMax = 100
  const n = data.length

  const [animationPhase, setAnimationPhase] = React.useState<'idle' | 'circle' | 'grid' | 'value'>(
    'idle',
  )
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAnimationPhase('circle')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  React.useEffect(() => {
    if (animationPhase === 'circle') {
      const t1 = setTimeout(() => setAnimationPhase('grid'), 300)
      return () => clearTimeout(t1)
    }
    if (animationPhase === 'grid') {
      const t2 = setTimeout(() => setAnimationPhase('value'), 300)
      return () => clearTimeout(t2)
    }
  }, [animationPhase])

  // Grid levels (e.g., 20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0]

  // Calculate polygon points for each grid level
  const getGridPoints = (level: number) => {
    return data
      .map((_, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2
        const r = rMax * level
        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)
        return `${x},${y}`
      })
      .join(' ')
  }

  // Determine display values based on animation phase
  const displayData = animationPhase === 'value' ? data : data.map((d) => ({ ...d, value: 0 }))

  // Coordinates of data points
  const pointsStr = getRadarPoints(displayData, cx, cy, rMax, maxVal)

  const circleVisible = animationPhase !== 'idle'
  const gridVisible = animationPhase === 'grid' || animationPhase === 'value'

  return (
    <div ref={containerRef} className="relative w-full max-w-[300px] aspect-square mx-auto">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full overflow-visible drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
      >
        <title>Radar Chart</title>
        {/* Outer Circular Summoning Frame */}
        <circle
          cx={cx}
          cy={cy}
          r={rMax + 5}
          fill="none"
          stroke="currentColor"
          className={`text-purple-500/20 origin-center transition-all duration-700 ease-out ${
            circleVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          strokeWidth="1"
        />
        <circle
          cx={cx}
          cy={cy}
          r={rMax + 10}
          fill="none"
          stroke="currentColor"
          className={`text-purple-500/10 origin-center transition-all duration-700 ease-out ${
            circleVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          strokeWidth="0.5"
          strokeDasharray="4,4"
        />

        {/* Radar Web Grid Levels */}
        {levels.map((level) => (
          <polygon
            key={`grid-${level}`}
            points={getGridPoints(level)}
            fill="none"
            stroke="currentColor"
            className={`text-slate-700/40 origin-center transition-all duration-500 ease-out ${
              gridVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            strokeWidth="0.75"
          />
        ))}

        {/* Axis Web Lines */}
        {data.map((d, i) => {
          const angle = (2 * Math.PI * i) / n - Math.PI / 2
          const x = cx + rMax * Math.cos(angle)
          const y = cy + rMax * Math.sin(angle)
          return (
            <line
              key={`axis-${d.id}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="currentColor"
              className={`text-slate-700/40 origin-center transition-all duration-500 ease-out ${
                gridVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              strokeWidth="0.75"
            />
          )
        })}

        {/* Data Area Polygon */}
        <polygon
          points={pointsStr}
          fill="rgba(168, 85, 247, 0.25)"
          stroke="rgba(168, 85, 247, 0.85)"
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />

        {/* Data Corner Indicators (dots) */}
        {displayData.map((d, i) => {
          const angle = (2 * Math.PI * i) / n - Math.PI / 2
          const r = rMax * (d.value / maxVal)
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          return (
            /* biome-ignore lint/a11y/useKeyWithClickEvents: charting node interactive */
            <circle
              key={`indicator-${d.id}`}
              cx={x}
              cy={y}
              r="3.5"
              onClick={() => onLabelClick?.(d.id)}
              className="fill-purple-400 stroke-purple-600 cursor-pointer transition-all duration-700 ease-out"
              strokeWidth="1.5"
            />
          )
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const angle = (2 * Math.PI * i) / n - Math.PI / 2
          // Offset labels slightly outwards
          const labelDist = rMax + 18
          const x = cx + labelDist * Math.cos(angle)
          const y = cy + labelDist * Math.sin(angle) + 4 // slight vertical adjustment

          let textAnchor: 'middle' | 'start' | 'end' = 'middle'
          if (Math.cos(angle) > 0.1) textAnchor = 'start'
          if (Math.cos(angle) < -0.1) textAnchor = 'end'

          return (
            /* biome-ignore lint/a11y/useKeyWithClickEvents: label is clicked to drill down */
            <text
              key={`label-${d.id}`}
              x={x}
              y={y}
              textAnchor={textAnchor}
              onClick={() => onLabelClick?.(d.id)}
              className={`fill-slate-300 text-[11px] font-medium cursor-pointer select-none hover:fill-purple-400 transition-all duration-500 ease-out ${
                gridVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              {d.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
export default RadarChart
