import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RefreshCw, Calendar } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { LawCategoryIcon } from '../../components/ui/LawCategoryIcon'
import { lawArticles, lawCategories } from '../../data/mockLaws'

const recentChangeDates: Record<string, string> = {
  'labor-1': 'يناير 2025',
  'labor-2': 'مارس 2025',
  'family-3': 'أبريل 2025',
  'criminal-1': 'فبراير 2025',
  'consumer-1': 'مايو 2025',
  'administrative-1': 'مارس 2025',
  'immigration-1': 'أبريل 2025',
}

export function RecentChanges() {
  const navigate = useNavigate()

  const amended = lawArticles.filter((a) => a.isAmended || recentChangeDates[a.id])
  const getCategoryName = (id: string) => lawCategories.find((c) => c.id === id)?.nameAr ?? ''

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="التعديلات الأخيرة" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-4 pt-4">
            <div
              className="flex items-center gap-3 p-3 rounded-2xl mb-4"
              style={{ background: 'linear-gradient(135deg, rgba(79,110,247,0.12), rgba(124,58,237,0.08))', border: '1px solid rgba(79,110,247,0.2)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(79,110,247,0.15)' }}
              >
                <RefreshCw size={16} style={{ color: 'var(--color-primary)' }} />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                هذه المواد شهدت تعديلات أو إضافات في التشريعات الجزائرية خلال الأشهر الأخيرة.
              </p>
            </div>

            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
              {amended.length} مادة معدَّلة مؤخراً
            </p>

            <div className="flex flex-col gap-3">
              {amended.map((article, i) => (
                <motion.button
                  key={article.id}
                  type="button"
                  onClick={() => navigate(`/laws/${article.categoryId}/${article.id}`)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-2xl border text-right w-full"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}
                    >
                      <LawCategoryIcon categoryId={article.categoryId} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-lg"
                          style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                        >
                          {article.numberAr}
                        </span>
                        <Badge variant="warning" size="xs">معدَّلة</Badge>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                        {article.titleAr}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                        {getCategoryName(article.categoryId)}
                      </p>
                      {(article.amendedDate || recentChangeDates[article.id]) && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <Calendar size={10} style={{ color: 'var(--color-muted)' }} />
                          <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>
                            تعديل: {article.amendedDate ?? recentChangeDates[article.id]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
