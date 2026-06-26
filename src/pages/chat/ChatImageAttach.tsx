import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Camera, X, Send, FileText, ChevronLeft } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'
import {v4 as uuid} from 'uuid'

const SAMPLE_IMAGES = [
  { id: '1', label: 'عقد عمل', color: '#4F6EF7' },
  { id: '2', label: 'وثيقة رسمية', color: '#7C3AED' },
  { id: '3', label: 'صورة شخصية', color: '#059669' },
  { id: '4', label: 'فاتورة', color: '#F59E0B' },
  { id: '5', label: 'مستند قانوني', color: '#EF4444' },
  { id: '6', label: 'تصريح', color: '#0891B2' },
]

export function ChatImageAttach() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([])
  const [caption, setCaption] = useState('')

  const sessionId = uuid() 
  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])

  const handleSend = () => {
    navigate(`/chat/${sessionId}`, )
  }

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b shrink-0"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <button type="button" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} style={{ color: 'var(--color-text)' }} />
          </button>
          <h1 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
            إرفاق صورة أو ملف
          </h1>
          <div className="w-6" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Source buttons */}
          <div className="px-4 pt-4 pb-3 flex gap-3">
            <button
              type="button"
              className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Camera size={24} style={{ color: 'var(--color-primary)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>الكاميرا</span>
            </button>
            <button
              type="button"
              className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Image size={24} style={{ color: 'var(--color-primary)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>المعرض</span>
            </button>
            <button
              type="button"
              className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <FileText size={24} style={{ color: 'var(--color-primary)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>ملف</span>
            </button>
          </div>

          {/* Gallery grid */}
          <div className="px-4">
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
              الصور الأخيرة
            </p>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_IMAGES.map((img) => {
                const isSelected = selected.includes(img.id)
                return (
                  <motion.button
                    key={img.id}
                    type="button"
                    onClick={() => toggle(img.id)}
                    whileTap={{ scale: 0.94 }}
                    className="relative aspect-square rounded-2xl overflow-hidden border-2"
                    style={{ borderColor: isSelected ? 'var(--color-primary)' : 'transparent' }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `${img.color}18` }}
                    >
                      <FileText size={28} style={{ color: img.color }} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-1 pb-1">
                      <p className="text-xs text-center" style={{ color: 'var(--color-text)', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                        {img.label}
                      </p>
                    </div>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                          <span className="text-white text-xs font-bold">
                            {selected.indexOf(img.id) + 1}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Caption + selected preview */}
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pt-4 overflow-hidden"
              >
                <div className="flex gap-2 mb-3 overflow-x-auto">
                  {selected.map((id) => {
                    const img = SAMPLE_IMAGES.find((s) => s.id === id)!
                    return (
                      <div
                        key={id}
                        className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden"
                        style={{ backgroundColor: `${img.color}20`, border: `1px solid ${img.color}40` }}
                      >
                        <FileText size={20} style={{ color: img.color, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                        <button
                          type="button"
                          onClick={() => toggle(id)}
                          className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                        >
                          <X size={10} color="#fff" />
                        </button>
                      </div>
                    )
                  })}
                </div>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="أضف وصفاً للمرفق..."
                  className="w-full p-3 rounded-2xl border text-sm bg-transparent outline-none placeholder:opacity-40"
                  style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-4" />
        </div>

        {/* Bottom bar */}
        <div
          className="shrink-0 px-4 py-3 border-t"
          style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
        >
          {selected.length > 0 ? (
            <Button fullWidth size="lg" onClick={handleSend}>
              <Send size={18} />
              إرسال ({selected.length})
            </Button>
          ) : (
            <Button fullWidth size="lg" variant="secondary" onClick={() => navigate(-1)}>
              إلغاء
            </Button>
          )}
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
