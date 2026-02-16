import { useState, useEffect } from 'react'
import { X, Save, MapPin, Package, User, Clock, CheckCircle, Truck, Info, AlertCircle, Loader } from 'lucide-react'
import { bookingService } from '@/services'
import toast from 'react-hot-toast'

export default function BookingModification({ booking, onSuccess, onClose }) {
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (booking) {
      const normalizeLocation = (loc) => {
        if (!loc) return { address: '', city: '', state: 'Nigeria' }
        if (typeof loc === 'string') {
          const parts = loc.split(',').map(p => p.trim())
          return {
            address: parts[0] || '',
            city: parts[1] || 'Lagos',
            state: parts[2] || 'Nigeria'
          }
        }
        return {
          address: loc.address || '',
          city: loc.city || 'Lagos',
          state: loc.state || 'Nigeria'
        }
      }

      const normalizePerson = (personOrBooking, suffix = '') => {
        if (!personOrBooking) return { name: '', phone: '', email: '' }
        return {
          name: personOrBooking[`${suffix}Name`] || personOrBooking.name || '',
          phone: personOrBooking[`${suffix}Phone`] || personOrBooking.phone || '',
          email: personOrBooking[`${suffix}Email`] || personOrBooking.email || '',
        }
      }

      const formatDateForInput = (date) => {
        if (!date) return ''
        try {
          const d = new Date(date)
          return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 16)
        } catch (e) { return '' }
      }

      setFormData({
        pickupLocation: normalizeLocation(booking.pickupLocation || booking.origin),
        dropoffLocation: normalizeLocation(booking.dropoffLocation || booking.destination),
        estimatedPickupDate: formatDateForInput(booking.estimated_pickup || booking.estimatedPickupDate || booking.created_at),
        estimatedDeliveryDate: formatDateForInput(booking.estimated_delivery || booking.estimatedDeliveryDate),
        goodsType: booking.package_type || booking.goodsType || '',
        cargoWeightKg: booking.weight || booking.cargoWeightKg || '',
        quantity: (booking.dimensions?.quantity || booking.quantity) || 1,
        vehicleType: booking.service_type || booking.vehicleType || 'Van',
        isFragile: booking.dimensions?.isFragile || booking.isFragile || false,
        isPerishable: booking.dimensions?.isPerishable || booking.isPerishable || false,
        tempControlCelsius: booking.temp_control_celsius || booking.tempControlCelsius || 20,
        notes: booking.special_instructions || booking.notes || '',
        pickupPerson: normalizePerson(booking.pickupPerson),
        receiverPerson: normalizePerson(booking.receiverPerson || booking, 'receiver'),
        fullNameOrBusiness: booking.fullNameOrBusiness || '',
        contactPhone: booking.contactPhone || '',
        email: booking.email || ''
      })
    }
  }, [booking])

  const handleSimpleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }))
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        pickupLocation: {
          address: formData.pickupLocation.address,
          city: formData.pickupLocation.city,
          state: formData.pickupLocation.state || 'Lagos'
        },
        dropoffLocation: {
          address: formData.dropoffLocation.address,
          city: formData.dropoffLocation.city,
          state: formData.dropoffLocation.state || 'Lagos'
        },
        goodsType: formData.goodsType,
        cargoWeightKg: Number(formData.cargoWeightKg),
        quantity: parseInt(formData.quantity, 10) || 1,
        isFragile: Boolean(formData.isFragile),
        isPerishable: Boolean(formData.isPerishable),
        tempControlCelsius: parseInt(formData.tempControlCelsius, 10) || 20,
        vehicleType: formData.vehicleType,
        estimatedPickupDate: formData.estimatedPickupDate ? new Date(formData.estimatedPickupDate).toISOString() : null,
        estimatedDeliveryDate: formData.estimatedDeliveryDate ? new Date(formData.estimatedDeliveryDate).toISOString() : null,
        status: booking.status || 'pending',
        notes: formData.notes
      }

      await bookingService.updateBooking(booking._id || booking.id, payload)
      toast.success('Booking updated successfully!')
      onSuccess?.()
    } catch (error) {
      toast.error(error.message || 'Failed to update booking')
    } finally {
      setLoading(false)
    }
  }

  if (!formData) return null

  const InputLabel = ({ label }) => <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">{label}</label>
  const InputField = (props) => (
    <input
      {...props}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none"
    />
  )
  const SelectField = (props) => (
    <div className="relative">
      <select
        {...props}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none appearance-none"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Clock className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  )

  const SectionHeader = ({ icon: Icon, title, colorClass }) => (
    <div className="flex items-center gap-2 mb-4">
      <div className={`p-1.5 rounded-lg ${colorClass}`}>
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{title}</h3>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Modify Booking</h2>
            <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded uppercase tracking-widest">
              {booking.tracking_number || booking.bookingId || booking.id || booking._id}
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
            <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/30 custom-scrollbar">

          {/* Progress / Status Summary */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Status</p>
                <p className="text-sm font-bold text-gray-900 uppercase">{booking.status?.replace('_', ' ')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Calculated Price</p>
              <p className="text-lg font-black text-blue-600">₦{(booking.shipping_fee || booking.calculatedPrice || 0).toLocaleString()}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Pickup Section */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <SectionHeader icon={MapPin} title="Pickup Details" colorClass="bg-emerald-50 text-emerald-600" />
                <div className="space-y-4">
                  <div>
                    <InputLabel label="Address" />
                    <InputField
                      value={formData.pickupLocation.address}
                      onChange={(e) => handleNestedChange('pickupLocation', 'address', e.target.value)}
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <InputLabel label="City" />
                      <select
                        value={formData.pickupLocation.city}
                        onChange={(e) => handleNestedChange('pickupLocation', 'city', e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="Kano">Kano</option>
                      </select>
                    </div>
                    <div>
                      <InputLabel label="Pickup Date" />
                      <input
                        type="datetime-local"
                        value={formData.estimatedPickupDate}
                        onChange={(e) => handleSimpleChange('estimatedPickupDate', e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <SectionHeader icon={MapPin} title="Delivery Details" colorClass="bg-orange-50 text-orange-600" />
                <div className="space-y-4">
                  <div>
                    <InputLabel label="Address" />
                    <InputField
                      value={formData.dropoffLocation.address}
                      onChange={(e) => handleNestedChange('dropoffLocation', 'address', e.target.value)}
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <InputLabel label="City" />
                      <select
                        value={formData.dropoffLocation.city}
                        onChange={(e) => handleNestedChange('dropoffLocation', 'city', e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="Kano">Kano</option>
                      </select>
                    </div>
                    <div>
                      <InputLabel label="Delivery Date" />
                      <input
                        type="datetime-local"
                        value={formData.estimatedDeliveryDate}
                        onChange={(e) => handleSimpleChange('estimatedDeliveryDate', e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cargo Information */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 md:col-span-1">
                <SectionHeader icon={Package} title="Cargo Info" colorClass="bg-purple-50 text-purple-600" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <InputLabel label="Package Type" />
                    <select
                      value={formData.goodsType}
                      onChange={(e) => handleSimpleChange('goodsType', e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none"
                    >
                      <option value="General Cargo">General Cargo</option>
                      <option value="Frozen Foods">Frozen Foods</option>
                      <option value="Pharmaceuticals">Pharmaceuticals</option>
                    </select>
                  </div>
                  <div>
                    <InputLabel label="Weight (KG)" />
                    <InputField type="number" value={formData.cargoWeightKg} onChange={(e) => handleSimpleChange('cargoWeightKg', e.target.value)} />
                  </div>
                  <div>
                    <InputLabel label="Quantity" />
                    <InputField type="number" value={formData.quantity} onChange={(e) => handleSimpleChange('quantity', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Contacts Summary */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 md:col-span-1">
                <SectionHeader icon={User} title="Contacts" colorClass="bg-blue-50 text-blue-600" />
                <div className="space-y-4">
                  <div>
                    <InputLabel label="Receiver Name" />
                    <InputField value={formData.receiverPerson.name} onChange={(e) => handleNestedChange('receiverPerson', 'name', e.target.value)} />
                  </div>
                  <div>
                    <InputLabel label="Receiver Phone" />
                    <InputField value={formData.receiverPerson.phone} onChange={(e) => handleNestedChange('receiverPerson', 'phone', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Features & Notes */}
              <div className="col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <InputLabel label="Special Handling" />
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${formData.isFragile ? 'bg-primary border-primary' : 'border-gray-200 group-hover:border-primary'}`}>
                        {formData.isFragile && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={formData.isFragile} onChange={(e) => handleSimpleChange('isFragile', e.target.checked)} />
                      <span className="text-sm font-semibold text-gray-700">Fragile</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${formData.isPerishable ? 'bg-primary border-primary' : 'border-gray-200 group-hover:border-primary'}`}>
                        {formData.isPerishable && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={formData.isPerishable} onChange={(e) => handleSimpleChange('isPerishable', e.target.checked)} />
                      <span className="text-sm font-semibold text-gray-700">Perishable</span>
                    </label>
                  </div>
                </div>
                <div>
                  <InputLabel label="Special Instructions" />
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => handleSimpleChange('notes', e.target.value)}
                    rows="2"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none resize-none"
                    placeholder="E.g. Call before arrival..."
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t bg-white flex items-center justify-between sticky bottom-0 z-20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
