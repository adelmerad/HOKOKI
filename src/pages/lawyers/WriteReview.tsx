import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'
import { lawyers } from '../../data/mockLawyers'

const criteria = [
  { id: 'professionalism', label: 'الاحترافية' },
  { id: 'communication', label: 'التواصل' },
  { id: 'knowledge', label: 'الكفاءة القانونية' },
  { id: 'value', label: 'القيمة مقابل السعر' },
]

export function WriteReview() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const lawyer = lawyers.find((l) => l.id === id)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!lawyer) return null

  const overallRating = Object.values(ratings).length > 0
    ? Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length
    : 0

  const canSubmit = Object.keys(ratings).length === criteria.length && text.trim().length >= 10

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      toast.success('تم نشر تقييمك بنجاح', {
        style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
      })
    }, 1200)
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="كتابة تقييم" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          {!submitted ? (
            <div className="px-5 pt-4 flex flex-col gap-5">
              {/* Lawyer Mini */}
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
                </div>
              </div>

              {/* Overall Rating Display */}
              {overallRating > 0 && (
                <div className="flex items-center justify-center gap-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star
                      key={s}
                      size={28}
                      fill={s <= Math.round(overallRating) ? '#F59E0B' : 'none'}
                      style={{ color: '#F59E0B' }}
                    />
                  ))}
                  <span className="text-lg font-bold mr-1" style={{ color: 'var(--color-text)' }}>
                    {overallRating.toFixed(1)}
                  </span>
                </div>
              )}

              {/* Criteria Ratings */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>التقييم التفصيلي</p>
                {criteria.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRatings((prev) => ({ ...prev, [c.id]: s }))}
                        >
                          <Star
                            size={20}
                            fill={s <= (ratings[c.id] ?? 0) ? '#F59E0B' : 'none'}
                            style={{ color: '#F59E0B' }}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text)' }}>{c.label}</p>
                  </div>
                ))}
              </div>

              {/* Review Text */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  تعليقك (10 أحرف على الأقل)
                </p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  placeholder="شارك تجربتك مع هذا المحامي..."
                  className="w-full bg-transparent text-sm outline-none placeholder:opacity-40 resize-none p-3 rounded-2xl border"
                  style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                />
                <p className="text-xs mt-1 text-left" style={{ color: 'var(--color-muted)' }}>
                  {text.length} حرف
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-5 pt-16 px-5"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}
              >
                <CheckCircle2 size={40} style={{ color: 'var(--color-success)' }} />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>شكراً على تقييمك!</h2>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  تقييمك يساعد المستخدمين الآخرين في اختيار المحامي المناسب.
                </p>
              </div>
              <Button fullWidth size="lg" onClick={() => navigate(`/lawyers/${id}/reviews`)}>
                عرض جميع التقييمات
              </Button>
            </motion.div>
          )}
        </div>
      </PageTransition>

      {!submitted && (
        <div
          className="absolute bottom-[60px] left-0 right-0 px-5 py-3 border-t"
          style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
        >
          <Button fullWidth size="lg" onClick={handleSubmit} isLoading={loading} disabled={!canSubmit}>
            نشر التقييم
          </Button>
        </div>
      )}

      <BottomNav />
    </MobileFrame>
  )
}
