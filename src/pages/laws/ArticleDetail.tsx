import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BookmarkPlus, Share2, MessageSquare, Copy, MessageCircle, Link, Lightbulb, ScrollText, Bell } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { BottomSheet } from '../../components/ui/BottomSheet'
import { lawArticles, lawCategories } from '../../data/mockLaws'

const toastStyle = { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }

export function ArticleDetail() {
  const { category, id } = useParams<{ category: string; id: string }>()
  const navigate = useNavigate()
  const [shareOpen, setShareOpen] = useState(false)
  const [reminderOpen, setReminderOpen] = useState(false)
  const [reminderDays, setReminderDays] = useState<number | null>(null)

  const article = lawArticles.find((a) => a.id === id)
  const cat = lawCategories.find((c) => c.id === category)

  if (!article || !cat) return null

  const shareOptions = [
    { icon: Copy, label: 'نسخ الرابط', action: () => { toast.success('تم النسخ', { style: toastStyle }); setShareOpen(false) } },
    { icon: MessageCircle, label: 'واتساب', action: () => setShareOpen(false) },
    { icon: Link, label: 'مشاركة عامة', action: () => setShareOpen(false) },
  ]

  const reminderOptions = [
    { days: 1, label: 'غداً' },
    { days: 3, label: 'بعد 3 أيام' },
    { days: 7, label: 'بعد أسبوع' },
    { days: 30, label: 'بعد شهر' },
  ]

  const handleSetReminder = () => {
    toast.success('تم تعيين التذكير', { style: toastStyle })
    setReminderOpen(false)
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar
        title={cat.nameAr}
        rightAction={
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setReminderOpen(true)}
              className="p-2 rounded-xl"
              style={{ color: 'var(--color-muted)' }}
            >
              <Bell size={18} />
            </button>
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="p-2 rounded-xl"
              style={{ color: 'var(--color-muted)' }}
            >
              <Share2 size={18} />
            </button>
            <button
              type="button"
              onClick={() => toast.success('تمت إضافة المادة للمحفوظات', { style: toastStyle })}
              className="p-2 rounded-xl"
              style={{ color: 'var(--color-muted)' }}
            >
              <BookmarkPlus size={18} />
            </button>
          </div>
        }
      />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-6">
          <div className="px-5 pt-3 flex flex-col gap-5">
            {/* Article Number & Title */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-sm font-bold px-3 py-1 rounded-xl"
                  style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                >
                  {article.numberAr}
                </span>
                {article.isAmended && (
                  <Badge variant="warning">
                    معدَّلة {article.amendedDate && `— ${new Date(article.amendedDate).getFullYear()}`}
                  </Badge>
                )}
              </div>
              <h1 className="text-xl font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
                {article.titleAr}
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>{article.titleFr}</p>
            </div>

            {/* Simple Explanation */}
            <div
              className="p-4 rounded-2xl"
              style={{ backgroundColor: 'rgba(79,110,247,0.08)', border: '1px solid rgba(79,110,247,0.2)' }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Lightbulb size={13} style={{ color: 'var(--color-primary)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>الشرح البسيط</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {article.simpleExplanationAr}
              </p>
            </div>

            {/* Full Legal Text */}
            <div
              className="p-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-1.5 mb-3">
                <ScrollText size={13} style={{ color: 'var(--color-muted)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>النص القانوني الكامل</p>
              </div>
              <p className="text-sm leading-loose" style={{ color: 'var(--color-text)', fontFamily: 'serif' }}>
                {article.fullTextAr}
              </p>
            </div>

            {/* Ask AI about this */}
            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate(`/chat?q=شرح+${article.titleAr}`)}
            >
              <MessageSquare size={16} />
              اسأل المساعد عن هذه المادة
            </Button>
          </div>
        </div>
      </PageTransition>

      {/* Share Modal */}
      <BottomSheet isOpen={shareOpen} onClose={() => setShareOpen(false)} title="مشاركة المادة">
        <div className="px-5 pt-3 pb-4 flex flex-col gap-2">
          {shareOptions.map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              type="button"
              onClick={action}
              className="flex items-center gap-3 p-4 rounded-2xl border text-right"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(79,110,247,0.1)' }}
              >
                <Icon size={18} style={{ color: 'var(--color-primary)' }} />
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</p>
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* Reminder Modal */}
      <BottomSheet isOpen={reminderOpen} onClose={() => setReminderOpen(false)} title="تعيين تذكير">
        <div className="px-5 pt-3 pb-4 flex flex-col gap-3">
          <p className="text-sm text-center" style={{ color: 'var(--color-muted)' }}>
            سيُذكّرك التطبيق بمراجعة هذه المادة في الوقت الذي تختاره
          </p>
          <div className="grid grid-cols-2 gap-2">
            {reminderOptions.map(({ days, label }) => (
              <button
                key={days}
                type="button"
                onClick={() => setReminderDays(days)}
                className="py-3 rounded-2xl border text-sm font-medium"
                style={{
                  backgroundColor: reminderDays === days ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: reminderDays === days ? '#fff' : 'var(--color-text)',
                  borderColor: reminderDays === days ? 'var(--color-primary)' : 'var(--color-border)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {reminderDays && (
            <Button fullWidth size="lg" onClick={handleSetReminder}>
              <Bell size={18} />
              تأكيد التذكير
            </Button>
          )}
        </div>
      </BottomSheet>
    </MobileFrame>
  )
}
