import { useState } from 'react'
import { X, Package, MapPin, Truck, DollarSign, FileText } from 'lucide-react'
import { ClientOrderInfo, CargoDetails, LocationDetails, AssignmentSection, PricingSection, OrderFormInput } from './order-form'

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-sky-700" />
      </div>
      <h3 className="text-sm font-heading font-bold text-gray-900">{title}</h3>
    </div>
  )
}

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-3xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-heading font-bold text-gray-900">Create new order</h2>
            <p className="text-xs text-gray-400 mt-0.5">Fill in the shipment details below</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-6">

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionHeader icon={Package} title="Client & order info" />
              <ClientOrderInfo formData={formData} setFormData={setFormData} />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionHeader icon={Package} title="Cargo details" />
              <CargoDetails formData={formData} setFormData={setFormData} />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionHeader icon={MapPin} title="Pickup location" />
              <LocationDetails title="" formData={formData} setFormData={setFormData} prefix="origin" />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionHeader icon={MapPin} title="Delivery location" />
              <LocationDetails title="" formData={formData} setFormData={setFormData} prefix="destination" />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionHeader icon={Truck} title="Assignment" />
              <AssignmentSection formData={formData} setFormData={setFormData} />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionHeader icon={DollarSign} title="Pricing" />
              <PricingSection formData={formData} setFormData={setFormData} />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <SectionHeader icon={FileText} title="Additional notes" />
              <OrderFormInput
                label="Special instructions"
                type="textarea"
                rows={3}
                value={formData.specialInstructions}
                onChange={e => setFormData({ ...formData, specialInstructions: e.target.value })}
                placeholder="Any special handling requirements or delivery instructions…"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 flex gap-3 px-5 pb-5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Create order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
