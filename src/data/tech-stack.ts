import type { TechNode } from '../types/tech-stack'

export const techStackData: TechNode[] = [
  {
    id: 'frontend',
    name: 'フロントエンド',
    score: 95,
    children: [
      {
        id: 'fe-web',
        name: 'Webアプリ開発',
        score: 92,
        children: [
          { id: 'react', name: 'React / Next.js', score: 95 },
          { id: 'vuejs', name: 'VueJS', score: 85 },
          { id: 'typescript', name: 'TypeScript', score: 92 },
          { id: 'tailwind', name: 'Tailwind CSS', score: 90 },
        ],
      },
      {
        id: 'fe-mobile-cross',
        name: 'モバイル・ゲーム開発',
        score: 90,
        children: [
          { id: 'react-native', name: 'React-Native', score: 92 },
          { id: 'flutter', name: 'Flutter', score: 88 },
          { id: 'unity', name: 'Unity', score: 80 },
          { id: 'cocos-2d', name: 'Cocos-2d', score: 75 },
        ],
      },
      {
        id: 'fe-native-lang',
        name: 'ネイティブ言語・プラットフォーム',
        score: 85,
        children: [
          { id: 'swift', name: 'Swift / Objective-C', score: 90 },
          { id: 'kotlin', name: 'Kotlin / Java', score: 85 },
          { id: 'csharp', name: 'C# / C++', score: 80 },
        ],
      },
    ],
  },
  {
    id: 'backend',
    name: 'バックエンド',
    score: 20,
    children: [
      {
        id: 'be-api',
        name: 'サーバー開発（サポート程度）',
        score: 25,
        children: [
          { id: 'nodejs-basic', name: 'Node.js 基礎知識', score: 30 },
          { id: 'api-integration', name: 'Web API連携開発', score: 40 },
        ],
      },
      {
        id: 'be-db',
        name: 'データベース操作',
        score: 15,
        children: [{ id: 'db-query-basic', name: 'SQLクエリ基本操作', score: 25 }],
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'インフラ・クラウド',
    score: 35,
    children: [
      {
        id: 'infra-cloud',
        name: 'クラウド・モバイルバックエンド',
        score: 30,
        children: [
          { id: 'gcp-cloudrun', name: 'GCP / CloudRun 運用経験', score: 35 },
          { id: 'firebase', name: 'Firebase (Auth/Store/FCM)', score: 65 },
          { id: 'log-explorer', name: 'GCP ログエクスプローラ監視', score: 50 },
        ],
      },
      {
        id: 'infra-analytics-sdk',
        name: '計測・分析・各種SDK連携',
        score: 75,
        children: [
          { id: 'bigquery', name: 'Big Query データ抽出', score: 60 },
          { id: 'google-analytics', name: 'Google Analytics / GTM', score: 80 },
          { id: 'appsflyer', name: 'AppsFlyer / Adjust', score: 85 },
          { id: 'crashlytics', name: 'Firebase Crashlytics', score: 90 },
          { id: 'googlemap-sdk', name: 'GoogleMapSDK 連携', score: 85 },
        ],
      },
    ],
  },
  {
    id: 'process',
    name: 'プロセス・品質',
    score: 85,
    children: [
      {
        id: 'proc-testing',
        name: '自動テスト・品質保証',
        score: 88,
        children: [
          { id: 'playwright', name: 'Playwright (E2E)', score: 90 },
          { id: 'bdd', name: 'BDD (振る舞い駆動開発)', score: 85 },
        ],
      },
      {
        id: 'proc-ci-delivery',
        name: 'CI/CD & デリバリー',
        score: 85,
        children: [
          { id: 'github-actions', name: 'GitHub Actions', score: 90 },
          { id: 'jenkins', name: 'Jenkins', score: 75 },
          { id: 'store-delivery', name: 'App Store / Google Play配信', score: 95 },
        ],
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI・エージェント',
    score: 90,
    children: [
      {
        id: 'ai-agentic',
        name: 'エージェント志向開発',
        score: 90,
        children: [
          { id: 'agentic-coding', name: 'Agentic Coding', score: 90 },
          { id: 'agent-skill', name: 'Agent SKILL', score: 85 },
          { id: 'sdd', name: 'SDD (仕様駆動開発)', score: 95 },
        ],
      },
    ],
  },
]
