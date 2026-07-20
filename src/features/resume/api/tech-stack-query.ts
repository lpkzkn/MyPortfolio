import type { TechNode } from '~/types/tech-stack'
import csvContent from '../../../data/tech-stack.csv?raw'

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let cell = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(cell.trim())
      cell = ''
    } else {
      cell += char
    }
  }
  result.push(cell.trim())
  return result
}

export function getTechStack(): TechNode[] {
  const lines = csvContent.split(/\r?\n/).filter((line) => line.trim() !== '')

  // Skip header line
  const dataLines = lines.slice(1)

  interface FlatNode {
    id: string
    parentId: string
    name: string
    score: number
    comment?: string
  }

  const flatNodes: FlatNode[] = dataLines
    .map((line) => {
      const [id, parentId, name, scoreStr, comment] = parseCSVLine(line)
      return {
        id: id || '',
        parentId: parentId || '',
        name: name || '',
        score: Number.parseInt(scoreStr || '0', 10),
        comment: comment || undefined,
      }
    })
    .filter((node) => node.id !== '')

  // Build hierarchical tree structure
  const nodeMap = new Map<string, TechNode & { parentId: string }>()

  // Initial pass: create all nodes
  for (const item of flatNodes) {
    nodeMap.set(item.id, {
      id: item.id,
      name: item.name,
      score: item.score,
      parentId: item.parentId,
      comment: item.comment,
      children: [],
    })
  }

  const roots: TechNode[] = []

  // Second pass: establish parent-child relationships
  for (const node of nodeMap.values()) {
    if (node.parentId === '') {
      roots.push(node)
    } else {
      const parent = nodeMap.get(node.parentId)
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(node)
      } else {
        roots.push(node)
      }
    }
  }

  // Clean up empty children arrays to match TechNode interface
  const cleanTree = (nodes: TechNode[]): TechNode[] => {
    return nodes.map((n) => {
      const cleaned: TechNode = {
        id: n.id,
        name: n.name,
        score: n.score,
      }
      if (n.comment) {
        cleaned.comment = n.comment
      }
      if (n.children && n.children.length > 0) {
        cleaned.children = cleanTree(n.children)
      }
      return cleaned
    })
  }

  return cleanTree(roots)
}
