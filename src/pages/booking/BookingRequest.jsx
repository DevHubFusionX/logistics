import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, MapPin, Calendar, Weight, Truck, Plane, Ship, ArrowRight, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BookingRequest() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
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

  const steps = [
    { title: 'Service', icon: Truck },
    { title: 'Locations', icon: MapPin },
    { title: 'Schedule', icon: Calendar },
    { title: 'Details', icon: Package },
    { title: 'Review', icon: Weight }
  ]

  const serviceTypes = [
    { id: 'ground', name: 'Ground Transport', icon: Truck, description: 'Cost-effective for domestic shipments' },
    { id: 'air', name: 'Air Freight', icon: Plane, description: 'Fast delivery worldwide' },
    { id: 'ocean', name: 'Ocean Freight', icon: Ship, description: 'Bulk shipments internationally' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/booking/quotation', { state: { bookingData: formData } })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.serviceType
      case 1: return formData.fromAddress && formData.toAddress
      case 2: return formData.pickupDate && formData.deliveryDate
      case 3: return formData.packageType && formData.weight && formData.dimensions.length && formData.dimensions.width && formData.dimensions.height && formData.value && formData.description
      case 4: return true
      default: return false
    }
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
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Progress Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      index <= currentStep 
                        ? 'bg-sky-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-medium ${
                      index <= currentStep ? 'text-sky-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10">
            <AnimatePresence mode="wait">
            {/* Step 0: Service Selection */}
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Service</h3>
                  <p className="text-gray-600">Select the transportation method that best fits your needs</p>
                </div>
                <div className="grid gap-4">
                  {serviceTypes.map((service) => {
                    const IconComponent = service.icon
                    return (
                      <motion.div
                        key={service.id}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.serviceType === service.id
                            ? 'border-sky-500 bg-sky-50'
                            : 'border-gray-200 hover:border-sky-300'
                        }`}
                        onClick={() => setFormData({...formData, serviceType: service.id})}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            formData.serviceType === service.id ? 'bg-sky-500' : 'bg-gray-100'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              formData.serviceType === service.id ? 'text-white' : 'text-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{service.name}</h4>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 1: Locations */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pickup & Delivery</h3>
                  <p className="text-gray-600">Where should we collect and deliver your shipment?</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      <MapPin className="w-5 h-5 inline mr-2 text-sky-500" />
                      Pickup Address
                    </label>
                    <textarea
                      value={formData.fromAddress}
                      onChange={(e) => setFormData({...formData, fromAddress: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      rows="3"
                      placeholder="Complete pickup address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      <MapPin className="w-5 h-5 inline mr-2 text-green-500" />
                      Delivery Address
                    </label>
                    <textarea
                      value={formData.toAddress}
                      onChange={(e) => setFormData({...formData, toAddress: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      rows="3"
                      placeholder="Complete delivery address"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Schedule */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule</h3>
                  <p className="text-gray-600">When do you need pickup and delivery?</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      <Calendar className="w-5 h-5 inline mr-2 text-sky-500" />
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      <Calendar className="w-5 h-5 inline mr-2 text-green-500" />
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Package Details */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Package Details</h3>
                  <p className="text-gray-600">Tell us about your shipment</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Package Type</label>
                    <select
                      value={formData.packageType}
                      onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="documents">Documents</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="machinery">Machinery</option>
                      <option value="fragile">Fragile Items</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="Total weight"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Dimensions (cm)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        value={formData.dimensions.length}
                        onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, length: e.target.value}})}
                        className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                        placeholder="Length"
                        required
                      />
                      <input
                        type="number"
                        value={formData.dimensions.width}
                        onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, width: e.target.value}})}
                        className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                        placeholder="Width"
                        required
                      />
                      <input
                        type="number"
                        value={formData.dimensions.height}
                        onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, height: e.target.value}})}
                        className="px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                        placeholder="Height"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Value (USD)</label>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData({...formData, value: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="Declared value"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Description</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                      placeholder="What are you shipping?"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h3>
                  <p className="text-gray-600">Check your details and add any special instructions</p>
                </div>
                <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between">
                    <span className="font-medium">Service:</span>
                    <span className="capitalize">{formData.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">From:</span>
                    <span className="text-right text-sm">{formData.fromAddress.substring(0, 30)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">To:</span>
                    <span className="text-right text-sm">{formData.toAddress.substring(0, 30)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Weight:</span>
                    <span>{formData.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Value:</span>
                    <span>${formData.value}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">Special Instructions (Optional)</label>
                  <textarea
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    rows="3"
                    placeholder="Any special requirements?"
                  />
                </div>
              </motion.div>
            )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              {currentStep > 0 && (
                <motion.button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                  whileTap={{ scale: 0.98 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </motion.button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                    isStepValid()
                      ? 'bg-sky-500 text-white hover:bg-sky-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  whileTap={{ scale: isStepValid() ? 0.98 : 1 }}
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-sky-500 text-white py-3 rounded-xl font-medium hover:bg-sky-600 transition-all"
                  whileTap={{ scale: 0.98 }}
                >
                  <Package className="w-5 h-5" />
                  Get Quote
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}