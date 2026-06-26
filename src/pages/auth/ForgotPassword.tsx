import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'

export function ForgotPassword() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    if (!phone || phone.length < 9) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1400)
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="استعادة كلمة المرور" />
      <PageTransition>
        <div className="flex-1 flex flex-col px-5 pt-8 gap-6">
          {!sent ? (
            <>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                  نسيت كلمة المرور؟
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  أدخل رقم هاتفك المسجّل وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور.
                </p>
              </div>

              <div
                className="flex items-center gap-3 p-4 rounded-2xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <Mail size={20} style={{ color: 'var(--color-primary)' }} />
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0XXXXXXXXX"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                  style={{ color: 'var(--color-text)' }}
                  maxLength={10}
                />
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleSend}
                isLoading={loading}
                disabled={phone.length < 9}
              >
                إرسال رمز التحقق
              </Button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 text-sm mt-2"
                style={{ color: 'var(--color-muted)' }}
              >
                <ArrowLeft size={14} />
                العودة إلى تسجيل الدخول
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-5 pt-8"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}
              >
                <CheckCircle2 size={40} style={{ color: 'var(--color-success)' }} />
              </div>
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                  تم الإرسال!
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  تم إرسال رمز التحقق إلى الرقم {phone}. تحقق من رسائلك وأدخل الرمز.
                </p>
              </div>
              <Button fullWidth size="lg" onClick={() => navigate('/register/otp')}>
                إدخال الرمز
              </Button>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
