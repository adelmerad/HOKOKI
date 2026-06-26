import { useNavigate } from 'react-router-dom'
import { Settings, Bell, BookmarkCheck, ChevronLeft, LogOut } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { currentUser } from '../../data/mockUser'

const menuItems = [
  { icon: Settings, label: 'الإعدادات', path: '/settings' },
  { icon: Bell, label: 'التذكيرات', path: '/reminders' },
  { icon: BookmarkCheck, label: 'المحفوظات', path: '/home' },
]

export function Profile() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {/* Header */}
          <div className="px-5 pt-5 pb-6 flex flex-col items-center gap-4">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: 'rgba(79,110,247,0.2)', color: 'var(--color-primary)', border: '3px solid rgba(79,110,247,0.3)' }}
            >
              {currentUser.avatarInitials}
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{currentUser.nameAr}</h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
                {currentUser.wilaya} · عضو منذ {currentUser.memberSince}
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-0 rounded-2xl overflow-hidden border w-full"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {[
                { label: 'محادثات', value: currentUser.stats.conversations },
                { label: 'إجراءات', value: currentUser.stats.procedures },
                { label: 'محفوظات', value: currentUser.stats.saved },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center py-4 border-l first:border-l-0"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="px-5 flex flex-col gap-2">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className="flex items-center justify-between p-4 rounded-2xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-raised)' }}
                  >
                    <Icon size={17} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</span>
                </div>
                <ChevronLeft size={16} style={{ color: 'var(--color-muted)' }} />
              </button>
            ))}

            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-3 p-4 rounded-2xl border mt-2"
              style={{ backgroundColor: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
              >
                <LogOut size={17} style={{ color: 'var(--color-danger)' }} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--color-danger)' }}>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
