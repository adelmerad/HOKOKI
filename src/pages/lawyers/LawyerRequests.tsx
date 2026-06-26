import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, CheckCircle2, XCircle, Hourglass } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { lawyerRequests } from '../../data/mockLawyerRequests'
import type { LawyerRequest } from '../../data/mockLawyerRequests'

type Filter = 'all' | 'pending' | 'accepted' | 'completed' | 'rejected'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'pending', label: 'جديدة' },
  { id: 'accepted', label: 'مقبولة' },
  { id: 'completed', label: 'مكتملة' },
  { id: 'rejected', label: 'مرفوضة' },
]

function StatusBadge({ status }: { status: LawyerRequest['status'] }) {
  if (status === 'pending') return <Badge variant="warning" size="xs">جديد</Badge>
  if (status === 'accepted') return <Badge variant="primary" size="xs">مقبول</Badge>
  if (status === 'completed') return <Badge variant="success" size="xs">مكتمل</Badge>
  return <Badge variant="danger" size="xs">مرفوض</Badge>
}

export function LawyerRequests() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')

  const displayed = filter === 'all' ? lawyerRequests : lawyerRequests.filter((r) => r.status === filter)

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="طلبات التواصل" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '16px' }}>
          {/* Filter Tabs */}
          <div className="flex gap-2 px-4 pt-3 pb-2 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className="px-3 py-1.5 rounded-xl text-sm font-medium shrink-0"
                style={{
                  backgroundColor: filter === f.id ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: filter === f.id ? '#fff' : 'var(--color-muted)',
                  border: `1px solid ${filter === f.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
              >
                {f.label}
                {f.id === 'pending' && lawyerRequests.filter((r) => r.status === 'pending').length > 0 && (
                  <span className="mr-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
                    {lawyerRequests.filter((r) => r.status === 'pending').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="px-4 pt-2 flex flex-col gap-2.5">
            {displayed.length === 0 ? (
              <div className="flex flex-col items-center gap-3 pt-10">
                <Hourglass size={32} style={{ color: 'var(--color-muted)', opacity: 0.4 }} />
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>لا توجد طلبات</p>
              </div>
            ) : (
              displayed.map((req, i) => (
                <motion.button
                  key={req.id}
                  type="button"
                  onClick={() => navigate(`/lawyer-dashboard/requests/${req.id}`)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-start gap-3 p-4 rounded-2xl border text-right w-full"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ backgroundColor: `${req.clientColor}20`, color: req.clientColor }}
                  >
                    {req.clientInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={req.status} />
                        <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{req.date}</span>
                      </div>
                      <p className="text-sm font-bold shrink-0" style={{ color: 'var(--color-text)' }}>{req.clientName}</p>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{req.subject}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{req.category}</p>
                    <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>{req.preview}</p>
                    {req.timeSlot && (
                      <div className="flex items-center gap-1 mt-1.5 justify-end">
                        <Clock size={10} style={{ color: 'var(--color-primary)' }} />
                        <span className="text-xs" style={{ color: 'var(--color-primary)' }}>{req.timeSlot}</span>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
