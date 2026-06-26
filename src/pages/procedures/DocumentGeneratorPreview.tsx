import { useNavigate, useLocation } from 'react-router-dom'
import { Download, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'

export function DocumentGeneratorPreview() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { values, config } = (state ?? {}) as { values: Record<string, string>; config: { nameAr: string; fields: { id: string; label: string }[] } }

  if (!values || !config) {
    navigate('/documents')
    return null
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="معاينة الوثيقة" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto pb-6">
          <div className="px-5 py-4 flex flex-col gap-4">
            {/* Document Preview */}
            <div
              className="p-5 rounded-2xl border"
              style={{ backgroundColor: '#fff', borderColor: 'var(--color-border)' }}
            >
              <div className="text-center mb-6">
                <p className="text-lg font-bold text-gray-900">{config.nameAr}</p>
                <p className="text-xs text-gray-500 mt-1">الجمهورية الجزائرية الديمقراطية الشعبية</p>
                <div className="w-16 h-0.5 bg-gray-300 mx-auto mt-3" />
              </div>

              <div className="flex flex-col gap-3">
                {config.fields.map((field) => (
                  <div key={field.id}>
                    <p className="text-xs text-gray-500">{field.label}:</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{values[field.id]}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">
                  حُرِّر في الجزائر العاصمة، بتاريخ{' '}
                  {new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
              <p className="text-sm" style={{ color: 'var(--color-success)' }}>
                الوثيقة جاهزة للتحميل والطباعة
              </p>
            </div>

            <Button
              fullWidth
              size="lg"
              onClick={() => {
                toast.success('جارٍ تحميل الوثيقة...', {
                  style: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
                })
              }}
            >
              <Download size={18} />
              تحميل PDF
            </Button>

            <Button variant="secondary" fullWidth onClick={() => navigate(-1)}>
              تعديل البيانات
            </Button>
          </div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
