import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FormSelect({ label, value, onChange, options, placeholder, iconDot, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      {label && (
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          {iconDot}
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-left bg-white border outline-none transition-all duration-200 flex items-center justify-between cursor-pointer
            ${error
              ? 'border-red-350 focus:ring-4 focus:ring-red-500/5'
              : isOpen
                ? 'border-sky-400 focus:ring-4 focus:ring-sky-500/5 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-sky-600' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] z-50 overflow-hidden animate-fadeIn py-1">
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center justify-between
                    ${isSelected
                      ? 'bg-sky-50 text-sky-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  )
}
