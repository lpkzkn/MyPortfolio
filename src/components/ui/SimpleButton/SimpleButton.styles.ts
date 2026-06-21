import { cva } from 'class-variance-authority'

/**
 * cvaに入れるのは「見た目のスタイル分岐（色・サイズ・形状）」のみに限定する。
 * loading や disabled、fullWidth のようなロジック/レイアウト関心は
 * SimpleButton.tsx 側でクラスを合成して扱い、ここには持ち込まない。
 * これは cva の variants が肥大化して可読性を失う「神コンポーネント化」を防ぐための設計判断。
 *
 * 色は直接の hex/Tailwindプリミティブではなく、必ず Semantic トークン
 * （--color-action-primary など）経由で参照する。これによりテーマ切り替え
 * （light / happy-orange / gaming-red / sakura-pink）に自動で追従する。
 */
export const simpleButtonStyles = cva(
  'inline-flex items-center justify-center rounded font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'bg-action-primary text-text-on-action hover:bg-action-primary-hover',
        secondary: 'bg-action-secondary text-text-default hover:bg-action-secondary-hover',
        danger: 'bg-action-danger text-text-on-action hover:bg-action-danger-hover',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-body',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)
