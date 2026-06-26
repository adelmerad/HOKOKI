import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookmarkPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { LawCategoryIcon, getLawCategoryColor } from '../../components/ui/LawCategoryIcon'
import { lawCategories, lawArticles } from '../../data/mockLaws'

export function CategoryDetail() {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()

  const cat = lawCategories.find((c) => c.id === category)
  const articles = lawArticles.filter((a) => a.categoryId === category)

  if (!cat) return null

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title={cat.nameAr} />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {/* Category Header */}
          <div
            className="mx-5 mt-2 mb-4 p-4 rounded-2xl border flex items-center gap-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${getLawCategoryColor(cat.id)}18` }}
            >
              <LawCategoryIcon categoryId={cat.id} size={28} />
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{cat.nameAr}</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{cat.nameFr}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="primary" size="xs">{cat.articleCount} مادة</Badge>
                {cat.isRecentlyChanged && <Badge variant="warning" size="xs">محدَّث مؤخراً</Badge>}
              </div>
            </div>
          </div>

          {/* Articles */}
          <div className="px-5 flex flex-col gap-3">
            {articles.length === 0 ? (
              <p className="text-center py-8 text-sm" style={{ color: 'var(--color-muted)' }}>
                لا توجد مواد مدرجة حالياً لهذا القسم.
              </p>
            ) : (
              articles.map((article, i) => (
                <motion.button
                  key={article.id}
                  type="button"
                  onClick={() => navigate(`/laws/${category}/${article.id}`)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-2xl border text-right w-full"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-lg"
                          style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                        >
                          {article.numberAr}
                        </span>
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
                        toast.success('تمت إضافة المادة للمحفوظات', {
                          style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
                        })
                      }}
                      className="p-1.5 rounded-lg flex-shrink-0"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <BookmarkPlus size={16} />
                    </button>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
