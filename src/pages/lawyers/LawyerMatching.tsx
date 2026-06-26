import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ChevronLeft, MapPin } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { LawCategoryIcon, getLawCategoryColor } from '../../components/ui/LawCategoryIcon'
import { lawyers } from '../../data/mockLawyers'
import { lawCategories } from '../../data/mockLaws'

export function LawyerMatching() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedWilaya, setSelectedWilaya] = useState('')
  const [showResults, setShowResults] = useState(false)

  const matched = lawyers.filter((l) => {
    const catMatch = !selectedCategory || l.specialtyCategory === selectedCategory
    const wilayaMatch = !selectedWilaya || l.wilaya === selectedWilaya
    return catMatch && wilayaMatch
  })

  if (showResults) {
    return (
      <MobileFrame>
        <StatusBar />
        <TopBar title="نتائج المطابقة" />
        <PageTransition>
          <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
            <div className="px-5 py-4">
              <div
                className="flex items-center gap-3 p-3 rounded-xl mb-4"
                style={{ backgroundColor: 'rgba(79,110,247,0.1)', border: '1px solid rgba(79,110,247,0.2)' }}
              >
                <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
                <p className="text-sm" style={{ color: 'var(--color-primary)' }}>
                  وجدنا {matched.length} محامٍ يناسب طلبك
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {matched.map((lawyer, i) => (
                  <motion.button
                    key={lawyer.id}
                    type="button"
                    onClick={() => navigate(`/lawyers/${lawyer.id}`)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 p-4 rounded-2xl border text-right"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0"
                      style={{ backgroundColor: `${lawyer.avatarColor}20`, color: lawyer.avatarColor }}
                    >
                      {lawyer.nameAr.split(' ').slice(-2).map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{lawyer.nameAr}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{lawyer.specialty}</p>
                    </div>
                    <ChevronLeft size={16} style={{ color: 'var(--color-muted)' }} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </PageTransition>
        <BottomNav />
      </MobileFrame>
    )
  }

  const wilayas = [
    { id: 'الجزائر العاصمة', label: 'الجزائر العاصمة' },
    { id: 'وهران', label: 'وهران' },
    { id: 'قسنطينة', label: 'قسنطينة' },
    { id: 'other', label: 'ولاية أخرى' },
  ]

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="مطابقة المحامي" onBack={step > 0 ? () => setStep(0) : undefined} />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-6">
          <div className="px-5 py-5">
            <div className="flex gap-2 mb-6">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-1 rounded-full"
                  style={{ backgroundColor: i <= step ? 'var(--color-primary)' : 'var(--color-border)' }}
                />
              ))}
            </div>

            {step === 0 && (
              <>
                <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--color-text)' }}>
                  ما نوع قضيتك القانونية؟
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {lawCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => { setSelectedCategory(cat.id); setStep(1) }}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border active:scale-95 transition-transform"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${getLawCategoryColor(cat.id)}18` }}
                      >
                        <LawCategoryIcon categoryId={cat.id} size={20} />
                      </div>
                      <span className="text-xs font-medium text-center" style={{ color: 'var(--color-text)' }}>
                        {cat.nameAr}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--color-text)' }}>
                  في أي ولاية تقطن؟
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {wilayas.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => { setSelectedWilaya(w.id === 'other' ? '' : w.id); setShowResults(true) }}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border active:scale-95 transition-transform"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(79,110,247,0.1)' }}
                      >
                        <MapPin size={20} style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <span className="text-xs font-medium text-center" style={{ color: 'var(--color-text)' }}>
                        {w.label}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
