import { Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getStatusText } from '../../utils/bookingUtils'

export default function BookingFilters({ filter, setFilter }) {
  const navigate = useNavigate()
  const statuses = ['all', 'pending', 'in_transit', 'delivered']

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button 
          onClick={() => navigate('/booking/request')} 
          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm text-sm sm:text-base"
        >
          + New Booking
        </button>
        <button 
          onClick={() => navigate('/booking-status-guide')} 
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Status Guide</span>
          <span className="sm:hidden">Guide</span>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {statuses.map(status => (
          <button 
            key={status} 
            onClick={() => setFilter(status)} 
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium whitespace-nowrap text-sm sm:text-base ${
              filter === status 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'All' : getStatusText(status)}
          </button>
        ))}
      </div>
    </div>
  )
}
