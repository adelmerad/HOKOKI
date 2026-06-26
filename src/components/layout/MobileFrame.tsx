type Props = {
  children: React.ReactNode
  className?: string
}

export function MobileFrame({ children, className = '' }: Props) {
  return (
    <div
      className={`relative w-full max-w-[390px] min-h-screen overflow-hidden flex flex-col ${className}`}
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {children}
    </div>
  )
}
