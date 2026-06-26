import { useParams } from 'react-router-dom'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { lawyers } from '../../data/mockLawyers'

export function LawyerReviews() {
  const { id } = useParams<{ id: string }>()
  const lawyer = lawyers.find((l) => l.id === id)
  if (!lawyer) return null

  const avgRating = (lawyer.reviews.reduce((a, r) => a + r.rating, 0) / lawyer.reviews.length).toFixed(1)

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="التقييمات" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {/* Rating Summary */}
          <div className="px-5 py-4">
            <div
              className="p-4 rounded-2xl border flex items-center gap-5"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold" style={{ color: 'var(--color-text)' }}>{avgRating}</span>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={12} fill={s <= Number(avgRating) ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />
                  ))}
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{lawyer.reviewCount} تقييم</p>
              </div>
              <div className="flex-1">
                {[5,4,3,2,1].map((star) => {
                  const count = lawyer.reviews.filter((r) => r.rating === star).length
                  const pct = Math.round((count / lawyer.reviews.length) * 100)
                  return (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <span className="text-xs w-3" style={{ color: 'var(--color-muted)' }}>{star}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#F59E0B' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="px-5 flex flex-col gap-3">
            {lawyer.reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-4 rounded-2xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: 'var(--color-raised)', color: 'var(--color-primary)' }}
                    >
                      {review.nameInitial}
                    </div>
                    <div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={11} fill={s <= review.rating ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    {new Date(review.date).toLocaleDateString('ar-DZ', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                  {review.textAr}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
