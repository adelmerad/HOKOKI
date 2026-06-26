import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Scale,
  BookOpen,
  ListChecks,
  Lightbulb,
  BadgeAlert,
} from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'
import { analyseContract } from '../../lib/api/contract'
import type { ContractAnalysisResult } from '../../types'

// ── helpers ──────────────────────────────────────────────────────────────────

function resolveVerdict(verdict: string): 'legitimate' | 'suspicious' | 'invalid' {
  const v = verdict.toLowerCase()
  if (v.includes('legitimate') || v.includes('valid') || v.includes('صحيح') || v.includes('شرعي')) return 'legitimate'
  if (v.includes('invalid') || v.includes('غير صحيح') || v.includes('باطل')) return 'invalid'
  return 'suspicious'
}

const verdictConfig = {
  legitimate: {
    label: 'عقد صحيح وشرعي',
    sublabel: 'لم يتم رصد أي مشكلات قانونية جوهرية',
    Icon: CheckCircle2,
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
  },
  suspicious: {
    label: 'عقد مشبوه',
    sublabel: 'يحتوي على بنود تستوجب المراجعة',
    Icon: AlertTriangle,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
  },
  invalid: {
    label: 'عقد غير صحيح',
    sublabel: 'يحتوي على مشكلات قانونية خطيرة',
    Icon: XCircle,
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
  },
}

