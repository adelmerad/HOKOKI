import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, ChevronLeft, Shield, Bell, Smartphone, Star, AlertCircle } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { BottomSheet } from '../../components/ui/BottomSheet'
import { Button } from '../../components/ui/Button'

function Toggle({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative w-12 h-6 rounded-full transition-all shrink-0"
      style={{ backgroundColor: isOn ? 'var(--color-primary)' : 'var(--color-border)' }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
        style={{ backgroundColor: '#fff', left: isOn ? '26px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
      />
    </button>
  )
}

export function Settings() {
  const navigate = useNavigate()
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [rateOpen, setRateOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [settings, setSettings] = useState({
    notifications: true,
    legalUpdates: true,
    emailAlerts: false,
    darkMode: true,
    arabic: true,
    biometric: false,
  })

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

  const groups = [
    {
      title: 'الإشعارات',
      icon: Bell,
      items: [
        { key: 'notifications', label: 'إشعارات عامة', desc: 'تذكيرات المواعيد والمهام' },
        { key: 'legalUpdates', label: 'التحديثات القانونية', desc: 'عند تعديل القوانين' },
        { key: 'emailAlerts', label: 'تنبيهات البريد الإلكتروني', desc: 'ملخص أسبوعي' },
      ],
    },
    {
      title: 'التطبيق',
      icon: Smartphone,
      items: [
        { key: 'darkMode', label: 'الوضع الداكن', desc: 'خلفية داكنة للتطبيق' },
        { key: 'arabic', label: 'اللغة العربية', desc: 'تغيير لغة واجهة التطبيق' },
        { key: 'biometric', label: 'قفل بيومتري', desc: 'استخدام بصمة الإصبع' },
      ],
    },
  ]

  const navLinks = [
    { label: 'الخصوصية والأمان', icon: Shield, path: '/profile' },
    { label: 'سياسة الاستخدام', icon: ChevronLeft, path: '/profile' },
    { label: 'الدعم الفني', icon: ChevronLeft, path: '/profile' },
    { label: 'قيّم التطبيق', icon: Star, action: () => setRateOpen(true) },
  ]

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="الإعدادات" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-5 py-4 flex flex-col gap-5">
            {groups.map((group) => (
              <div key={group.title}>
                <div className="flex items-center gap-2 mb-2 px-1">
                  <group.icon size={13} style={{ color: 'var(--color-muted)' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>{group.title}</p>
                </div>
                <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                  {group.items.map(({ key, label, desc }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border-b last:border-b-0"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{desc}</p>
                      </div>
                      <Toggle isOn={settings[key as keyof typeof settings]} onToggle={() => toggle(key as keyof typeof settings)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Navigation Links */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
              {navLinks.map(({ label, icon: Icon, path, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => action ? action() : navigate(path!)}
                  className="w-full flex items-center justify-between p-4 border-b last:border-b-0"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <Icon size={16} style={{ color: 'var(--color-muted)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</p>
                </button>
              ))}
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border"
              style={{ backgroundColor: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.2)', color: 'var(--color-danger)' }}
            >
              <LogOut size={18} />
              <span className="text-sm font-semibold">تسجيل الخروج</span>
            </button>

            <p className="text-xs text-center py-1" style={{ color: 'var(--color-muted)' }}>
              حقّي · الإصدار 1.0.0
            </p>
          </div>
        </div>
      </PageTransition>
      <BottomNav />

      {/* Logout Confirmation — centered dialog */}
      <AnimatePresence>
        {logoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center px-8 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={() => setLogoutOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="w-full rounded-3xl p-6 flex flex-col items-center gap-4"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(239,68,68,0.12)' }}
              >
                <AlertCircle size={28} style={{ color: 'var(--color-danger)' }} />
              </div>
              <div className="text-center">
                <p className="text-base font-bold mb-1" style={{ color: 'var(--color-text)' }}>تسجيل الخروج</p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>هل تريد الخروج؟</p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setLogoutOpen(false)}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold"
                  style={{ backgroundColor: 'var(--color-raised)', color: 'var(--color-text)' }}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold"
                  style={{ backgroundColor: 'var(--color-danger)', color: '#fff' }}
                >
                  خروج
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rate App Modal */}
      <BottomSheet isOpen={rateOpen} onClose={() => setRateOpen(false)} title="كيف كانت دقة الخطوات؟">
        <div className="px-5 pt-2 pb-4 flex flex-col gap-4">
          <p className="text-sm text-center" style={{ color: 'var(--color-muted)' }}>
            قدّم تعليقاً حول درجة المساعد
          </p>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <Star
                  size={36}
                  fill={star <= rating ? '#F59E0B' : 'transparent'}
                  style={{ color: star <= rating ? '#F59E0B' : 'var(--color-border)' }}
                />
              </button>
            ))}
          </div>
          <textarea
            placeholder="أضف ملاحظة (اختياري)"
            rows={3}
            className="w-full rounded-2xl px-4 py-3 text-sm resize-none outline-none"
            style={{
              backgroundColor: 'var(--color-raised)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          />
          <Button fullWidth size="lg" onClick={() => setRateOpen(false)}>إرسال</Button>
          <button
            type="button"
            onClick={() => setRateOpen(false)}
            className="text-sm text-center"
            style={{ color: 'var(--color-muted)' }}
          >
            تخطى
          </button>
        </div>
      </BottomSheet>
    </MobileFrame>
  )
}
