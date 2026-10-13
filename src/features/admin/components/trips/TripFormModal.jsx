import { useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Loader2, Link2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { getSafeTrackingUrl } from '@/utils'

const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

export default function TripFormModal({ isOpen, onClose, onSubmit, drivers = [], bookings = [], isSubmitting = false }) {
  const [formData, setFormData] = useState({
    bookingId: '',
    driverId: '',
    originLat: '',
    originLng: '',
    trackingLink: ''
  })

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.bookingId) return

    let safeLink = null
    if (formData.trackingLink.trim()) {
      safeLink = getSafeTrackingUrl(formData.trackingLink.trim())
      if (!safeLink) {
        toast.error('Please enter a valid HTTP or HTTPS tracking URL (e.g. https://gps.example.com)')
        return
      }
    }

    const payload = {
      bookingId: formData.bookingId,
      ...(formData.driverId && { driverId: formData.driverId }),
      ...(formData.originLat && formData.originLng && {
        origin: {
          lat: parseFloat(formData.originLat),
          lng: parseFloat(formData.originLng)
        }
      }),
      ...(safeLink && { trackingLink: safeLink })
    }
    onSubmit(payload)
  }

  const handleClose = () => {
    setFormData({ bookingId: '', driverId: '', originLat: '', originLng: '', trackingLink: '' })
    onClose()
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
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
                    {bookings.map(b => {
                      const id = b.id || b._id
                      const origin = typeof b.pickupLocation === 'string' ? b.pickupLocation : (b.pickupLocation?.city || b.pickupCity || b.origin || 'Origin')
                      const dest = typeof b.dropoffLocation === 'string' ? b.dropoffLocation : (b.dropoffLocation?.city || b.deliveryCity || b.destination || 'Destination')
                      return (
                        <option key={id} value={id}>
                          {b.trackingNumber || id} — {origin} → {dest}
                        </option>
                      )
                    })}
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
                  {drivers.map(d => {
                    const id = d.id || d._id
                    const name = d.name || `${d.firstName || ''} ${d.lastName || ''}`.trim() || 'Driver'
                    return (
                      <option key={id} value={id}>
                        {name}{d.phone ? ` — ${d.phone}` : ''}
                      </option>
                    )
                  })}
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

              {/* Tracking Link — Trip V2 */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5 text-indigo-600" /> Telematics / Live GPS Tracking Link</span>
                  <span className="text-gray-400 font-normal text-xs ml-1">(optional)</span>
                </label>
                <input
                  type="url"
                  name="trackingLink"
                  value={formData.trackingLink}
                  onChange={handleChange}
                  placeholder="https://gps.trackingprovider.com/track/..."
                  className={inputClass}
                />
                <p className="text-xs text-gray-400 mt-1">Customers can track their shipment live via this link.</p>
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
  )

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent
}
