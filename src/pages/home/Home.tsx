import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, Search, ChevronLeft, TrendingUp, MessageSquare, ClipboardList, Scale, BookOpen, Monitor, Landmark, Briefcase, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { LawCategoryIcon } from '../../components/ui/LawCategoryIcon'
import { lawCategories } from '../../data/mockLaws'
import { procedures } from '../../data/mockProcedures'
import { currentUser, notifications } from '../../data/mockUser'

export function Home() {
  const navigate = useNavigate()
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3">
            <div>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>مرحباً بك</p>
              <h1 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {currentUser.nameAr}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-xl"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <Bell size={20} style={{ color: 'var(--color-text)' }} />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-danger)', width: '18px', height: '18px' }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-5 pb-4">
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-right"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Search size={18} style={{ color: 'var(--color-muted)' }} />
              <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                اسأل عن أي موضوع قانوني...
              </span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="px-5 pb-5">
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { label: 'المساعد القانوني', Icon: MessageSquare, path: '/chat', color: '#4F6EF7' },
                  { label: 'إجراء جديد', Icon: ClipboardList, path: '/procedures', color: '#22C55E' },
                  { label: 'ابحث عن محامٍ', Icon: Scale, path: '/lawyers', color: '#F59E0B' },
                  { label: 'القوانين', Icon: BookOpen, path: '/laws', color: '#7C3AED' },
                ] as { label: string; Icon: LucideIcon; path: string; color: string }[]
              ).map((action) => (
                <motion.button
                  key={action.path}
                  type="button"
                  onClick={() => navigate(action.path)}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col gap-2 p-4 rounded-2xl border text-right"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}20` }}
                  >
                    <action.Icon size={20} style={{ color: action.color }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recently Updated Laws */}
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                تحديثات قانونية
              </h2>
              <button
                type="button"
                onClick={() => navigate('/laws')}
                className="flex items-center gap-1 text-sm"
                style={{ color: 'var(--color-primary)' }}
              >
                عرض الكل <ChevronLeft size={14} />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5" style={{ scrollbarWidth: 'none' }}>
              {lawCategories.filter((c) => c.isRecentlyChanged).map((cat) => (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => navigate(`/laws/${cat.id}`)}
                  whileTap={{ scale: 0.96 }}
                  className="shrink-0 w-36 flex flex-col gap-2 p-3 rounded-2xl border"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center gap-2">
                    <LawCategoryIcon categoryId={cat.id} size={20} />
                    <Badge variant="warning" size="xs">جديد</Badge>
                  </div>
                  <p className="text-sm font-medium text-right leading-snug" style={{ color: 'var(--color-text)' }}>
                    {cat.nameAr}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    {cat.articleCount} مادة
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Popular Procedures */}
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                <TrendingUp size={16} style={{ color: 'var(--color-primary)' }} />
                الإجراءات الشائعة
              </h2>
              <button
                type="button"
                onClick={() => navigate('/procedures')}
                className="flex items-center gap-1 text-sm"
                style={{ color: 'var(--color-primary)' }}
              >
                عرض الكل <ChevronLeft size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {procedures.slice(0, 4).map((proc) => (
                <Card
                  key={proc.id}
                  onClick={() => navigate(`/procedures/${proc.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--color-raised)' }}
                    >
                      {proc.isOnline
                        ? <Monitor size={18} style={{ color: 'var(--color-primary)' }} />
                        : <Landmark size={18} style={{ color: 'var(--color-muted)' }} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                        {proc.nameAr}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                        {proc.durationAr} · {proc.costAr}
                      </p>
                    </div>
                    <Badge
                      variant={proc.difficulty === 'easy' ? 'success' : proc.difficulty === 'medium' ? 'warning' : 'danger'}
                      size="xs"
                    >
                      {proc.difficulty === 'easy' ? 'سهل' : proc.difficulty === 'medium' ? 'متوسط' : 'معقد'}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contract Analysis CTA */}
          <div className="px-5 pb-5">
            <motion.button
              type="button"
              onClick={() => navigate('/contract')}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border text-right"
              style={{ backgroundColor: 'rgba(79,110,247,0.06)', borderColor: 'rgba(79,110,247,0.25)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(79,110,247,0.15)' }}
              >
                <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>تحليل العقود</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>الصق عقدك وسيخبرك المساعد بمدى مشروعيته</p>
              </div>
              <ChevronLeft size={16} style={{ color: 'var(--color-primary)' }} />
            </motion.button>
          </div>

          {/* Find a Lawyer CTA */}
          <div className="px-5 pb-5">
            <motion.button
              type="button"
              onClick={() => navigate('/lawyers')}
              whileTap={{ scale: 0.98 }}
              className="w-full p-5 rounded-2xl text-right overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #4F6EF7 0%, #7C3AED 100%)' }}
            >
              <div className="relative z-10">
                <p className="text-white font-bold text-base">ابحث عن محامٍ قريب منك</p>
                <p className="text-white/70 text-sm mt-1">8 محامين معتمدين متاحون الآن</p>
              </div>
              <Scale size={64} color="rgba(255,255,255,0.15)" className="absolute top-2 left-4" strokeWidth={1} />
            </motion.button>
          </div>

          {/* Lawyer Mode Entry */}
          <div className="px-5 pb-6">
            <motion.button
              type="button"
              onClick={() => navigate('/lawyer-dashboard')}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border text-right"
              style={{ backgroundColor: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.25)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(245,158,11,0.15)' }}>
                <Briefcase size={20} style={{ color: '#F59E0B' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>أنت محامٍ؟</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>ادخل للوحة تحكمك وإدارة طلباتك</p>
              </div>
              <ChevronLeft size={16} style={{ color: '#F59E0B' }} />
            </motion.button>
          </div>
        </div>
      </PageTransition>

      <BottomNav />
    </MobileFrame>
  )
}
