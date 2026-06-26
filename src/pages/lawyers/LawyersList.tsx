import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Star, CheckCircle2, MessageCircle, MapPin } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { lawyers } from '../../data/mockLawyers'

const specialtyFilters = [
  { id: 'all', label: 'الكل' },
  { id: 'family', label: 'الأسرة' },
  { id: 'labor', label: 'العمل' },
  { id: 'business', label: 'الأعمال' },
  { id: 'criminal', label: 'الجنائي' },
  { id: 'property', label: 'الملكية' },
]

export function LawyersList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = lawyers.filter((l) => {
    const matchesSearch = l.nameAr.includes(search) || l.specialty.includes(search)
    const matchesFilter = filter === 'all' || l.specialtyCategory === filter
    return matchesSearch && matchesFilter
  })

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-5 py-4">
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>المحامون</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
              {lawyers.length} محامٍ موثَّق ومعتمد
            </p>
          </div>

          {/* Search */}
          <div className="px-5 pb-3">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Search size={16} style={{ color: 'var(--color-muted)' }} />
              <input
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="ابحث بالاسم أو التخصص..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ color: 'var(--color-text)' }}
              />
            </div>
          </div>

          {/* Specialty Filters */}
          <div className="flex gap-2 px-5 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {specialtyFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: filter === f.id ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: filter === f.id ? '#fff' : 'var(--color-muted)',
                  border: `1px solid ${filter === f.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Lawyer Register CTA */}
          <div className="px-5 pb-3">
            <button
              type="button"
              onClick={() => navigate('/lawyer-register')}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl text-right"
              style={{ background: 'linear-gradient(135deg, rgba(79,110,247,0.12), rgba(124,58,237,0.12))', border: '1px solid rgba(79,110,247,0.2)' }}
            >
              <Badge variant="primary" size="xs">انضم</Badge>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  هل أنت محامٍ؟ سجّل هنا
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                  انضم إلى منصة حقّي وتوسَّع في عملائك
                </p>
              </div>
            </button>
          </div>

          {/* Free Consultation CTA */}
          <div className="px-5 pb-4">
            <button
              type="button"
              onClick={() => navigate('/lawyers/free')}
              className="w-full flex items-center justify-between p-4 rounded-2xl text-right"
              style={{ background: 'linear-gradient(135deg, #22C55E20, #4F6EF720)', border: '1px solid rgba(79,110,247,0.2)' }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  استشارة مجانية
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                  ابحث عن محامٍ يُقدم أول استشارة مجاناً
                </p>
              </div>
              <Badge variant="success">متاح</Badge>
            </button>
          </div>

          {/* Lawyers List */}
          <div className="px-5 flex flex-col gap-3">
            {filtered.map((lawyer, i) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => navigate(`/lawyers/${lawyer.id}`)}
                  className="w-full p-4 rounded-2xl border text-right"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex gap-3 items-start">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
                        style={{ backgroundColor: `${lawyer.avatarColor}20`, color: lawyer.avatarColor, border: `2px solid ${lawyer.avatarColor}30` }}
                      >
                        {lawyer.nameAr.split(' ').slice(-2).map((n) => n[0]).join('')}
                      </div>
                      <div
                        className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-primary)', border: '2px solid var(--color-bg)' }}
                      >
                        <CheckCircle2 size={11} color="#fff" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
                          {lawyer.nameAr}
                        </p>
                        {lawyer.hasFreeConsultation && (
                          <Badge variant="success" size="xs">مجاني</Badge>
                        )}
                      </div>

                      <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-muted)' }}>
                        {lawyer.specialty}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star size={11} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                          <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>
                            {lawyer.rating}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                            ({lawyer.reviewCount})
                          </span>
                        </div>
                        <span className="text-xs" style={{ color: 'var(--color-muted)' }}>·</span>
                        <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                          <MapPin size={10} /> {lawyer.wilaya}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                          {lawyer.feeMin.toLocaleString()} – {lawyer.feeMax.toLocaleString()} دج
                        </p>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); navigate(`/lawyers/${lawyer.id}`) }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium"
                          style={{ backgroundColor: 'var(--color-raised)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                        >
                          <MessageCircle size={12} />
                          تواصل
                        </button>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
