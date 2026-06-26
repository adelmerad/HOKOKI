import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Plus, Trash2, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'

interface DaySlot {
  day: string
  slots: string[]
  active: boolean
}

const INITIAL_DAYS: DaySlot[] = [
  { day: 'الأحد', slots: [], active: false },
  { day: 'الإثنين', slots: ['09:00', '10:00', '14:00'], active: true },
  { day: 'الثلاثاء', slots: ['10:00', '11:00', '15:00'], active: true },
  { day: 'الأربعاء', slots: ['14:00', '16:00'], active: true },
  { day: 'الخميس', slots: ['09:00', '11:00'], active: true },
  { day: 'الجمعة', slots: [], active: false },
  { day: 'السبت', slots: ['10:00'], active: true },
]

const ALL_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export function LawyerAvailability() {
  const [days, setDays] = useState<DaySlot[]>(INITIAL_DAYS)
  const [selectedDay, setSelectedDay] = useState<string | null>('الإثنين')
  const [addingSlot, setAddingSlot] = useState(false)

  const current = days.find((d) => d.day === selectedDay)

  const toggleDay = (dayName: string) => {
    setDays((prev) =>
      prev.map((d) => d.day === dayName ? { ...d, active: !d.active, slots: d.active ? [] : d.slots } : d)
    )
  }

  const addSlot = (slot: string) => {
    setDays((prev) =>
      prev.map((d) =>
        d.day === selectedDay && !d.slots.includes(slot)
          ? { ...d, slots: [...d.slots, slot].sort() }
          : d
      )
    )
    setAddingSlot(false)
  }

  const removeSlot = (slot: string) => {
    setDays((prev) =>
      prev.map((d) => d.day === selectedDay ? { ...d, slots: d.slots.filter((s) => s !== slot) } : d)
    )
  }

  const handleSave = () => {
    toast.success('تم حفظ جدول التوفر', {
      style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    })
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="إدارة المواعيد" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          <div className="px-5 pt-4">
            {/* Days Row */}
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>أيام العمل</p>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              {days.map((d) => (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => { setSelectedDay(d.day); setAddingSlot(false) }}
                  className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl shrink-0 border transition-all"
                  style={{
                    backgroundColor: selectedDay === d.day ? 'var(--color-primary)' : d.active ? 'var(--color-surface)' : 'var(--color-raised)',
                    borderColor: selectedDay === d.day ? 'var(--color-primary)' : 'var(--color-border)',
                    opacity: d.active ? 1 : 0.5,
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: selectedDay === d.day ? '#fff' : 'var(--color-text)' }}>
                    {d.day}
                  </span>
                  {d.active && d.slots.length > 0 && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: selectedDay === d.day ? 'rgba(255,255,255,0.25)' : 'rgba(79,110,247,0.15)',
                        color: selectedDay === d.day ? '#fff' : 'var(--color-primary)',
                      }}
                    >
                      {d.slots.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {current && (
              <motion.div key={selectedDay} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Toggle Day Active */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => toggleDay(current.day)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium"
                    style={{
                      backgroundColor: current.active ? 'rgba(34,197,94,0.08)' : 'var(--color-surface)',
                      borderColor: current.active ? 'rgba(34,197,94,0.35)' : 'var(--color-border)',
                      color: current.active ? 'var(--color-success)' : 'var(--color-muted)',
                    }}
                  >
                    <CheckCircle2 size={15} />
                    {current.active ? 'يوم عمل' : 'إجازة'}
                  </button>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {current.day}
                  </p>
                </div>

                {current.active && (
                  <>
                    <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
                      أوقات الاستقبال
                    </p>

                    <div className="flex flex-col gap-2 mb-3">
                      {current.slots.length === 0 ? (
                        <div
                          className="p-4 rounded-2xl border text-center"
                          style={{ borderColor: 'var(--color-border)', borderStyle: 'dashed' }}
                        >
                          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>لم تُضف أوقاتاً بعد</p>
                        </div>
                      ) : (
                        current.slots.map((slot) => (
                          <motion.div
                            key={slot}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between p-3 rounded-xl border"
                            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                          >
                            <button
                              type="button"
                              onClick={() => removeSlot(slot)}
                              className="p-1.5 rounded-lg"
                              style={{ color: 'var(--color-danger)' }}
                            >
                              <Trash2 size={14} />
                            </button>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{slot}</span>
                              <Clock size={14} style={{ color: 'var(--color-primary)' }} />
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>

                    {!addingSlot ? (
                      <button
                        type="button"
                        onClick={() => setAddingSlot(true)}
                        className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border text-sm font-medium"
                        style={{ borderColor: 'var(--color-primary)', borderStyle: 'dashed', color: 'var(--color-primary)' }}
                      >
                        <Plus size={16} />
                        إضافة وقت
                      </button>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>اختر الوقت</p>
                        <div className="grid grid-cols-4 gap-2">
                          {ALL_SLOTS.filter((s) => !current.slots.includes(s)).map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => addSlot(slot)}
                              className="py-2 rounded-xl text-sm font-medium border"
                              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setAddingSlot(false)}
                          className="w-full mt-2 text-sm py-2"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          إلغاء
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </PageTransition>

      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      >
        <Button fullWidth size="lg" onClick={handleSave}>
          <CheckCircle2 size={18} />
          حفظ جدول التوفر
        </Button>
      </div>
    </MobileFrame>
  )
}
