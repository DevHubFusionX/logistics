import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

export default function TripFormModal({ isOpen, onClose, onSubmit, drivers = [], bookings = [], isSubmitting = false }) {
  const [formData, setFormData] = useState({
    bookingId: '',
    driverId: '',
    originLat: '',
    originLng: ''
  })

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.bookingId) return

    const payload = {
      bookingId: formData.bookingId,
      ...(formData.driverId && { driverId: formData.driverId }),
      ...(formData.originLat && formData.originLng && {
        origin: {
          lat: parseFloat(formData.originLat),
          lng: parseFloat(formData.originLng)
        }
      })
    }
    onSubmit(payload)
  }

  const handleClose = () => {
    setFormData({ bookingId: '', driverId: '', originLat: '', originLng: '' })
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create New Trip</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Booking ID — required */}
              <div>
                <label className={labelClass}>Booking *</label>
                {bookings.length > 0 ? (
                  <select name="bookingId" value={formData.bookingId} onChange={handleChange} className={inputClass} required>
                    <option value="">Select a booking...</option>
                    {bookings.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.trackingNumber || b.id} — {b.origin} → {b.destination}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="bookingId"
                    value={formData.bookingId}
                    onChange={handleChange}
                    placeholder="Enter booking ID"
                    className={inputClass}
                    required
                  />
                )}
              </div>

              {/* Driver — nullable */}
              <div>
                <label className={labelClass}>Assign Driver <span className="text-gray-400 font-normal">(optional)</span></label>
                <select name="driverId" value={formData.driverId} onChange={handleChange} className={inputClass}>
                  <option value="">No driver assigned yet</option>
                  {drivers.map(d => (
                    <option key={d.id} value={d.id}>{d.name} — {d.phone}</option>
                  ))}
                </select>
              </div>

              {/* Origin coordinates — nullable */}
              <div>
                <label className={labelClass}>Origin Coordinates <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    name="originLat"
                    value={formData.originLat}
                    onChange={handleChange}
                    placeholder="Latitude e.g. 6.5244"
                    className={inputClass}
                    step="any"
                  />
                  <input
                    type="number"
                    name="originLng"
                    value={formData.originLng}
                    onChange={handleChange}
                    placeholder="Longitude e.g. 3.3792"
                    className={inputClass}
                    step="any"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.bookingId}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
