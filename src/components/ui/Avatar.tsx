import { cn } from '../../lib/utils'

type Props = {
  initials?: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'w-9 h-9 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-20 h-20 text-2xl',
}

export function Avatar({ initials = '؟', color = '#4F6EF7', size = 'md', className }: Props) {
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold flex-shrink-0',
        sizeMap[size],
        className,
      )}
      style={{ backgroundColor: `${color}20`, border: `2px solid ${color}40`, color }}
    >
      {initials}
    </div>
  )
}
