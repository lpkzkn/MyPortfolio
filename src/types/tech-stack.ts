export interface TechNode {
  id: string
  name: string
  score: number // 0 to 100
  children?: TechNode[]
}
