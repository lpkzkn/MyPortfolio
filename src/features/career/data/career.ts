export type CareerItem = {
  id: string
  company: string
  role: string
  period: string
  description: string
  techStack: string[]
}

/**
 * サンプルデータ。実際の職務経歴に差し替えて使う。
 * id は career.$id のようなルートを将来追加する場合のキーとして利用できる。
 */
export const careerItems: CareerItem[] = [
  {
    id: 'sample-company-a',
    company: '株式会社サンプル',
    role: 'フロントエンドエンジニア',
    period: '2023.04 - 現在',
    description:
      '自社プロダクトのフロントエンド開発全般を担当。デザインシステムの構築やパフォーマンス改善を主導。',
    techStack: ['TypeScript', 'React', 'Next.js'],
  },
]
