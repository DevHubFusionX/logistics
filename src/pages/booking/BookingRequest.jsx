import { useState } from 'react'
import { Package, CheckCircle, CreditCard, Truck } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { useAuth } from '../../hooks/useAuth'
import bookingService from '../../services/bookingService'
import paymentService from '../../services/paymentService'
import toast from 'react-hot-toast'
import ProgressSteps from '../../components/booking/ProgressSteps'
import ShipmentDetailsForm from '../../components/booking/ShipmentDetailsForm'
import ReviewQuote from '../../components/booking/ReviewQuote'
import PaymentSelection from '../../components/booking/PaymentSelection'
import BookingConfirmation from '../../components/booking/BookingConfirmation'

export default function BookingRequest() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [bookingId, setBookingId] = useState(null)
  const [estimatedCost, setEstimatedCost] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
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
  })

  const steps = [
    { num: 1, name: 'Shipment Details', icon: Package },
    { num: 2, name: 'Review & Quote', icon: CheckCircle },
    { num: 3, name: 'Payment', icon: CreditCard },
    { num: 4, name: 'Confirmation', icon: Truck }
  ]

  const calculatePrice = () => {
    const baseRate = 5000
    const weightRate = parseFloat(formData.cargoWeightKg) * 50
    const quantityRate = formData.quantity * 500
    const fragileCharge = formData.isFragile ? 2000 : 0
    const perishableCharge = formData.isPerishable ? 3000 : 0
    const vehicleRates = { 'Van': 0, 'Truck': 5000, 'Refrigerated Van': 8000 }
    const vehicleCharge = vehicleRates[formData.vehicleType] || 0
    return baseRate + weightRate + quantityRate + fragileCharge + perishableCharge + vehicleCharge
  }

  const handleNext = (e) => {
    e.preventDefault()
    const price = calculatePrice()
    setEstimatedCost(price)
    setStep(2)
  }

  const handleConfirmBooking = async () => {
    setLoading(true)
    try {
      const response = await bookingService.createBooking(formData)
      const id = response?.data?.bookingId || response?.data?._id || response?.bookingId || response?._id
      setBookingId(id || 'PENDING')
      toast.success('Booking created successfully!')
      setStep(3)
    } catch (error) {
      toast.error(error.message || 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = async (reference) => {
    setLoading(true)
    try {
      await paymentService.verifyPayment(reference.reference, bookingId)
      toast.success('Payment verified successfully!')
      setStep(4)
    } catch (error) {
      toast.error('Payment verification failed. Please contact support.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentClose = () => {
    toast.error('Payment cancelled')
  }

  const handlePayLater = () => {
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

  return (
    <div className="space-y-4 sm:space-y-6 pb-6 px-4 sm:px-0">
      <PageHeader
        title="Book a Shipment"
        subtitle="Complete your logistics booking in 3 easy steps"
      />

      <ProgressSteps steps={steps} currentStep={step} />

      {step === 1 && (
        <ShipmentDetailsForm
          formData={formData}
          onChange={handleChange}
          onNestedChange={handleNestedChange}
          onSubmit={handleNext}
        />
      )}

      {step === 2 && (
        <ReviewQuote
          formData={formData}
          estimatedCost={estimatedCost}
          onBack={() => setStep(1)}
          onConfirm={handleConfirmBooking}
          loading={loading}
        />
      )}

      {step === 3 && (
        <PaymentSelection
          bookingId={bookingId}
          estimatedCost={estimatedCost}
          email={formData.email}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentClose={handlePaymentClose}
          onPayLater={handlePayLater}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <BookingConfirmation
          bookingId={bookingId}
          estimatedCost={estimatedCost}
          formData={formData}
        />
      )}
    </div>
  )
}
