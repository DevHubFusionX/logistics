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

      console.log('=== BOOKING PAYLOAD DEBUG START ===')
      console.log('Original formData.contactPhone:', formData.contactPhone)
      console.log('Original formData.pickupPerson.phone:', formData.pickupPerson?.phone)
      console.log('Original formData.receiverPerson.phone:', formData.receiverPerson?.phone)

      // Helper to normalize phone numbers to international format (assuming NG +234)
      const normalizePhone = (phone) => {
        if (!phone) {
          console.log('Phone is empty/null:', phone)
          return phone
        }
        const p = phone.replace(/\s+/g, '')
        console.log('Phone after removing spaces:', p)
        
        let normalized
        if (p.startsWith('+')) {
          normalized = p
          console.log('Phone already has +, keeping as is:', normalized)
        } else if (p.startsWith('0')) {
          normalized = '+234' + p.slice(1)
          console.log('Phone starts with 0, normalized to:', normalized)
        } else if (p.startsWith('234')) {
          normalized = '+' + p
          console.log('Phone starts with 234, normalized to:', normalized)
        } else {
          normalized = '+234' + p
          console.log('Phone has no prefix, normalized to:', normalized)
        }
        return normalized
      }

      // Normalize and log phone numbers
      const normalizedContactPhone = normalizePhone(formData.contactPhone)
      const normalizedPickupPhone = normalizePhone(formData.pickupPerson?.phone)
      const normalizedReceiverPhone = normalizePhone(formData.receiverPerson?.phone)

      console.log('Final normalized contactPhone:', normalizedContactPhone)
      console.log('Final normalized pickupPhone:', normalizedPickupPhone)
      console.log('Final normalized receiverPhone:', normalizedReceiverPhone)

      // Validate dates
      console.log('Original estimatedPickupDate:', formData.estimatedPickupDate)
      console.log('Original estimatedDeliveryDate:', formData.estimatedDeliveryDate)
      
      const pickupDate = new Date(formData.estimatedPickupDate || Date.now())
      const deliveryDate = new Date(formData.estimatedDeliveryDate || Date.now() + 86400000)

      console.log('Parsed pickupDate:', pickupDate.toISOString())
      console.log('Parsed deliveryDate:', deliveryDate.toISOString())

      if (deliveryDate <= pickupDate) {
        console.error('Date validation failed: delivery <= pickup')
        throw new Error('Delivery date must be after pickup date')
      }

      console.log('goodsType:', formData.goodsType)
      console.log('vehicleType:', formData.vehicleType)
      console.log('customerType:', formData.customerType)
      console.log('cargoWeightKg:', formData.cargoWeightKg, '-> Number:', Number(formData.cargoWeightKg))
      console.log('truckSize:', formData.truckSize)

      // Ensure proper type conversion and schema matching
      const payload = {
        ...formData,
        // Normalize phone numbers
        contactPhone: normalizedContactPhone,
        pickupPerson: {
          ...formData.pickupPerson,
          phone: normalizedPickupPhone
        },
        receiverPerson: {
          ...formData.receiverPerson,
          phone: normalizedReceiverPhone
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
        estimatedPickupDate: pickupDate.toISOString(),
        estimatedDeliveryDate: deliveryDate.toISOString(),
        
        // Ensure strings are not null/undefined
        vehicleType: formData.vehicleType || 'Van', // Fallback
        goodsType: formData.goodsType || 'General Cargo',
        notes: formData.notes || 'None' // Ensure non-empty string if required
      }

      // Format locations based on API documentation cURL example:
      // pickupLocation is a STRING
      // dropoffLocation is an object with { address, city } only (NO state)
      
      console.log('Formatting pickupLocation as string...')
      const pickupLocationString = `${payload.pickupLocation.address}, ${payload.pickupLocation.city}`
      console.log('pickupLocation (string):', pickupLocationString)
      
      console.log('Formatting dropoffLocation as object (address + city only)...')
      const dropoffLocationObject = {
        address: payload.dropoffLocation.address,
        city: payload.dropoffLocation.city
        // NO state field per API example
      }
      console.log('dropoffLocation (object):', dropoffLocationObject)

      payload.pickupLocation = pickupLocationString
      payload.dropoffLocation = dropoffLocationObject

      console.log('=== FINAL PAYLOAD ===')
      console.log(JSON.stringify(payload, null, 2))
      console.log('=== BOOKING PAYLOAD DEBUG END ===')

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
