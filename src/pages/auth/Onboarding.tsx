import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileCheck2, ClipboardList, Scale } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { Button } from '../../components/ui/Button'

const slides: { Icon: LucideIcon; titleAr: string; descAr: string; bg: string }[] = [
  {
    Icon: FileCheck2,
    titleAr: 'اعرف حقوقك كاملة',
    descAr: 'تصفح القوانين الجزائرية بلغة بسيطة ومفهومة واحصل على إجابات فورية لأسئلتك القانونية.',
    bg: '#4F6EF7',
  },
  {
    Icon: ClipboardList,
    titleAr: 'تعامل مع أي إجراء',
    descAr: 'خطوات واضحة ومبسّطة تساعدك على إنهاء إجراءاتك الإدارية والقانونية بدون تعقيد.',
    bg: '#4F6EF7',
  },
  {
    Icon: Scale,
    titleAr: 'تواصل مع محامي موثوق',
    descAr: 'تواصل مباشرةً مع محامين معتمدين متاحين للإجابة على استشاراتك في أي وقت.',
    bg: '#4F6EF7',
  },
]

export function Onboarding() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      navigate('/account-type')
    }
  }

  const slide = slides[currentIndex]

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-6 gap-8"
          >
            <div
              className="w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl"
              style={{ backgroundColor: slide.bg }}
            >
              <slide.Icon size={56} color="#fff" strokeWidth={1.5} />
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-2xl font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
                {slide.titleAr}
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {slide.descAr}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="px-6 pb-12 flex flex-col items-center gap-6">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === currentIndex ? '24px' : '6px',
                  backgroundColor: i === currentIndex ? 'var(--color-primary)' : 'var(--color-border)',
                }}
              />
            ))}
          </div>

          <Button fullWidth size="lg" onClick={goNext}>
            {currentIndex < slides.length - 1 ? 'التالي' : 'ابدأ الآن'}
          </Button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm"
            style={{ color: 'var(--color-muted)' }}
          >
            لديّ حساب بالفعل — <span style={{ color: 'var(--color-primary)' }}>تسجيل الدخول</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  )
}
