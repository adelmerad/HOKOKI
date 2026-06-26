import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, DollarSign, Globe, AlertTriangle, Building2, Banknote, Bell, Bot, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { BottomSheet } from '../../components/ui/BottomSheet'
import { procedures } from '../../data/mockProcedures'
import { sendProcedureMessage } from '../../lib/api/procedure-chat'
import type { ProcedureChatMessage } from '../../types'

const tabs = ['الخطوات', 'الوثائق', 'الأخطاء الشائعة', 'مساعد']
const toastStyle = { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }

const reminderOptions = [
  { days: 1, label: 'غداً' },
  { days: 3, label: 'بعد 3 أيام' },
  { days: 7, label: 'بعد أسبوع' },
  { days: 30, label: 'بعد شهر' },
]

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 18)
    return () => clearInterval(interval)
  }, [text])
  return <span>{displayed}</span>
}

export function ProcedureDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [reminderOpen, setReminderOpen] = useState(false)
  const [reminderDays, setReminderDays] = useState<number | null>(null)

  // Chat state
  const [chatMessages, setChatMessages] = useState<ProcedureChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [newBotMsgId, setNewBotMsgId] = useState<string | null>(null)
  const chatBottomRef = useRef<HTMLDivElement>(null)

  const proc = procedures.find((p) => p.id === id)
  if (!proc) return null

  const allDocs = proc.steps.flatMap((s) => s.requiredDocuments)
  const uniqueDocs = allDocs.filter((doc, i, arr) => arr.findIndex((d) => d.nameAr === doc.nameAr) === i)

  const quickQuestions = [
    'ما هي أهم الأوراق المطلوبة؟',
    'ما هي المدة الفعلية لهذا الإجراء؟',
    'هل يمكنني القيام به إلكترونياً؟',
    'ماذا أفعل إذا رُفض الطلب؟',
  ]

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isBotTyping])

  const handleChatSend = async (text: string) => {
    if (!text.trim() || isBotTyping) return
    const userMsg: ProcedureChatMessage = { id: `u-${Date.now()}`, role: 'user', text: text.trim() }
    setChatMessages((prev) => [...prev, userMsg])
    setChatInput('')
    setIsBotTyping(true)
    try {
      const response = await sendProcedureMessage(text.trim(), proc.id)
      setIsBotTyping(false)
      const botId = `b-${Date.now()}`
      setNewBotMsgId(botId)
      setTimeout(() => {
        setChatMessages((prev) => [...prev, { id: botId, role: 'bot', text: response.answer }])
      }, 300)
    } catch {
      setIsBotTyping(false)
      setChatMessages((prev) => [
        ...prev,
        { id: `e-${Date.now()}`, role: 'bot', text: 'حدث خطأ. تحقق من اتصالك وحاول مجدداً.' },
      ])
    }
  }

  const handleSetReminder = () => {
    toast.success('تمت إضافة التذكير', { style: toastStyle })
    setReminderOpen(false)
    setReminderDays(null)
  }

  return (
    <MobileFrame>
      <StatusBar />
      <TopBar
        title={proc.nameAr}
        rightAction={
          <button
            type="button"
            onClick={() => setReminderOpen(true)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl"
            style={{ backgroundColor: 'var(--color-raised)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}
          >
            <Bell size={13} />
            تذكير
          </button>
        }
      />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '100px' }}>
          {/* Meta Info */}
          <div className="px-5 pt-3 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant={proc.difficulty === 'easy' ? 'success' : proc.difficulty === 'medium' ? 'warning' : 'danger'}
              >
                {proc.difficulty === 'easy' ? 'سهل' : proc.difficulty === 'medium' ? 'متوسط' : 'معقد'}
              </Badge>
              {proc.isOnline && <Badge variant="primary">إلكتروني</Badge>}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Clock, label: 'المدة', value: proc.durationAr },
                { icon: DollarSign, label: 'التكلفة', value: proc.costAr },
                { icon: Globe, label: 'طريقة', value: proc.isOnline ? 'إلكتروني' : 'حضوري' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center p-3 rounded-xl border gap-1"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                  <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{label}</p>
                  <p className="text-xs font-semibold text-center" style={{ color: 'var(--color-text)' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mx-5 p-1 rounded-2xl mb-4" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  backgroundColor: activeTab === i ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === i ? '#fff' : 'var(--color-muted)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="px-5">
            {/* Steps */}
            {activeTab === 0 && (
              <div className="flex flex-col gap-3">
                {proc.steps.map((step, i) => (
                  <div
                    key={step.id}
                    className="p-4 rounded-2xl border"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                          {step.titleAr}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                          {step.instructionsAr}
                        </p>
                        {step.officeCost && (
                          <p className="text-xs mt-2 font-medium flex items-center gap-1" style={{ color: 'var(--color-success)' }}>
                            <Banknote size={11} /> {step.officeCost}
                          </p>
                        )}
                        {step.officeName && (
                          <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--color-muted)' }}>
                            <Building2 size={11} /> {step.officeName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Documents */}
            {activeTab === 1 && (
              <div className="flex flex-col gap-2.5">
                {uniqueDocs.length === 0 ? (
                  <p className="text-sm text-center py-4" style={{ color: 'var(--color-muted)' }}>
                    لا توجد وثائق مطلوبة لهذا الإجراء
                  </p>
                ) : (
                  uniqueDocs.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl border"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{doc.nameAr}</p>
                        {doc.validityPeriod && (
                          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                            صالحة: {doc.validityPeriod}
                          </p>
                        )}
                      </div>
                      <Badge variant="muted">{doc.copies} نسخ</Badge>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Common mistakes */}
            {activeTab === 2 && (
              <div className="flex flex-col gap-2.5">
                {proc.commonMistakes.map((mistake, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl border"
                    style={{ backgroundColor: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}
                  >
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-danger)' }} />
                    <p className="text-sm" style={{ color: 'var(--color-text)' }}>{mistake}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Chat assistant */}
            {activeTab === 3 && (
              <div className="flex flex-col gap-3">
                {/* Quick questions */}
                {chatMessages.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div
                      className="p-4 rounded-2xl border flex items-start gap-3 mb-3"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'rgba(79,110,247,0.15)', border: '1px solid rgba(79,110,247,0.2)' }}
                      >
                        <Bot size={14} style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                        مرحباً! يمكنني الإجابة على أسئلتك حول هذا الإجراء. اختر سؤالاً من الأسئلة الشائعة أو اكتب سؤالك.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {quickQuestions.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => handleChatSend(q)}
                          className="text-right text-sm px-4 py-3 rounded-xl border transition-all active:scale-[0.98]"
                          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Messages */}
                <AnimatePresence initial={false}>
                  {chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${msg.role === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'}`}
                    >
                      {msg.role === 'bot' && (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1"
                          style={{ backgroundColor: 'rgba(79,110,247,0.15)', border: '1px solid rgba(79,110,247,0.2)' }}
                        >
                          <Bot size={14} style={{ color: 'var(--color-primary)' }} />
                        </div>
                      )}
                      <div
                        className="max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                        style={
                          msg.role === 'user'
                            ? { backgroundColor: 'var(--color-primary)', color: '#fff', borderRadius: '18px 4px 18px 18px' }
                            : { backgroundColor: 'var(--color-raised)', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: '4px 18px 18px 18px' }
                        }
                      >
                        {msg.role === 'bot' && msg.id === newBotMsgId ? (
                          <TypewriterText text={msg.text} />
                        ) : (
                          <span style={{ whiteSpace: 'pre-line' }}>{msg.text}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isBotTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(79,110,247,0.15)', border: '1px solid rgba(79,110,247,0.2)' }}
                    >
                      <Bot size={14} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                      style={{ backgroundColor: 'var(--color-raised)', border: '1px solid var(--color-border)' }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [-3, 0, -3] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-muted)' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={chatBottomRef} />
              </div>
            )}
          </div>
        </div>
      </PageTransition>

      {/* Bottom action — start button or chat input */}
      <div
        className="absolute bottom-15 left-0 right-0 border-t"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
      >
        {activeTab === 3 ? (
          <div className="px-4 py-3 flex items-end gap-2">
            <div
              className="flex-1 rounded-2xl border px-3 py-2"
              style={{ backgroundColor: 'var(--color-raised)', borderColor: 'var(--color-border)' }}
            >
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleChatSend(chatInput)
                  }
                }}
                placeholder="اسأل عن هذا الإجراء..."
                rows={1}
                className="w-full bg-transparent outline-none text-sm resize-none"
                style={{ color: 'var(--color-text)', maxHeight: '80px', fontFamily: 'Cairo, sans-serif' }}
              />
            </div>
            <button
              type="button"
              onClick={() => handleChatSend(chatInput)}
              disabled={!chatInput.trim() || isBotTyping}
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all disabled:opacity-40"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <Send size={16} color="#fff" />
            </button>
          </div>
        ) : (
          <div className="px-5 py-3">
            <Button fullWidth size="lg" onClick={() => navigate(`/procedures/${proc.id}/active`)}>
              ابدأ الإجراء
            </Button>
          </div>
        )}
      </div>

      <BottomNav />

      {/* Reminder Modal */}
      <BottomSheet isOpen={reminderOpen} onClose={() => setReminderOpen(false)} title="تعيين تذكير">
        <div className="px-5 pt-3 pb-4 flex flex-col gap-3">
          <p className="text-sm text-center" style={{ color: 'var(--color-muted)' }}>
            متى تريد أن يُذكّرك التطبيق بإكمال هذا الإجراء؟
          </p>
          <div className="grid grid-cols-2 gap-2">
            {reminderOptions.map(({ days, label }) => (
              <button
                key={days}
                type="button"
                onClick={() => setReminderDays(days)}
                className="py-3 rounded-2xl border text-sm font-medium"
                style={{
                  backgroundColor: reminderDays === days ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: reminderDays === days ? '#fff' : 'var(--color-text)',
                  borderColor: reminderDays === days ? 'var(--color-primary)' : 'var(--color-border)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {reminderDays && (
            <Button fullWidth size="lg" onClick={handleSetReminder}>
              <Bell size={18} />
              تأكيد التذكير
            </Button>
          )}
        </div>
      </BottomSheet>
    </MobileFrame>
  )
}
