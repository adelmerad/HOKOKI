import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Send, X, RotateCcw } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { PageTransition } from '../../components/layout/PageTransition'
import {v4 as uuid} from 'uuid'
type State = 'idle' | 'recording' | 'done'

export function ChatVoiceInput() {
  const navigate = useNavigate()
  const [state, setState] = useState<State>('idle')
  const [seconds, setSeconds] = useState(0)
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    if (state !== 'recording') return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [state])

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const startRecording = () => {
    setState('recording')
    setSeconds(0)
    setTranscript('')
    setTimeout(() => {
      setState('done')
      setTranscript('هل يحق لصاحب العمل إنهاء عقد العمل بدون سابق إنذار؟')
    }, 3000)
  }
const sessionId = uuid()
  const reset = () => {
    setState('idle')
    setSeconds(0)
    setTranscript('')
  }

  const send = () => {
    navigate(`/chat/${sessionId}?q=${encodeURIComponent(transcript)}`)
  }

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <button
              type="button"
              onClick={() => navigate('/chat')}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <X size={18} style={{ color: 'var(--color-text)' }} />
            </button>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              الإدخال الصوتي
            </p>
            <div className="w-10" />
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
            {/* Waveform Visualizer */}
            <div className="flex items-center justify-center gap-1 h-16">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{ width: '3px', backgroundColor: state === 'recording' ? 'var(--color-primary)' : 'var(--color-border)' }}
                  animate={
                    state === 'recording'
                      ? {
                          height: [8, Math.random() * 40 + 10, 8],
                          opacity: [0.4, 1, 0.4],
                        }
                      : { height: 8, opacity: 0.3 }
                  }
                  transition={
                    state === 'recording'
                      ? { duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.04 }
                      : {}
                  }
                />
              ))}
            </div>

            {/* Timer */}
            <AnimatePresence mode="wait">
              {state === 'recording' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-danger)' }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-2xl font-bold font-mono" style={{ color: 'var(--color-text)' }}>
                    {formatTime(seconds)}
                  </span>
                </motion.div>
              )}
              {state === 'idle' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-center"
                  style={{ color: 'var(--color-muted)' }}
                >
                  اضغط على الميكروفون وتحدث بسؤالك القانوني
                </motion.p>
              )}
            </AnimatePresence>

            {/* Transcript */}
            <AnimatePresence>
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full p-4 rounded-2xl border"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>ما قلته:</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{transcript}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Mic Button */}
            {state !== 'done' && (
              <motion.button
                type="button"
                onClick={state === 'idle' ? startRecording : () => setState('done')}
                whileTap={{ scale: 0.92 }}
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: state === 'recording'
                    ? 'linear-gradient(135deg, #EF4444, #B91C1C)'
                    : 'linear-gradient(135deg, #4F6EF7, #3B55D9)',
                  boxShadow: state === 'recording'
                    ? '0 0 0 12px rgba(239,68,68,0.15), 0 8px 32px rgba(239,68,68,0.3)'
                    : '0 0 0 12px rgba(79,110,247,0.12), 0 8px 32px rgba(79,110,247,0.25)',
                }}
                animate={state === 'recording' ? { scale: [1, 1.04, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {state === 'idle'
                  ? <Mic size={36} color="#fff" />
                  : <MicOff size={36} color="#fff" />
                }
              </motion.button>
            )}
          </div>

          {/* Bottom Actions */}
          {state === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-5 pb-10 flex gap-3"
            >
              <button
                type="button"
                onClick={reset}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border text-sm font-semibold"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <RotateCcw size={16} />
                إعادة التسجيل
              </button>
              <button
                type="button"
                onClick={send}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold"
                style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
              >
                <Send size={16} />
                إرسال السؤال
              </button>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
