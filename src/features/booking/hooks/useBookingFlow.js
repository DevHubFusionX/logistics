import { useEffect, useCallback } from 'react'
import { useAuth, useProfileQuery } from '@/features/auth'
import { useBookingStore } from '../stores/bookingStore'
import { useCreateBookingMutation } from './useBookingQueries'
import { useVerifyPaymentMutation } from '@/hooks/queries/usePaymentQueries'
import bookingService from '../services/bookingService'
import { getUserFriendlyMessage } from '@/utils/errorCodes'
import { normalizePhone } from '@/utils/validation'
import toast from 'react-hot-toast'

const buildPickupLocation = (location = {}) => (
  [location.address, location.city, location.state]
    .filter(Boolean)
    .join(', ')
)

const CITY_COORDINATES = {
  Lagos: { lat: 6.5244, lng: 3.3792 },
  Abuja: { lat: 9.0765, lng: 7.3986 },
  Warri: { lat: 5.5167, lng: 5.75 },
  'Benin City': { lat: 6.335, lng: 5.6037 },
  Enugu: { lat: 6.5244, lng: 7.5086 },
  'Port Harcourt': { lat: 4.8156, lng: 7.0498 }
}

const getDropOffCoordinates = (location = {}) => {
  const lat = Number(location.lat ?? location.latitude)
  const lng = Number(location.lng ?? location.longitude)

  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return { lat, lng }
  }

  return CITY_COORDINATES[location.city] || CITY_COORDINATES.Abuja
}

export const useBookingFlow = () => {
  const auth = useAuth()
  const user = auth?.user || null

  // Fetch full profile data (has firstName, lastName, email, phoneNumber, companyName)
  const { data: profileData } = useProfileQuery()

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

  // Sync user data when profile loads or when form is reset/empty
  // Prefer profileData (full profile) over auth store user (minimal login payload)
  useEffect(() => {
    const source = profileData || user
    if (source && (!formData.email || !formData.fullNameOrBusiness || !formData.contactPhone)) {
      syncUserToForm(source)
    }
  }, [profileData, user, formData.email, formData.fullNameOrBusiness, formData.contactPhone, syncUserToForm])

  // Handlers
  const handleLocationNext = useCallback(() => {
    setStep(2)
  }, [setStep])

  const handlePackageNext = useCallback(async () => {
    setStep(2) // Stay while loading
    const loadingToast = toast.loading('Calculating price...')
    try {
      const destinationCity = formData.dropoffLocation.city
      const truckSize = formData.truckSize || 5
      const { isAdmin } = auth

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
  }, [setStep, setEstimatedCost, formData.dropoffLocation.city, formData.truckSize, auth])

  const handlePriceNext = useCallback(() => {
    setStep(4)
  }, [setStep])

  const handleConfirmBooking = useCallback(async () => {
    toast.loading('Creating booking...', { id: 'booking-submit' })
    try {
      if (!formData.cargoWeightKg || isNaN(Number(formData.cargoWeightKg))) throw new Error('Valid cargo weight is required')
      if (!formData.quantity || isNaN(Number(formData.quantity))) throw new Error('Valid quantity is required')


      // Build payload matching the documented POST /bookings/ API schema.
      const bookingPayload = {
        fullNameOrBusiness: formData.fullNameOrBusiness,
        contactPhone: normalizePhone(formData.contactPhone),
        email: formData.email,
        customerType: formData.customerType || 'Business',
        pickupPerson: {
          name: formData.pickupPerson?.name || formData.fullNameOrBusiness || '',
          phone: normalizePhone(formData.pickupPerson?.phone || formData.contactPhone),
          email: formData.pickupPerson?.email || formData.email || ''
        },
        receiverPerson: {
          name: formData.receiverPerson?.name || '',
          phone: normalizePhone(formData.receiverPerson?.phone || ''),
          email: formData.receiverPerson?.email || ''
        },
        pickupLocation: buildPickupLocation(formData.pickupLocation),
        dropoffLocation: {
          address: formData.dropoffLocation?.address || '',
          city: formData.dropoffLocation?.city || '',
          state: formData.dropoffLocation?.state || 'Nigeria'
        },
        dropOffCoordinates: getDropOffCoordinates(formData.dropoffLocation),
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
        truckSize: Number(formData.truckSize) || undefined
      }

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
  }, [formData, createBookingMutation, setBookingId, setStep])

  const handleRetryBooking = useCallback(() => {
    handleConfirmBooking()
  }, [handleConfirmBooking])

  const handleResetBooking = useCallback(() => {
    resetBooking()
  }, [resetBooking])

  const handlePaymentSuccess = useCallback(async () => {
    try {
      await verifyPaymentMutation.mutateAsync(bookingId)
      setStep(6)
    } catch {
      // Error handled by mutation toast
    }
  }, [bookingId, verifyPaymentMutation, setStep])

  const handlePaymentClose = useCallback(() => toast.error('Payment cancelled'), [])

  const handlePayLater = useCallback(() => {
    toast.success('Booking confirmed! Pay on delivery')
    setStep(6)
  }, [setStep])

  const handleSimpleChange = useCallback((name, value) => updateFormData({ [name]: value }), [updateFormData])

  const handleNestedChange = useCallback((parent, field, value) => {
    updateNestedFormData(parent, { [field]: value })
  }, [updateNestedFormData])

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
