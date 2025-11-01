import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Download, Printer, ArrowLeft, CheckCircle } from 'lucide-react'
import bookingService from '../../services/bookingService'
import { calculateBookingPrice } from '../../utils/bookingUtils'

export default function Invoice() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooking()
  }, [id])

  const fetchBooking = async () => {
    try {
      const response = await bookingService.getBookingById(id)
      setBooking(response.data || response)
    } catch (error) {
      console.error('Error fetching booking:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => window.print()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-4">Invoice not found</p>
          <button onClick={() => navigate('/my-bookings')} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Back to Bookings
          </button>
        </div>
      </div>
    )
  }

  const amount = calculateBookingPrice(booking)
  const tax = amount * 0.075
  const total = amount + tax

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="no-print mb-6 flex gap-3">
          <button onClick={() => navigate('/my-bookings')} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Printer className="w-5 h-5" /> Print
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
            <Download className="w-5 h-5" /> Download PDF
          </button>
        </div>

        <div className="bg-white rounded-xl border shadow-lg p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
              <p className="text-gray-600">Invoice #: {booking.bookingId || booking._id}</p>
              <p className="text-gray-600">Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-blue-600">Your Logistics Company</h2>
              <p className="text-sm text-gray-600">123 Business Street</p>
              <p className="text-sm text-gray-600">Lagos, Nigeria</p>
              <p className="text-sm text-gray-600">+234 800 123 4567</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
              <p className="text-gray-700">{booking.fullNameOrBusiness}</p>
              <p className="text-gray-600">{booking.email}</p>
              <p className="text-gray-600">{booking.contactPhone}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Shipment Details:</h3>
              <p className="text-gray-600">Status: <span className="font-semibold text-green-600">Delivered</span></p>
              <p className="text-gray-600">Delivery Date: {new Date(booking.estimatedDeliveryDate).toLocaleDateString()}</p>
              <p className="text-gray-600">Payment: <span className="font-semibold text-green-600">Paid</span></p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Route Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">From</p>
                <p className="font-semibold">{booking.pickupLocation?.address}</p>
                <p className="text-sm text-gray-600">{booking.pickupLocation?.city}, {booking.pickupLocation?.state}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">To</p>
                <p className="font-semibold">{booking.dropoffLocation?.address}</p>
                <p className="text-sm text-gray-600">{booking.dropoffLocation?.city}, {booking.dropoffLocation?.state}</p>
              </div>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 text-gray-700">Description</th>
                <th className="text-right py-3 text-gray-700">Quantity</th>
                <th className="text-right py-3 text-gray-700">Weight</th>
                <th className="text-right py-3 text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4">
                  <p className="font-semibold">{booking.goodsType} Shipment</p>
                  <p className="text-sm text-gray-600">{booking.vehicleType} Service</p>
                </td>
                <td className="text-right py-4">{booking.quantity || 1}</td>
                <td className="text-right py-4">{booking.cargoWeightKg} kg</td>
                <td className="text-right py-4">₦{amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>₦{amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (7.5%):</span>
                <span>₦{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t-2 pt-2">
                <span>Total:</span>
                <span className="text-blue-600">₦{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Payment Received</p>
              <p className="text-sm text-green-700">Thank you for your business!</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p>Thank you for choosing our logistics services!</p>
            <p className="mt-2">For inquiries, contact us at support@logistics.com</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none; }
          body { background: white; }
        }
      `}</style>
    </div>
  )
}