const severityMap: Record<string, { label: string; color: string; bg: string }> = {
  high:      { label: 'خطورة عالية',     color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  medium:    { label: 'خطورة متوسطة',    color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  low:       { label: 'خطورة منخفضة',    color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
  عالية:     { label: 'خطورة عالية',     color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  متوسطة:    { label: 'خطورة متوسطة',    color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  منخفضة:    { label: 'خطورة منخفضة',    color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
}

function getSeverity(s: string) {
  return (
    severityMap[s.toLowerCase()] ??
    severityMap[s] ??
    { label: s, color: '#6B7280', bg: 'rgba(107,114,128,0.12)' }
  )
}

// ── Score ring ────────────────────────────────────────────────────────────────

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 28
  const circ = 2 * Math.PI * r
  const dash = (Math.min(100, Math.max(0, score)) / 100) * circ
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="shrink-0">
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-border)" strokeWidth="6" />
      <circle
        cx="36" cy="36" r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ / 4}
        transform="rotate(-90 36 36)"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text x="36" y="40" textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>
        {score}
      </text>
    </svg>
  )
}

// ── Collapsible section ───────────────────────────────────────────────────────

function CollapsibleSection({
  icon,
  title,
  count,
  accentColor,
  accentBg,
  children,
  defaultOpen = false,
}: {
  icon: React.ReactNode
  title: string
  count: number
  accentColor: string
  accentBg: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{title}</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
            style={{ backgroundColor: accentBg, color: accentColor }}
          >
            {count}
          </span>
        </div>
        {open
          ? <ChevronUp size={15} style={{ color: 'var(--color-muted)' }} />
          : <ChevronDown size={15} style={{ color: 'var(--color-muted)' }} />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function ContractAnalyse() {
  const [contractText, setContractText] = useState('')
  const [isAnalysing, setIsAnalysing] = useState(false)
  const [result, setResult] = useState<ContractAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleAnalyse = async () => {
    if (!contractText.trim() || isAnalysing) return
    setIsAnalysing(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyseContract(contractText.trim())
      setResult(data)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    } catch {
      setError('حدث خطأ أثناء التحليل. تحقق من اتصالك وحاول مجدداً.')
    } finally {
      setIsAnalysing(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setContractText('')
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar
        title="تحليل العقود"
        rightAction={
          result ? (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl"
              style={{ backgroundColor: 'var(--color-raised)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
            >
              <RotateCcw size={12} />
              تحليل جديد
            </button>
          ) : undefined
        }
      />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>

          {/* Intro card */}
          <div className="px-5 pt-3 pb-4">
            <div
              className="p-4 rounded-2xl border flex items-start gap-3"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(79,110,247,0.15)' }}
              >
                <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  محلل العقود الذكي
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  الصق نص عقدك أو وثيقتك القانونية وسيحللها المساعد الذكي ويخبرك بمدى مشروعيتها والمخاطر التي تحتويها.
                </p>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="px-5 pb-4">
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div
                className="px-4 py-2.5 border-b flex items-center gap-2"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <FileText size={13} style={{ color: 'var(--color-muted)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>نص العقد أو الوثيقة</span>
                {contractText.length > 0 && (
                  <span className="text-[10px] mr-auto tabular-nums" style={{ color: 'var(--color-muted)', opacity: 0.5 }}>
                    {contractText.length.toLocaleString('ar-DZ')} حرف
                  </span>
                )}
              </div>
              <textarea
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                placeholder="الصق هنا نص العقد أو الوثيقة القانونية التي تريد تحليلها..."
                className="w-full bg-transparent outline-none text-sm resize-none p-4 leading-relaxed"
                style={{
                  color: 'var(--color-text)',
                  minHeight: '180px',
                  maxHeight: '300px',
                  fontFamily: 'Cairo, sans-serif',
                  caretColor: 'var(--color-primary)',
                }}
                dir="rtl"
              />
            </div>
          </div>

          {/* Analyse button */}
          <div className="px-5 pb-5">
            <Button
              fullWidth
              size="lg"
              onClick={handleAnalyse}
              isLoading={isAnalysing}
              disabled={!contractText.trim() || isAnalysing}
            >
              {!isAnalysing && <ShieldCheck size={18} />}
              {isAnalysing ? 'جاري تحليل العقد...' : 'تحليل العقد'}
            </Button>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-5 mb-4 p-4 rounded-2xl border flex items-start gap-3"
                style={{ backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' }}
              >
                <XCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-danger)' }} />
                <p className="text-sm" style={{ color: 'var(--color-danger)' }}>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result && (() => {
              const key = resolveVerdict(result.verdict)
              const cfg = verdictConfig[key]
              const VerdictIcon = cfg.Icon

              return (
                <motion.div
                  ref={resultsRef}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-5 flex flex-col gap-3 pb-4"
                >
                  {/* Score + verdict banner */}
                  <div
                    className="p-4 rounded-2xl border flex items-center gap-4"
                    style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
                  >
                    <ScoreRing score={result.overallScore} color={cfg.color} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <VerdictIcon size={16} style={{ color: cfg.color }} />
                        <p className="text-base font-bold" style={{ color: cfg.color }}>{cfg.label}</p>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{cfg.sublabel}</p>
                      <p className="text-[10px] mt-1 font-semibold" style={{ color: cfg.color, opacity: 0.75 }}>
                        النتيجة الإجمالية: {result.overallScore}/100
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div
                    className="p-4 rounded-2xl border"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                      الملخص القانوني
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      {result.summary}
                    </p>
                  </div>

                  {/* Issues */}
                  {result.issues.length > 0 && (
                    <CollapsibleSection
                      icon={<BadgeAlert size={14} style={{ color: 'var(--color-danger)' }} />}
                      title="المشكلات القانونية"
                      count={result.issues.length}
                      accentColor="var(--color-danger)"
                      accentBg="rgba(239,68,68,0.12)"
                      defaultOpen
                    >
                      <div className="flex flex-col divide-y" style={{ borderColor: 'var(--color-border)' }}>
                        {result.issues.map((issue, i) => {
                          const sev = getSeverity(issue.severity)
                          return (
                            <div key={i} className="p-4 flex flex-col gap-2.5">
                              {/* severity */}
                              <span
                                className="self-start text-[10px] px-2 py-0.5 rounded-full font-bold"
                                style={{ backgroundColor: sev.bg, color: sev.color }}
                              >
                                {sev.label}
                              </span>

                              {/* clause in contract */}
                              {issue.clauseInContract && (
                                <div
                                  className="p-2.5 rounded-xl text-xs leading-relaxed italic"
                                  style={{
                                    backgroundColor: 'var(--color-raised)',
                                    color: 'var(--color-muted)',
                                    borderRight: `3px solid ${sev.color}`,
                                  }}
                                  dir="rtl"
                                >
                                  &ldquo;{issue.clauseInContract}&rdquo;
                                </div>
                              )}

                              {/* explanation */}
                              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                                {issue.explanation}
                              </p>

                              {/* violated article */}
                              {issue.violatedArticle && (
                                <div className="flex items-start gap-2">
                                  <Scale size={12} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                                  <p className="text-xs" style={{ color: 'var(--color-primary)' }}>
                                    <span className="font-semibold">المادة المنتهكة: </span>
                                    {issue.violatedArticle}
                                  </p>
                                </div>
                              )}

                              {/* article content */}
                              {issue.articleContent && (
                                <div
                                  className="p-2.5 rounded-xl text-xs leading-relaxed"
                                  style={{
                                    backgroundColor: 'rgba(79,110,247,0.06)',
                                    color: 'var(--color-muted)',
                                    borderRight: '3px solid var(--color-primary)',
                                  }}
                                  dir="rtl"
                                >
                                  {issue.articleContent}
                                </div>
                              )}

                              {/* suggestion */}
                              {issue.suggestion && (
                                <div className="flex items-start gap-2">
                                  <Lightbulb size={12} className="shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                                    <span className="font-semibold" style={{ color: '#F59E0B' }}>الاقتراح: </span>
                                    {issue.suggestion}
                                  </p>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Missing clauses */}
                  {result.missingClauses.length > 0 && (
                    <CollapsibleSection
                      icon={<AlertTriangle size={14} style={{ color: '#F59E0B' }} />}
                      title="البنود المفقودة"
                      count={result.missingClauses.length}
                      accentColor="#F59E0B"
                      accentBg="rgba(245,158,11,0.12)"
                    >
                      <div className="px-4 py-3 flex flex-col gap-2.5">
                        {result.missingClauses.map((clause, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#F59E0B' }} />
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{clause}</p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Positive clauses */}
                  {result.positiveClauses.length > 0 && (
                    <CollapsibleSection
                      icon={<CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />}
                      title="البنود الإيجابية"
                      count={result.positiveClauses.length}
                      accentColor="var(--color-success)"
                      accentBg="rgba(34,197,94,0.12)"
                    >
                      <div className="px-4 py-3 flex flex-col gap-2.5">
                        {result.positiveClauses.map((clause, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--color-success)' }} />
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{clause}</p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Recommended actions */}
                  {result.recommendedActions.length > 0 && (
                    <CollapsibleSection
                      icon={<ListChecks size={14} style={{ color: 'var(--color-primary)' }} />}
                      title="الإجراءات الموصى بها"
                      count={result.recommendedActions.length}
                      accentColor="var(--color-primary)"
                      accentBg="rgba(79,110,247,0.12)"
                    >
                      <div className="px-4 py-3 flex flex-col gap-2.5">
                        {result.recommendedActions.map((action, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span
                              className="text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                            >
                              {i + 1}
                            </span>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{action}</p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Applicable laws */}
                  {result.applicableLaws.length > 0 && (
                    <CollapsibleSection
                      icon={<BookOpen size={14} style={{ color: 'var(--color-muted)' }} />}
                      title="القوانين المطبقة"
                      count={result.applicableLaws.length}
                      accentColor="var(--color-muted)"
                      accentBg="var(--color-raised)"
                    >
                      <div className="px-4 py-3 flex flex-col gap-2">
                        {result.applicableLaws.map((law, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <Scale size={12} className="shrink-0" style={{ color: 'var(--color-primary)' }} />
                            <p className="text-sm" style={{ color: 'var(--color-text)' }}>{law}</p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                </motion.div>
              )
            })()}
          </AnimatePresence>

        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
