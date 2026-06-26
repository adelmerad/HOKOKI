import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Star, Gift } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { lawyers } from '../../data/mockLawyers'

export function FreeConsultation() {
  const navigate = useNavigate()
  const freeLawyers = lawyers.filter((l) => l.hasFreeConsultation)

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="استشارة مجانية" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-5 py-4">
            <div
              className="p-4 rounded-2xl mb-5"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(79,110,247,0.1))', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              <p className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                <Gift size={18} style={{ color: '#22C55E' }} /> أول استشارة مجانية
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                المحامون أدناه يُقدمون استشارتك الأولى مجاناً تماماً. استفد من الفرصة.
              </p>
            </div>

            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
              {freeLawyers.length} محامٍ متاح
            </p>

            <div className="flex flex-col gap-3">
              {freeLawyers.map((lawyer, i) => (
                <motion.button
                  key={lawyer.id}
                  type="button"
                  onClick={() => navigate(`/lawyers/${lawyer.id}`)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 p-4 rounded-2xl border text-right"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm"
                      style={{ backgroundColor: `${lawyer.avatarColor}20`, color: lawyer.avatarColor }}
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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{lawyer.nameAr}</p>
                      <Badge variant="success" size="xs">مجاني</Badge>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{lawyer.specialty}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star size={11} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>{lawyer.rating}</span>
                      <span className="text-xs" style={{ color: 'var(--color-muted)' }}>· {lawyer.wilaya}</span>
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
