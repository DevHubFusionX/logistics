import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, MapPin, Calendar, Weight, Truck, Plane, Ship, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BookingRequest() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    serviceType: '',
    fromAddress: '',
    toAddress: '',
    pickupDate: '',
    deliveryDate: '',
    packageType: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    value: '',
    description: '',
    specialInstructions: ''
  })

  const serviceTypes = [
    { id: 'ground', name: 'Ground Transport', icon: Truck, description: 'Cost-effective for domestic shipments' },
    { id: 'air', name: 'Air Freight', icon: Plane, description: 'Fast delivery worldwide' },
    { id: 'ocean', name: 'Ocean Freight', icon: Ship, description: 'Bulk shipments internationally' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate to quotation page with form data
    navigate('/booking/quotation', { state: { bookingData: formData } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create New Shipment</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Streamline your logistics operations with our comprehensive booking system. 
            Complete the form below to receive an instant, competitive quote.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Service Type Selection */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Service Selection</h3>
              </div>
              <p className="text-gray-600 mb-6">Choose the most suitable transportation method for your shipment requirements.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {serviceTypes.map((service) => {
                  const IconComponent = service.icon
                  return (
                    <motion.div
                      key={service.id}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                        formData.serviceType === service.id
                          ? 'border-sky-500 bg-gradient-to-br from-sky-50 to-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-sky-300 hover:shadow-md bg-white'
                      }`}
                      onClick={() => setFormData({...formData, serviceType: service.id})}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        formData.serviceType === service.id 
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg' 
                          : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          formData.serviceType === service.id ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{service.name}</h4>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Pickup & Delivery */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Pickup & Delivery Locations</h3>
              </div>
              <p className="text-gray-600 mb-6">Specify the complete addresses for both pickup and delivery locations to ensure accurate routing.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    <MapPin className="w-5 h-5 inline mr-2 text-sky-500" />
                    Origin Address
                  </label>
                  <textarea
                    value={formData.fromAddress}
                    onChange={(e) => setFormData({...formData, fromAddress: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                    rows="4"
                    placeholder="Enter complete pickup address including street, city, state, and postal code"
                    required
                  />
                </div>
              
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    <MapPin className="w-5 h-5 inline mr-2 text-green-500" />
                    Destination Address
                  </label>
                  <textarea
                    value={formData.toAddress}
                    onChange={(e) => setFormData({...formData, toAddress: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                    rows="4"
                    placeholder="Enter complete delivery address including street, city, state, and postal code"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Schedule & Timeline</h3>
              </div>
              <p className="text-gray-600 mb-6">Set your preferred pickup date and required delivery timeline for optimal logistics planning.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    <Calendar className="w-5 h-5 inline mr-2 text-sky-500" />
                    Preferred Pickup Date
                  </label>
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900"
                    required
                  />
                </div>
              
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    <Calendar className="w-5 h-5 inline mr-2 text-green-500" />
                    Required Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Shipment Details</h3>
              </div>
              <p className="text-gray-600 mb-6">Provide comprehensive information about your shipment to ensure proper handling and accurate pricing.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">Shipment Category</label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900"
                    required
                  >
                    <option value="">Select package type</option>
                    <option value="documents">Documents</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="machinery">Machinery</option>
                    <option value="fragile">Fragile Items</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    <Weight className="w-5 h-5 inline mr-2 text-sky-500" />
                    Total Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Enter total weight in kilograms"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-lg font-bold text-gray-900 mb-3">Package Dimensions (cm)</label>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    value={formData.dimensions.length}
                    onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, length: e.target.value}})}
                    className="px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Length"
                    required
                  />
                  <input
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, width: e.target.value}})}
                    className="px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Width"
                    required
                  />
                  <input
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, height: e.target.value}})}
                    className="px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Height"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">Declared Value (USD)</label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Enter shipment value for insurance"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">Content Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Detailed description of shipment contents"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Additional Requirements</h3>
              </div>
              <p className="text-gray-600 mb-6">Specify any special handling instructions, delivery preferences, or additional services required.</p>
              
              <label className="block text-lg font-bold text-gray-900 mb-3">Special Instructions (Optional)</label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-gray-900 placeholder-gray-500"
                rows="4"
                placeholder="Include any special handling requirements, delivery time preferences, contact instructions, or other relevant details for your shipment"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-6 rounded-2xl font-bold text-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-2xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Package className="w-6 h-6" />
                Generate Instant Quote
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              <p className="text-center text-gray-600 mt-4">
                You'll receive a detailed quote with pricing and delivery options on the next page.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}