import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { procedures } from '../../data/mockProcedures'

const trackedProcedures = [
  { procedureId: 'passport-renewal', completedSteps: ['s1', 's2'], status: 'active' as const },
  { procedureId: 'criminal-record', completedSteps: ['s1'], status: 'completed' as const },
  { procedureId: 'birth-cert', completedSteps: [], status: 'paused' as const },
]

export function ProceduresTracker() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="متابعة إجراءاتي" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-6">
          <div className="px-5 py-4 flex flex-col gap-3">
            {trackedProcedures.map((tracked, i) => {
              const proc = procedures.find((p) => p.id === tracked.procedureId)
              if (!proc) return null
              const progress = Math.round((tracked.completedSteps.length / proc.steps.length) * 100)

              return (
                <motion.button
                  key={tracked.procedureId}
                  type="button"
                  onClick={() => navigate(`/procedures/${proc.id}/active`)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-2xl border text-right w-full"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {proc.nameAr}
                    </p>
                    <Badge
                      variant={tracked.status === 'completed' ? 'success' : tracked.status === 'active' ? 'primary' : 'muted'}
                      size="xs"
                    >
                      {tracked.status === 'completed' ? 'مكتمل' : tracked.status === 'active' ? 'جارٍ' : 'متوقف'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: tracked.status === 'completed' ? 'var(--color-success)' : 'var(--color-primary)',
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--color-muted)' }}>
                      {tracked.completedSteps.length}/{proc.steps.length}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
