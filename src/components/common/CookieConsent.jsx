import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const COOKIE_KEY = 'dara_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie Consent"
          className="fixed bottom-6 right-6 md:right-8 z-[9999] w-[calc(100vw-2rem)] sm:w-[380px]"
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col gap-4">
            {/* Text Description */}
            <div className="text-left">
              <p className="font-heading-unique font-bold text-slate-200 text-sm mb-1.5">
                Cookie Settings
              </p>
              <p className="font-body-unique text-slate-400 text-xs leading-relaxed">
                We use cookies to improve your experience and analyze our traffic. By clicking "Accept All", you agree to our use of cookies. Read our{' '}
                <Link
                  to="/privacy"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors font-semibold"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 font-body-unique text-xs">
              <button
                onClick={decline}
                className="px-3 py-1.5 text-slate-400 hover:text-slate-200 font-medium transition-colors cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
