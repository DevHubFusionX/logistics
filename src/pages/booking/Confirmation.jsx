import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CheckCircle, MapPin, Package, Calendar, FileText, Home } from 'lucide-react'
import { ReceiptDownload, InvoiceGenerator } from '../../features/billing/components/payments'
import notificationService from '../../services/notificationService'

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
      {/* Page title */}
      <div>
        <h1 className="font-heading font-bold text-xl text-gray-900">Booking confirmed</h1>
        <p className="text-sm text-gray-400 mt-0.5">Your shipment has been booked and payment processed</p>
      </div>

      {/* Success banner */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-gray-900">Payment successful</p>
          <p className="text-sm text-gray-400 mt-0.5 truncate">Ref: {paymentId}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total paid</p>
          <p className="font-heading font-bold text-lg text-sky-700">₦{quote.total?.toLocaleString()}</p>
        </div>
      </div>

      {/* IDs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-sky-700" />
          <h2 className="font-heading font-semibold text-gray-900 text-sm">Booking details</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Booking ID', value: bookingId },
            { label: 'Payment ID', value: paymentId },
            { label: 'Total paid', value: `₦${quote.total?.toLocaleString()}` }
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
              <p className="font-mono text-sm font-bold text-gray-900 break-all">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Route + Shipment */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-sky-700" />
            <h2 className="font-heading font-semibold text-gray-900 text-sm">Route</h2>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-700" />
              <div className="w-px h-6 bg-gray-200" />
              <div className="w-2.5 h-2.5 rounded-full border-2 border-sky-700" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">From</p>
                <p className="text-sm font-semibold text-gray-900">{bookingData.pickupCity}, {bookingData.pickupState}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">To</p>
                <p className="text-sm font-semibold text-gray-900">{bookingData.deliveryCity}, {bookingData.deliveryState}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Service</p>
            <p className="text-sm font-semibold text-gray-900 capitalize mt-0.5">{bookingData.serviceType}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-sky-700" />
            <h2 className="font-heading font-semibold text-gray-900 text-sm">Shipment</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Cargo type', value: bookingData.cargoType },
              { label: 'Weight', value: `${bookingData.weight} kg` },
              { label: 'Pickup date', value: bookingData.pickupDate }
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-gray-900 capitalize mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's next */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-sky-700" />
          <h2 className="font-heading font-semibold text-gray-900 text-sm">What's next</h2>
        </div>
        <ul className="space-y-2.5">
          {[
            `Confirmation email sent to ${bookingData.customerEmail}`,
            'A driver will be assigned within 24 hours',
            'Track your shipment in real-time using your Booking ID',
            "You'll receive SMS updates at key milestones"
          ].map(text => (
            <li key={text} className="flex items-start gap-2.5 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Downloads */}
      <div className="grid sm:grid-cols-2 gap-4">
        <ReceiptDownload paymentId={paymentId} email={bookingData.email} type="receipt" />
        <InvoiceGenerator bookingId={bookingId} email={bookingData.email} />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate('/tracking/track')}
          className="flex-1 py-3 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Track shipment
        </button>
        <button
          onClick={() => navigate('/my-bookings')}
          className="flex-1 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> My bookings
        </button>
      </div>
    </div>
  )
}
