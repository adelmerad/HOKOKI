import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Star } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'
import { procedures } from '../../data/mockProcedures'

export function ProcedureCompleted() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const proc = procedures.find((p) => p.id === id)
  if (!proc) return null

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.2 }}
            className="flex flex-col items-center gap-5"
          >
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(34,197,94,0.15)', border: '3px solid var(--color-success)' }}
            >
              <CheckCircle2 size={52} style={{ color: 'var(--color-success)' }} />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                أحسنت! أُنجز الإجراء
              </h1>
              <p className="text-base mt-2" style={{ color: 'var(--color-muted)' }}>
                {proc.nameAr}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full p-5 rounded-2xl border"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <p className="text-sm font-semibold mb-3 text-center" style={{ color: 'var(--color-text)' }}>
              قيّم تجربتك
            </p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileTap={{ scale: 1.3 }}
                >
                  <Star size={28} style={{ color: '#F59E0B' }} fill="#F59E0B" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full flex flex-col gap-3"
          >
            <Button fullWidth size="lg" onClick={() => navigate('/procedures')}>
              إجراء آخر
            </Button>
            <Button fullWidth variant="secondary" onClick={() => navigate('/home')}>
              العودة للرئيسية
            </Button>
          </motion.div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
