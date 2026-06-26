import { useState } from 'react'
import { motion } from 'framer-motion'
import { Info, AlertTriangle, CheckCircle2, Clock, Bell } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { notifications as initial } from '../../data/mockUser'
import type { Notification } from '../../types'

const typeConfig: Record<Notification['type'], { icon: typeof Info; color: string }> = {
  info: { icon: Info, color: 'var(--color-primary)' },
  warning: { icon: AlertTriangle, color: 'var(--color-warning)' },
  success: { icon: CheckCircle2, color: 'var(--color-success)' },
  deadline: { icon: Clock, color: 'var(--color-danger)' },
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'منذ قليل'
  if (hours < 24) return `منذ ${hours} ساعة`
  const days = Math.floor(hours / 24)
  return `منذ ${days} يوم`
}

export function Notifications() {
  const [notifs, setNotifs] = useState(initial)

  const markAll = () => setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })))

  const unread = notifs.filter((n) => !n.isRead)
  const read = notifs.filter((n) => n.isRead)
  const isEmpty = notifs.length === 0

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar
        title="الإشعارات"
        rightAction={
          unread.length > 0 ? (
            <button
              type="button"
              onClick={markAll}
              className="text-xs"
              style={{ color: 'var(--color-primary)' }}
            >
              قراءة الكل
            </button>
          ) : undefined
        }
      />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 pt-16">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <Bell size={36} style={{ color: 'var(--color-muted)', opacity: 0.4 }} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-center"
              >
                <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  لا توجد إشعارات
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  ستظهر هنا تنبيهاتك ومستجداتك القانونية
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="px-5 py-4 flex flex-col gap-5">
              {unread.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                    غير مقروءة ({unread.length})
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {unread.map((notif, i) => {
                      const cfg = typeConfig[notif.type]
                      const IconComp = cfg.icon
                      return (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex gap-3 p-4 rounded-2xl border"
                          style={{
                            backgroundColor: 'var(--color-surface)',
                            borderColor: 'var(--color-border)',
                            borderRight: `3px solid ${cfg.color}`,
                          }}
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${cfg.color}15` }}
                          >
                            <IconComp size={18} style={{ color: cfg.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                              {notif.titleAr}
                            </p>
                            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                              {notif.bodyAr}
                            </p>
                            <p className="text-[10px] mt-1.5" style={{ color: 'var(--color-muted)' }}>
                              {timeAgo(notif.timestamp)}
                            </p>
                          </div>
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: cfg.color }}
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}

              {read.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>سابقة</p>
                  <div className="flex flex-col gap-2.5">
                    {read.map((notif) => {
                      const cfg = typeConfig[notif.type]
                      const IconComp = cfg.icon
                      return (
                        <div
                          key={notif.id}
                          className="flex gap-3 p-4 rounded-2xl border opacity-60"
                          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${cfg.color}15` }}
                          >
                            <IconComp size={18} style={{ color: cfg.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                              {notif.titleAr}
                            </p>
                            <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-muted)' }}>
                              {notif.bodyAr}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
