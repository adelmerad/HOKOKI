import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, Trash2, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { LawCategoryIcon } from '../../components/ui/LawCategoryIcon'
import { lawArticles, lawCategories } from '../../data/mockLaws'

const INITIAL_BOOKMARKS = ['family-1', 'labor-1', 'criminal-1', 'property-1', 'business-1']

export function Bookmarks() {
  const navigate = useNavigate()
  const [bookmarked, setBookmarked] = useState<string[]>(INITIAL_BOOKMARKS)

  const savedArticles = lawArticles.filter((a) => bookmarked.includes(a.id))

  const getCategoryName = (categoryId: string) =>
    lawCategories.find((c) => c.id === categoryId)?.nameAr ?? ''

  const remove = (id: string) => {
    setBookmarked((prev) => prev.filter((b) => b !== id))
    toast.success('تم حذف المادة من المحفوظات', {
      style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    })
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar
        title="موادي المحفوظة"
        rightAction={
          savedArticles.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                setBookmarked([])
                toast.success('تم مسح جميع المحفوظات', {
                  style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
                })
              }}
              className="text-xs px-3 py-1.5 rounded-xl"
              style={{ color: 'var(--color-danger)', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              مسح الكل
            </button>
          ) : undefined
        }
      />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {savedArticles.length === 0 ? (
            <div className="flex flex-col items-center gap-4 pt-16 px-5">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <BookOpen size={32} style={{ color: 'var(--color-muted)' }} />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                  لا توجد محفوظات
                </p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  احفظ المواد القانونية لتجدها هنا بسرعة
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/laws')}
                className="px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
              >
                استعرض القوانين
              </button>
            </div>
          ) : (
            <div className="px-4 pt-4 flex flex-col gap-3">
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-muted)' }}>
                {savedArticles.length} مادة محفوظة
              </p>
              <AnimatePresence>
                {savedArticles.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-4 rounded-2xl border"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => navigate(`/laws/${article.categoryId}/${article.id}`)}
                        className="flex-1 min-w-0 text-right"
                      >
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-lg"
                            style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                          >
                            {article.numberAr}
                          </span>
                          <div className="flex items-center gap-1">
                            <LawCategoryIcon categoryId={article.categoryId} size={11} />
                            <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>
                              {getCategoryName(article.categoryId)}
                            </span>
                          </div>
                          {article.isAmended && <Badge variant="warning" size="xs">معدَّلة</Badge>}
                        </div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                          {article.titleAr}
                        </p>
                        <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                          {article.simpleExplanationAr}
                        </p>
                      </button>
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <Bookmark size={16} fill="var(--color-primary)" style={{ color: 'var(--color-primary)' }} />
                        <button
                          type="button"
                          onClick={() => remove(article.id)}
                          className="p-1.5 rounded-lg"
                          style={{ color: 'var(--color-danger)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
