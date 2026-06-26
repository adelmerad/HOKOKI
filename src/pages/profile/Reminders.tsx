import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, CheckCircle2, Trash2, ClipboardList, Scale, FileText, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { reminders as initialReminders } from '../../data/mockUser'
import type { Reminder } from '../../types'

const typeIconColors: Record<Reminder['type'], { color: string; bg: string }> = {
  procedure: { color: '#4F6EF7', bg: 'rgba(79,110,247,0.12)' },
  lawyer:    { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)'  },
  document:  { color: '#22C55E', bg: 'rgba(34,197,94,0.12)'  },
}

function ReminderTypeIcon({ type }: { type: Reminder['type'] }) {
  const { color, bg } = typeIconColors[type]
  const iconProps = { size: 16, style: { color } }
  const icon = type === 'procedure' ? <ClipboardList {...iconProps} />
    : type === 'lawyer' ? <Scale {...iconProps} />
    : <FileText {...iconProps} />
  return (
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
      {icon}
    </div>
  )
}

export function Reminders() {
  const [reminders, setReminders] = useState(initialReminders)

  const toggle = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r)),
    )
  }

  const remove = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id))
    toast.success('تم حذف التذكير', {
      style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    })
  }

  const active = reminders.filter((r) => !r.isCompleted)
  const done = reminders.filter((r) => r.isCompleted)

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="تذكيراتي" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-5 py-4 flex flex-col gap-5">
            {active.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: 'var(--color-muted)' }}>
                  <Bell size={12} /> قادمة
                </p>
                <div className="flex flex-col gap-2.5">
                  {active.map((reminder, i) => (
                    <motion.div
                      key={reminder.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-4 rounded-2xl border"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <ReminderTypeIcon type={reminder.type} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                          {reminder.titleAr}
                        </p>
                        <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--color-muted)' }}>
                          <Calendar size={10} /> {reminder.dateAr}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggle(reminder.id)}
                          className="p-1.5 rounded-lg"
                          style={{ color: 'var(--color-success)' }}
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(reminder.id)}
                          className="p-1.5 rounded-lg"
                          style={{ color: 'var(--color-danger)' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {done.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  مكتملة
                </p>
                <div className="flex flex-col gap-2">
                  {done.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center gap-3 p-4 rounded-2xl border opacity-50"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
                      <p className="text-sm line-through flex-1" style={{ color: 'var(--color-muted)' }}>
                        {reminder.titleAr}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {reminders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-raised)' }}>
                  <Bell size={28} style={{ color: 'var(--color-muted)' }} />
                </div>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>لا توجد تذكيرات حالياً</p>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
