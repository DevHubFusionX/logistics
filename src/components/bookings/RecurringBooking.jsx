import { useState } from 'react'
import { Calendar, Repeat, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RecurringBooking({ bookingData, onSubmit }) {
  const [schedule, setSchedule] = useState({
    frequency: 'weekly',
    startDate: '',
    endDate: '',
    daysOfWeek: [],
    dayOfMonth: 1,
    occurrences: 10
  })

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ]

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const toggleDay = (day) => {
    setSchedule(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!schedule.startDate) {
      toast.error('Start date is required')
      return
    }

    if (schedule.frequency === 'weekly' && schedule.daysOfWeek.length === 0) {
      toast.error('Select at least one day of the week')
      return
    }

    onSubmit({ ...bookingData, schedule })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Repeat className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">Recurring Booking</h3>
        </div>
        <p className="text-sm text-purple-700">
          Schedule this booking to repeat automatically based on your preferred frequency.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
          <select
            value={schedule.frequency}
            onChange={(e) => setSchedule({ ...schedule, frequency: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {frequencies.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        {schedule.frequency === 'weekly' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Days of Week</label>
            <div className="flex gap-2">
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
                    schedule.daysOfWeek.includes(day)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        {schedule.frequency === 'monthly' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Day of Month</label>
            <input
              type="number"
              min="1"
              max="31"
              value={schedule.dayOfMonth}
              onChange={(e) => setSchedule({ ...schedule, dayOfMonth: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={schedule.startDate}
              onChange={(e) => setSchedule({ ...schedule, startDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
            <input
              type="date"
              value={schedule.endDate}
              onChange={(e) => setSchedule({ ...schedule, endDate: e.target.value })}
              min={schedule.startDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Occurrences {!schedule.endDate && '(if no end date)'}
          </label>
          <input
            type="number"
            min="1"
            max="52"
            value={schedule.occurrences}
            onChange={(e) => setSchedule({ ...schedule, occurrences: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={!!schedule.endDate}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Summary:</p>
          <p className="text-sm font-semibold text-gray-900">
            {schedule.frequency === 'daily' && 'Every day'}
            {schedule.frequency === 'weekly' && `Every ${schedule.daysOfWeek.join(', ') || 'week'}`}
            {schedule.frequency === 'biweekly' && 'Every 2 weeks'}
            {schedule.frequency === 'monthly' && `Day ${schedule.dayOfMonth} of every month`}
            {schedule.startDate && ` starting ${schedule.startDate}`}
            {schedule.endDate && ` until ${schedule.endDate}`}
            {!schedule.endDate && ` for ${schedule.occurrences} occurrences`}
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        <Calendar className="w-5 h-5" />
        Create Recurring Booking
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  )
}
