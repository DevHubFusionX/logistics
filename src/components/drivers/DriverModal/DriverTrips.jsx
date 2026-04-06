import { MapPin, Clock, ArrowRight, Package, Calendar } from 'lucide-react'
import { useDriverTripsQuery } from '../../../hooks/queries/useAdminQueries'
import { getStatusBadge, getStatusText } from '../../../utils/bookingUtils'

export default function DriverTrips({ driver }) {
  const { data: tripData, isLoading, isError } = useDriverTripsQuery(driver.id, { 
    limit: 100 // Get all recent trips
  })

  const trips = tripData?.records || []

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 animate-pulse">Loading assigned trips...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-red-50 rounded-xl border border-red-100">
        <p className="text-red-600 font-medium">Failed to load trip history</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Shipment Assignments
        </h3>
        <p className="text-sm text-gray-600">
          Showing active and historical trips for <span className="font-semibold text-gray-900">{driver.name}</span>
        </p>
      </div>

      <div className="space-y-3">
        {trips.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-1">No trips assigned yet</h4>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              This driver hasn't been assigned any shipments from the bookings management system.
            </p>
          </div>
        ) : (
          trips.map((trip) => {
            const id = trip._id || trip.id
            const destination = trip.dropoffLocation?.city || trip.destination || 'N/A'
            const date = trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : 'N/A'

            return (
              <div 
                key={id} 
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-gray-900 bg-gray-100 px-2 py-1 rounded tracking-tighter">
                      {trip.tracking_number || id.slice(-8).toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${getStatusBadge(trip.status)}`}>
                      {getStatusText(trip.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                    <Calendar className="w-3 h-3" />
                    {date}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{trip.pickupLocation?.city || trip.origin || 'Origin'}</span>
                      <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
                      <span className="font-semibold text-gray-900 truncate">{destination}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Weight</p>
                    <p className="text-xs font-bold text-gray-900">{trip.cargoWeightKg || trip.weight || 0} kg</p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
