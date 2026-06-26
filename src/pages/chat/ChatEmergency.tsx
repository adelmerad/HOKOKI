import { motion } from 'framer-motion'
import { Phone, AlertTriangle, Clock, MapPin, Shield } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'

interface EmergencyContact {
  id: string
  nameAr: string
  phone: string
  available: string
  color: string
  category: string
}

const contacts: EmergencyContact[] = [
  { id: 'police', nameAr: 'الشرطة الوطنية', phone: '17', available: '24/7', color: '#4F6EF7', category: 'طوارئ أمنية' },
  { id: 'gendarmerie', nameAr: 'الدرك الوطني', phone: '1055', available: '24/7', color: '#7C3AED', category: 'طوارئ أمنية' },
  { id: 'civil', nameAr: 'الحماية المدنية', phone: '14', available: '24/7', color: '#EF4444', category: 'طوارئ مدنية' },
  { id: 'samu', nameAr: 'الإسعاف — SAMU', phone: '15', available: '24/7', color: '#22C55E', category: 'طوارئ طبية' },
  { id: 'women', nameAr: 'خط دعم المرأة', phone: '3033', available: '8ص–10م', color: '#E91E63', category: 'دعم اجتماعي' },
  { id: 'child', nameAr: 'خط حماية الطفل', phone: '3033', available: '8ص–8م', color: '#F59E0B', category: 'دعم اجتماعي' },
  { id: 'jurist', nameAr: 'المساعدة القضائية', phone: '0551 000 100', available: '9ص–5م', color: '#0EA5E9', category: 'مساعدة قانونية' },
]

const tips = [
  'في حالة اعتقالك، لك الحق في التزام الصمت حتى حضور محاميك.',
  'يحق لك طلب ترجمان إذا لم تفهم اللغة المستخدمة في الإجراءات.',
  'لا توقّع على أي وثيقة دون قراءتها بالكامل وفهم مضمونها.',
  'يحق للمتهم بمعرفة التهمة الموجهة إليه فوراً عند الاحتجاز.',
]

export function ChatEmergency() {
  const categories = [...new Set(contacts.map((c) => c.category))]

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="الطوارئ القانونية" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {/* Alert Banner */}
          <div className="px-4 pt-4">
            <div
              className="flex items-start gap-3 p-4 rounded-2xl mb-4"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
            >
              <AlertTriangle size={18} style={{ color: 'var(--color-danger)' }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-danger)' }}>
                  حالة طوارئ قانونية؟
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  اتصل فوراً بالجهة المختصة. في حالات الخطر اتصل بـ 17.
                </p>
              </div>
            </div>

            {categories.map((cat, ci) => (
              <div key={cat} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={12} style={{ color: 'var(--color-muted)' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>{cat}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {contacts.filter((c) => c.category === cat).map((contact, i) => (
                    <motion.a
                      key={contact.id}
                      href={`tel:${contact.phone}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: ci * 0.08 + i * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-2xl border"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${contact.color}15` }}
                      >
                        <Phone size={18} style={{ color: contact.color }} />
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                          {contact.nameAr}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-base font-bold" style={{ color: contact.color }}>
                            {contact.phone}
                          </span>
                          <div className="flex items-center gap-1">
                            <Clock size={10} style={{ color: 'var(--color-muted)' }} />
                            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{contact.available}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${contact.color}20` }}
                      >
                        <Phone size={15} style={{ color: contact.color }} />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}

            {/* Legal Tips */}
            <div className="mt-2 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={12} style={{ color: 'var(--color-muted)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>حقوقك القانونية الأساسية</p>
              </div>
              <div className="flex flex-col gap-2">
                {tips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(79,110,247,0.05)', border: '1px solid rgba(79,110,247,0.1)' }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
