import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Building2, Banknote } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'
import { procedures } from '../../data/mockProcedures'

export function ProcedureActive() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const proc = procedures.find((p) => p.id === id)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [expandedStep, setExpandedStep] = useState<string | null>(proc?.steps[0]?.id ?? null)

  if (!proc) return null

  const progress = Math.round((completedSteps.size / proc.steps.length) * 100)

  const markStep = (stepId: string) => {
    const next = new Set(completedSteps)
    next.add(stepId)
    setCompletedSteps(next)

    const stepIndex = proc.steps.findIndex((s) => s.id === stepId)
    const nextStep = proc.steps[stepIndex + 1]
    if (nextStep) {
      setExpandedStep(nextStep.id)
    } else {
      setTimeout(() => navigate(`/procedures/${id}/completed`), 600)
    }
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title={proc.nameAr} />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Progress */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                التقدم
              </span>
              <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                {completedSteps.size}/{proc.steps.length}
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
              />
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="px-5 flex flex-col gap-2">
            {proc.steps.map((step, i) => {
              const isDone = completedSteps.has(step.id)
              const isCurrent = !isDone && [...proc.steps].slice(0, i).every((s) => completedSteps.has(s.id))
              const isExpanded = expandedStep === step.id

              return (
                <div key={step.id} className="relative">
                  {/* Vertical connector */}
                  {i < proc.steps.length - 1 && (
                    <div
                      className="absolute right-[22px] top-[44px] w-0.5 h-6 z-0"
                      style={{ backgroundColor: isDone ? 'var(--color-success)' : 'var(--color-border)' }}
                    />
                  )}

                  <motion.div
                    layout
                    className="rounded-2xl border overflow-hidden"
                    style={{
                      backgroundColor: isCurrent ? 'rgba(79,110,247,0.05)' : 'var(--color-surface)',
                      borderColor: isCurrent ? 'rgba(79,110,247,0.3)' : isDone ? 'rgba(34,197,94,0.3)' : 'var(--color-border)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                      className="w-full flex items-center gap-3 p-4 text-right"
                    >
                      <div className="flex-shrink-0">
                        {isDone ? (
                          <CheckCircle2 size={22} style={{ color: 'var(--color-success)' }} />
                        ) : (
                          <div
                            className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center"
                            style={{
                              borderColor: isCurrent ? 'var(--color-primary)' : 'var(--color-border)',
                            }}
                          >
                            {isCurrent && (
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-right">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: isDone ? 'var(--color-muted)' : 'var(--color-text)' }}
                        >
                          {i + 1}. {step.titleAr}
                        </p>
                        {step.officeName && (
                          <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--color-muted)' }}>
                            <Building2 size={11} /> {step.officeName}
                          </p>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={16} style={{ color: 'var(--color-muted)' }} />
                      ) : (
                        <ChevronDown size={16} style={{ color: 'var(--color-muted)' }} />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 flex flex-col gap-3">
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                              {step.instructionsAr}
                            </p>

                            {step.requiredDocuments.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                                  الوثائق المطلوبة:
                                </p>
                                <div className="flex flex-col gap-1.5">
                                  {step.requiredDocuments.map((doc, di) => (
                                    <div key={di} className="flex items-center gap-2">
                                      <Circle size={8} style={{ color: 'var(--color-primary)' }} />
                                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                                        {doc.nameAr} ({doc.copies} نسخ)
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {step.officeCost && (
                              <div
                                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                                style={{ backgroundColor: 'rgba(34,197,94,0.1)' }}
                              >
                                <Banknote size={16} style={{ color: 'var(--color-success)' }} />
                                <p className="text-sm font-medium" style={{ color: 'var(--color-success)' }}>
                                  {step.officeCost}
                                </p>
                              </div>
                            )}

                            {!isDone && (
                              <Button
                                size="sm"
                                fullWidth
                                onClick={() => markStep(step.id)}
                              >
                                <CheckCircle2 size={16} />
                                أتممت هذه الخطوة
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
