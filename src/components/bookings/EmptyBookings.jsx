import { Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function EmptyBookings() {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
      <p className="text-gray-600 mb-4">You haven't created any bookings yet</p>
      <button 
        onClick={() => navigate('/booking/request')} 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Create Your First Booking
      </button>
    </div>
  )
}
