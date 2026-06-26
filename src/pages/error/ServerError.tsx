import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ServerCrash, RefreshCw, Home } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'

export function ServerError() {
  const navigate = useNavigate()

  return (
    <MobileFrame>
      <StatusBar />
      <PageTransition>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <ServerCrash size={44} style={{ color: 'var(--color-danger)', opacity: 0.8 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center"
          >
            <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              حدث خطأ في الخادم
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              نواجه مشكلة تقنية مؤقتة. فريقنا يعمل على حلها. حاول مجدداً بعد لحظات.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-3 rounded-2xl"
            style={{ backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
          >
            <p className="text-xs text-center font-mono" style={{ color: 'var(--color-muted)' }}>
              خطأ 500 — Internal Server Error
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="w-full flex flex-col gap-3"
          >
            <Button fullWidth size="lg" onClick={() => navigate(0 as unknown as string)}>
              <RefreshCw size={18} />
              إعادة المحاولة
            </Button>
            <Button fullWidth size="lg" variant="secondary" onClick={() => navigate('/home')}>
              <Home size={18} />
              العودة للرئيسية
            </Button>
          </motion.div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
