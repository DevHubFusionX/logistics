import { useState } from 'react'
import { HelpCircle, Workflow } from 'lucide-react'
import { useAuth } from '@/features/auth'
import TripWorkflowModal from './TripWorkflowModal'

export default function TripWorkflowButton({
  variant = 'header',
  label,
  mode = null,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { isAdmin } = useAuth()

  // Default display labels based on mode or user role
  const effectiveMode = mode || (isAdmin ? 'admin' : 'user')
  const defaultLabel = effectiveMode === 'admin' ? 'Trip V2 Ops Guide' : 'How It Works'
  const displayLabel = label || defaultLabel

  if (variant === 'header') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-100/80 bg-sky-50/60 hover:bg-sky-100/80 text-sky-800 text-xs font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer select-none active:scale-97 ${className}`}
          title="Learn how the Trip V2 cold-chain system works"
        >
          <Workflow className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
          <span className="hidden sm:inline">{displayLabel}</span>
          <span className="sm:hidden">Guide</span>
        </button>
        <TripWorkflowModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultMode={effectiveMode}
        />
      </>
    )
  }

  if (variant === 'outline') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-97 ${className}`}
        >
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <span>{displayLabel}</span>
        </button>
        <TripWorkflowModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultMode={effectiveMode}
        />
      </>
    )
  }

  // Default primary button variant
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-600 hover:to-sky-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer active:scale-97 ${className}`}
      >
        <Workflow className="w-4 h-4 text-sky-200" />
        <span>{displayLabel}</span>
      </button>
      <TripWorkflowModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultMode={effectiveMode}
      />
    </>
  )
}
