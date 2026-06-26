import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Paperclip, Mic, Send, Bot, FileText } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { TopBar } from '../../components/layout/TopBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Badge } from '../../components/ui/Badge'
import { conversations, mockBotResponses } from '../../data/mockConversations'
import type { ChatMessage } from '../../types'
import { sendMessage } from '../../lib/api/chat'

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

export function ChatActive() {
  const { id : sessionId } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQ = searchParams.get('q') ?? ''

  const existingConv = conversations.find((c) => c.id === sessionId)
  const [messages, setMessages] = useState<ChatMessage[]>(existingConv?.messages ?? [])
  const [input, setInput] = useState(initialQ)
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [newBotMsgId, setNewBotMsgId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialQ && messages.length === 0) {
      handleSend(initialQ)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isBotTyping])

  const handleSend = async (text: string) => {
    if (!text.trim()) return
    const userMsg: ChatMessage = {
      role: 'user',
      id: `u-${Date.now()}`,
      question: text.trim(),
      sessionId: sessionId || undefined,
    }


    
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsBotTyping(true)


  const response =  await sendMessage(userMsg.question, userMsg.sessionId)

      setIsBotTyping(false)
      const botId = `b-${Date.now()}`
      setNewBotMsgId(botId)

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: botId,
        role: 'bot',
        question: response.answer,
        sessionId: sessionId || undefined,}
      setMessages((prev) => [...prev, botMsg])
    }, 500)
  }


  return (
    <MobileFrame>
      <StatusBar />
      <TopBar title={existingConv?.title ?? 'محادثة جديدة'} />
      <PageTransition>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ backgroundColor: 'rgba(79,110,247,0.15)', border: '1px solid rgba(79,110,247,0.2)' }}
                    >
                      <Bot size={14} style={{ color: 'var(--color-primary)' }} />
                    </div>
                  )}

                  <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                    {msg.isEmergency && (
                      <Badge variant="danger" size="sm">🚨 حالة طارئة</Badge>
                    )}

                    <div
                      className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                      style={
                        msg.role === 'user'
                          ? { backgroundColor: 'var(--color-primary)', color: '#fff', borderRadius: '18px 4px 18px 18px' }
                          : { backgroundColor: 'var(--color-raised)', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: '4px 18px 18px 18px' }
                      }
                    >
                      {msg.role === 'bot' && msg.id === newBotMsgId ? (
                        <TypewriterText text={msg.question} />
                      ) : (
                        <span style={{ whiteSpace: 'pre-line' }}>{msg.question}</span>
                      )}
                    </div>

                    {msg.structuredAnswer && (
                      <div
                        className="px-4 py-3 rounded-2xl border text-sm w-full"
                        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'rgba(79,110,247,0.3)' }}
                      >
                        <p className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                          {msg.structuredAnswer.title}
                        </p>
                        <ol className="flex flex-col gap-1.5 list-none">
                          {msg.structuredAnswer.steps.map((step, i) => (
                            <li key={i} className="flex gap-2">
                              <span
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: 'rgba(79,110,247,0.15)', color: 'var(--color-primary)' }}
                              >
                                {i + 1}
                              </span>
                              <span style={{ color: 'var(--color-text)' }}>{step}</span>
                            </li>
                          ))}
                        </ol>
                        {msg.structuredAnswer.note && (
                          <p className="mt-2 text-xs italic" style={{ color: 'var(--color-muted)' }}>
                            {msg.structuredAnswer.note}
                          </p>
                        )}
                      </div>
                    )}

                    {msg.citationChips && msg.citationChips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.citationChips.map((chip, ci) => (
                          <button
                            key={ci}
                            type="button"
                            onClick={() => chip.categoryId && navigate(`/laws/${chip.categoryId}/${chip.articleId ?? ''}`)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border"
                            style={{ backgroundColor: 'rgba(79,110,247,0.1)', borderColor: 'rgba(79,110,247,0.3)', color: 'var(--color-primary)' }}
                          >
                            <FileText size={10} />
                            {chip.articleNumber} · {chip.law}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isBotTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
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

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="px-4 py-3 border-t flex items-end gap-2"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <button type="button" className="p-2" style={{ color: 'var(--color-muted)' }}>
              <Paperclip size={20} />
            </button>
            <div
              className="flex-1 rounded-2xl border px-3 py-2 transition-all"
              style={{ backgroundColor: 'var(--color-raised)', borderColor: 'var(--color-border)' }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend(input)
                  }
                }}
                placeholder="اكتب سؤالك..."
                rows={1}
                className="w-full bg-transparent outline-none text-sm resize-none"
                style={{ color: 'var(--color-text)', maxHeight: '80px' }}
              />
            </div>
            <button type="button" className="p-2" style={{ color: 'var(--color-muted)' }}>
              <Mic size={20} />
            </button>
            <button
              type="button"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isBotTyping}
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all disabled:opacity-40"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <Send size={18} color="#fff" />
            </button>
          </div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
