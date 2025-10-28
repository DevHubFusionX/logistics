import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { Package, Search, UserCheck, Truck, Clock, CheckCircle } from 'lucide-react'
import { useToast } from '../components/ui/advanced'
import BookingCard from '../components/bookings/BookingCard'
import AssignDriverModal from '../components/bookings/AssignDriverModal'

const mockBookings = [
  {
    id: 'BK-1705234567',
    customerId: 'user-123',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+234-xxx-xxxx',
    pickupCity: 'Lagos',
    deliveryCity: 'Abuja',
    weight: 100,
    cargoType: 'general',
    serviceType: 'standard',
    status: 'pending_assignment',
    amount: 302.40,
    createdAt: '2025-01-15 10:30:00',
    pickupDate: '2025-01-16',
    driverId: null,
    driverName: null
  },
  {
    id: 'BK-1705234568',
    customerId: 'user-124',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+234-xxx-xxxy',
    pickupCity: 'Kano',
    deliveryCity: 'Port Harcourt',
    weight: 150,
    cargoType: 'perishable',
    serviceType: 'express',
    status: 'driver_assigned',
    amount: 450.50,
    createdAt: '2025-01-15 09:15:00',
    pickupDate: '2025-01-16',
    driverId: 'DRV-001',
    driverName: 'Ahmed Ibrahim'
  },
  {
    id: 'BK-1705234569',
    customerId: 'user-125',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    customerPhone: '+234-xxx-xxxz',
    pickupCity: 'Ibadan',
    deliveryCity: 'Lagos',
    weight: 75,
    cargoType: 'frozen',
    serviceType: 'overnight',
    status: 'in_transit',
    amount: 380.20,
    createdAt: '2025-01-14 14:20:00',
    pickupDate: '2025-01-15',
    driverId: 'DRV-002',
    driverName: 'Chidi Okafor'
  }
]

export default function BookingsManagement() {
  const [bookings, setBookings] = useState(mockBookings)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const { showToast, ToastContainer } = useToast()

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAssignDriver = (booking) => {
    setSelectedBooking(booking)
    setShowAssignModal(true)
  }

  const handleDriverAssigned = (bookingId, driverData) => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, status: 'driver_assigned', driverId: driverData.id, driverName: driverData.name }
        : b
    ))
    setShowAssignModal(false)
    showToast.success('Driver assigned', `${driverData.name} assigned to ${bookingId}`)
  }

  const stats = {
    pending: bookings.filter(b => b.status === 'pending_assignment').length,
    assigned: bookings.filter(b => b.status === 'driver_assigned').length,
    inTransit: bookings.filter(b => b.status === 'in_transit').length,
    completed: bookings.filter(b => b.status === 'delivered').length
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Bookings Management"
        subtitle="Manage all bookings and assign drivers"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Assignment</p>
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
              <p className="text-sm text-gray-600">Driver Assigned</p>
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
              placeholder="Search by booking ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          >
            <option value="all">All Status</option>
            <option value="pending_assignment">Pending Assignment</option>
            <option value="driver_assigned">Driver Assigned</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredBookings.map(booking => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onAssignDriver={handleAssignDriver}
          />
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No bookings found</p>
        </div>
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
