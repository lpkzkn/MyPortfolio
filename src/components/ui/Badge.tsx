import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
}

export function Badge({ variant = 'primary', className, ...props }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-action-primary text-text-on-action border-transparent',
    secondary: 'bg-surface-subtle text-text-default border-border',
    danger: 'bg-action-danger text-text-on-action border-transparent',
    outline: 'bg-transparent text-text-muted border-border',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium border transition-colors',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  )
}
