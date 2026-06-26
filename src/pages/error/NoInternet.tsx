import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { WifiOff, RefreshCw } from 'lucide-react'
import { MobileFrame } from '../../components/layout/MobileFrame'
import { StatusBar } from '../../components/layout/StatusBar'
import { PageTransition } from '../../components/layout/PageTransition'
import { Button } from '../../components/ui/Button'

export function NoInternet() {
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
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <WifiOff size={44} style={{ color: 'var(--color-muted)', opacity: 0.6 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center"
          >
            <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              لا يوجد اتصال بالإنترنت
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              تأكد من اتصالك بالإنترنت ثم حاول مجدداً. يمكنك الاطلاع على المحفوظات بدون اتصال.
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
            <Button fullWidth size="lg" variant="secondary" onClick={() => navigate('/bookmarks')}>
              عرض المحفوظات
            </Button>
          </motion.div>
        </div>
      </PageTransition>
    </MobileFrame>
  )
}
