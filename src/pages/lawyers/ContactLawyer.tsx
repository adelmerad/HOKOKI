import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MessageSquare, Mail, Calendar, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { lawyers } from '../../data/mockLawyers'

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
const days = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'السبت']

export function ContactLawyer() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const lawyer = lawyers.find((l) => l.id === id)
  const [step, setStep] = useState<'method' | 'schedule' | 'confirm'>('method')
  const [method, setMethod] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [note, setNote] = useState('')

  if (!lawyer) return null

  const methods = [
    { id: 'phone', icon: Phone, label: 'اتصال هاتفي', desc: 'متاح من 9 صباحاً حتى 6 مساءً', color: '#4F6EF7' },
    { id: 'message', icon: MessageSquare, label: 'رسالة مكتوبة', desc: `رد خلال ${lawyer.responseTime}`, color: '#22C55E' },
    { id: 'email', icon: Mail, label: 'بريد إلكتروني', desc: 'للملفات والوثائق', color: '#F59E0B' },
    { id: 'meeting', icon: Calendar, label: 'موعد حضوري', desc: 'احجز موعداً في المكتب', color: '#7C3AED' },
  ]

  const handleConfirm = () => {
    toast.success('تم إرسال طلب التواصل بنجاح', {
      style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    })
    navigate(`/lawyers/${id}`)
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="تواصل مع المحامي" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          {/* Lawyer Mini Card */}
          <div className="px-5 pt-3 pb-4">
            <div
              className="flex items-center gap-3 p-3 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0"
                style={{ backgroundColor: `${lawyer.avatarColor}20`, color: lawyer.avatarColor }}
              >
                {lawyer.nameAr.split(' ').slice(-2).map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{lawyer.nameAr}</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{lawyer.specialty}</p>
                {lawyer.hasFreeConsultation && (
                  <Badge variant="success" size="xs" className="mt-1">استشارة أولى مجانية</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 px-5 mb-4">
            {(['method', 'schedule', 'confirm'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: step === s ? 'var(--color-primary)' : s === 'method' && (step === 'schedule' || step === 'confirm') || s === 'schedule' && step === 'confirm' ? 'var(--color-success)' : 'var(--color-surface)',
                    color: step === s ? '#fff' : s === 'method' && (step === 'schedule' || step === 'confirm') || s === 'schedule' && step === 'confirm' ? '#fff' : 'var(--color-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {i + 1}
                </div>
                {i < 2 && <div className="w-8 h-px" style={{ backgroundColor: 'var(--color-border)' }} />}
              </div>
            ))}
          </div>

          <div className="px-5">
            {step === 'method' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2.5">
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>اختر طريقة التواصل</p>
                {methods.map((m) => (
                  <motion.button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 rounded-2xl border text-right"
                    style={{
                      backgroundColor: method === m.id ? `${m.color}10` : 'var(--color-surface)',
                      borderColor: method === m.id ? m.color : 'var(--color-border)',
                    }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${m.color}15` }}>
                      <m.icon size={20} style={{ color: m.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{m.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{m.desc}</p>
                    </div>
                    {method === m.id && <CheckCircle2 size={18} style={{ color: m.color }} />}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {step === 'schedule' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>اختر اليوم</p>
                <div className="flex gap-2 flex-wrap">
                  {days.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDay(d)}
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{
                        backgroundColor: selectedDay === d ? 'var(--color-primary)' : 'var(--color-surface)',
                        color: selectedDay === d ? '#fff' : 'var(--color-text)',
                        border: `1px solid ${selectedDay === d ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>اختر الوقت</p>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className="py-2 rounded-xl text-sm font-medium"
                      style={{
                        backgroundColor: selectedTime === t ? 'var(--color-primary)' : 'var(--color-surface)',
                        color: selectedTime === t ? '#fff' : 'var(--color-text)',
                        border: `1px solid ${selectedTime === t ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>ملاحظة (اختياري)</p>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="اشرح قضيتك باختصار..."
                    className="w-full bg-transparent text-sm outline-none placeholder:opacity-40 resize-none p-3 rounded-xl border"
                    style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                  />
                </div>
              </motion.div>
            )}

            {step === 'confirm' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>مراجعة الطلب</p>
                {[
                  { label: 'المحامي', value: lawyer.nameAr },
                  { label: 'طريقة التواصل', value: methods.find((m) => m.id === method)?.label ?? '' },
                  { label: 'اليوم', value: selectedDay ?? '—' },
                  { label: 'الوقت', value: selectedTime ?? '—' },
                  ...(note ? [{ label: 'الملاحظة', value: note }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-xl border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{value}</span>
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </PageTransition>

      <div
        className="absolute bottom-[60px] left-0 right-0 px-5 py-3 border-t flex gap-2"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      >
        {step !== 'method' && (
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setStep(step === 'confirm' ? 'schedule' : 'method')}
          >
            <ChevronRight size={18} />
          </Button>
        )}
        <Button
          fullWidth
          size="lg"
          disabled={step === 'method' ? !method : step === 'schedule' ? !selectedDay || !selectedTime : false}
          onClick={() => {
            if (step === 'method') setStep('schedule')
            else if (step === 'schedule') setStep('confirm')
            else handleConfirm()
          }}
        >
          {step === 'confirm' ? 'تأكيد الطلب' : 'التالي'}
          {step !== 'confirm' && <ChevronLeft size={18} />}
        </Button>
      </div>

      <BottomNav />
    </MobileFrame>
  )
}
