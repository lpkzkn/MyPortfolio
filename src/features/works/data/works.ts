export type WorkItem = {
  slug: string
  title: string
  summary: string
  techStack: string[]
  url?: string
}

export const workItems: WorkItem[] = [
  {
    slug: 'my-portfolio',
    title: 'MyPortfolio（このサイト）',
    summary:
      'TanStack Start・Tailwind CSS・cvaを用いた、テーマ切り替え可能なデザインシステムを持つポートフォリオサイト。',
    techStack: ['TanStack Start', 'TypeScript', 'Tailwind CSS', 'Biome'],
  },
]
