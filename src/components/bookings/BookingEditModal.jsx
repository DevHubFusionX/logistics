import { X } from 'lucide-react'
import { useState } from 'react'

export default function BookingEditModal({ booking, onClose, onSave }) {
  const [formData, setFormData] = useState({
    estimatedPickupDate: booking?.estimatedPickupDate || '',
    estimatedDeliveryDate: booking?.estimatedDeliveryDate || '',
    notes: booking?.notes || '',
    cargoWeightKg: booking?.cargoWeightKg || '',
    quantity: booking?.quantity || 1,
    isFragile: booking?.isFragile || false,
    isPerishable: booking?.isPerishable || false,
    tempControlCelsius: booking?.tempControlCelsius || 20
  })

  if (!booking) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const updateData = {
      estimatedPickupDate: formData.estimatedPickupDate,
      estimatedDeliveryDate: formData.estimatedDeliveryDate,
      cargoWeightKg: parseFloat(formData.cargoWeightKg),
      quantity: parseInt(formData.quantity),
      isFragile: formData.isFragile,
      isPerishable: formData.isPerishable,
      tempControlCelsius: parseFloat(formData.tempControlCelsius),
      notes: formData.notes
    }
    onSave(updateData)
  }
  

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit Booking</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <input
                type="datetime-local"
                value={formData.estimatedPickupDate}
                onChange={(e) => setFormData({ ...formData, estimatedPickupDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
              <input
                type="datetime-local"
                value={formData.estimatedDeliveryDate}
                onChange={(e) => setFormData({ ...formData, estimatedDeliveryDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.cargoWeightKg}
                onChange={(e) => setFormData({ ...formData, cargoWeightKg: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isFragile}
                onChange={(e) => setFormData({ ...formData, isFragile: e.target.checked })}
                className="rounded"
              />
              <label className="text-sm font-medium text-gray-700">Fragile</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isPerishable}
                onChange={(e) => setFormData({ ...formData, isPerishable: e.target.checked })}
                className="rounded"
              />
              <label className="text-sm font-medium text-gray-700">Perishable</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temp (°C)</label>
              <input
                type="number"
                value={formData.tempControlCelsius}
                onChange={(e) => setFormData({ ...formData, tempControlCelsius: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Additional instructions..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
