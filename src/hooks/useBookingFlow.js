import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useBookingStore } from '../stores/bookingStore'
import {
  useCreateBookingMutation,
  usePayBookingMutation
} from './queries/useBookingQueries'
import { useVerifyPaymentMutation } from './queries/usePaymentQueries'
import bookingService from '../services/bookingService'
import { extractBookingId, isValidBookingResponse } from '../utils/bookingValidation'
import { getUserFriendlyMessage, isRetryableError } from '../utils/errorCodes'
import toast from 'react-hot-toast'

export const useBookingFlow = () => {
  const auth = useAuth()
  const user = auth?.user || null

  // Zustand Store
  const {
    step, setStep,
    formData, updateFormData, updateNestedFormData,
    bookingId, setBookingId,
    estimatedCost, setEstimatedCost,
    paymentMethod, setPaymentMethod,
    resetBooking, syncUserToForm
  } = useBookingStore()

  // TanStack Query Mutations
  const createBookingMutation = useCreateBookingMutation()
  const verifyPaymentMutation = useVerifyPaymentMutation()

  // Sync user data when user changes
  useEffect(() => {
    if (user) {
      syncUserToForm(user)
    }
  }, [user, syncUserToForm])

  // Handlers
  const handleLocationNext = () => {
    setStep(2)
  }

  const handlePackageNext = async () => {
    // We use service directly here for the procedural transition, 
    // or we could use useBookingPriceQuery reactively in the components.
    // For now, keeping the logic similar to original.
    setStep(2) // Stay while loading
    const loadingToast = toast.loading('Calculating price...')
    try {
      // Estimated distances from Lagos to other cities (Approx KM)
      const cityDistances = {
        'Abuja': 750,
        'Warri': 430,
        'Benin City': 320,
        'Enugu': 540,
        'Port Harcourt': 610,
        'Lagos': 25 // Within Lagos default
      }

      const destinationCity = formData.dropoffLocation.city
      const distance = cityDistances[destinationCity] || 50 // Fallback

      const response = await bookingService.getPrices({
        serviceType: formData.vehicleType || 'standard',
        weight: formData.cargoWeightKg || 1,
        distance
      })

      if (response.error) throw new Error(response.message || 'Failed to calculate price')

      setEstimatedCost(response.data.estimatedPrice)
      setStep(3)
      toast.success('Price calculated!', { id: loadingToast })
    } catch (err) {
      toast.error(err.message || 'Failed to calculate price', { id: loadingToast })
    }
  }

  const handlePriceNext = () => {
    setStep(4)
  }

  const handleConfirmBooking = async () => {
    toast.loading('Creating booking...', { id: 'booking-submit' })
    try {
      if (!formData.cargoWeightKg || isNaN(Number(formData.cargoWeightKg))) throw new Error('Valid cargo weight is required')
      if (!formData.quantity || isNaN(Number(formData.quantity))) throw new Error('Valid quantity is required')

      const normalizePhone = (phone) => {
        if (!phone) return phone
        const p = phone.replace(/\s+/g, '')
        if (p.startsWith('+')) return p
        if (p.startsWith('0')) return '+234' + p.slice(1)
        if (p.startsWith('234')) return '+' + p
        return '+234' + p
      }

      const shipmentPayload = {
        origin: typeof formData.pickupLocation === 'string' ? formData.pickupLocation : `${formData.pickupLocation.address}, ${formData.pickupLocation.city}`,
        destination: typeof formData.dropoffLocation === 'string' ? formData.dropoffLocation : `${formData.dropoffLocation.address}, ${formData.dropoffLocation.city}`,
        receiverName: formData.receiverPerson?.name || formData.receiverName,
        receiverEmail: formData.receiverPerson?.email || formData.receiverEmail,
        receiverPhone: normalizePhone(formData.receiverPerson?.phone),
        weight: Number(formData.cargoWeightKg),
        dimensions: {
          quantity: Math.round(Number(formData.quantity)),
          isFragile: formData.isFragile,
          isPerishable: formData.isPerishable,
          tempControl: formData.tempControlCelsius
        },
        serviceType: formData.vehicleType?.toLowerCase() || 'standard',
        packageType: formData.goodsType?.toLowerCase() || 'parcel',
        description: `Goods: ${formData.goodsType}. Quantity: ${formData.quantity}. ${formData.notes || ''}`,
        declaredValue: formData.declaredValue ? Number(formData.declaredValue) : 0,
        specialInstructions: formData.notes || ''
      }

      const response = await createBookingMutation.mutateAsync(shipmentPayload)
      if (!isValidBookingResponse(response)) throw new Error('Invalid booking response from server')

      const id = extractBookingId(response)
      setBookingId(id)

      toast.success('Booking created successfully!', { id: 'booking-submit' })
      setStep(5)
    } catch (err) {
      const friendlyMessage = getUserFriendlyMessage(err)
      toast.error(friendlyMessage, { id: 'booking-submit' })
      // If it's a retryable error, we might store it, but TanStack Query handles basic retries.
      // Here we keep local error state simple.
    }
  }

  const handleRetryBooking = () => {
    handleConfirmBooking()
  }

  const handleResetBooking = () => {
    resetBooking()
  }

  const handlePaymentSuccess = async (reference) => {
    try {
      await verifyPaymentMutation.mutateAsync(bookingId)
      setStep(6)
    } catch (error) {
      // Error handled by mutation toast
    }
  }

  const handlePaymentClose = () => toast.error('Payment cancelled')

  const handlePayLater = () => {
    toast.success('Booking confirmed! Pay on delivery')
    setStep(6)
  }

  const handleSimpleChange = (name, value) => updateFormData({ [name]: value })

  const handleNestedChange = (parent, field, value) => {
    updateNestedFormData(parent, { [field]: value })
  }

  return {
    step, setStep,
    loading: createBookingMutation.isPending || verifyPaymentMutation.isPending,
    error: createBookingMutation.error || verifyPaymentMutation.error,
    bookingId, estimatedCost, paymentMethod, setPaymentMethod, formData,
    handleLocationNext, handlePackageNext, handlePriceNext, handleConfirmBooking,
    handleRetryBooking, handleResetBooking, handlePaymentSuccess, handlePaymentClose,
    handlePayLater, handleSimpleChange, handleNestedChange
  }
}

