import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRetry } from '../hooks/useRetry'
import bookingService from '../services/bookingService'
import paymentService from '../services/paymentService'
import { extractBookingId, isValidBookingResponse } from '../utils/bookingValidation'
import { getUserFriendlyMessage, isRetryableError } from '../utils/errorCodes'
import toast from 'react-hot-toast'

export const useBookingFlow = () => {
  const auth = useAuth()
  const user = auth?.user || null
  const retry = useRetry({
    maxRetries: 3,
    onRetry: (attempt, delay) => {
      toast.loading(`Retrying... Attempt ${attempt}`, { id: 'retry-toast' })
    }
  })
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [bookingId, setBookingId] = useState(null)
  const [estimatedCost, setEstimatedCost] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  
  const initialFormData = {
    fullNameOrBusiness: user?.companyName || '',
    contactPhone: user?.phoneNumber || '',
    email: user?.email || '',
    customerType: 'Business',
    pickupPerson: { name: '', phone: '', email: '' },
    receiverPerson: { name: '', phone: '', email: '' },
    pickupLocation: { address: '', city: 'Lagos', state: 'Nigeria' },
    dropoffLocation: { address: '', city: '', state: 'Nigeria' },
    goodsType: '',
    cargoWeightKg: '',
    truckSize: '',
    quantity: 1,
    isFragile: false,
    isPerishable: false,
    tempControlCelsius: 20,
    vehicleType: 'Van',
    estimatedPickupDate: '',
    estimatedDeliveryDate: '',
    notes: ''
  }
  
  const [formData, setFormData] = useState(initialFormData)

  const handleLocationNext = () => {
    setStep(2)
  }

  const handlePackageNext = async () => {
    setLoading(true)
    try {
      const distance = 5
      const cityInput = formData.dropoffLocation.city || ''
      const city = encodeURIComponent(cityInput.trim())
      
      const response = await bookingService.getPrices(city, distance)
      
      if (response.error) {
        throw new Error(response.message || 'Failed to calculate price')
      }

      setEstimatedCost(response.data.price)
      setStep(3)
    } catch (err) {
      toast.error(err.message || 'Failed to calculate price')
    } finally {
      setLoading(false)
    }
  }

  const handlePriceNext = () => {
    setStep(4)
  }

  const handleConfirmBooking = async () => {
    setLoading(true)
    setError(null)
    toast.dismiss('retry-toast')
    
    try {
      // Validate required numeric fields
      if (!formData.cargoWeightKg || isNaN(Number(formData.cargoWeightKg))) {
        throw new Error('Valid cargo weight is required')
      }
      if (!formData.quantity || isNaN(Number(formData.quantity))) {
        throw new Error('Valid quantity is required')
      }

      // Helper to normalize phone numbers to international format (assuming NG +234)
      const normalizePhone = (phone) => {
        if (!phone) return phone
        const p = phone.replace(/\s+/g, '')
        if (p.startsWith('0')) return '+234' + p.slice(1)
        if (!p.startsWith('+')) return '+234' + p // Assume local if no prefix
        return p
      }

      // Ensure proper type conversion and schema matching
      const payload = {
        ...formData,
        // Normalize phone numbers
        contactPhone: normalizePhone(formData.contactPhone),
        pickupPerson: {
          ...formData.pickupPerson,
          phone: normalizePhone(formData.pickupPerson?.phone)
        },
        receiverPerson: {
          ...formData.receiverPerson,
          phone: normalizePhone(formData.receiverPerson?.phone)
        },

        // Numeric conversions with fallbacks
        cargoWeightKg: Number(formData.cargoWeightKg),
        quantity: Math.round(Number(formData.quantity)),
        tempControlCelsius: formData.tempControlCelsius ? Math.round(Number(formData.tempControlCelsius)) : 0,
        
        // Added truckSize as it appeared in the API docs example
        truckSize: formData.truckSize || 5, 

        // Removed price and distance as they are STRICTLY not in the doc
        // price: Number(estimatedCost), 
        // distance: 5,

        // Ensure dates are valid ISO strings
        estimatedPickupDate: formData.estimatedPickupDate ? new Date(formData.estimatedPickupDate).toISOString() : new Date().toISOString(),
        estimatedDeliveryDate: formData.estimatedDeliveryDate ? new Date(formData.estimatedDeliveryDate).toISOString() : new Date(Date.now() + 86400000).toISOString(),
        
        // Ensure strings are not null/undefined
        vehicleType: formData.vehicleType || 'Van', // Fallback
        goodsType: formData.goodsType || 'General Cargo',
        notes: formData.notes || 'None' // Ensure non-empty string if required
      }

      // Format locations: pickupLocation as string, dropoffLocation as object without state
      const formatPickupLocation = (loc) => {
        const parts = [loc.address, loc.city, loc.state].filter(Boolean)
        return parts.join(', ')
      }

      const formatDropoffLocation = (loc) => {
        return { address: loc.address, city: loc.city }
      }

      payload.pickupLocation = formatPickupLocation(payload.pickupLocation)
      payload.dropoffLocation = formatDropoffLocation(payload.dropoffLocation)

      console.log('Sending Booking Payload:', JSON.stringify(payload, null, 2))

      const response = await retry.executeWithRetry(() => 
        bookingService.createBooking(payload)
      )
      
      // Validate booking response
      if (!isValidBookingResponse(response)) {
        throw new Error('Invalid booking response from server')
      }
      
      const id = extractBookingId(response)
      setBookingId(id)
      
      toast.success('Booking created successfully!')
      setStep(5)
    } catch (err) {
      const friendlyMessage = getUserFriendlyMessage(err)
      
      if (isRetryableError(err)) {
        setError(err)
        toast.error(friendlyMessage + ' Please try again.')
      } else {
        toast.error(friendlyMessage)
      }
      
      console.error('Booking creation error:', err)
    } finally {
      setLoading(false)
      toast.dismiss('retry-toast')
    }
  }

  const handleRetryBooking = () => {
    setError(null)
    handleConfirmBooking()
  }

  const handleResetBooking = () => {
    setError(null)
    setStep(1)
  }

  const handlePaymentSuccess = async (reference) => {
    setLoading(true)
    setError(null)
    
    try {
      await retry.executeWithRetry(() =>
        paymentService.verifyPayment(bookingId)
      )
      toast.success('Payment verified successfully!')
      setStep(6)
    } catch (err) {
      const friendlyMessage = getUserFriendlyMessage(err)
      toast.error(friendlyMessage)
      console.error('Payment verification error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentClose = () => {
    toast.error('Payment cancelled')
  }

  const handlePayLater = () => {
    toast.success('Booking confirmed! Pay on delivery')
    setStep(6)
  }

  const handleSimpleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }))
  }

  return {
    step,
    setStep,
    loading,
    error,
    bookingId,
    estimatedCost,
    paymentMethod,
    setPaymentMethod,
    formData,
    handleLocationNext,
    handlePackageNext,
    handlePriceNext,
    handleConfirmBooking,
    handleRetryBooking,
    handleResetBooking,
    handlePaymentSuccess,
    handlePaymentClose,
    handlePayLater,
    handleSimpleChange,
    handleNestedChange
  }
}
