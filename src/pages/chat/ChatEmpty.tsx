import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Bot, Send, History, AlertTriangle, Mic, Image } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { BottomNav } from '../../components/layout/BottomNav'
import { PageTransition } from '../../components/layout/PageTransition'
import { conversations, suggestionChips } from '../../data/mockConversations'
import {v4 as uuid} from 'uuid'

export function ChatEmpty() {
  const navigate = useNavigate()
  const sessionId = uuid()

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '80px' }}>
          {/* Header */}
          <div className="px-5 pt-4 pb-2 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate('/chat/history')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
              >
                <History size={13} />
                السجل
              </button>
              <button
                type="button"
                onClick={() => navigate('/chat/emergency')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs"
                style={{ backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.25)', color: 'var(--color-danger)' }}
              >
                <AlertTriangle size={13} />
                طوارئ
              </button>
            </div>
            <div>
              <h1 className="text-xl font-bold text-right" style={{ color: 'var(--color-text)' }}>المساعد القانوني</h1>
              <p className="text-sm mt-0.5 text-right" style={{ color: 'var(--color-muted)' }}>اسأل عن أي موضوع قانوني</p>
            </div>
          </div>

          {/* Bot Intro */}
          <div className="px-5 pb-5">
            <div
              className="p-4 rounded-2xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex gap-3 items-start">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(79,110,247,0.15)', border: '1px solid rgba(79,110,247,0.2)' }}
                >
                  <Bot size={16} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                    مرحباً! أنا مساعدك القانوني
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    يمكنك سؤالي عن حقوقك، إجراءاتك الإدارية، أحكام القانون الجزائري، وغيرها.
                    لن أحكم عليك، فقط أُرشدك.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="px-5 pb-5">
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
              أسئلة شائعة
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestionChips.map((chip) => (
                <motion.button
                  key={chip.id}
                  type="button"
                  onClick={() => navigate(`/chat/${sessionId}?q=${encodeURIComponent(chip.text)}`)}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <span>{chip.text}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Past Conversations */}
          {conversations.length > 0 && (
            <div className="px-5 pb-5">
              <p className="text-xs font-semibold mb-3 flex items-center gap-1.5" style={{ color: 'var(--color-muted)' }}>
                <Clock size={12} /> المحادثات السابقة
              </p>
              <div className="flex flex-col gap-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => navigate(`/chat/${conv.id}`)}
                    className="p-4 rounded-2xl border text-right w-full"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {conv.title}
                    </p>
                    <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--color-muted)' }}>
                      {conv.lastMessage}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageTransition>

      {/* Input Bar always visible */}
      <div
        className="px-4 py-3 border-t"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/chat/voice')}
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
            style={{ backgroundColor: 'var(--color-raised)', borderColor: 'var(--color-border)' }}
          >
            <Mic size={18} style={{ color: 'var(--color-muted)' }} />
          </button>
          <button
            type="button"
            onClick={() => navigate(`/chat/${sessionId}`)}
            className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border text-right"
            style={{ backgroundColor: 'var(--color-raised)', borderColor: 'var(--color-border)' }}
          >
            <span className="text-sm flex-1" style={{ color: 'var(--color-muted)' }}>
              اكتب سؤالك القانوني...
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/chat/image')}
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
            style={{ backgroundColor: 'var(--color-raised)', borderColor: 'var(--color-border)' }}
          >
            <Image size={18} style={{ color: 'var(--color-muted)' }} />
          </button>
          <button
            type="button"
            onClick={() => navigate(`/chat/${sessionId}`)}
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Send size={16} color="#fff" />
          </button>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  )
}
