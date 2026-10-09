export type WorkItem = {
  slug: string
  title: string
  summary: string
  techStack: string[]
  url?: string
}

export const workItems: WorkItem[] = [
  {
    slug: 'gaya-wheel',
    title: 'がやがやルーレット',
    summary:
      '画面共有いらず！全員参加のリアルタイムWebルーレット。URLを貼るだけで最大64人が同時観戦でき、全員のマウスポインタの動きや実況チャットで盛り上がれる参加型アプリです。登録不要ですぐに使えます。',
    techStack: ['Rust', 'egui', 'WebAssembly', 'WebSocket', 'Cloudflare'],
    url: 'https://gaya-wheel.app/',
  },
  {
    slug: 'my-portfolio',
    title: 'MyPortfolio（このサイト）',
    summary:
      'React 19・TanStack Start・Tailwind CSS v4 などの最先端の技術スタックを用いた、モダンでテーマ切り替え可能なデザインシステムを持つポートフォリオサイト。',
    techStack: ['TanStack Start', 'TypeScript', 'Tailwind CSS', 'Biome'],
  },
]
