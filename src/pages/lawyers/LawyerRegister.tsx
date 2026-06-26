import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, MapPin, FileText, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'

const specialties = [
  'قانون الأسرة', 'قانون العمل', 'القانون الجنائي', 'القانون التجاري',
  'قانون الملكية', 'القانون الإداري', 'قانون المستهلك', 'قانون الهجرة', 'قانون المرور',
]

const wilayas = ['الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'سطيف', 'بجاية', 'تلمسان', 'بليدة', 'المدية', 'باتنة']

type Step = 1 | 2 | 3

export function LawyerRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)

  const [form, setForm] = useState({
    nameAr: '',
    phone: '',
    email: '',
    specialty: '',
    wilaya: '',
    barNumber: '',
    yearsExperience: '',
    languages: [] as string[],
    hasFreeConsultation: false,
    feeMin: '',
    feeMax: '',
    bioAr: '',
    idDocumentConfirmed: false,
    barDocumentConfirmed: false,
    termsAccepted: false,
  })

  const update = (key: keyof typeof form, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const canNext1 = form.nameAr.length >= 3 && form.phone.length >= 9 && form.specialty && form.wilaya
  const canNext2 = form.barNumber.length >= 5 && form.yearsExperience && form.feeMin
  const canSubmit = form.idDocumentConfirmed && form.barDocumentConfirmed && form.termsAccepted

  const handleSubmit = () => navigate('/lawyer-register/pending')

  const inputClass = 'w-full bg-transparent text-sm outline-none placeholder:opacity-40 p-3.5 rounded-2xl border'
  const inputStyle = { color: 'var(--color-text)', borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="تسجيل كمحامٍ" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          {/* Step Progress */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: step > s ? 'var(--color-success)' : step === s ? 'var(--color-primary)' : 'var(--color-surface)',
                      color: step >= s ? '#fff' : 'var(--color-muted)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {step > s ? <CheckCircle2 size={14} /> : s}
                  </div>
                  {s < 3 && <div className="flex-1 h-px" style={{ backgroundColor: step > s ? 'var(--color-success)' : 'var(--color-border)' }} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {['معلوماتك', 'بياناتك المهنية', 'التوثيق'].map((label) => (
                <span key={label} className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{label}</span>
              ))}
            </div>
          </div>

          <div className="px-5 pt-3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-2xl mb-1" style={{ backgroundColor: 'rgba(79,110,247,0.08)', border: '1px solid rgba(79,110,247,0.2)' }}>
                    <Scale size={16} style={{ color: 'var(--color-primary)' }} />
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>أدخل معلوماتك الشخصية لبدء التسجيل</p>
                  </div>
                  <input type="text" placeholder="الاسم الكامل" value={form.nameAr} onChange={(e) => update('nameAr', e.target.value)} className={inputClass} style={inputStyle} />
                  <input type="tel" placeholder="رقم الهاتف" dir="ltr" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} style={inputStyle} />
                  <input type="email" placeholder="البريد الإلكتروني" dir="ltr" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} style={inputStyle} />
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
                  <div>
                    <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: 'var(--color-muted)' }}>
                      <MapPin size={11} /> الولاية
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {wilayas.map((w) => (
                        <button key={w} type="button" onClick={() => update('wilaya', w)}
                          className="px-3 py-1.5 rounded-xl text-sm"
                          style={{ backgroundColor: form.wilaya === w ? 'var(--color-primary)' : 'var(--color-surface)', color: form.wilaya === w ? '#fff' : 'var(--color-text)', border: `1px solid ${form.wilaya === w ? 'var(--color-primary)' : 'var(--color-border)'}` }}
                        >{w}</button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-3">
                  <input type="text" placeholder="رقم النقابة (مثال: ALG-2010-1234)" dir="ltr" value={form.barNumber} onChange={(e) => update('barNumber', e.target.value)} className={inputClass} style={inputStyle} />
                  <input type="number" placeholder="سنوات الخبرة" min="0" value={form.yearsExperience} onChange={(e) => update('yearsExperience', e.target.value)} className={inputClass} style={inputStyle} />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="أدنى أتعاب (دج)" value={form.feeMin} onChange={(e) => update('feeMin', e.target.value)} className={inputClass} style={inputStyle} />
                    <input type="number" placeholder="أقصى أتعاب (دج)" value={form.feeMax} onChange={(e) => update('feeMax', e.target.value)} className={inputClass} style={inputStyle} />
                  </div>
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
                  <button
                    type="button"
                    onClick={() => update('hasFreeConsultation', !form.hasFreeConsultation)}
                    className="flex items-center gap-3 p-3 rounded-2xl border text-right"
                    style={{ backgroundColor: form.hasFreeConsultation ? 'rgba(34,197,94,0.08)' : 'var(--color-surface)', borderColor: form.hasFreeConsultation ? 'rgba(34,197,94,0.4)' : 'var(--color-border)' }}
                  >
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: form.hasFreeConsultation ? 'var(--color-success)' : 'var(--color-border)' }}>
                      {form.hasFreeConsultation && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text)' }}>أتيح استشارة أولى مجانية</p>
                  </button>
                  <textarea rows={3} placeholder="نبذة مهنية عنك (اختياري)" value={form.bioAr} onChange={(e) => update('bioAr', e.target.value)} className={`${inputClass} resize-none`} style={inputStyle} />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-3">
                  <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#F59E0B' }}>مرحلة التوثيق</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      يجب توثيق هويتك وعضويتك في نقابة المحامين قبل تفعيل حسابك. سيُراجع الفريق ملفك خلال 48 ساعة.
                    </p>
                  </div>
                  {[
                    { key: 'idDocumentConfirmed' as const, icon: FileText, label: 'بطاقة الهوية الوطنية', desc: 'نسخة واضحة من بطاقة الهوية الوطنية' },
                    { key: 'barDocumentConfirmed' as const, icon: Scale, label: 'شهادة عضوية النقابة', desc: 'وثيقة سارية من هيئة المحامين' },
                  ].map(({ key, icon: Icon, label, desc }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => update(key, !form[key])}
                      className="flex items-center gap-4 p-4 rounded-2xl border text-right"
                      style={{ backgroundColor: form[key] ? 'rgba(34,197,94,0.06)' : 'var(--color-surface)', borderColor: form[key] ? 'rgba(34,197,94,0.4)' : 'var(--color-border)' }}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: form[key] ? 'rgba(34,197,94,0.12)' : 'rgba(79,110,247,0.1)' }}>
                        <Icon size={20} style={{ color: form[key] ? 'var(--color-success)' : 'var(--color-primary)' }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{label}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{desc}</p>
                      </div>
                      {form[key] && <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => update('termsAccepted', !form.termsAccepted)}
                    className="flex items-start gap-3 p-3 rounded-xl border text-right"
                    style={{ backgroundColor: form.termsAccepted ? 'rgba(79,110,247,0.06)' : 'var(--color-surface)', borderColor: form.termsAccepted ? 'var(--color-primary)' : 'var(--color-border)' }}
                  >
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5" style={{ borderColor: form.termsAccepted ? 'var(--color-primary)' : 'var(--color-border)', backgroundColor: form.termsAccepted ? 'var(--color-primary)' : 'transparent' }}>
                      {form.termsAccepted && <CheckCircle2 size={12} color="#fff" />}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      أقر بصحة جميع المعلومات المُدخلة وأوافق على شروط وأحكام منصة حقي للمحامين.
                    </p>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PageTransition>

      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t flex gap-2"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      >
        {step > 1 && (
          <Button variant="secondary" size="lg" onClick={() => setStep((s) => (s - 1) as Step)}>
            <ChevronRight size={18} />
          </Button>
        )}
        {step < 3 ? (
          <Button
            fullWidth size="lg"
            disabled={step === 1 ? !canNext1 : !canNext2}
            onClick={() => setStep((s) => (s + 1) as Step)}
          >
            التالي <ChevronLeft size={18} />
          </Button>
        ) : (
          <Button fullWidth size="lg" disabled={!canSubmit} onClick={handleSubmit}>
            إرسال الطلب
          </Button>
        )}
      </div>
    </MobileFrame>
  )
}
