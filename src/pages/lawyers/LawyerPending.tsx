import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, CheckCircle2, Mail, Home, LayoutDashboard } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'

const steps = [
  { icon: CheckCircle2, label: 'تم استلام طلبك', done: true },
  { icon: Clock, label: 'مراجعة الوثائق (24-48 ساعة)', done: false },
  { icon: Mail, label: 'إشعار بالبريد والرسائل', done: false },
  { icon: CheckCircle2, label: 'تفعيل الحساب', done: false },
]

export function LawyerPending() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 flex flex-col items-center px-5 pt-12 pb-8">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(79,110,247,0.15))', border: '2px solid rgba(245,158,11,0.3)' }}
          >
            <Clock size={44} style={{ color: '#F59E0B' }} />
          </motion.div>

          <h1 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--color-text)' }}>
            طلبك قيد المراجعة
          </h1>
          <p className="text-sm text-center leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
            شكراً على تسجيلك. يراجع فريقنا طلبك والوثائق المُرفقة. سنُخطرك عبر رسالة نصية وبريد إلكتروني عند تفعيل حسابك.
          </p>

          {/* Status Timeline */}
          <div className="w-full flex flex-col gap-3 mb-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-2xl border"
                style={{
                  backgroundColor: s.done ? 'rgba(34,197,94,0.06)' : 'var(--color-surface)',
                  borderColor: s.done ? 'rgba(34,197,94,0.3)' : 'var(--color-border)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: s.done ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.1)' }}
                >
                  <s.icon size={18} style={{ color: s.done ? 'var(--color-success)' : '#F59E0B' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm" style={{ color: s.done ? 'var(--color-text)' : 'var(--color-muted)' }}>
                    {s.label}
                  </p>
                </div>
                {s.done && <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />}
              </motion.div>
            ))}
          </div>

          <div
            className="w-full p-4 rounded-2xl mb-6 text-center"
            style={{ backgroundColor: 'rgba(79,110,247,0.06)', border: '1px solid rgba(79,110,247,0.15)' }}
          >
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              هل لديك سؤال؟ تواصل معنا عبر support@haqqi.dz
            </p>
          </div>

          <Button fullWidth size="lg" onClick={() => navigate('/lawyer-dashboard')}>
            <LayoutDashboard size={18} />
            الدخول إلى لوحة التحكم
          </Button>
          <Button fullWidth size="lg" variant="secondary" onClick={() => navigate('/home')}>
            <Home size={18} />
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
