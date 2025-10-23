import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, User, MapPin, Package, CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react'
import TransportStep from './steps/TransportStep'
import CustomerStep from './steps/CustomerStep'
import PickupStep from './steps/PickupStep'
import DropoffStep from './steps/DropoffStep'
import CargoStep from './steps/CargoStep'
import ReviewStep from './steps/ReviewStep'
import bookingService from '../../services/bookingService'

export default function BookingForm({ onSuccess }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [bookingData, setBookingData] = useState({
    vehicleType: '',
    fullNameOrBusiness: '',
    contactPhone: '',
    email: '',
    customerType: 'Individual',
    pickupPerson: { name: '', phone: '', email: '' },
    receiverPerson: { name: '', phone: '', email: '' },
    pickupLocation: { address: '', city: '', state: '' },
    dropoffLocation: { address: '', city: '', state: '' },
    goodsType: '',
    cargoWeightKg: 0,
    quantity: 0,
    isFragile: false,
    isPerishable: false,
    tempControlCelsius: 20,
    estimatedPickupDate: '',
    estimatedDeliveryDate: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

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
    setSuccess('')
    setFieldErrors({})

    try {
      const submitData = {
        ...bookingData,
        estimatedPickupDate: new Date(bookingData.estimatedPickupDate).toISOString(),
        estimatedDeliveryDate: new Date(bookingData.estimatedDeliveryDate).toISOString()
      }
      
      console.log('Submitting booking data:', submitData)
      
      const response = await bookingService.createBooking(submitData)
      if (response.data) {
        setSuccess('Booking created successfully! Redirecting...')
        setTimeout(() => {
          onSuccess?.(response.data)
        }, 1500)
      }
    } catch (error) {
      if (error.message.includes('validation')) {
        setError('Please check all required fields and try again.')
      } else if (error.message.includes('email')) {
        setFieldErrors({ email: 'Invalid email format' })
        setError('Please check email addresses and try again.')
      } else {
        setError(error.message || 'Booking failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return bookingData.vehicleType
      case 1: return bookingData.fullNameOrBusiness && bookingData.contactPhone && bookingData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)
      case 2: return bookingData.pickupPerson.name && bookingData.pickupPerson.phone && bookingData.pickupPerson.email && bookingData.pickupLocation.address && bookingData.pickupLocation.city && bookingData.pickupLocation.state
      case 3: return bookingData.receiverPerson.name && bookingData.receiverPerson.phone && bookingData.receiverPerson.email && bookingData.dropoffLocation.address && bookingData.dropoffLocation.city && bookingData.dropoffLocation.state
      case 4: return bookingData.goodsType && bookingData.cargoWeightKg > 0 && bookingData.quantity > 0 && bookingData.estimatedPickupDate && bookingData.estimatedDeliveryDate
      case 5: return true
      default: return false
    }
  }

  const getStepProgress = () => {
    const totalFields = {
      0: 1, // vehicleType
      1: 3, // name, phone, email
      2: 6, // pickup person (3) + location (3)
      3: 6, // receiver person (3) + location (3)
      4: 5, // goodsType, weight, quantity, pickup date, delivery date
      5: 0
    }
    
    const completedFields = {
      0: bookingData.vehicleType ? 1 : 0,
      1: [bookingData.fullNameOrBusiness, bookingData.contactPhone, bookingData.email].filter(Boolean).length,
      2: [bookingData.pickupPerson.name, bookingData.pickupPerson.phone, bookingData.pickupPerson.email, bookingData.pickupLocation.address, bookingData.pickupLocation.city, bookingData.pickupLocation.state].filter(Boolean).length,
      3: [bookingData.receiverPerson.name, bookingData.receiverPerson.phone, bookingData.receiverPerson.email, bookingData.dropoffLocation.address, bookingData.dropoffLocation.city, bookingData.dropoffLocation.state].filter(Boolean).length,
      4: [bookingData.goodsType, bookingData.cargoWeightKg > 0, bookingData.quantity > 0, bookingData.estimatedPickupDate, bookingData.estimatedDeliveryDate].filter(Boolean).length,
      5: 0
    }
    
    return totalFields[currentStep] > 0 ? (completedFields[currentStep] / totalFields[currentStep]) * 100 : 100
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-3 md:mb-4 gap-1">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="flex flex-col items-center flex-1 min-w-0">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1 md:mb-2 transition-all ${
                  index <= currentStep 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className={`text-[10px] md:text-xs font-medium text-center truncate w-full ${
                  index <= currentStep ? 'text-sky-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
          <div 
            className="bg-sky-500 h-1.5 md:h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + getStepProgress() / 100) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Step Progress Indicator */}
        <div className="mt-2 text-center">
          <span className="text-xs md:text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length} • {Math.round(getStepProgress())}% complete
          </span>
        </div>
      </div>

      {error && (
        <motion.div 
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div 
          className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
          {success}
        </motion.div>
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
        <div className="flex gap-3 md:gap-4 pt-4 md:pt-6 mt-6 md:mt-8 border-t border-gray-200">
          {currentStep > 0 && (
            <motion.button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:bg-gray-50 transition-all"
              whileTap={{ scale: 0.98 }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
          )}
          
          <motion.button
            type="button"
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-medium transition-all ${
              isStepValid()
                ? 'bg-sky-500 text-white hover:bg-sky-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={{ scale: isStepValid() ? 1.02 : 1 }}
            whileTap={{ scale: isStepValid() ? 0.98 : 1 }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Processing...</span>
              </div>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  )
}