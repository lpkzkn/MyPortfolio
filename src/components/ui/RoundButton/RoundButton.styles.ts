import { cva } from 'class-variance-authority'

/**
 * SimpleButton.styles.ts と同じ intent 語彙（primary/secondary/danger）を使うが、
 * 形状（円形・アイコンボタン用のサイズ比率）が異なるため、
 * Atomic Designのような見た目の粒度分類ではなく、
 * 「形状ごとに別コンポーネントとして分離する」方針に沿って独立したファイルにしている。
 */
export const roundButtonStyles = cva(
  'inline-flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'bg-action-primary text-text-on-action hover:bg-action-primary-hover',
        secondary: 'bg-action-secondary text-text-default hover:bg-action-secondary-hover',
        danger: 'bg-action-danger text-text-on-action hover:bg-action-danger-hover',
      },
      size: {
        sm: 'size-8 text-sm',
        md: 'size-10 text-body',
        lg: 'size-12 text-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)
