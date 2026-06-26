import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, MapPin } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const wilayas = ['الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'بجاية', 'سطيف', 'تلمسان', 'باتنة', 'بليدة']

export function RegisterProfile() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [wilaya, setWilaya] = useState('')

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="أكمل ملفك" />
      <div className="flex-1 flex flex-col px-5 py-6 gap-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>معلوماتك الأساسية</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
            حتى نقدم لك خدمة مُخصصة حسب ولايتك
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="الاسم الكامل"
            placeholder="مثال: يوسف أمراني"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User size={16} />}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
              الولاية
            </label>
            <div
              className="flex items-center gap-2 rounded-xl border px-3 py-3"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <MapPin size={16} style={{ color: 'var(--color-muted)' }} />
              <select
                className="flex-1 bg-transparent outline-none text-[15px]"
                style={{ color: wilaya ? 'var(--color-text)' : 'var(--color-muted)' }}
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
              >
                <option value="">اختر ولايتك</option>
                {wilayas.map((w) => (
                  <option key={w} value={w} style={{ backgroundColor: 'var(--color-surface)' }}>{w}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Button
            fullWidth
            size="lg"
            disabled={!name || !wilaya}
            onClick={() => navigate('/home')}
          >
            إنهاء إنشاء الحساب
          </Button>
        </div>
      </div>
    </MobileFrame>
  )
}
