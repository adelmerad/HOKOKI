import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  title?: string
  onBack?: () => void
  rightAction?: ReactNode
  transparent?: boolean
}

export function TopBar({ title, onBack, rightAction, transparent = false }: Props) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <div
      className="flex items-center justify-between px-4 flex-shrink-0"
      style={{
        height: '52px',
        backgroundColor: transparent ? 'transparent' : 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <button
        type="button"
        onClick={handleBack}
        className="p-2 -ml-2 rounded-xl transition-opacity active:opacity-60"
        style={{ color: 'var(--color-text)' }}
        aria-label="رجوع"
      >
        <ArrowRight size={22} strokeWidth={2} />
      </button>

      {title && (
        <h1 className="text-[15px] font-semibold absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
      )}

      <div className="flex items-center">
        {rightAction ?? <div className="w-10" />}
      </div>
    </div>
  )
}
