import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Trash2, Search, Clock } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import {v4 as uuid} from 'uuid'
interface HistoryItem {
  id: string
  title: string
  preview: string
  timestamp: string
  messageCount: number
}

const mockHistory: HistoryItem[] = [
  { id: 'h1', title: 'حقوق العامل عند الطرد', preview: 'هل يحق لصاحب العمل إنهاء عقد العمل دون سابق إنذار؟', timestamp: 'اليوم 14:32', messageCount: 8 },
  { id: 'h2', title: 'شروط عقد الإيجار', preview: 'ما هي البنود الإلزامية التي يجب أن يتضمنها عقد الإيجار؟', timestamp: 'أمس 09:15', messageCount: 5 },
  { id: 'h3', title: 'إجراءات الطلاق الخلعي', preview: 'ما الفرق بين الطلاق والخلع في القانون الجزائري؟', timestamp: '3 يونيو', messageCount: 12 },
  { id: 'h4', title: 'شكوى ضد تاجر إلكتروني', preview: 'اشتريت منتجاً عبر الإنترنت ولم يصلني، ما الإجراء القانوني؟', timestamp: '1 يونيو', messageCount: 6 },
  { id: 'h5', title: 'ملكية عقارية وميراث', preview: 'هل يمكن بيع العقار قبل توزيع الميراث؟', timestamp: '28 مايو', messageCount: 9 },
  { id: 'h6', title: 'تأسيس شركة ذات مسؤولية', preview: 'ما الخطوات القانونية لتأسيس SARL في الجزائر؟', timestamp: '25 مايو', messageCount: 14 },
]

export function ChatHistory() {
  const navigate = useNavigate()
  const [history, setHistory] = useState(mockHistory)
  const [query, setQuery] = useState('')

  const filtered = history.filter(
    (h) => !query || h.title.toLowerCase().includes(query.toLowerCase()),
  )

  const deleteItem = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id))
  }

  const sessionId = uuid() 
  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title="سجل المحادثات" />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          <div className="px-4 pt-3 pb-2">
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <Search size={15} style={{ color: 'var(--color-muted)' }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث في المحادثات..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                style={{ color: 'var(--color-text)' }}
              />
            </div>
          </div>

          <div className="px-4 pt-2">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-3 pt-10">
                <MessageSquare size={36} style={{ color: 'var(--color-muted)', opacity: 0.4 }} />
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>لا توجد محادثات</p>
              </div>
            ) : (
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 p-4 rounded-2xl border mb-2.5"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <button
                      type="button"
                      onClick={() => navigate(`/chat/${item.id}`)}
                      className="flex-1 flex items-start gap-3 text-right min-w-0"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'rgba(79,110,247,0.1)' }}
                      >
                        <MessageSquare size={18} style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                            {item.title}
                          </p>
                          <div className="flex items-center gap-1 shrink-0">
                            <Clock size={10} style={{ color: 'var(--color-muted)' }} />
                            <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{item.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-muted)' }}>
                          {item.preview}
                        </p>
                        <p className="text-[10px] mt-1" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>
                          {item.messageCount} رسائل
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      className="p-2 rounded-xl shrink-0"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        <div
          className="absolute bottom-[60px] left-0 right-0 px-4 py-3 border-t"
          style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
        >
          <button
            type="button"
            onClick={() => navigate(`/chat/${sessionId}`)}
            className="w-full py-3.5 rounded-2xl text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
          >
            + محادثة جديدة
          </button>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileFrame>
  )
}
