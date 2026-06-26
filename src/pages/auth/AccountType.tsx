import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Scale, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'

const types: { id: string; Icon: LucideIcon; color: string; labelAr: string; descAr: string; path: string }[] = [
  { id: 'citizen',  Icon: User,      color: '#4F6EF7', labelAr: 'مواطن',  descAr: 'أفهم حقوقي وأتتبع إجراءاتي', path: '/register' },
  { id: 'lawyer',   Icon: Scale,     color: '#F59E0B', labelAr: 'محامٍ',  descAr: 'أبحث عن موكلين وأوسّع شبكتي', path: '/lawyer-register' },
  { id: 'business', Icon: Building2, color: '#7C3AED', labelAr: 'مؤسسة', descAr: 'أحتاج دعماً قانونياً لنشاطي التجاري', path: '/register' },
]

export function AccountType() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <StatusBar />
      <div className="flex-1 flex flex-col px-5 py-6 gap-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>من أنت؟</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
            اختر ما يصفك حتى نُخصص تجربتك
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {types.map((type, i) => (
            <motion.button
              key={type.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(type.path)}
              className="flex items-center gap-4 p-4 rounded-2xl border text-right active:scale-[0.98] transition-transform"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${type.color}18` }}
              >
                <type.Icon size={22} style={{ color: type.color }} />
              </div>
              <div>
                <p className="font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                  {type.labelAr}
                </p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
                  {type.descAr}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </MobileFrame>
  )
}
