import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const docConfigs: Record<string, { nameAr: string; fields: { id: string; label: string; placeholder: string }[] }> = {
  rental: {
    nameAr: 'عقد الإيجار',
    fields: [
      { id: 'landlord', label: 'اسم المؤجِّر', placeholder: 'الاسم الكامل للمالك' },
      { id: 'tenant', label: 'اسم المستأجِر', placeholder: 'الاسم الكامل للمستأجر' },
      { id: 'address', label: 'عنوان العقار', placeholder: 'الولاية، البلدية، الشارع، الرقم' },
      { id: 'rent', label: 'مبلغ الإيجار الشهري', placeholder: 'مثال: 30,000 دج' },
      { id: 'duration', label: 'مدة العقد', placeholder: 'مثال: 12 شهراً' },
    ],
  },
  employment: {
    nameAr: 'عقد العمل',
    fields: [
      { id: 'employer', label: 'اسم صاحب العمل / المؤسسة', placeholder: 'اسم الشركة أو المؤسسة' },
      { id: 'employee', label: 'اسم الموظف', placeholder: 'الاسم الكامل للموظف' },
      { id: 'position', label: 'المنصب / الوظيفة', placeholder: 'مثال: مهندس تطوير برمجيات' },
      { id: 'salary', label: 'الراتب الشهري', placeholder: 'مثال: 75,000 دج' },
      { id: 'start_date', label: 'تاريخ بداية العمل', placeholder: 'مثال: 01/07/2026' },
    ],
  },
  complaint: {
    nameAr: 'عريضة شكوى',
    fields: [
      { id: 'complainant', label: 'اسم المشتكي', placeholder: 'اسمك الكامل' },
      { id: 'against', label: 'المشتكى منه / الجهة', placeholder: 'اسم الشخص أو المؤسسة' },
      { id: 'subject', label: 'موضوع الشكوى', placeholder: 'ملخص الشكوى في جملة' },
      { id: 'details', label: 'تفاصيل الوقائع', placeholder: 'اشرح ما حدث بالتفصيل...' },
    ],
  },
  'power-attorney': {
    nameAr: 'وكالة تفويض',
    fields: [
      { id: 'principal', label: 'اسم الموكِّل', placeholder: 'الاسم الكامل لمن يُعطي التفويض' },
      { id: 'agent', label: 'اسم الوكيل', placeholder: 'الاسم الكامل للمفوَّض إليه' },
      { id: 'purpose', label: 'غرض الوكالة', placeholder: 'مثال: بيع عقار، استلام راتب...' },
      { id: 'validity', label: 'مدة الصلاحية', placeholder: 'مثال: 6 أشهر' },
    ],
  },
  receipt: {
    nameAr: 'وصل استلام',
    fields: [
      { id: 'payer', label: 'اسم الدافع', placeholder: 'من دفع المبلغ' },
      { id: 'receiver', label: 'اسم المستلم', placeholder: 'من استلم المبلغ' },
      { id: 'amount', label: 'المبلغ المستلَم', placeholder: 'مثال: 50,000 دج' },
      { id: 'reason', label: 'سبب الاستلام', placeholder: 'مثال: دفعة أولى لعقار...' },
    ],
  },
}

export function DocumentGeneratorForm() {
  const { type } = useParams<{ type: string }>()
  const navigate = useNavigate()

  const config = docConfigs[type ?? '']
  const [values, setValues] = useState<Record<string, string>>({})

  if (!config) return null

  const allFilled = config.fields.every((f) => values[f.id]?.trim())

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title={config.nameAr} />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-6">
          <div className="px-5 py-4 flex flex-col gap-4">
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              أدخل المعلومات المطلوبة لإنشاء الوثيقة
            </p>

            {config.fields.map((field) => (
              <Input
                key={field.id}
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.id] ?? ''}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
              />
            ))}

            <Button
              fullWidth
              size="lg"
              disabled={!allFilled}
              onClick={() => navigate(`/documents/${type}/preview`, { state: { values, config } })}
            >
              معاينة الوثيقة
            </Button>
          </div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
