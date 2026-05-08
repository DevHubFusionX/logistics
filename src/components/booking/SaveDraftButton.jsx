import { Save, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SaveDraftButton({ onSave, lastSaved }) {
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    if (lastSaved) {
      setShowSaved(true)
      const timer = setTimeout(() => setShowSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [lastSaved])

  return (
    <button
      type="button"
      onClick={onSave}
      className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium text-sm transition-all ${
        showSaved
          ? 'bg-green-50 border-green-500 text-green-700'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      {showSaved ? (
        <>
          <Check className="w-4 h-4" />
          Saved
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          Save Draft
        </>
      )}
    </button>
  )
}
