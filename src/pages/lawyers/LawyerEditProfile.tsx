import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Camera } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'
import { lawyers } from '../../data/mockLawyers'

const mockLawyer = lawyers[0]

const specialties = [
  'قانون الأسرة', 'قانون العمل', 'القانون الجنائي', 'القانون التجاري',
  'قانون الملكية', 'القانون الإداري', 'قانون المستهلك', 'قانون الهجرة', 'قانون المرور',
]

const wilayas = ['الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'سطيف', 'بجاية', 'تلمسان', 'بليدة', 'المدية', 'باتنة']

export function LawyerEditProfile() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nameAr: mockLawyer.nameAr,
    phone: '0550 000 000',
    email: 'slimboualiz@gmail.com',
    specialty: mockLawyer.specialty,
    wilaya: mockLawyer.wilaya,
    city: mockLawyer.city,
    bioAr: mockLawyer.bioAr,
    feeMin: String(mockLawyer.feeMin),
    feeMax: String(mockLawyer.feeMax),
    languages: [...mockLawyer.languages],
    hasFreeConsultation: mockLawyer.hasFreeConsultation,
    responseTime: mockLawyer.responseTime,
  })

  const update = (key: keyof typeof form, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSave = () => {
    toast.success('تم حفظ التعديلات', {
      style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    })
    navigate('/lawyer-dashboard')
  }

  const inputClass = 'w-full bg-transparent text-sm outline-none placeholder:opacity-40 p-3.5 rounded-2xl border'
  const inputStyle = { color: 'var(--color-text)', borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="تعديل الملف المهني" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          <div className="px-5 pt-4 flex flex-col gap-4">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: `${mockLawyer.avatarColor}20`, color: mockLawyer.avatarColor, border: `2px solid ${mockLawyer.avatarColor}40` }}
                >
                  {mockLawyer.nameAr.split(' ').slice(-2).map((n) => n[0]).join('')}
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -left-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary)', border: '2px solid var(--color-bg)' }}
                >
                  <Camera size={14} color="#fff" />
                </button>
              </div>
            </div>

            {/* Personal Info */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>المعلومات الشخصية</p>
              <div className="flex flex-col gap-2.5">
                <input type="text" placeholder="الاسم الكامل" value={form.nameAr} onChange={(e) => update('nameAr', e.target.value)} className={inputClass} style={inputStyle} />
                <input type="tel" placeholder="رقم الهاتف" dir="ltr" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} style={inputStyle} />
                <input type="email" placeholder="البريد الإلكتروني" dir="ltr" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} style={inputStyle} />
              </div>
            </div>

            {/* Specialty */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>التخصص</p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <button key={s} type="button" onClick={() => update('specialty', s)}
                    className="px-3 py-1.5 rounded-xl text-sm"
                    style={{ backgroundColor: form.specialty === s ? 'var(--color-primary)' : 'var(--color-surface)', color: form.specialty === s ? '#fff' : 'var(--color-text)', border: `1px solid ${form.specialty === s ? 'var(--color-primary)' : 'var(--color-border)'}` }}
                  >{s}</button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>الموقع</p>
              <div className="flex flex-wrap gap-2 mb-2.5">
                {wilayas.map((w) => (
                  <button key={w} type="button" onClick={() => update('wilaya', w)}
                    className="px-3 py-1.5 rounded-xl text-sm"
                    style={{ backgroundColor: form.wilaya === w ? 'var(--color-primary)' : 'var(--color-surface)', color: form.wilaya === w ? '#fff' : 'var(--color-text)', border: `1px solid ${form.wilaya === w ? 'var(--color-primary)' : 'var(--color-border)'}` }}
                  >{w}</button>
                ))}
              </div>
              <input type="text" placeholder="المدينة / الحي" value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} style={inputStyle} />
            </div>

            {/* Fees */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>الأتعاب (دج)</p>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="أدنى أتعاب" value={form.feeMin} onChange={(e) => update('feeMin', e.target.value)} className={inputClass} style={inputStyle} />
                <input type="number" placeholder="أقصى أتعاب" value={form.feeMax} onChange={(e) => update('feeMax', e.target.value)} className={inputClass} style={inputStyle} />
              </div>
            </div>

            {/* Languages */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>اللغات</p>
              <div className="flex gap-2 flex-wrap">
                {['العربية', 'الفرنسية', 'الإنجليزية', 'الأمازيغية'].map((lang) => {
                  const selected = form.languages.includes(lang)
                  return (
                    <button key={lang} type="button"
                      onClick={() => update('languages', selected ? form.languages.filter((l) => l !== lang) : [...form.languages, lang])}
                      className="px-3 py-1.5 rounded-xl text-sm"
                      style={{ backgroundColor: selected ? 'var(--color-primary)' : 'var(--color-surface)', color: selected ? '#fff' : 'var(--color-text)', border: `1px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}` }}
                    >{lang}</button>
                  )
                })}
              </div>
            </div>

            {/* Free Consultation Toggle */}
            <button
              type="button"
              onClick={() => update('hasFreeConsultation', !form.hasFreeConsultation)}
              className="flex items-center gap-3 p-3 rounded-2xl border text-right"
              style={{ backgroundColor: form.hasFreeConsultation ? 'rgba(34,197,94,0.08)' : 'var(--color-surface)', borderColor: form.hasFreeConsultation ? 'rgba(34,197,94,0.4)' : 'var(--color-border)' }}
            >
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: form.hasFreeConsultation ? 'var(--color-success)' : 'var(--color-border)' }}>
                {form.hasFreeConsultation && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />}
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>استشارة أولى مجانية</p>
            </button>

            {/* Bio */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>النبذة المهنية</p>
              <textarea
                rows={4}
                value={form.bioAr}
                onChange={(e) => update('bioAr', e.target.value)}
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      </PageTransition>

      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      >
        <Button fullWidth size="lg" onClick={handleSave}>
          <CheckCircle2 size={18} />
          حفظ التعديلات
        </Button>
      </div>
    </MobileFrame>
  )
}
