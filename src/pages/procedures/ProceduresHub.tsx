import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, FileText, Monitor, Landmark, Clock, Banknote } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { procedures } from '../../data/mockProcedures'

const difficultyLabel: Record<string, string> = { easy: 'سهل', medium: 'متوسط', complex: 'معقد' }
const difficultyVariant: Record<string, 'success' | 'warning' | 'danger'> = { easy: 'success', medium: 'warning', complex: 'danger' }

export function ProceduresHub() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | 'online' | 'easy'>('all')

  const filtered = procedures.filter((p) => {
    if (filter === 'online') return p.isOnline
    if (filter === 'easy') return p.difficulty === 'easy'
    return true
  })

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-5 py-4">
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>الإجراءات القانونية</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
              خطوة بخطوة حتى تُكمل إجراءك
            </p>
          </div>

          {/* Search */}
          <div className="px-5 pb-3">
            <button
              type="button"
              onClick={() => navigate('/procedures/search')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-right"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Search size={16} style={{ color: 'var(--color-muted)' }} />
              <span className="flex-1 text-sm" style={{ color: 'var(--color-muted)', opacity: 0.5 }}>
                ابحث في الإجراءات...
              </span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 px-5 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {[
              { id: 'all', label: 'الكل' },
              { id: 'online', label: 'إلكتروني' },
              { id: 'easy', label: 'سهل' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id as typeof filter)}
                className="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: filter === f.id ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: filter === f.id ? '#fff' : 'var(--color-muted)',
                  border: `1px solid ${filter === f.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Document Generator CTA */}
          <div className="px-5 pb-4">
            <button
              type="button"
              onClick={() => navigate('/documents')}
              className="w-full flex items-center gap-3 p-4 rounded-2xl text-right"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #4F6EF7)', color: '#fff' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <FileText size={20} color="#fff" />
              </div>
              <div>
                <p className="font-semibold text-sm">مولّد الوثائق</p>
                <p className="text-xs opacity-70 mt-0.5">اطبع وثيقتك الرسمية في دقائق</p>
              </div>
            </button>
          </div>

          {/* Procedures List */}
          <div className="px-5 flex flex-col gap-3">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-10">
                <Search size={32} style={{ color: 'var(--color-muted)', opacity: 0.3 }} />
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>لا توجد إجراءات تطابق الفلتر</p>
              </div>
            )}
            {filtered.map((proc, i) => (
              <motion.button
                key={proc.id}
                type="button"
                onClick={() => navigate(`/procedures/${proc.id}`)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl border text-right w-full"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-raised)' }}
                  >
                    {proc.isOnline
                      ? <Monitor size={20} style={{ color: 'var(--color-primary)' }} />
                      : <Landmark size={20} style={{ color: 'var(--color-muted)' }} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold flex-1 truncate" style={{ color: 'var(--color-text)' }}>
                        {proc.nameAr}
                      </p>
                      <Badge variant={difficultyVariant[proc.difficulty]} size="xs">
                        {difficultyLabel[proc.difficulty]}
                      </Badge>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{proc.nameFr}</p>
                    <div className="flex gap-3 mt-1.5">
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-muted)' }}>
                        <Clock size={11} /> {proc.durationAr}
                      </span>
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-muted)' }}>
                        <Banknote size={11} /> {proc.costAr}
                      </span>
                      {proc.isOnline && (
                        <Badge variant="primary" size="xs">إلكتروني</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
