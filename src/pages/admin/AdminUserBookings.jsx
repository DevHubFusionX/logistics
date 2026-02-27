import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Package, Search, ChevronLeft, RefreshCcw, AlertCircle } from 'lucide-react'
import { useToast } from '../../components/ui/advanced'
import BookingCard from '../../components/bookings/BookingCard'
import BookingDetailsModal from '../../components/bookings/BookingDetailsModal'
import { getStatusBadge, getStatusText } from '../../utils/bookingUtils'
import { useAdminUserBookingsQuery } from '../../hooks/queries/useBookingQueries'
import AssignDriverModal from '../../components/bookings/AssignDriverModal'


export default function AdminUserBookings() {
    const { id: userId } = useParams()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [showAssignModal, setShowAssignModal] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [page, setPage] = useState(1)
    const { showToast, ToastContainer } = useToast()

    const queryParams = useMemo(() => ({
        limit: 10,
        page: page,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
    }), [statusFilter, searchTerm, page])

    const { data: rawData, isLoading, isError, error, refetch } = useAdminUserBookingsQuery(userId, queryParams)
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
            driverId: b.driver?.id || b.driverId,
            driverName: b.driver?.profile ? `${b.driver.profile.first_name} ${b.driver.profile.last_name}` : (b.driverName || null)
        }))
    }, [rawBookings])

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking)
        setShowDetailsModal(true)
    }

    const handleAssignDriver = (booking) => {
        setSelectedBooking(booking)
        setShowAssignModal(true)
    }

    const handleDriverAssigned = () => {
        setShowAssignModal(false)
        refetch()
        showToast.success('Success', 'Driver has been assigned to the shipment')
    }

    return (
        <div className="space-y-6 pb-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/customers')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <PageHeader
                    title="User Bookings"
                    subtitle={`Managing shipment history for User ID: ${userId}`}
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
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="search"
                            placeholder="Search bookings..."
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
                    <p className="text-gray-600 font-medium">Loading user shipments...</p>
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
                                isAdminView={true}
                            />
                        ))}
                    </div>

                    {mappedBookings.length === 0 && (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No bookings found for this user</p>
                        </div>
                    )}

                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 pt-6">
                            <button
                                disabled={!pagination.hasPrev}
                                onClick={() => setPage(prev => prev - 1)}
                                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                            >
                                Previous
                            </button>
                            <span className="text-sm font-medium text-gray-600">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            <button
                                disabled={!pagination.hasNext}
                                onClick={() => setPage(prev => prev + 1)}
                                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {showDetailsModal && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={() => setShowDetailsModal(false)}
                    getStatusBadge={getStatusBadge}
                    getStatusText={getStatusText}
                />
            )}

            {showAssignModal && (
                <AssignDriverModal
                    booking={selectedBooking}
                    onClose={() => setShowAssignModal(false)}
                    onAssign={handleDriverAssigned}
                />
            )}

            <ToastContainer />
        </div>
    )
}
