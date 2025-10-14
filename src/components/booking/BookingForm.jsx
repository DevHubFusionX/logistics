import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, User, MapPin, Package, CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react'
import TransportStep from './steps/TransportStep'
import CustomerStep from './steps/CustomerStep'
import PickupStep from './steps/PickupStep'
import DropoffStep from './steps/DropoffStep'
import CargoStep from './steps/CargoStep'
import ReviewStep from './steps/ReviewStep'
import ApiService from '../../services/api'

export default function BookingForm({ onSuccess }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [bookingData, setBookingData] = useState({
    transportMode: '',
    fullNameOrBusiness: '',
    contactPhone: '',
    email: '',
    customerType: 'Individual',
    pickupPerson: { name: '', phone: '' },
    receiverPerson: { name: '', phone: '' },
    pickupLocation: { address: '', city: '', state: '' },
    dropoffLocation: { address: '', city: '', state: '' },
    goodsType: '',
    cargoWeightKg: '',
    quantity: '',
    isFragile: false,
    isPerishable: false,
    tempControlCelsius: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const steps = [
    { title: 'Transport', icon: Truck, component: TransportStep },
    { title: 'Customer', icon: User, component: CustomerStep },
    { title: 'Pickup', icon: MapPin, component: PickupStep },
    { title: 'Drop-off', icon: MapPin, component: DropoffStep },
    { title: 'Cargo', icon: Package, component: CargoStep },
    { title: 'Review', icon: CheckCircle, component: ReviewStep }
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

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await ApiService.createBooking(bookingData)
      if (response.success) {
        onSuccess?.(response.data)
      }
    } catch (error) {
      setError(error.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return bookingData.transportMode
      case 1: return bookingData.fullNameOrBusiness && bookingData.contactPhone && bookingData.email
      case 2: return bookingData.pickupPerson.name && bookingData.pickupPerson.phone && bookingData.pickupLocation.address && bookingData.pickupLocation.city && bookingData.pickupLocation.state
      case 3: return bookingData.receiverPerson.name && bookingData.receiverPerson.phone && bookingData.dropoffLocation.address && bookingData.dropoffLocation.city && bookingData.dropoffLocation.state
      case 4: return bookingData.goodsType && bookingData.cargoWeightKg && bookingData.quantity
      case 5: return true
      default: return false
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
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

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent 
            data={bookingData} 
            onChange={(data) => setBookingData(prev => ({ ...prev, ...data }))}
            onSubmit={currentStep === 5 ? handleSubmit : undefined}
            loading={loading}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentStep < 5 && (
        <div className="flex gap-4 pt-6 mt-8 border-t border-gray-200">
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
        </div>
      )}
    </div>
  )
}