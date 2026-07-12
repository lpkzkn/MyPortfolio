import { describe, expect, test } from 'bun:test'
import { getRadarPoints } from './radar'

describe('getRadarPoints', () => {
  test('calculates correct points for 4 axes', () => {
    const data = [
      { id: '1', label: 'A', value: 100 },
      { id: '2', label: 'B', value: 100 },
      { id: '3', label: 'C', value: 100 },
      { id: '4', label: 'D', value: 100 },
    ]
    // Center at (100, 100), max radius 100, max value 100.
    // 4 axes:
    // Axis 0 (top, -PI/2): (100, 0)
    // Axis 1 (right, 0): (200, 100)
    // Axis 2 (bottom, PI/2): (100, 200)
    // Axis 3 (left, PI): (0, 100)
    const pointsStr = getRadarPoints(data, 100, 100, 100, 100)
    const points = pointsStr.split(' ').map((p) => p.split(',').map(Number))

    const p0 = points[0] as [number, number]
    const p1 = points[1] as [number, number]
    const p2 = points[2] as [number, number]
    const p3 = points[3] as [number, number]

    expect(p0[0]).toBeCloseTo(100)
    expect(p0[1]).toBeCloseTo(0)

    expect(p1[0]).toBeCloseTo(200)
    expect(p1[1]).toBeCloseTo(100)

    expect(p2[0]).toBeCloseTo(100)
    expect(p2[1]).toBeCloseTo(200)

    expect(p3[0]).toBeCloseTo(0)
    expect(p3[1]).toBeCloseTo(100)
  })
})
