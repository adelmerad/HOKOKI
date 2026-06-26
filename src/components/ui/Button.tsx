import { cn } from '../../lib/utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
  isLoading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'text-white font-semibold active:scale-[0.98]',
  secondary: 'font-medium border active:scale-[0.98]',
  ghost: 'font-medium active:opacity-70',
  danger: 'font-semibold active:scale-[0.98]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-3 text-[15px] rounded-xl',
  lg: 'px-6 py-4 text-base rounded-2xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...props
}: Props) {
  const isDisabled = disabled || isLoading

  const inlineStyles: React.CSSProperties = {}
  if (variant === 'primary') {
    inlineStyles.backgroundColor = isDisabled ? 'var(--color-border)' : 'var(--color-primary)'
  } else if (variant === 'secondary') {
    inlineStyles.backgroundColor = 'var(--color-raised)'
    inlineStyles.borderColor = 'var(--color-border)'
    inlineStyles.color = 'var(--color-text)'
  } else if (variant === 'ghost') {
    inlineStyles.color = 'var(--color-primary)'
  } else if (variant === 'danger') {
    inlineStyles.backgroundColor = 'var(--color-danger)'
    inlineStyles.color = '#fff'
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      style={inlineStyles}
      className={cn(
        'flex items-center justify-center gap-2 transition-all select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  )
}
