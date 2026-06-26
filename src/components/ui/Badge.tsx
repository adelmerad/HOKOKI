import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'muted' | 'outline'

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
  size?: 'xs' | 'sm' | 'md'
}

const variantMap: Record<Variant, { bg: string; color: string; border?: string }> = {
  primary: { bg: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' },
  success: { bg: 'rgba(34,197,94,0.15)', color: 'var(--color-success)' },
  warning: { bg: 'rgba(245,158,11,0.15)', color: 'var(--color-warning)' },
  danger: { bg: 'rgba(239,68,68,0.15)', color: 'var(--color-danger)' },
  muted: { bg: 'var(--color-raised)', color: 'var(--color-muted)' },
  outline: { bg: 'transparent', color: 'var(--color-muted)', border: 'var(--color-border)' },
}

const sizeMap = {
  xs: 'px-1.5 py-0.5 text-[10px]',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({ children, variant = 'muted', className, size = 'sm' }: Props) {
  const styles = variantMap[variant]

  return (
    <span
      className={cn('inline-flex items-center gap-1 font-medium rounded-full', sizeMap[size], className)}
      style={{
        backgroundColor: styles.bg,
        color: styles.color,
        border: styles.border ? `1px solid ${styles.border}` : undefined,
      }}
    >
      {children}
    </span>
  )
}
