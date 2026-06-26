import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Bookmark, RefreshCw } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { LawCategoryIcon, getLawCategoryColor } from '../../components/ui/LawCategoryIcon'
import { lawCategories } from '../../data/mockLaws'

export function LawsGrid() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-5 py-4">
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>القوانين الجزائرية</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
              تصفح القوانين بلغة بسيطة
            </p>
          </div>

          {/* Search */}
          <div className="px-5 pb-3">
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Search size={16} style={{ color: 'var(--color-muted)' }} />
              <span className="text-sm" style={{ color: 'var(--color-muted)' }}>ابحث في القوانين...</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="flex gap-2 px-5 pb-4">
            <button
              type="button"
              onClick={() => navigate('/bookmarks')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <Bookmark size={14} style={{ color: 'var(--color-primary)' }} />
              المحفوظات
            </button>
            <button
              type="button"
              onClick={() => navigate('/laws/recent')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <RefreshCw size={14} style={{ color: '#F59E0B' }} />
              التعديلات الأخيرة
            </button>
          </div>

          {/* Grid */}
          <div className="px-5 grid grid-cols-2 gap-3 pb-4">
            {lawCategories.map((cat, i) => (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => navigate(`/laws/${cat.id}`)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col gap-3 p-4 rounded-2xl border text-right"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${getLawCategoryColor(cat.id)}18` }}
                  >
                    <LawCategoryIcon categoryId={cat.id} size={20} />
                  </div>
                  {cat.isRecentlyChanged && <Badge variant="warning" size="xs">محدَّث</Badge>}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>
                    {cat.nameAr}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
                    {cat.nameFr}
                  </p>
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                  {cat.articleCount} مادة قانونية
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
