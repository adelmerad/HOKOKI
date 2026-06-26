import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Building2, Briefcase, MessageSquare, UserCheck, Receipt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'

const docTypes: { id: string; nameAr: string; Icon: LucideIcon; color: string; descAr: string }[] = [
  { id: 'rental',        nameAr: 'عقد الإيجار',  Icon: Building2,    color: '#22C55E', descAr: 'عقد إيجار سكني أو تجاري' },
  { id: 'employment',   nameAr: 'عقد العمل',    Icon: Briefcase,    color: '#4F6EF7', descAr: 'عقد عمل محدد أو غير محدد المدة' },
  { id: 'complaint',    nameAr: 'عريضة شكوى',  Icon: MessageSquare,color: '#EF4444', descAr: 'شكوى إدارية أو قانونية' },
  { id: 'power-attorney',nameAr: 'وكالة تفويض', Icon: UserCheck,    color: '#F59E0B', descAr: 'تفويض شخص للتصرف نيابة عنك' },
  { id: 'receipt',      nameAr: 'وصل استلام',   Icon: Receipt,      color: '#7C3AED', descAr: 'إثبات استلام مبلغ أو بضاعة' },
]

export function DocumentGeneratorHome() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="مولّد الوثائق" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-6">
          <div className="px-5 py-4">
            <div
              className="flex items-center gap-4 p-4 rounded-2xl mb-5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #4F6EF7)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <FileText size={22} color="#fff" />
              </div>
              <div>
                <p className="text-white font-bold text-base">اطبع وثيقتك الرسمية</p>
                <p className="text-white/70 text-xs mt-0.5">ملء النموذج ← معاينة ← تحميل PDF</p>
              </div>
            </div>

            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
              اختر نوع الوثيقة
            </p>

            <div className="flex flex-col gap-2.5">
              {docTypes.map((doc, i) => (
                <motion.button
                  key={doc.id}
                  type="button"
                  onClick={() => navigate(`/documents/${doc.id}`)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border text-right"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${doc.color}18` }}
                  >
                    <doc.Icon size={20} style={{ color: doc.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{doc.nameAr}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{doc.descAr}</p>
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
