import type React from 'react'
import { Badge } from '~/components/ui/Badge'
import { Card } from '~/components/ui/Card'
import { RoundButton } from '~/components/ui/RoundButton/RoundButton'
import { SimpleButton } from '~/components/ui/SimpleButton/SimpleButton'

export interface CatalogDemo {
  label: string
  snippet: string
  render: React.ReactNode
}

export interface CatalogItem {
  name: string
  description: string
  demos: CatalogDemo[]
}

export const catalogItems: CatalogItem[] = [
  {
    name: 'SimpleButton',
    description:
      '基本となる長方形のボタンコンポーネント。インテント（種類）とサイズを指定可能です。',
    demos: [
      {
        label: 'Primary',
        snippet: '<SimpleButton.Primary>Primary Button</SimpleButton.Primary>',
        render: <SimpleButton.Primary>Primary Button</SimpleButton.Primary>,
      },
      {
        label: 'Secondary',
        snippet: '<SimpleButton.Secondary>Secondary Button</SimpleButton.Secondary>',
        render: <SimpleButton.Secondary>Secondary Button</SimpleButton.Secondary>,
      },
      {
        label: 'Danger',
        snippet: '<SimpleButton.Danger>Danger Button</SimpleButton.Danger>',
        render: <SimpleButton.Danger>Danger Button</SimpleButton.Danger>,
      },
      {
        label: 'Small Size',
        snippet: '<SimpleButton.Primary size="sm">Small Button</SimpleButton.Primary>',
        render: <SimpleButton.Primary size="sm">Small Button</SimpleButton.Primary>,
      },
      {
        label: 'Loading State',
        snippet: '<SimpleButton.Primary loading>Loading</SimpleButton.Primary>',
        render: <SimpleButton.Primary loading>Loading</SimpleButton.Primary>,
      },
      {
        label: 'Disabled State',
        snippet: '<SimpleButton.Primary disabled>Disabled Button</SimpleButton.Primary>',
        render: <SimpleButton.Primary disabled>Disabled Button</SimpleButton.Primary>,
      },
    ],
  },
  {
    name: 'RoundButton',
    description: 'アイコン表示に最適な、円形のボタンコンポーネント。',
    demos: [
      {
        label: 'Primary Icon',
        snippet: `<RoundButton.Primary aria-label="Add item">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
</RoundButton.Primary>`,
        render: (
          <RoundButton.Primary aria-label="Add item">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </RoundButton.Primary>
        ),
      },
      {
        label: 'Secondary Icon',
        snippet: `<RoundButton.Secondary aria-label="Settings">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  </svg>
</RoundButton.Secondary>`,
        render: (
          <RoundButton.Secondary aria-label="Settings">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            </svg>
          </RoundButton.Secondary>
        ),
      },
      {
        label: 'Danger Icon',
        snippet: `<RoundButton.Danger aria-label="Delete">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
</RoundButton.Danger>`,
        render: (
          <RoundButton.Danger aria-label="Delete">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </RoundButton.Danger>
        ),
      },
    ],
  },
  {
    name: 'Badge',
    description:
      'ステータスやタグ情報を示すバッジコンポーネント。インテントに応じた配色バリエーションを持ちます。',
    demos: [
      {
        label: 'Primary',
        snippet: '<Badge variant="primary">Active</Badge>',
        render: <Badge variant="primary">Active</Badge>,
      },
      {
        label: 'Secondary',
        snippet: '<Badge variant="secondary">Draft</Badge>',
        render: <Badge variant="secondary">Draft</Badge>,
      },
      {
        label: 'Danger',
        snippet: '<Badge variant="danger">Error</Badge>',
        render: <Badge variant="danger">Error</Badge>,
      },
      {
        label: 'Outline',
        snippet: '<Badge variant="outline">Secondary Info</Badge>',
        render: <Badge variant="outline">Secondary Info</Badge>,
      },
    ],
  },
  {
    name: 'Card',
    description:
      'コンテンツを囲むパネルコンポーネント。枠線の有無やホバーエフェクトの選択が可能です。',
    demos: [
      {
        label: 'Default Card',
        snippet: `<Card>
  <h4 className="text-body font-bold text-text-default mb-2">Default Card Title</h4>
  <p className="text-caption text-text-muted">ホバー時に影が強調される標準的なカードレイアウトです。</p>
</Card>`,
        render: (
          <Card>
            <h4 className="text-body font-bold text-text-default mb-2">Default Card Title</h4>
            <p className="text-caption text-text-muted">
              ホバー時に影が強調される標準的なカードレイアウトです。
            </p>
          </Card>
        ),
      },
      {
        label: 'Subtle Card',
        snippet: `<Card variant="subtle">
  <h4 className="text-body font-bold text-text-default mb-2">Subtle Card Title</h4>
  <p className="text-caption text-text-muted">枠線がなく、控えめな背景色のみのカードスタイルです。</p>
</Card>`,
        render: (
          <Card variant="subtle">
            <h4 className="text-body font-bold text-text-default mb-2">Subtle Card Title</h4>
            <p className="text-caption text-text-muted">
              枠線がなく、控えめな背景色のみのカードスタイルです。
            </p>
          </Card>
        ),
      },
    ],
  },
]
