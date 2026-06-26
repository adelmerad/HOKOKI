import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Scale, ExternalLink } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'

interface LegalTerm {
  id: string
  termAr: string
  termFr: string
  definitionAr: string
  exampleAr: string
  relatedTerms: string[]
  category: string
}

const legalTerms: LegalTerm[] = [
  {
    id: 'plaintiff',
    termAr: 'المدعي',
    termFr: 'Demandeur / Plaignant',
    definitionAr: 'هو الشخص الذي يرفع دعوى قضائية أمام المحكمة ضد شخص آخر يُسمى المدعى عليه. يتحمل المدعي عبء إثبات ادعاءاته.',
    exampleAr: 'رفع العامل دعوى ضد صاحب العمل للمطالبة بحقوقه المهنية، فأصبح المدعي في القضية.',
    relatedTerms: ['المدعى عليه', 'الدعوى القضائية', 'الطعن'],
    category: 'مصطلحات قضائية',
  },
  {
    id: 'defendant',
    termAr: 'المدعى عليه',
    termFr: 'Défendeur',
    definitionAr: 'هو الشخص الذي تُرفع ضده الدعوى القضائية، ويتوجب عليه الدفاع عن نفسه أمام المحكمة.',
    exampleAr: 'وُجِّهت إليه تهمة الاعتداء فأصبح المدعى عليه في القضية الجنائية.',
    relatedTerms: ['المدعي', 'الدفاع', 'التمثيل القانوني'],
    category: 'مصطلحات قضائية',
  },
  {
    id: 'contract',
    termAr: 'العقد',
    termFr: 'Contrat',
    definitionAr: 'اتفاق ملزم بين طرفين أو أكثر، يُلتزم بموجبه كل طرف بأداء التزامات محددة مقابل التزامات الطرف الآخر. يستلزم صحته توافر الرضا والأهلية والمحل والسبب.',
    exampleAr: 'أبرم البائع والمشتري عقد بيع عقار يُحدد السعر وشروط التسليم.',
    relatedTerms: ['الالتزام', 'الفسخ', 'التنفيذ العيني'],
    category: 'قانون مدني',
  },
  {
    id: 'custodial',
    termAr: 'الحضانة',
    termFr: 'Garde / Tutelle',
    definitionAr: 'حق الرعاية الفعلية للطفل القاصر الذي يُمنح عادةً للأم في حالات الطلاق وفق أحكام قانون الأسرة الجزائري، مع مراعاة مصلحة الطفل الفضلى.',
    exampleAr: 'بعد الطلاق، قضت المحكمة بمنح الحضانة للأم حتى يبلغ الطفل سن العاشرة.',
    relatedTerms: ['النفقة', 'الولاية', 'الزيارة'],
    category: 'قانون الأسرة',
  },
  {
    id: 'appeal',
    termAr: 'الاستئناف',
    termFr: 'Appel',
    definitionAr: 'طريق طعن عادي يُمكّن الطرف المحكوم ضده من رفع القضية إلى محكمة أعلى درجة لمراجعة الحكم الابتدائي وإعادة النظر فيه من حيث الوقائع والقانون.',
    exampleAr: 'لم يقتنع بالحكم الابتدائي فقدّم استئنافاً أمام المجلس القضائي خلال أجل الشهر.',
    relatedTerms: ['الطعن بالنقض', 'الحكم الابتدائي', 'التقاضي'],
    category: 'إجراءات قضائية',
  },
  {
    id: 'prescription',
    termAr: 'التقادم',
    termFr: 'Prescription',
    definitionAr: 'هو مرور مدة زمنية محددة قانوناً يُفضي إلى سقوط الحق في المطالبة القضائية أو اكتسابه. يُعدّ من أهم دفوع القانون المدني والجنائي.',
    exampleAr: 'انقضت مدة تقادم الدعوى المدنية البالغة 10 سنوات دون أن يرفع المدعي دعواه.',
    relatedTerms: ['الدعوى القضائية', 'السقوط', 'الانقطاع'],
    category: 'قانون مدني',
  },
]

export function TermDefinition() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const term = legalTerms.find((t) => t.id === id) ?? legalTerms[0]

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="تعريف المصطلح" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-8">
          <div className="px-5 pt-4 flex flex-col gap-4">
            {/* Term Header */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(79,110,247,0.15), rgba(124,58,237,0.08))', border: '1px solid rgba(79,110,247,0.2)' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(79,110,247,0.15)' }}
                >
                  <Scale size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{term.termAr}</h1>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{term.termFr}</p>
                  <Badge variant="primary" size="xs" className="mt-2">{term.category}</Badge>
                </div>
              </div>
            </motion.div>

            {/* Definition */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="p-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} style={{ color: 'var(--color-primary)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>التعريف</p>
              </div>
              <p className="text-sm leading-loose" style={{ color: 'var(--color-text)' }}>
                {term.definitionAr}
              </p>
            </motion.div>

            {/* Example */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="p-4 rounded-2xl"
              style={{ backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-success)' }}>مثال تطبيقي</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {term.exampleAr}
              </p>
            </motion.div>

            {/* Related Terms */}
            {term.relatedTerms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="p-4 rounded-2xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>مصطلحات ذات صلة</p>
                <div className="flex flex-wrap gap-2">
                  {term.relatedTerms.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm"
                      style={{ backgroundColor: 'var(--color-raised)', border: '1px solid var(--color-border)', color: 'var(--color-primary)' }}
                    >
                      <ExternalLink size={11} />
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Other Terms */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>مصطلحات أخرى</p>
              {legalTerms.filter((t) => t.id !== term.id).map((t, i) => (
                <motion.button
                  key={t.id}
                  type="button"
                  onClick={() => navigate(`/terms/${t.id}`)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-3 rounded-xl border text-right"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{t.termAr}</p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{t.category}</p>
                  </div>
                  <Badge variant="muted" size="xs">{t.termFr.split('/')[0].trim()}</Badge>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
