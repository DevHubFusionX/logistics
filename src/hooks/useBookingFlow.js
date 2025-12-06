import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useBookingDraft } from '../hooks/useBookingDraft'
import { useRetry } from '../hooks/useRetry'
import bookingService from '../services/bookingService'
import paymentService from '../services/paymentService'
import { securityService } from '../services'
import { extractBookingId, isValidBookingResponse } from '../utils/bookingValidation'
import { getUserFriendlyMessage, isRetryableError } from '../utils/errorCodes'
import toast from 'react-hot-toast'

export const useBookingFlow = () => {
  const { user } = useAuth()
  const draft = useBookingDraft()
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
  const [showDraftBanner, setShowDraftBanner] = useState(false)
  
  const initialFormData = {
    fullNameOrBusiness: user?.companyName || '',
    contactPhone: user?.phoneNumber || '',
    email: user?.email || '',
    customerType: 'Business',
    pickupPerson: { name: '', phone: '', email: '' },
    receiverPerson: { name: '', phone: '', email: '' },
    pickupLocation: { address: '', city: '', state: '' },
    dropoffLocation: { address: '', city: '', state: '' },
    goodsType: '',
    cargoWeightKg: '',
    quantity: 1,
    isFragile: false,
    isPerishable: false,
    tempControlCelsius: 20,
    vehicleType: '',
    estimatedPickupDate: '',
    estimatedDeliveryDate: '',
    notes: ''
  }
  
  const [formData, setFormData] = useState(initialFormData)
  
  // Check for draft on mount
  useEffect(() => {
    if (draft.draftAvailable && step === 1) {
      setShowDraftBanner(true)
    }
  }, [draft.draftAvailable, step])

  // Auto-save on form data change (debounced)
  useEffect(() => {
    if (step === 1 && formData.email) {
      const timer = setTimeout(() => {
        draft.autoSave(formData)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [formData, step, draft])

  const handleRestoreDraft = () => {
    const savedDraft = draft.load()
    if (savedDraft) {
      setFormData(savedDraft)
      toast.success('Draft restored successfully!')
    }
    setShowDraftBanner(false)
  }

  const handleDiscardDraft = () => {
    draft.clear()
    setShowDraftBanner(false)
    toast.success('Draft discarded')
  }

  const handleSaveDraft = () => {
    if (draft.save(formData)) {
      toast.success('Draft saved successfully!')
    } else {
      toast.error('Failed to save draft')
    }
  }

  const handleNext = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)
    
    try {
      const { price } = await securityService.calculatePrice(formData)
      setEstimatedCost(price)
      setStep(2)
    } catch (err) {
      toast.error(err.message || 'Failed to calculate price')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmBooking = async () => {
    setLoading(true)
    setError(null)
    toast.dismiss('retry-toast')
    
    try {
      const response = await retry.executeWithRetry(() => 
        bookingService.createBooking(formData)
      )
      
      // Validate booking response
      if (!isValidBookingResponse(response)) {
        throw new Error('Invalid booking response from server')
      }
      
      const id = extractBookingId(response)
      setBookingId(id)
      
      // Clear draft after successful booking
      draft.clear()
      
      toast.success('Booking created successfully!')
      setStep(3)
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
      setStep(4)
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
    draft.clear()
    toast.success('Booking confirmed! Pay on delivery')
    setStep(4)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleNestedChange = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: { ...formData[parent], [field]: value }
    })
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
    showDraftBanner,
    formData,
    retry,
    draft,
    handleRestoreDraft,
    handleDiscardDraft,
    handleSaveDraft,
    handleNext,
    handleConfirmBooking,
    handleRetryBooking,
    handleResetBooking,
    handlePaymentSuccess,
    handlePaymentClose,
    handlePayLater,
    handleChange,
    handleNestedChange
  }
}
