import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export function BottomSheet({ isOpen, onClose, children, title }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose()
            }}
            className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
            </div>
            {title && (
              <div className="px-5 pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="text-base font-semibold text-center">{title}</h3>
              </div>
            )}
            <div className="pb-8">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
