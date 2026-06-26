import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Lock, Scale } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <MobileFrame>
      <StatusBar />
      <div className="flex-1 flex flex-col px-5 py-8 gap-8">
        <div className="flex flex-col items-center gap-3 pt-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Scale size={32} color="#fff" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>أهلاً بعودتك</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>سجّل دخولك للمتابعة</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="رقم الهاتف"
            type="tel"
            placeholder="05XX XX XX XX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone size={16} />}
            dir="ltr"
          />
          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
          />
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <Button fullWidth size="lg" onClick={() => navigate('/home')}>
            دخول
          </Button>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-center"
            style={{ color: 'var(--color-primary)' }}
          >
            نسيت كلمة المرور؟
          </button>
          <button
            type="button"
            onClick={() => navigate('/onboarding')}
            className="text-sm text-center"
            style={{ color: 'var(--color-muted)' }}
          >
            ليس لديّ حساب —{' '}
            <span style={{ color: 'var(--color-primary)' }}>إنشاء حساب جديد</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  )
}
