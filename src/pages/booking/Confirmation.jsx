import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CheckCircle, Home, Package, MapPin, Calendar, FileText } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { ReceiptDownload, InvoiceGenerator } from '../../components/payments'
import { notificationService } from '../../services'
import toast from 'react-hot-toast'

export default function Confirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { bookingData, quote, bookingId, paymentId } = location.state || {}

  useEffect(() => {
    if (bookingId && bookingData?.email) {
      notificationService.sendBookingConfirmation(bookingId, bookingData.email)
        .catch(err => console.error('Failed to send confirmation email:', err))
      
      if (bookingData?.contactPhone) {
        notificationService.sendBookingSMS(bookingId, bookingData.contactPhone)
          .catch(err => console.error('Failed to send SMS:', err))
      }
    }
  }, [bookingId, bookingData])

  if (!bookingData) {
    navigate('/booking/request')
    return null
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Booking Confirmed!"
        subtitle="Your shipment has been successfully booked"
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-8 text-center shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h2>
          <p className="text-gray-600">Your booking has been confirmed and payment processed</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Booking ID</p>
              <p className="font-mono font-bold text-lg text-gray-900">{bookingId}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Payment ID</p>
              <p className="font-mono font-bold text-lg text-gray-900">{paymentId}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Total Paid</p>
              <p className="font-bold text-lg text-green-600">${quote.total}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Route Information</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">From</p>
                <p className="font-semibold text-gray-900">{bookingData.pickupCity}, {bookingData.pickupState}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">To</p>
                <p className="font-semibold text-gray-900">{bookingData.deliveryCity}, {bookingData.deliveryState}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Service Type</p>
                <p className="font-semibold text-gray-900 capitalize">{bookingData.serviceType}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Shipment Details</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Cargo Type</p>
                <p className="font-semibold text-gray-900 capitalize">{bookingData.cargoType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Weight</p>
                <p className="font-semibold text-gray-900">{bookingData.weight} kg</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Pickup Date</p>
                <p className="font-semibold text-gray-900">{bookingData.pickupDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            What's Next?
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Confirmation email sent to <span className="font-semibold">{bookingData.customerEmail}</span></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Driver will be assigned within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Track your shipment in real-time using your Booking ID</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">You'll receive SMS updates at key milestones</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ReceiptDownload 
            paymentId={paymentId} 
            email={bookingData.email}
            type="receipt"
          />
          <InvoiceGenerator 
            bookingId={bookingId}
            email={bookingData.email}
          />
        </div>

        <div className="flex justify-center">
          <button onClick={() => navigate('/tracking/track')} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
            Track Shipment
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium">
            <Home className="w-5 h-5" />
            Go to Dashboard
          </button>
          <button onClick={() => navigate('/booking/request')} className="flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium">
            <Package className="w-5 h-5" />
            Book Another Shipment
          </button>
        </div>
      </div>
    </div>
  )
}
