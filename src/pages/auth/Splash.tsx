import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'

export function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <MobileFrame>
      <div
        className="flex-1 flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #0C0C0F 0%, #0A0A18 100%)' }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 120 }}
          className="flex flex-col items-center gap-6"
        >
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Scale size={44} color="#fff" strokeWidth={1.5} />
          </div>

          <div className="flex flex-col items-center gap-1">
            <h1 className="text-5xl font-bold" style={{ color: 'var(--color-text)' }}>حقّي</h1>
            <p className="text-base" style={{ color: 'var(--color-muted)' }}>مساعدك القانوني الجزائري</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-16 flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
          ))}
        </motion.div>
      </div>
    </MobileFrame>
  )
}
