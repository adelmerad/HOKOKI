import { useLocation, useNavigate } from 'react-router-dom'
import { Home, BookOpen, MessageCircle, ClipboardList, User } from 'lucide-react'

const tabs = [
  { path: '/home', icon: Home, labelAr: 'الرئيسية' },
  { path: '/laws', icon: BookOpen, labelAr: 'القوانين' },
  { path: '/chat', icon: MessageCircle, labelAr: 'المساعد', isCenter: true },
  { path: '/procedures', icon: ClipboardList, labelAr: 'الإجراءات' },
  { path: '/profile', icon: User, labelAr: 'الملف' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <div
      className="flex items-center justify-around flex-shrink-0 border-t"
      style={{
        height: '60px',
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.path)
        const Icon = tab.icon

        return (
          <button
            key={tab.path}
            type="button"
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all active:scale-95"
          >
            <div
              className={`flex items-center justify-center rounded-xl transition-all ${
                tab.isCenter ? 'w-12 h-12 -mt-5 shadow-lg' : 'w-8 h-8'
              }`}
              style={
                tab.isCenter
                  ? { backgroundColor: active ? 'var(--color-primary)' : 'var(--color-raised)', border: '3px solid var(--color-bg)' }
                  : {}
              }
            >
              <Icon
                size={tab.isCenter ? 22 : 20}
                strokeWidth={active ? 2.5 : 1.8}
                color={
                  tab.isCenter
                    ? '#ffffff'
                    : active
                    ? 'var(--color-primary)'
                    : 'var(--color-muted)'
                }
              />
            </div>
            {!tab.isCenter && (
              <span
                className="text-[10px] font-medium"
                style={{ color: active ? 'var(--color-primary)' : 'transparent' }}
              >
                {tab.labelAr}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
