import { useParams, useNavigate } from 'react-router-dom'
import { Star, CheckCircle2, MapPin, Clock, Languages, PhoneCall } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { lawyers } from '../../data/mockLawyers'

export function LawyerProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const lawyer = lawyers.find((l) => l.id === id)
  if (!lawyer) return null

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="ملف المحامي" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          {/* Header */}
          <div className="px-5 pt-3 pb-5 flex flex-col items-center gap-4">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: `${lawyer.avatarColor}20`, color: lawyer.avatarColor, border: `3px solid ${lawyer.avatarColor}40` }}
              >
                {lawyer.nameAr.split(' ').slice(-2).map((n) => n[0]).join('')}
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)', border: '3px solid var(--color-bg)' }}
              >
                <CheckCircle2 size={14} color="#fff" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{lawyer.nameAr}</h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{lawyer.specialty}</p>

              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= Math.floor(lawyer.rating) ? '#F59E0B' : 'none'}
                      style={{ color: '#F59E0B' }}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{lawyer.rating}</span>
                <button
                  type="button"
                  onClick={() => navigate(`/lawyers/${id}/reviews`)}
                  className="text-sm"
                  style={{ color: 'var(--color-primary)' }}
                >
                  ({lawyer.reviewCount} تقييم)
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {[
                { label: 'الخبرة', value: `${lawyer.yearsExperience} سنة` },
                { label: 'الرسوم', value: `${lawyer.feeMin.toLocaleString()} دج+` },
                { label: 'الرد', value: lawyer.responseTime },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center p-3 rounded-xl border gap-0.5"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{value}</p>
                  <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div className="px-5 flex flex-col gap-3">
            {/* Details */}
            <div
              className="p-4 rounded-2xl border flex flex-col gap-3"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={15} style={{ color: 'var(--color-primary)' }} />
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                  {lawyer.city}، {lawyer.wilaya}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Languages size={15} style={{ color: 'var(--color-primary)' }} />
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                  {lawyer.languages.join(' · ')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} style={{ color: 'var(--color-primary)' }} />
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                  وقت الرد: {lawyer.responseTime}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" size="sm">رقم النقابة: {lawyer.barNumber}</Badge>
                {lawyer.hasFreeConsultation && (
                  <Badge variant="success" size="sm">استشارة أولى مجانية</Badge>
                )}
              </div>
            </div>

            {/* Bio */}
            <div
              className="p-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>نبذة</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {lawyer.bioAr}
              </p>
            </div>

            {/* Recent Review */}
            {lawyer.reviews[0] && (
              <div
                className="p-4 rounded-2xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>آخر تقييم</p>
                  <button
                    type="button"
                    onClick={() => navigate(`/lawyers/${id}/reviews`)}
                    className="text-xs"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    عرض الكل
                  </button>
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      fill={s <= lawyer.reviews[0].rating ? '#F59E0B' : 'none'}
                      style={{ color: '#F59E0B' }}
                    />
                  ))}
                  <span className="text-xs mr-1" style={{ color: 'var(--color-muted)' }}>
                    {lawyer.reviews[0].nameInitial}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                  {lawyer.reviews[0].textAr}
                </p>
              </div>
            )}
          </div>
        </div>
      </PageTransition>

      {/* Action Buttons */}
      <div
        className="absolute bottom-15 left-0 right-0 px-5 py-3 border-t flex gap-2"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      >
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate(`/lawyers/${id}/write-review`)}
        >
          <Star size={16} />
          تقييم
        </Button>
        <Button fullWidth size="lg" onClick={() => navigate(`/lawyers/${id}/contact`)}>
          <PhoneCall size={18} />
          تواصل مع المحامي
        </Button>
      </div>

      <BottomNav />
    </MobileFrame>
  )
}
