import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, MapPin, Calendar, ArrowRight, User, Phone, Mail, Truck, Tag } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { useToast } from '../../components/ui/advanced'
import { getClientOverrides } from '../../utils/pricingEngine'

export default function BookingRequest() {
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  const [hasSpecialPricing, setHasSpecialPricing] = useState(false)
  const [clientInfo, setClientInfo] = useState(null)
  const [formData, setFormData] = useState({
    serviceType: 'standard',
    cargoType: '',
    temperature: 'ambient',
    packaging: 'pallets',
    weight: '',
    volume: '',
    pickupAddress: '',
    pickupCity: '',
    pickupState: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    pickupDate: '',
    deliveryDate: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialInstructions: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const bookingId = 'BK-' + Date.now()
    
    // Check if customer email matches a client with custom pricing
    const clientId = formData.customerEmail.toLowerCase().includes('adebayo') ? 'adebayo-industries' :
                     formData.customerEmail.toLowerCase().includes('kano') ? 'kano-distribution' : null
    
    showToast.success('Booking request created', 'Generating quote...')
    setTimeout(() => {
      navigate('/booking/quotation', { state: { bookingData: formData, bookingId, clientId } })
    }, 500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    
    // Check for special pricing when email changes
    if (e.target.name === 'customerEmail') {
      checkSpecialPricing(e.target.value)
    }
  }
  
  const checkSpecialPricing = (email) => {
    const clients = getClientOverrides()
    const matchedClient = clients.find(c => 
      email.toLowerCase().includes(c.id.split('-')[0])
    )
    
    if (matchedClient) {
      setHasSpecialPricing(true)
      setClientInfo(matchedClient)
      showToast.success('Special pricing available!', `${matchedClient.name} - ${(matchedClient.discount * 100).toFixed(0)}% discount`)
    } else {
      setHasSpecialPricing(false)
      setClientInfo(null)
    }
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Request a Shipment"
        subtitle="Fill in the details to get an instant quote"
      />

      {hasSpecialPricing && clientInfo && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Tag className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-1">Special Client Pricing Active</h3>
              <p className="text-sm text-green-700">
                {clientInfo.name} - Custom rate: ${clientInfo.baseRatePerKg}/kg • Discount: {(clientInfo.discount * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-green-600 mt-1">Your quote will reflect these special rates</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Shipment Details</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                <option value="standard">Standard Delivery</option>
                <option value="express">Express Delivery</option>
                <option value="overnight">Overnight</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Type</label>
              <select name="cargoType" value={formData.cargoType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select...</option>
                <option value="perishable">Perishable Goods</option>
                <option value="frozen">Frozen Foods</option>
                <option value="pharmaceutical">Pharmaceutical</option>
                <option value="general">General Cargo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required Temperature</label>
              <select name="temperature" value={formData.temperature} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="ambient">Ambient</option>
                <option value="chilled">Chilled (2-8°C)</option>
                <option value="frozen">Frozen (-18°C)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Packaging</label>
              <select name="packaging" value={formData.packaging} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="pallets">Pallets</option>
                <option value="boxes">Boxes</option>
                <option value="crates">Crates</option>
                <option value="bulk">Bulk</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Volume (m³)</label>
              <input type="number" step="0.1" name="volume" value={formData.volume} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pickup Location</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Street address" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" name="pickupCity" value={formData.pickupCity} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" name="pickupState" value={formData.pickupState} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Truck className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Location</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Street address" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" name="deliveryCity" value={formData.deliveryCity} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" name="deliveryState" value={formData.deliveryState} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
              <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
              <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Any special handling requirements..."></textarea>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Cancel
          </button>
          <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
            Get Quote <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  )
}
