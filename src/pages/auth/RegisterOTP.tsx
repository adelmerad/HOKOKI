import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { Button } from '../../components/ui/Button'

export function RegisterOTP() {
  const navigate = useNavigate()
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newDigits = [...digits]
    newDigits[index] = value.slice(-1)
    setDigits(newDigits)
    if (value && index < 5) refs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const isFilled = digits.every((d) => d !== '')

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="رمز التحقق" />
      <div className="flex-1 flex flex-col px-5 py-6 gap-8">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>أدخل رمز التحقق</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
            أُرسل رمز مكون من 6 أرقام إلى هاتفك
          </p>
        </div>

        <motion.div
          className="flex gap-2 justify-center"
          dir="ltr"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el }}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold rounded-xl border outline-none transition-all"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: digit ? 'var(--color-primary)' : 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
          ))}
        </motion.div>

        <p className="text-center text-sm" style={{ color: 'var(--color-muted)' }}>
          لم يصلك الرمز؟{' '}
          <button type="button" style={{ color: 'var(--color-primary)' }} className="font-medium">
            إعادة الإرسال
          </button>
        </p>

        <div className="mt-auto">
          <Button fullWidth size="lg" disabled={!isFilled} onClick={() => navigate('/register/profile')}>
            تأكيد
          </Button>
        </div>
      </div>
    </MobileFrame>
  )
}
