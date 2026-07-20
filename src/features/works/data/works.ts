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
      'React 19・TanStack Start・Tailwind CSS v4 などの最先端の技術スタックを用いた、モダンでテーマ切り替え可能なデザインシステムを持つポートフォリオサイト。',
    techStack: ['TanStack Start', 'TypeScript', 'Tailwind CSS', 'Biome'],
  },
]
