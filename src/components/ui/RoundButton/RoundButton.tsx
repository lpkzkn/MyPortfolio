import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'
import type { ButtonIntent } from '../shared/button-intents'
import { roundButtonStyles } from './RoundButton.styles'

type RoundButtonStyleProps = VariantProps<typeof roundButtonStyles>

type RoundButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Pick<RoundButtonStyleProps, 'size'> & {
    intent?: ButtonIntent
    /** アイコン1文字やSVGアイコンを想定したaria-label必須化はあえてせず、
     *  呼び出し側の責任で aria-label を渡してもらう（disabled時の代替も含め柔軟性を残す） */
  }

function RoundButtonBase({ intent, size, className, children, ...props }: RoundButtonBaseProps) {
  return (
    <button type="button" className={cn(roundButtonStyles({ intent, size }), className)} {...props}>
      {children}
    </button>
  )
}

type IntentOmittedProps = Omit<RoundButtonBaseProps, 'intent'>

export const RoundButton = Object.assign(RoundButtonBase, {
  Primary: (props: IntentOmittedProps) => <RoundButtonBase intent="primary" {...props} />,
  Secondary: (props: IntentOmittedProps) => <RoundButtonBase intent="secondary" {...props} />,
  Danger: (props: IntentOmittedProps) => <RoundButtonBase intent="danger" {...props} />,
})

export type { RoundButtonBaseProps }
