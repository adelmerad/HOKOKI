import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  elevated?: boolean
}

export function Card({ children, className, onClick, elevated = false }: Props) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={cn(
        'rounded-2xl border p-4',
        onClick && 'cursor-pointer active:scale-[0.98] transition-transform select-none',
        className,
      )}
      style={{
        backgroundColor: elevated ? 'var(--color-raised)' : 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {children}
    </div>
  )
}
