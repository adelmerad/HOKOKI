import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, Banknote, Monitor, Landmark, SlidersHorizontal } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { procedures } from '../../data/mockProcedures'

type FilterDiff = 'all' | 'easy' | 'medium' | 'complex'
type FilterMode = 'all' | 'online' | 'inperson'

export function ProcedureSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState<FilterDiff>('all')
  const [mode, setMode] = useState<FilterMode>('all')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    return procedures.filter((p) => {
      const matchesQuery = !query.trim() || p.nameAr.includes(query) || p.nameFr.toLowerCase().includes(query.toLowerCase()) || p.category.includes(query)
      const matchesDiff = difficulty === 'all' || p.difficulty === difficulty
      const matchesMode = mode === 'all' || (mode === 'online' ? p.isOnline : !p.isOnline)
      return matchesQuery && matchesDiff && matchesMode
    })
  }, [query, difficulty, mode])

  const diffOptions: { id: FilterDiff; label: string }[] = [
    { id: 'all', label: 'الكل' },
    { id: 'easy', label: 'سهل' },
    { id: 'medium', label: 'متوسط' },
    { id: 'complex', label: 'معقد' },
  ]

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="البحث في الإجراءات" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {/* Search + Filter Row */}
          <div className="px-4 pt-3 pb-2 flex gap-2">
            <div
              className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Search size={16} style={{ color: 'var(--color-muted)' }} />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن إجراء..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                style={{ color: 'var(--color-text)' }}
              />
              {query && (
                <button type="button" onClick={() => setQuery('')}>
                  <X size={14} style={{ color: 'var(--color-muted)' }} />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="w-11 h-11 rounded-2xl flex items-center justify-center border"
              style={{
                backgroundColor: showFilters ? 'var(--color-primary)' : 'var(--color-surface)',
                borderColor: showFilters ? 'var(--color-primary)' : 'var(--color-border)',
              }}
            >
              <SlidersHorizontal size={16} style={{ color: showFilters ? '#fff' : 'var(--color-muted)' }} />
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden px-4 pb-3"
              >
                <div className="p-3 rounded-2xl border flex flex-col gap-3" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                  <div>
                    <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>الصعوبة</p>
                    <div className="flex gap-2">
                      {diffOptions.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDifficulty(d.id)}
                          className="flex-1 py-1.5 rounded-xl text-xs font-medium"
                          style={{
                            backgroundColor: difficulty === d.id ? 'var(--color-primary)' : 'var(--color-raised)',
                            color: difficulty === d.id ? '#fff' : 'var(--color-muted)',
                            border: `1px solid ${difficulty === d.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                          }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>طريقة التقديم</p>
                    <div className="flex gap-2">
                      {[
                        { id: 'all' as FilterMode, label: 'الكل' },
                        { id: 'online' as FilterMode, label: 'إلكتروني', icon: Monitor },
                        { id: 'inperson' as FilterMode, label: 'حضوري', icon: Landmark },
                      ].map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setMode(id)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-medium"
                          style={{
                            backgroundColor: mode === id ? 'var(--color-primary)' : 'var(--color-raised)',
                            color: mode === id ? '#fff' : 'var(--color-muted)',
                            border: `1px solid ${mode === id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                          }}
                        >
                          {Icon && <Icon size={11} />}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <div className="px-4">
            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-3 pt-10">
                <Search size={32} style={{ color: 'var(--color-muted)', opacity: 0.3 }} />
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>لا توجد نتائج</p>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  {results.length} إجراء
                </p>
                <div className="flex flex-col gap-2.5">
                  {results.map((proc, i) => (
                    <motion.button
                      key={proc.id}
                      type="button"
                      onClick={() => navigate(`/procedures/${proc.id}`)}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-4 rounded-2xl border text-right w-full"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: proc.isOnline ? 'rgba(79,110,247,0.1)' : 'rgba(124,58,237,0.1)' }}
                      >
                        {proc.isOnline
                          ? <Monitor size={18} style={{ color: 'var(--color-primary)' }} />
                          : <Landmark size={18} style={{ color: '#7C3AED' }} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{proc.nameAr}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Clock size={10} style={{ color: 'var(--color-muted)' }} />
                            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{proc.durationAr}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Banknote size={10} style={{ color: 'var(--color-muted)' }} />
                            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{proc.costAr}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={proc.difficulty === 'easy' ? 'success' : proc.difficulty === 'medium' ? 'warning' : 'danger'}
                        size="xs"
                      >
                        {proc.difficulty === 'easy' ? 'سهل' : proc.difficulty === 'medium' ? 'متوسط' : 'معقد'}
                      </Badge>
                    </motion.button>
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
