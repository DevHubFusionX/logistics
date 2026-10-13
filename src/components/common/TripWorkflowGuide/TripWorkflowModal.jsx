import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Workflow, Terminal, Users } from 'lucide-react'
import { useAuth } from '@/features/auth'
import UserTripGuide from './UserTripGuide'
import AdminTripGuide from './AdminTripGuide'

export default function TripWorkflowModal({ isOpen, onClose, defaultMode = null }) {
  const { isAdmin } = useAuth()
  
  // If defaultMode is explicitly passed ('user' or 'admin'), respect it; otherwise use isAdmin
  const [activeMode, setActiveMode] = useState(defaultMode || (isAdmin ? 'admin' : 'user'))

  // Synchronize mode whenever modal opens or defaultMode changes
  useEffect(() => {
    if (isOpen) {
      setActiveMode(defaultMode || (isAdmin ? 'admin' : 'user'))
    }
  }, [isOpen, defaultMode, isAdmin])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trip-workflow-title"
    >
      <div
        className="bg-slate-50 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 font-bold">
              <Workflow className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h2 id="trip-workflow-title" className="text-base font-bold text-slate-900 leading-tight">
                {activeMode === 'admin' ? 'Trip V2 Operations Guide' : 'How Darafort Delivery Works'}
              </h2>
              <p className="text-xs text-slate-500">
                {activeMode === 'admin' 
                  ? 'Dispatch workflow, driver assignments & telematics pipeline'
                  : 'A simple guide to booking, tracking, and receiving your shipments'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher: visible to Admins/Managers so they can inspect both perspectives */}
            {isAdmin && (
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                <button
                  onClick={() => setActiveMode('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeMode === 'admin'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Admin Ops Flow</span>
                </button>
                <button
                  onClick={() => setActiveMode('user')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeMode === 'user'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Customer View</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
          {activeMode === 'admin' ? <AdminTripGuide /> : <UserTripGuide />}
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            {activeMode === 'admin'
              ? 'Darafort Logistics • Trip V2 Dispatch Architecture'
              : 'Darafort Logistics • Fast & reliable temperature-controlled delivery'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer text-xs"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
