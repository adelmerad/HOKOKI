import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Clock, MessageSquare, Phone, Calendar, Banknote } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { lawyerRequests } from '../../data/mockLawyerRequests'
import type { LawyerRequest } from '../../data/mockLawyerRequests'

export function LawyerRequestDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const req = lawyerRequests.find((r) => r.id === id)
  const [status, setStatus] = useState<LawyerRequest['status']>(req?.status ?? 'pending')
  const [replyText, setReplyText] = useState('')

  if (!req) return null

  const accept = () => {
    setStatus('accepted')
    toast.success('تم قبول الطلب', {
      style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    })
  }

  const reject = () => {
    setStatus('rejected')
    toast.error('تم رفض الطلب', {
      style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    })
  }

  const complete = () => {
    setStatus('completed')
    toast.success('تم تحديد الطلب كمكتمل', {
      style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    })
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="تفاصيل الطلب" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          <div className="px-5 pt-4 flex flex-col gap-4">
            {/* Client Card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0"
                  style={{ backgroundColor: `${req.clientColor}20`, color: req.clientColor }}
                >
                  {req.clientInitial}
                </div>
                <div className="flex-1 text-right">
                  <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{req.clientName}</p>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{req.category}</p>
                </div>
                {status === 'pending' && <Badge variant="warning" size="xs">جديد</Badge>}
                {status === 'accepted' && <Badge variant="primary" size="xs">مقبول</Badge>}
                {status === 'completed' && <Badge variant="success" size="xs">مكتمل</Badge>}
                {status === 'rejected' && <Badge variant="danger" size="xs">مرفوض</Badge>}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{req.subject}</span>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>الموضوع</span>
                </div>
                {req.timeSlot && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} style={{ color: 'var(--color-primary)' }} />
                      <span className="text-sm" style={{ color: 'var(--color-primary)' }}>{req.timeSlot}</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>الموعد المقترح</span>
                  </div>
                )}
                {req.fee && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Banknote size={12} style={{ color: 'var(--color-success)' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-success)' }}>
                        {req.fee.toLocaleString()} دج
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>الأتعاب المتفق عليها</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{req.date}</span>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>تاريخ الطلب</span>
                </div>
              </div>
            </motion.div>

            {/* Request Content */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="p-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <p className="text-xs font-semibold mb-2 text-right" style={{ color: 'var(--color-muted)' }}>ملخص القضية</p>
              <p className="text-sm leading-relaxed text-right" style={{ color: 'var(--color-text)' }}>
                {req.preview}
              </p>
              {req.notes && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-xs font-semibold mb-1 text-right" style={{ color: 'var(--color-muted)' }}>ملاحظات</p>
                  <p className="text-sm text-right" style={{ color: 'var(--color-text)' }}>{req.notes}</p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            {(status === 'pending' || status === 'accepted') && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="flex gap-2"
              >
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <Phone size={15} />
                  اتصال
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <MessageSquare size={15} />
                  رسالة
                </button>
              </motion.div>
            )}

            {/* Reply */}
            {status !== 'rejected' && status !== 'completed' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
              >
                <p className="text-sm font-semibold mb-2 text-right" style={{ color: 'var(--color-text)' }}>رد على العميل</p>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={3}
                  placeholder="اكتب ردك هنا..."
                  className="w-full bg-transparent text-sm outline-none placeholder:opacity-40 resize-none p-3 rounded-2xl border text-right"
                  style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </PageTransition>

      {/* Action Buttons */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      >
        {status === 'pending' && (
          <div className="flex gap-3">
            <Button variant="danger" size="lg" fullWidth onClick={reject}>
              <XCircle size={18} />
              رفض
            </Button>
            <Button size="lg" fullWidth onClick={accept}>
              <CheckCircle2 size={18} />
              قبول
            </Button>
          </div>
        )}
        {status === 'accepted' && (
          <Button size="lg" fullWidth onClick={complete}>
            <CheckCircle2 size={18} />
            تحديد كمكتمل
          </Button>
        )}
        {(status === 'completed' || status === 'rejected') && (
          <Button variant="secondary" size="lg" fullWidth onClick={() => navigate('/lawyer-dashboard/requests')}>
            العودة إلى الطلبات
          </Button>
        )}
      </div>
    </MobileFrame>
  )
}
