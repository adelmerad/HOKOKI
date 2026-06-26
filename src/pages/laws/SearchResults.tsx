import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookmarkPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { LawCategoryIcon } from '../../components/ui/LawCategoryIcon'
import { lawArticles, lawCategories } from '../../data/mockLaws'

export function SearchResults() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (query.trim().length < 2) return []
    const q = query.trim().toLowerCase()
    return lawArticles.filter(
      (a) =>
        a.titleAr.toLowerCase().includes(q) ||
        a.simpleExplanationAr.toLowerCase().includes(q) ||
        a.numberAr.includes(q),
    )
  }, [query])

  const getCategoryName = (categoryId: string) => {
    return lawCategories.find((c) => c.id === categoryId)?.nameAr ?? ''
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="البحث القانوني" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-4 pt-3 pb-3 sticky top-0 z-10" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Search size={18} style={{ color: 'var(--color-muted)' }} />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن مادة قانونية، موضوع..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                style={{ color: 'var(--color-text)' }}
              />
              {query.length > 0 && (
                <button type="button" onClick={() => setQuery('')}>
                  <X size={16} style={{ color: 'var(--color-muted)' }} />
                </button>
              )}
            </div>
          </div>

          <div className="px-4">
            {query.trim().length === 0 && (
              <div className="pt-4">
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
                  مواضيع شائعة
                </p>
                <div className="flex flex-wrap gap-2">
                  {['الطلاق', 'العقد', 'الميراث', 'عقد العمل', 'التشهير', 'الضمان الاجتماعي'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setQuery(t)}
                      className="px-3 py-1.5 rounded-xl text-sm"
                      style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query.trim().length >= 2 && results.length === 0 && (
              <div className="flex flex-col items-center gap-3 pt-12">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-surface)' }}
                >
                  <Search size={28} style={{ color: 'var(--color-muted)' }} />
                </div>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  لا توجد نتائج لـ "{query}"
                </p>
              </div>
            )}

            {results.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
                  {results.length} نتيجة
                </p>
                <div className="flex flex-col gap-3">
                  <AnimatePresence>
                    {results.map((article, i) => (
                      <motion.button
                        key={article.id}
                        type="button"
                        onClick={() => navigate(`/laws/${article.categoryId}/${article.id}`)}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-2xl border text-right w-full"
                        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded-lg"
                                style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                              >
                                {article.numberAr}
                              </span>
                              <div className="flex items-center gap-1">
                                <LawCategoryIcon categoryId={article.categoryId} size={12} />
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
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              toast.success('تمت الإضافة للمحفوظات', {
                                style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
                              })
                            }}
                            className="p-1.5 rounded-lg shrink-0"
                            style={{ color: 'var(--color-muted)' }}
                          >
                            <BookmarkPlus size={16} />
                          </button>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
