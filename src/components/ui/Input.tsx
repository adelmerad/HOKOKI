import { useState } from 'react'
import { cn } from '../../lib/utils'
import type { InputHTMLAttributes, ReactNode } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Input({ label, error, leftIcon, rightIcon, className, ...props }: Props) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
          {label}
        </label>
      )}
      <div
        className="flex items-center gap-2 rounded-xl border px-3 py-3 transition-all"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: error
            ? 'var(--color-danger)'
            : focused
            ? 'var(--color-primary)'
            : 'var(--color-border)',
        }}
      >
        {leftIcon && (
          <span style={{ color: focused ? 'var(--color-primary)' : 'var(--color-muted)' }}>
            {leftIcon}
          </span>
        )}
        <input
          className={cn(
            'flex-1 bg-transparent outline-none text-[15px]',
            className,
          )}
          style={{ color: 'var(--color-text)' }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <span style={{ color: 'var(--color-muted)' }}>{rightIcon}</span>
        )}
      </div>
      {error && (
        <p className="text-xs" style={{ color: 'var(--color-danger)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
