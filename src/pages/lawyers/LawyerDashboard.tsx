import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, TrendingUp, Users, Calendar, ChevronLeft, Bell } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { lawyerRequests } from '../../data/mockLawyerRequests'
import { lawyers } from '../../data/mockLawyers'

const mockLawyer = lawyers[0]

const stats = [
  { icon: Users, label: 'الطلبات الكلية', value: '24', color: '#4F6EF7' },
  { icon: Clock, label: 'قيد الانتظار', value: '2', color: '#F59E0B' },
  { icon: TrendingUp, label: 'مكتملة', value: '18', color: '#22C55E' },
  { icon: Star, label: 'التقييم', value: '4.9', color: '#E91E63' },
]

const upcomingSlots = [
  { day: 'الثلاثاء', time: '10:00', client: 'أحمد بوعلام', type: 'استشارة عمل' },
  { day: 'الأربعاء', time: '14:00', client: 'سارة قاسمي', type: 'قضية أسرية' },
  { day: 'الخميس', time: '11:00', client: 'نادية بن زيتون', type: 'نزاع عقاري' },
]

export function LawyerDashboard() {
  const navigate = useNavigate()
  const pendingRequests = lawyerRequests.filter((r) => r.status === 'pending')

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Header */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>مرحباً،</p>
              <h1 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{mockLawyer.nameAr}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/notifications')}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <Bell size={18} style={{ color: 'var(--color-text)' }} />
                {pendingRequests.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: 'var(--color-danger)', color: '#fff' }}>
                    {pendingRequests.length}
                  </div>
                )}
              </button>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: `${mockLawyer.avatarColor}20`, color: mockLawyer.avatarColor }}
              >
                {mockLawyer.nameAr.split(' ').slice(-2).map((n) => n[0]).join('')}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 px-5 mb-4">
            {stats.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-4 rounded-2xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="px-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => navigate('/lawyer-dashboard/requests')}
                  className="flex items-center gap-1 text-xs"
                  style={{ color: 'var(--color-primary)' }}
                >
                  عرض الكل <ChevronLeft size={12} />
                </button>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  طلبات جديدة
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {pendingRequests.map((req, i) => (
                  <motion.button
                    key={req.id}
                    type="button"
                    onClick={() => navigate(`/lawyer-dashboard/requests/${req.id}`)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start gap-3 p-4 rounded-2xl border text-right"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                      style={{ backgroundColor: `${req.clientColor}20`, color: req.clientColor }}
                    >
                      {req.clientInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{req.date}</p>
                        <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{req.clientName}</p>
                      </div>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-text)' }}>{req.subject}</p>
                      <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-muted)' }}>{req.preview}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Schedule */}
          <div className="px-5">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => navigate('/lawyer-dashboard/availability')}
                className="flex items-center gap-1 text-xs"
                style={{ color: 'var(--color-primary)' }}
              >
                إدارة المواعيد <ChevronLeft size={12} />
              </button>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                المواعيد القادمة
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {upcomingSlots.map((slot, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-xl border"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(79,110,247,0.1)' }}
                  >
                    <Calendar size={14} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{slot.client}</p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{slot.type}</p>
                  </div>
                  <div className="text-left shrink-0">
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>{slot.time}</p>
                    <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{slot.day}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-5 mt-4 grid grid-cols-2 gap-2">
            {[
              { label: 'طلبات العملاء', path: '/lawyer-dashboard/requests', color: '#4F6EF7' },
              { label: 'إدارة المواعيد', path: '/lawyer-dashboard/availability', color: '#22C55E' },
              { label: 'تعديل الملف', path: '/lawyer-dashboard/profile/edit', color: '#F59E0B' },
              { label: 'الإشعارات', path: '/notifications', color: '#7C3AED' },
            ].map(({ label, path, color }) => (
              <button
                key={label}
                type="button"
                onClick={() => navigate(path)}
                className="p-3 rounded-2xl border text-right"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="w-7 h-7 rounded-lg mb-2 flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{label}</p>
              </button>
            ))}
          </div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
