import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle'
}

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'border rounded-xl p-6 shadow-sm transition-all',
        variant === 'default'
          ? 'bg-surface border-border hover:shadow-md'
          : 'bg-surface-subtle border-transparent',
        className,
      )}
      {...props}
    />
  )
}
