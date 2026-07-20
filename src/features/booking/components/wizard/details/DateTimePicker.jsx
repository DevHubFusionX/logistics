import { useState, useRef, useEffect } from 'react'
import { Calendar, Clock, ChevronDown, Check } from 'lucide-react'

export default function DateTimePicker({
  label,
  value,
  onChange,
  onBlur,
  error,
  min
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCustom, setShowCustom] = useState(false)
  const dropdownRef = useRef(null)

  // Split selected YYYY-MM-DD and HH:MM
  const selectedDateVal = value ? value.split('T')[0] : ''
  const selectedTimeVal = value ? value.split('T')[1] : ''

  // Standard time slots
  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']

  // Click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Helper to format date object to YYYY-MM-DD
  const formatDateVal = (date) => {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  // Get the starting date based on min constraint or current time
  const getStartDate = () => {
    if (min) {
      const minDate = new Date(min)
      if (!isNaN(minDate.getTime())) {
        const d = new Date(minDate)
        d.setHours(0, 0, 0, 0)
        return d
      }
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  }

  // Generate 7 days starting from start date
  const days = []
  const start = getStartDate()
  const todayVal = formatDateVal(new Date())
  const tomorrowVal = formatDateVal(new Date(Date.now() + 24 * 60 * 60 * 1000))

  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push(d)
  }

  // Format date display inside dropdown
  const getDayName = (dateVal) => {
    if (dateVal === todayVal) return 'Today'
    if (dateVal === tomorrowVal) return 'Tomorrow'
    const dateObj = new Date(dateVal)
    return dateObj.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const getDayNumberMonth = (dateVal) => {
    const dateObj = new Date(dateVal)
    return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  }

  // Check if slot is disabled under min constraint
  const isSlotDisabled = (dateVal, timeSlot) => {
    if (!min) return false
    const minDateVal = min.split('T')[0]
    const minTimeVal = min.split('T')[1] || '00:00'

    if (dateVal < minDateVal) return true
    if (dateVal === minDateVal && timeSlot < minTimeVal) return true
    return false
  }

  const handleDateSelect = (dateVal) => {
    // Keep current time slot if still valid, otherwise don't select a time yet
    const nextTime = selectedTimeVal && !isSlotDisabled(dateVal, selectedTimeVal) ? selectedTimeVal : ''
    onChange(nextTime ? `${dateVal}T${nextTime}` : `${dateVal}T`)
  }

  const handleTimeSelect = (timeSlot) => {
    const dateVal = selectedDateVal || formatDateVal(getStartDate())
    onChange(`${dateVal}T${timeSlot}`)
    setIsOpen(false) // Close popover on time selection
    if (onBlur) onBlur()
  }

  // Format the visual value shown on the select button
  const getFormattedValue = (val) => {
    if (!val) return ''
    const parts = val.split('T')
    const datePart = parts[0]
    const timePart = parts[1] || ''

    const dateObj = new Date(datePart)
    if (isNaN(dateObj.getTime())) return val

    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
    const dayNum = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
    
    return `${dayName}, ${dayNum}${timePart ? ` at ${timePart}` : ''}`
  }

  return (
    <div className="space-y-1.5 relative animate-in fade-in duration-200" ref={dropdownRef}>
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-left bg-white border outline-none transition-all duration-200 flex items-center justify-between cursor-pointer
            ${error
              ? 'border-red-300 focus:ring-4 focus:ring-red-500/5'
              : isOpen
                ? 'border-sky-400 focus:ring-4 focus:ring-sky-500/5 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isOpen ? 'text-sky-600' : 'text-gray-400'}`} />
            <span className={value ? 'text-gray-900' : 'text-gray-400'}>
              {getFormattedValue(value) || 'Select Date & Time…'}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-sky-600' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] z-50 overflow-hidden w-[310px] sm:w-[350px] animate-fadeIn flex flex-col">
            
            {!showCustom ? (
              <>
                {/* Header row */}
                <div className="flex text-[10px] font-extrabold text-gray-400 uppercase tracking-widest bg-gray-50/50 border-b border-gray-100 divide-x divide-gray-100">
                  <div className="flex-1 py-2 px-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-600" />
                    <span>Date</span>
                  </div>
                  <div className="flex-1 py-2 px-3 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-600" />
                    <span>Time Slot</span>
                  </div>
                </div>

                {/* Split columns panel */}
                <div className="flex divide-x divide-gray-100 max-h-[240px]">
                  {/* Left: Dates */}
                  <div className="flex-1 overflow-y-auto p-1.5 space-y-1 custom-scrollbar">
                    {days.map((dateObj, idx) => {
                      const dateVal = formatDateVal(dateObj)
                      const isSelected = selectedDateVal === dateVal
                      const dayName = getDayName(dateVal)
                      const dateLabel = getDayNumberMonth(dateVal)

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateSelect(dateVal)}
                          className={`w-full px-2.5 py-2 text-left rounded-lg transition-colors flex flex-col cursor-pointer
                            ${isSelected
                              ? 'bg-sky-50 text-sky-700 font-bold'
                              : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider">{dayName}</span>
                          <span className="text-xs font-semibold mt-0.5">{dateLabel}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Right: Times */}
                  <div className="flex-1 overflow-y-auto p-1.5 space-y-1 custom-scrollbar">
                    {timeSlots.map((slot) => {
                      const activeDate = selectedDateVal || formatDateVal(getStartDate())
                      const isDisabled = isSlotDisabled(activeDate, slot)
                      const isSelected = selectedTimeVal === slot

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => handleTimeSelect(slot)}
                          className={`w-full px-3 py-2 text-left text-xs font-bold rounded-lg transition-colors flex items-center justify-between cursor-pointer
                            ${isSelected
                              ? 'bg-sky-50 text-sky-700 font-extrabold'
                              : isDisabled
                              ? 'opacity-30 text-gray-400 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <span>{slot}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-600" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Custom Datetime Input Fallback */
              <div className="p-4 border-b border-gray-100 animate-in fade-in duration-200">
                <input
                  type="datetime-local"
                  value={value}
                  min={min}
                  onChange={(e) => {
                    onChange(e.target.value)
                    if (onBlur) onBlur()
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 bg-white"
                  required
                />
              </div>
            )}

            {/* Custom Input Accordion Toggle */}
            <div className="p-2 bg-gray-50/50 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCustom(!showCustom)}
                className="text-[10px] font-bold text-sky-750 hover:text-sky-850 transition-colors cursor-pointer select-none"
              >
                {showCustom ? 'Use standard slots' : 'Or select custom time...'}
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  )
}
