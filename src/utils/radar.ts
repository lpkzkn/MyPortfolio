export interface RadarPointData {
  value: number
}

export function getRadarPoints(
  data: RadarPointData[],
  cx: number,
  cy: number,
  rMax: number,
  maxVal: number,
): string {
  const n = data.length
  if (n === 0) return ''
  return data
    .map((d, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2
      const r = rMax * (d.value / maxVal)
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      return `${x},${y}`
    })
    .join(' ')
}
