import { useState, useEffect, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { Package, Search, UserCheck, Truck, Clock, CheckCircle, RefreshCcw, AlertCircle } from 'lucide-react'
import { useToast } from '../../components/ui/advanced'
import BookingCard from '../../components/bookings/BookingCard'
import AssignDriverModal from '../../components/bookings/AssignDriverModal'
import BookingDetailsModal from '../../components/bookings/BookingDetailsModal'
import { getStatusBadge, getStatusText } from '../../utils/bookingUtils'
import { useAllBookingsQuery } from '../../hooks/queries/useBookingQueries'

export default function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const { showToast, ToastContainer } = useToast()

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const queryParams = useMemo(() => ({
    limit: 100,
    page: 1,
    ...(statusFilter !== 'all' && { status: statusFilter }),
    ...(debouncedSearch && { search: debouncedSearch })
  }), [statusFilter, debouncedSearch])

  const { data: rawData, isLoading, isError, refetch } = useAllBookingsQuery(queryParams)
  const rawBookings = rawData?.records || []
  const pagination = rawData?.pagination || {}

  const mappedBookings = useMemo(() => {
    const records = Array.isArray(rawBookings) ? rawBookings : []
    return records.map(b => ({
      ...b,
      id: b._id || b.id,
      trackingNumber: b.tracking_number || b._id,
      customerName: b.fullNameOrBusiness || (b.sender ? `${b.sender.first_name} ${b.sender.last_name}` : (b.receiver_name || 'Guest')),
      customerEmail: b.email || b.sender?.email || b.receiver_email,
      customerPhone: b.contactPhone || b.sender?.phone || b.receiver_phone,
      pickupCity: b.pickupLocation?.city || b.origin?.split(',').pop()?.trim() || 'N/A',
      deliveryCity: b.dropoffLocation?.city || b.destination?.split(',').pop()?.trim() || 'N/A',
      weight: b.cargoWeightKg || b.weight,
      cargoType: b.goodsType || b.package_type,
      serviceType: b.vehicleType || b.service_type,
      status: b.status,
      amount: b.price || b.shipping_fee,
      createdAt: b.createdAt || b.created_at,
      pickupDate: b.estimatedPickupDate || b.pickupDate || b.estimated_delivery,
      driverId: b.driver?.id,
      driverName: b.driver?.profile ? `${b.driver.profile.first_name} ${b.driver.profile.last_name}` : null
    }))
  }, [rawBookings])

  const stats = useMemo(() => {
    return {
      pending: mappedBookings.filter(b => b.status === 'pending' || b.status === 'pending_assignment').length,
      assigned: mappedBookings.filter(b => b.status === 'confirmed' || b.status === 'driver_assigned').length,
      inTransit: mappedBookings.filter(b => b.status === 'in_transit').length,
      completed: mappedBookings.filter(b => b.status === 'delivered').length
    }
  }, [mappedBookings])

  const handleAssignDriver = (booking) => {
    setSelectedBooking(booking)
    setShowAssignModal(true)
  }

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking)
    setShowDetailsModal(true)
  }

  const handleDriverAssigned = () => {
    setShowAssignModal(false)
    refetch()
    showToast.success('Success', 'Driver has been assigned to the shipment')
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Bookings Management"
        subtitle="Manage all bookings and assign drivers"
        action={
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.assigned}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-purple-600">{stats.inTransit}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search by tracking number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 font-medium"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200">
          <RefreshCcw className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading shipments...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-red-500 font-medium">Failed to load shipments</p>
          <button onClick={() => refetch()} className="mt-4 text-blue-600 font-semibold underline underline-offset-4">Try again</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {mappedBookings.map(booking => (
              <BookingCard
                key={booking.id || booking._id}
                booking={booking}
                onViewDetails={() => handleViewDetails(booking)}
                onAssignDriver={() => handleAssignDriver(booking)}
              />
            ))}
          </div>

          {mappedBookings.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No bookings found</p>
            </div>
          )}
        </>
      )}

      {showAssignModal && (
        <AssignDriverModal
          booking={selectedBooking}
          onClose={() => setShowAssignModal(false)}
          onAssign={handleDriverAssigned}
        />
      )}

      {showDetailsModal && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setShowDetailsModal(false)}
          getStatusBadge={getStatusBadge}
          getStatusText={getStatusText}
        />
      )}

      <ToastContainer />
    </div>
  )
}
