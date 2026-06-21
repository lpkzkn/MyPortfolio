import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'
import type { ButtonIntent } from '../shared/button-intents'
import { simpleButtonStyles } from './SimpleButton.styles'

type SimpleButtonStyleProps = VariantProps<typeof simpleButtonStyles>

type SimpleButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Pick<SimpleButtonStyleProps, 'size'> & {
    intent?: ButtonIntent
    /** ロジック寄りの関心はcvaに入れず、JSX側で扱う */
    loading?: boolean
    fullWidth?: boolean
  }

function SimpleButtonBase({
  intent,
  size,
  loading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: SimpleButtonBaseProps) {
  return (
    <button
      type="button"
      className={cn(simpleButtonStyles({ intent, size }), fullWidth && 'w-full', className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <SimpleButtonSpinner /> : children}
    </button>
  )
}

function SimpleButtonSpinner() {
  return (
    <span
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  )
}

type IntentOmittedProps = Omit<SimpleButtonBaseProps, 'intent'>

/**
 * Compound Components パターン。
 * `<SimpleButton.Primary>`, `<SimpleButton.Secondary>` のように
 * 呼び出し側が intent を文字列で渡す必要がなく、コンポーネント名自体が
 * バリエーションを表現する書き味にしている。
 *
 * 内部的には同じ SimpleButtonBase + cva を共有しているため、
 * スタイルの実体（色やサイズの定義）は SimpleButton.styles.ts の1箇所に集約されたまま。
 */
export const SimpleButton = Object.assign(SimpleButtonBase, {
  Primary: (props: IntentOmittedProps) => <SimpleButtonBase intent="primary" {...props} />,
  Secondary: (props: IntentOmittedProps) => <SimpleButtonBase intent="secondary" {...props} />,
  Danger: (props: IntentOmittedProps) => <SimpleButtonBase intent="danger" {...props} />,
})

export type { SimpleButtonBaseProps }
