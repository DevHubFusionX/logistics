import { useState, useEffect } from 'react'
import { X, Save, MapPin, Package, User, Loader } from 'lucide-react'
import { bookingService } from '@/features/booking'
import toast from 'react-hot-toast'

function Label({ children }) {
  return <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">{children}</label>
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
    />
  )
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
    >
      {children}
    </select>
  )
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-sky-700" />
      </div>
      <h3 className="text-sm font-heading font-bold text-gray-900">{title}</h3>
    </div>
  )
}

export default function BookingModification({ booking, onSuccess, onClose }) {
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!booking) return
    const normLoc = (loc) => {
      if (!loc) return { address: '', city: '', state: 'Nigeria' }
      if (typeof loc === 'string') {
        const [address = '', city = 'Lagos', state = 'Nigeria'] = loc.split(',').map(p => p.trim())
        return { address, city, state }
      }
      return { address: loc.address || '', city: loc.city || 'Lagos', state: loc.state || 'Nigeria' }
    }
    const normPerson = (p) => ({ name: p?.name || '', phone: p?.phone || '', email: p?.email || '' })
    const fmtDate = (d) => {
      if (!d) return ''
      try { const dt = new Date(d); return isNaN(dt) ? '' : dt.toISOString().slice(0, 16) } catch { return '' }
    }
    setFormData({
      pickupLocation:       normLoc(booking.pickupLocation || booking.origin),
      dropoffLocation:      normLoc(booking.dropoffLocation || booking.destination),
      estimatedPickupDate:  fmtDate(booking.estimatedPickupDate || booking.estimated_pickup || booking.created_at),
      estimatedDeliveryDate:fmtDate(booking.estimatedDeliveryDate || booking.estimated_delivery),
      goodsType:            booking.goodsType || booking.package_type || '',
      cargoWeightKg:        booking.cargoWeightKg || booking.weight || '',
      quantity:             booking.quantity || 1,
      vehicleType:          booking.vehicleType || booking.service_type || 'Van',
      isFragile:            booking.isFragile || false,
      isPerishable:         booking.isPerishable || false,
      tempControlCelsius:   booking.tempControlCelsius || 20,
      notes:                booking.notes || booking.special_instructions || '',
      receiverPerson:       normPerson(booking.receiverPerson),
    })
  }, [booking])

  const set = (field, value) => setFormData(p => ({ ...p, [field]: value }))
  const setNested = (parent, field, value) => setFormData(p => ({ ...p, [parent]: { ...p[parent], [field]: value } }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await bookingService.updateBooking(booking._id || booking.id, {
        pickupLocation:       formData.pickupLocation,
        dropoffLocation:      formData.dropoffLocation,
        goodsType:            formData.goodsType,
        cargoWeightKg:        Number(formData.cargoWeightKg),
        quantity:             parseInt(formData.quantity) || 1,
        isFragile:            Boolean(formData.isFragile),
        isPerishable:         Boolean(formData.isPerishable),
        tempControlCelsius:   parseInt(formData.tempControlCelsius) || 20,
        vehicleType:          formData.vehicleType,
        estimatedPickupDate:  formData.estimatedPickupDate ? new Date(formData.estimatedPickupDate).toISOString() : null,
        estimatedDeliveryDate:formData.estimatedDeliveryDate ? new Date(formData.estimatedDeliveryDate).toISOString() : null,
        notes:                formData.notes,
        status:               booking.status || 'pending',
      })
      toast.success('Booking updated!')
      onSuccess?.()
    } catch (err) {
      toast.error(err.message || 'Failed to update booking')
    } finally {
      setLoading(false)
    }
  }

  if (!formData) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-3xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-heading font-bold text-gray-900">Edit booking</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">{booking.tracking_number || booking._id || booking.id}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">

            {/* Pickup */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionTitle icon={MapPin} title="Pickup details" />
              <div className="space-y-3">
                <div><Label>Address</Label><Input value={formData.pickupLocation.address} onChange={e => setNested('pickupLocation', 'address', e.target.value)} placeholder="Street address" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>City</Label>
                    <Select value={formData.pickupLocation.city} onChange={e => setNested('pickupLocation', 'city', e.target.value)}>
                      {['Lagos','Abuja','Port Harcourt','Kano'].map(c => <option key={c}>{c}</option>)}
                    </Select>
                  </div>
                  <div><Label>Pickup date</Label><Input type="datetime-local" value={formData.estimatedPickupDate} onChange={e => set('estimatedPickupDate', e.target.value)} /></div>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionTitle icon={MapPin} title="Delivery details" />
              <div className="space-y-3">
                <div><Label>Address</Label><Input value={formData.dropoffLocation.address} onChange={e => setNested('dropoffLocation', 'address', e.target.value)} placeholder="Street address" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>City</Label>
                    <Select value={formData.dropoffLocation.city} onChange={e => setNested('dropoffLocation', 'city', e.target.value)}>
                      {['Lagos','Abuja','Port Harcourt','Kano'].map(c => <option key={c}>{c}</option>)}
                    </Select>
                  </div>
                  <div><Label>Delivery date</Label><Input type="datetime-local" value={formData.estimatedDeliveryDate} onChange={e => set('estimatedDeliveryDate', e.target.value)} /></div>
                </div>
              </div>
            </div>

            {/* Cargo */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionTitle icon={Package} title="Cargo" />
              <div className="space-y-3">
                <div>
                  <Label>Type</Label>
                  <Select value={formData.goodsType} onChange={e => set('goodsType', e.target.value)}>
                    <option value="General Cargo">General Cargo</option>
                    <option value="Frozen Foods">Frozen Foods</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Weight (kg)</Label><Input type="number" value={formData.cargoWeightKg} onChange={e => set('cargoWeightKg', e.target.value)} /></div>
                  <div><Label>Quantity</Label><Input type="number" value={formData.quantity} onChange={e => set('quantity', e.target.value)} /></div>
                </div>
                <div className="flex gap-4 pt-1">
                  {[['isFragile','Fragile'],['isPerishable','Perishable']].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${formData[key] ? 'bg-sky-700 border-sky-700' : 'border-gray-300'}`}>
                        {formData[key] && <div className="w-2 h-2 rounded-sm bg-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={formData[key]} onChange={e => set(key, e.target.checked)} />
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Receiver + Notes */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionTitle icon={User} title="Receiver & notes" />
              <div className="space-y-3">
                <div><Label>Receiver name</Label><Input value={formData.receiverPerson.name} onChange={e => setNested('receiverPerson', 'name', e.target.value)} /></div>
                <div><Label>Receiver phone</Label><Input value={formData.receiverPerson.phone} onChange={e => setNested('receiverPerson', 'phone', e.target.value)} /></div>
                <div>
                  <Label>Notes</Label>
                  <textarea
                    value={formData.notes}
                    onChange={e => set('notes', e.target.value)}
                    rows={2}
                    placeholder="Special instructions…"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
