import { Package, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function EmptyBookings() {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
      <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <p className="font-heading font-semibold text-gray-700 mb-1">No bookings yet</p>
      <p className="text-sm text-gray-400 mb-4">Create your first shipment booking to get started.</p>
      <button
        onClick={() => navigate('/booking/request')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        <Plus className="w-4 h-4" /> New booking
      </button>
    </div>
  )
}
