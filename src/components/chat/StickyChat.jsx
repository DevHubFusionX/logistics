import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

export default function StickyChat() {
  const [open, setOpen] = useState(false)

  function toggle() {
    if (!open) {
      window.chatbase?.('open')
    } else {
      window.chatbase?.('close')
    }
    setOpen(o => !o)
  }

  return (
    <>
      {/* Backdrop — Tailwind blur, transparent, only on mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={toggle}
            className="fixed inset-0 z-40 bg-white/10 backdrop-blur-sm sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* FAB */}
      <div className="fixed bottom-5 right-5 z-50">
        <motion.button
          onClick={toggle}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 1.2 }}
          whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(14,165,233,0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-sky-900 hover:bg-sky-800 text-white shadow-2xl flex items-center justify-center transition-colors"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageCircle className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Notification dot */}
          {!open && (
            <motion.span
              className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>
    </>
  )
}
