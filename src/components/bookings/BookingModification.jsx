import { useState, useEffect } from 'react'
import { X, Save, Loader } from 'lucide-react'
import { bookingService } from '@/services'
import { ShipmentDetailsForm } from '@/components/booking'
import toast from 'react-hot-toast'

export default function BookingModification({ booking, onSuccess, onClose }) {
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (booking) {
      const normalizeLocation = (loc) => {
        if (!loc) return { address: '', city: '', state: '' }
        if (typeof loc === 'string') {
          return { address: loc, city: '', state: '' }
        }
        if (Array.isArray(loc)) return { address: '', city: '', state: '' }
        return {
          address: loc.address || '',
          city: loc.city || '',
          state: loc.state || ''
        }
      }

      const normalizePerson = (person) => {
        if (!person) return { name: '', phone: '', email: '' }
        if (typeof person === 'string') return { name: person, phone: '', email: '' }
        if (Array.isArray(person)) return { name: '', phone: '', email: '' }
        return {
          name: person.name || '',
          phone: person.phone || '',
          email: person.email || ''
        }
      }

      const formatDateForInput = (date) => {
        if (!date) return ''
        return new Date(date).toISOString().slice(0, 16)
      }

      setFormData({
        fullNameOrBusiness: booking.fullNameOrBusiness || '',
        contactPhone: booking.contactPhone || '',
        email: booking.email || '',
        customerType: booking.customerType || 'Business',
        pickupPerson: normalizePerson(booking.pickupPerson),
        receiverPerson: normalizePerson(booking.receiverPerson),
        pickupLocation: normalizeLocation(booking.pickupLocation),
        dropoffLocation: normalizeLocation(booking.dropoffLocation),
        goodsType: booking.goodsType || '',
        cargoWeightKg: booking.cargoWeightKg || '',
        quantity: booking.quantity || 1,
        isFragile: booking.isFragile || false,
        isPerishable: booking.isPerishable || false,
        tempControlCelsius: booking.tempControlCelsius || 20,
        vehicleType: booking.vehicleType || '',
        estimatedPickupDate: formatDateForInput(booking.estimatedPickupDate),
        estimatedDeliveryDate: formatDateForInput(booking.estimatedDeliveryDate),
        notes: booking.notes || ''
      })
    }
  }, [booking])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleNestedChange = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: { ...formData[parent], [field]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formatLocation = (loc) => {
        return {
          address: loc.address || '',
          city: loc.city || '',
          state: loc.state || ''
        }
      }

      const payload = {
        pickupLocation: formatLocation(formData.pickupLocation),
        dropoffLocation: formatLocation(formData.dropoffLocation),
        goodsType: formData.goodsType,
        cargoWeightKg: Number(formData.cargoWeightKg),
        quantity: Number(formData.quantity),
        isFragile: Boolean(formData.isFragile),
        isPerishable: Boolean(formData.isPerishable),
        tempControlCelsius: Number(formData.tempControlCelsius),
        vehicleType: formData.vehicleType,
        estimatedPickupDate: new Date(formData.estimatedPickupDate).toISOString(),
        estimatedDeliveryDate: new Date(formData.estimatedDeliveryDate).toISOString(),
        status: 'pending',
        notes: formData.notes || ''
      }
      console.log('Sending PATCH request to:', `/bookings/${booking._id || booking.id}`)
      console.log('Payload:', JSON.stringify(payload, null, 2))
      const response = await bookingService.updateBooking(booking._id || booking.id, payload)
      console.log('Backend response:', response)
      toast.success('Booking updated successfully!')
      onSuccess?.()
    } catch (error) {
      toast.error(error.message || 'Failed to update booking')
    } finally {
      setLoading(false)
    }
  }

  if (!formData) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Modify Booking</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <ShipmentDetailsForm
            formData={formData}
            onChange={handleChange}
            onNestedChange={handleNestedChange}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="flex gap-3 p-4 border-t flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 text-sm"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
