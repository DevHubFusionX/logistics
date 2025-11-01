// EXAMPLE: MyBookings.jsx with API Integration
// Replace the current MyBookings.jsx with this after backend is ready

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/dashboard'
import { Package, MapPin, Clock, Eye, Download, Info, Truck, CheckCircle, AlertCircle, Phone, User, CreditCard } from 'lucide-react'
import { useApi, useMutation } from '../hooks/useApi'
import { bookingService } from '../services'
import { useBookingMetrics } from '../hooks/useBookingMetrics'
import { filterBookings, shouldShowDriverInfo, canPayBooking, canTrackBooking, canDownloadInvoice } from '../utils/bookingFilters'
import { STATUS_CONFIG, PAYMENT_CONFIG } from '../constants/bookingStatus'
import MetricCard from '../components/bookings/MetricCard'

export default function MyBookings() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  // Fetch bookings from API
  const { data: response, loading, error, refetch } = useApi(
    bookingService.getMyBookings,
    { status: filter === 'all' ? undefined : filter }
  )

  const bookings = response?.data?.bookings || []
  const summary = response?.data?.summary || {}

  // Calculate metrics from API response or bookings
  const metrics = {
    pending: summary.pending || 0,
    active: summary.active || 0,
    delivered: summary.delivered || 0,
    outstanding: summary.outstandingInvoices || 0
  }

  const handlePayNow = (booking) => {
    navigate('/booking/payment', { 
      state: { bookingId: booking.id, amount: booking.amount } 
    })
  }

  if (loading) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="My Bookings" subtitle="View and track all your shipment bookings" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="My Bookings" subtitle="View and track all your shipment bookings" />
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Bookings</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={refetch} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader title="My Bookings" subtitle="View and track all your shipment bookings" />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard icon={Clock} label="Pending" value={metrics.pending} description="Awaiting confirmation" color="yellow" />
        <MetricCard icon={Truck} label="Active" value={metrics.active} description="In transit or confirmed" color="green" />
        <MetricCard icon={CheckCircle} label="Delivered" value={metrics.delivered} description="This month" color="blue" />
        <MetricCard icon={AlertCircle} label="Outstanding" value={metrics.outstanding} description="Pending invoices" color="orange" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('/booking/request')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
          + New Booking
        </button>
        <button onClick={() => navigate('/booking-status-guide')} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <Info className="w-4 h-4" /> Status Guide
        </button>
        
        <div className="flex gap-2 ml-auto">
          {['all', 'pending', 'in_transit', 'delivered'].map(status => (
            <button key={status} onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                filter === status
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}>
              {status === 'all' ? 'All' : STATUS_CONFIG[status]?.label || status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{booking.bookingId || booking.id}</h3>
                  <p className="text-sm text-gray-600">{booking.cargoType} • {booking.weight}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_CONFIG[booking.status]?.badge || 'bg-gray-100 text-gray-700'}`}>
                {STATUS_CONFIG[booking.status]?.label || booking.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Pickup</p>
                  <p className="font-semibold text-gray-900">{booking.pickupLocation || booking.pickupCity}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Delivery</p>
                  <p className="font-semibold text-gray-900">{booking.deliveryLocation || booking.deliveryCity}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
              </div>
              {booking.estimatedDeliveryDate && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>ETA: {new Date(booking.estimatedDeliveryDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {shouldShowDriverInfo(booking) && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-4 border border-blue-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Driver Information</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Driver</p>
                      <p className="font-semibold text-gray-900">{booking.driver.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <a href={`tel:${booking.driver.phone}`} className="font-semibold text-blue-600 hover:underline">
                        {booking.driver.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Vehicle</p>
                      <p className="font-semibold text-gray-900">{booking.driver.vehiclePlate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-gray-900">₦{booking.amount?.toFixed(2)}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${PAYMENT_CONFIG[booking.paymentStatus]?.badge || 'bg-gray-100 text-gray-700'}`}>
                    {PAYMENT_CONFIG[booking.paymentStatus]?.label || booking.paymentStatus}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {canPayBooking(booking) && (
                  <button onClick={() => handlePayNow(booking)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    <CreditCard className="w-4 h-4" /> Pay Now
                  </button>
                )}
                {canTrackBooking(booking) && (
                  <button onClick={() => navigate(`/tracking/${booking.trackingId}`)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <Eye className="w-4 h-4" /> Track
                  </button>
                )}
                {canDownloadInvoice(booking) && (
                  <button onClick={() => navigate(`/tracking/invoice/${booking.id}`)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <Download className="w-4 h-4" /> Invoice
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? "You haven't created any bookings yet" 
              : `No ${STATUS_CONFIG[filter]?.label || filter} bookings`}
          </p>
          <button onClick={() => navigate('/booking/request')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Create Your First Booking
          </button>
        </div>
      )}
    </div>
  )
}
