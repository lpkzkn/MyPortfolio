import type { TechNode } from '../types/tech-stack'

export const techStackData: TechNode[] = [
  {
    id: 'frontend',
    name: 'フロントエンド',
    score: 85,
    children: [
      {
        id: 'fe-app',
        name: 'Webアプリ開発',
        score: 90,
        children: [
          { id: 'react', name: 'React / Next.js', score: 95 },
          { id: 'typescript', name: 'TypeScript', score: 90 },
          { id: 'tailwind', name: 'Tailwind CSS', score: 85 },
        ],
      },
      {
        id: 'fe-game',
        name: 'ゲーム開発',
        score: 70,
        children: [
          { id: 'unity', name: 'Unity / C#', score: 75 },
          { id: 'canvas', name: 'HTML5 Canvas', score: 65 },
        ],
      },
      {
        id: 'fe-tooling',
        name: '品質・ツール',
        score: 80,
        children: [
          { id: 'playwright', name: 'E2E (Playwright)', score: 85 },
          { id: 'vite', name: 'Vite / Build Tools', score: 80 },
        ],
      },
    ],
  },
  {
    id: 'backend',
    name: 'バックエンド',
    score: 80,
    children: [
      {
        id: 'be-lang',
        name: '言語・フレームワーク',
        score: 85,
        children: [
          { id: 'nodejs', name: 'Node.js (NestJS)', score: 85 },
          { id: 'golang', name: 'Go', score: 75 },
          { id: 'python', name: 'Python (FastAPI)', score: 80 },
        ],
      },
      {
        id: 'be-db',
        name: 'データベース',
        score: 75,
        children: [
          { id: 'postgresql', name: 'PostgreSQL', score: 80 },
          { id: 'redis', name: 'Redis', score: 70 },
        ],
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'インフラ',
    score: 75,
    children: [
      {
        id: 'infra-cloud',
        name: 'クラウド',
        score: 80,
        children: [
          { id: 'aws', name: 'AWS (ECS/Lambda)', score: 80 },
          { id: 'gcp', name: 'Google Cloud', score: 70 },
        ],
      },
      {
        id: 'infra-cicd',
        name: 'CI/CD & IaC',
        score: 75,
        children: [
          { id: 'github-actions', name: 'GitHub Actions', score: 85 },
          { id: 'terraform', name: 'Terraform', score: 70 },
        ],
      },
    ],
  },
  {
    id: 'process',
    name: 'プロセス',
    score: 90,
    children: [
      {
        id: 'proc-agile',
        name: 'アジャイル開発',
        score: 90,
        children: [
          { id: 'scrum', name: 'スクラム運営', score: 95 },
          { id: 'ci', name: '継続的インテグレーション', score: 85 },
        ],
      },
      {
        id: 'proc-design',
        name: '設計手法',
        score: 85,
        children: [
          { id: 'ddd', name: 'ドメイン駆動設計 (DDD)', score: 80 },
          { id: 'clean-arch', name: 'クリーンアーキテクチャ', score: 85 },
        ],
      },
    ],
  },
]
