import { Signal, Wifi, Battery } from 'lucide-react'

export function StatusBar() {
  return (
    <div
      className="flex items-center justify-between px-5 py-2 flex-shrink-0"
      style={{ height: '44px', color: 'var(--color-text)' }}
    >
      <span className="text-sm font-semibold font-inter" dir="ltr">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <Battery size={14} strokeWidth={2.5} />
      </div>
    </div>
  )
}
