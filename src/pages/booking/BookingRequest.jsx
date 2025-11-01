import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, MapPin, ArrowRight, User, Truck, CheckCircle, CreditCard, Eye } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { useAuth } from '../../hooks/useAuth'
import bookingService from '../../services/bookingService'
import paymentService from '../../services/paymentService'
import toast from 'react-hot-toast'

export default function BookingRequest() {
  const navigate = useNavigate()
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



  const handleNext = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await bookingService.calculatePrice(formData)
      const cost = response.data?.estimatedCost || response.estimatedCost || 0
      setEstimatedCost(cost)
      setStep(2)
    } catch (error) {
      toast.error('Failed to calculate price')
      console.error('Price calculation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmBooking = async () => {
    setLoading(true)
    try {
      const response = await bookingService.createBooking(formData)
      console.log('Booking response:', response)
      const id = response?.data?.bookingId || response?.data?._id || response?.bookingId || response?._id
      setBookingId(id || 'PENDING')
      toast.success('Booking created successfully!')
      setStep(3)
    } catch (error) {
      console.error('Booking error:', error)
      toast.error(error.message || 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  const handleCardPayment = async () => {
    setLoading(true)
    try {
      const response = await paymentService.initiatePayment({
        bookingId,
        amount: estimatedCost,
        email: user?.email
      })
      
      if (response.data?.authorization_url) {
        window.location.href = response.data.authorization_url
      }
    } catch (error) {
      toast.error('Payment initiation failed')
    } finally {
      setLoading(false)
    }
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
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Book a Shipment"
        subtitle="Complete your logistics booking in 3 easy steps"
      />

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  step >= s.num ? 'text-blue-600' : 'text-gray-500'
                }`}>{s.name}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 transition-colors ${
                  step > s.num ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Shipment Details */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-6">
        {/* Customer Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input type="text" name="fullNameOrBusiness" value={formData.fullNameOrBusiness} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
        </div>

        {/* Pickup Person */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pickup Details</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Person Name</label>
              <input type="text" value={formData.pickupPerson.name} onChange={(e) => handleNestedChange('pickupPerson', 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={formData.pickupPerson.phone} onChange={(e) => handleNestedChange('pickupPerson', 'phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.pickupPerson.email} onChange={(e) => handleNestedChange('pickupPerson', 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={formData.pickupLocation.address} onChange={(e) => handleNestedChange('pickupLocation', 'address', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" value={formData.pickupLocation.city} onChange={(e) => handleNestedChange('pickupLocation', 'city', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" value={formData.pickupLocation.state} onChange={(e) => handleNestedChange('pickupLocation', 'state', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <input type="datetime-local" name="estimatedPickupDate" value={formData.estimatedPickupDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
        </div>

        {/* Receiver Person */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Truck className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Details</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name</label>
              <input type="text" value={formData.receiverPerson.name} onChange={(e) => handleNestedChange('receiverPerson', 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={formData.receiverPerson.phone} onChange={(e) => handleNestedChange('receiverPerson', 'phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.receiverPerson.email} onChange={(e) => handleNestedChange('receiverPerson', 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={formData.dropoffLocation.address} onChange={(e) => handleNestedChange('dropoffLocation', 'address', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" value={formData.dropoffLocation.city} onChange={(e) => handleNestedChange('dropoffLocation', 'city', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" value={formData.dropoffLocation.state} onChange={(e) => handleNestedChange('dropoffLocation', 'state', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
              <input type="datetime-local" name="estimatedDeliveryDate" value={formData.estimatedDeliveryDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
        </div>

        {/* Cargo Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Cargo Information</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goods Type</label>
              <select name="goodsType" value={formData.goodsType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select...</option>
                <option value="Electronics">Electronics</option>
                <option value="Food">Food</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="General">General Cargo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input type="number" step="0.1" name="cargoWeightKg" value={formData.cargoWeightKg} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
              <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select...</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
                <option value="Refrigerated Van">Refrigerated Van</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
              <input type="number" name="tempControlCelsius" value={formData.tempControlCelsius} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="isFragile" checked={formData.isFragile} onChange={handleChange} className="rounded" />
                <span className="text-sm font-medium text-gray-700">Fragile</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="isPerishable" checked={formData.isPerishable} onChange={handleChange} className="rounded" />
                <span className="text-sm font-medium text-gray-700">Perishable</span>
              </label>
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Additional instructions..."></textarea>
            </div>
          </div>
        </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm disabled:opacity-50">
              {loading ? 'Calculating...' : 'Continue to Review'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Review & Quote */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Shipment Summary</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-semibold">{formData.pickupLocation.address}</p>
                    <p className="text-sm">{formData.pickupLocation.city}, {formData.pickupLocation.state}</p>
                    <p className="text-sm text-gray-600 mt-1">Contact: {formData.pickupPerson.name} ({formData.pickupPerson.phone})</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Location</p>
                    <p className="font-semibold">{formData.dropoffLocation.address}</p>
                    <p className="text-sm">{formData.dropoffLocation.city}, {formData.dropoffLocation.state}</p>
                    <p className="text-sm text-gray-600 mt-1">Contact: {formData.receiverPerson.name} ({formData.receiverPerson.phone})</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Cargo Details</h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Goods Type</p>
                  <p className="font-semibold">{formData.goodsType}</p>
                </div>
                <div>
                  <p className="text-gray-500">Weight</p>
                  <p className="font-semibold">{formData.cargoWeightKg} kg</p>
                </div>
                <div>
                  <p className="text-gray-500">Quantity</p>
                  <p className="font-semibold">{formData.quantity} units</p>
                </div>
                <div>
                  <p className="text-gray-500">Vehicle Type</p>
                  <p className="font-semibold">{formData.vehicleType}</p>
                </div>
              </div>
              
              {(formData.isFragile || formData.isPerishable) && (
                <div className="mt-3 flex gap-2">
                  {formData.isFragile && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Fragile</span>}
                  {formData.isPerishable && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Perishable ({formData.tempControlCelsius}°C)</span>}
                </div>
              )}
            </div>

            <div className="border-t mt-4 pt-4">
              <h4 className="font-semibold mb-3">Schedule</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Pickup Date</p>
                  <p className="font-semibold">{new Date(formData.estimatedPickupDate).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Delivery Date</p>
                  <p className="font-semibold">{new Date(formData.estimatedDeliveryDate).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Quote */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estimated Shipping Cost</p>
                <p className="text-3xl font-bold text-blue-600">₦{estimatedCost?.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">Price calculated based on distance, weight, and service type</p>
              </div>
              <Package className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Back to Edit
            </button>
            <button onClick={handleConfirmBooking} disabled={loading} className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50">
              {loading ? 'Processing...' : 'Confirm & Book Now'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="text-xl font-bold text-blue-600">{bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Amount Due</p>
                  <p className="text-2xl font-bold text-gray-900">₦{estimatedCost?.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                  paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <p className="font-semibold text-sm">Card Payment</p>
                <p className="text-xs text-gray-500">Pay with Paystack</p>
              </button>

              <button
                onClick={() => setPaymentMethod('later')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'later' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Truck className={`w-8 h-8 mx-auto mb-2 ${
                  paymentMethod === 'later' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <p className="font-semibold text-sm">Pay on Delivery</p>
                <p className="text-xs text-gray-500">Cash/Transfer</p>
              </button>
            </div>

            {/* Payment Details */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>🔒 Secure Payment:</strong> You'll be redirected to Paystack to complete your payment securely with your debit/credit card.
                </p>
              </div>
            )}

            {paymentMethod === 'later' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Pay on Delivery:</strong> You can pay the driver in cash or via bank transfer when your shipment is delivered.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-6 py-3 border rounded-lg hover:bg-gray-50">
              Back
            </button>
            {paymentMethod === 'card' && (
              <button onClick={handleCardPayment} disabled={loading} className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50">
                {loading ? 'Processing...' : 'Pay with Paystack'}
              </button>
            )}
            {paymentMethod === 'later' && (
              <button onClick={handlePayLater} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">Your shipment has been successfully booked</p>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
              <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
              <p className="text-3xl font-bold text-blue-600 mb-4">{bookingId}</p>
              <p className="text-sm text-gray-600">Estimated Cost: <span className="font-bold text-gray-900">₦{estimatedCost?.toFixed(2)}</span></p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm text-gray-700">
                <strong>Next Steps:</strong> Our team will review your booking and assign a driver. You'll receive a confirmation email and SMS with tracking details shortly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Pickup</p>
                <p className="font-semibold text-sm">{new Date(formData.estimatedPickupDate).toLocaleDateString()}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Delivery</p>
                <p className="font-semibold text-sm">{new Date(formData.estimatedDeliveryDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate('/my-bookings')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                View My Bookings
              </button>
              <button onClick={() => navigate('/dashboard')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
