import { useState } from 'react'
import { X } from 'lucide-react'
import { ClientOrderInfo, CargoDetails, LocationDetails, AssignmentSection, PricingSection, OrderFormInput } from './order-form'

export default function CreateOrderModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    clientId: '', orderType: '', cargoType: '', cargoDescription: '', weight: '', volume: '',
    quantity: '', temperatureRequired: '', originAddress: '', originCity: '', originState: '',
    destinationAddress: '', destinationCity: '', destinationState: '', pickupDate: '', pickupTime: '',
    deliveryDate: '', deliveryTime: '', truckId: '', driverId: '', basePrice: '', additionalCharges: '',
    discount: '', paymentMethod: '', paymentTerms: '', specialInstructions: '', priority: 'medium'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create New Order</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <ClientOrderInfo formData={formData} setFormData={setFormData} />
          <CargoDetails formData={formData} setFormData={setFormData} />
          <LocationDetails title="Pickup Location" formData={formData} setFormData={setFormData} prefix="origin" />
          <LocationDetails title="Delivery Location" formData={formData} setFormData={setFormData} prefix="destination" />
          <AssignmentSection formData={formData} setFormData={setFormData} />
          <PricingSection formData={formData} setFormData={setFormData} />
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Additional Information</h3>
            <OrderFormInput
              label="Special Instructions"
              type="textarea"
              rows={3}
              value={formData.specialInstructions}
              onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
              placeholder="Any special handling requirements or delivery instructions..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
