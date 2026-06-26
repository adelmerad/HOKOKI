import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function RegisterPhone() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="إنشاء حساب" />
      <div className="flex-1 flex flex-col px-5 py-6 gap-8">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>رقم هاتفك</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
            سنرسل رمز التحقق عبر SMS
          </p>
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
        </div>

        <div className="mt-auto">
          <Button
            fullWidth
            size="lg"
            disabled={phone.length < 10}
            onClick={() => navigate('/register/otp')}
          >
            إرسال الرمز
          </Button>
        </div>
      </div>
    </MobileFrame>
  )
}
