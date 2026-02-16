import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useBookingStore } from '../stores/bookingStore'
import {
  useCreateBookingMutation
} from './queries/useBookingQueries'
import { useVerifyPaymentMutation } from './queries/usePaymentQueries'
import bookingService from '../services/bookingService'
import { getUserFriendlyMessage } from '../utils/errorCodes'
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
    setStep(2) // Stay while loading
    const loadingToast = toast.loading('Calculating price...')
    try {
      const destinationCity = formData.dropoffLocation.city
      const truckSize = formData.truckSize || 5
      const isAdmin = ['Super Admin', 'Dispatcher', 'admin', 'Admin', 'SUPER_ADMIN'].includes(user?.role)

      const response = await bookingService.getPrices(destinationCity, truckSize, isAdmin)

      // httpClient returns { data: { error, message, data: { price } } }
      const apiBody = response.data
      if (apiBody?.error) throw new Error(apiBody.message || 'Failed to calculate price')

      setEstimatedCost(apiBody.data?.price || 0)
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

      // Build payload matching POST /bookings/ API schema
      const bookingPayload = {
        fullNameOrBusiness: formData.fullNameOrBusiness,
        contactPhone: normalizePhone(formData.contactPhone),
        email: formData.email,
        customerType: formData.customerType || 'Business',
        pickupPerson: {
          name: formData.pickupPerson?.name,
          phone: normalizePhone(formData.pickupPerson?.phone),
          email: formData.pickupPerson?.email
        },
        receiverPerson: {
          name: formData.receiverPerson?.name,
          phone: normalizePhone(formData.receiverPerson?.phone),
          email: formData.receiverPerson?.email
        },
        // API accepts pickupLocation as a string
        pickupLocation: formData.pickupLocation?.address
          ? `${formData.pickupLocation.address}, ${formData.pickupLocation.city || 'Lagos'}`
          : formData.pickupLocation?.city || 'Lagos',
        // API accepts dropoffLocation as object with address + city (no state)
        dropoffLocation: {
          address: formData.dropoffLocation?.address || '',
          city: formData.dropoffLocation?.city || ''
        },
        goodsType: formData.goodsType,
        cargoWeightKg: Number(formData.cargoWeightKg),
        quantity: parseInt(formData.quantity, 10) || 1,
        isFragile: Boolean(formData.isFragile),
        isPerishable: Boolean(formData.isPerishable),
        tempControlCelsius: parseInt(formData.tempControlCelsius, 10) || 20,
        vehicleType: formData.vehicleType || 'Van',
        estimatedPickupDate: formData.estimatedPickupDate ? new Date(formData.estimatedPickupDate).toISOString() : new Date().toISOString(),
        estimatedDeliveryDate: formData.estimatedDeliveryDate ? new Date(formData.estimatedDeliveryDate).toISOString() : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        notes: formData.notes || '',
        truckSize: formData.truckSize || 5
      }

      console.log('[DEBUG] Booking Payload:', JSON.stringify(bookingPayload, null, 2))

      const response = await createBookingMutation.mutateAsync(bookingPayload)

      // API returns { data: { error, message, data: { booking fields... } } }
      const apiBody = response.data
      const bookingData = apiBody?.data || apiBody

      if (apiBody?.error) throw new Error(apiBody.message || 'Booking creation failed')

      const id = bookingData?._id || bookingData?.id || null
      if (!id) throw new Error('No booking ID returned from server')

      setBookingId(id)
      toast.success('Booking created successfully!', { id: 'booking-submit' })
      setStep(5)
    } catch (err) {
      const friendlyMessage = getUserFriendlyMessage(err)
      toast.error(friendlyMessage, { id: 'booking-submit' })
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

