import { useState, useEffect } from 'react'
import { X, UserCheck, Truck, Star, MapPin, Phone, RefreshCcw } from 'lucide-react'
import driverService from '../../services/driverService'
import bookingService from '../../services/bookingService'

export default function AssignDriverModal({ booking, onClose, onAssign }) {
  const [drivers, setDrivers] = useState([])
  const [loadingDrivers, setLoadingDrivers] = useState(true)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDrivers()
  }, [])

  const fetchDrivers = async () => {
    setLoadingDrivers(true)
    try {
      const response = await driverService.getDrivers({ status: 'active' })
      const driversData = response.data?.drivers || response.data || []
      setDrivers(driversData)
    } catch (error) {
      console.error('Error fetching drivers:', error)
    } finally {
      setLoadingDrivers(false)
    }
  }

  const handleAssign = async () => {
    if (!selectedDriver) return
    setLoading(true)
    try {
      // Update shipment with driver_id
      await bookingService.updateBooking(booking.id, {
        driverId: selectedDriver.id,
        status: 'confirmed',
        statusDescription: `Driver ${selectedDriver.profile?.first_name} ${selectedDriver.profile?.last_name} has been assigned.`
      })
      onAssign(booking.id, selectedDriver)
    } catch (error) {
      console.error('Error assigning driver:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Assign Driver</h3>
            <p className="text-sm text-gray-600">Booking: {booking.trackingNumber || booking.id}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Customer</p>
                <p className="font-semibold">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-gray-600">Route</p>
                <p className="font-semibold">{booking.pickupCity} → {booking.deliveryCity}</p>
              </div>
              <div>
                <p className="text-gray-600">Weight</p>
                <p className="font-semibold">{booking.weight} kg</p>
              </div>
              <div>
                <p className="text-gray-600">Service</p>
                <p className="font-semibold capitalize">{booking.serviceType}</p>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
            Available Drivers
            {loadingDrivers && <RefreshCcw className="w-4 h-4 animate-spin text-blue-600" />}
          </h4>

          {loadingDrivers ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {drivers.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-100 rounded-xl">
                  No active drivers found
                </div>
              ) : (
                drivers.map(driver => (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedDriver?.id === driver.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                          {driver.profile?.avatar_url ? (
                            <img src={driver.profile.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            driver.profile?.first_name ? `${driver.profile.first_name[0]}${driver.profile.last_name[0]}` : '?'
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{driver.profile?.first_name} {driver.profile?.last_name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              < Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              <span>{driver.rating || '4.5'}</span>
                            </div>
                            <span>•</span>
                            <span>{driver.total_trips || '0'} trips</span>
                          </div>
                        </div>
                      </div>
                      {selectedDriver?.id === driver.id && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <UserCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 truncate">
                          {driver.vehicle?.make} {driver.vehicle?.model} • {driver.vehicle?.plate_number}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 capitalize">{driver.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{driver.profile?.phone || 'N/A'}</span>
                      </div>
                      <div className="flex justify-end">
                        <span className={`px-2 py-1 ${driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} rounded-full text-xs font-semibold`}>
                          {driver.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDriver || loading}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            {loading && <RefreshCcw className="w-4 h-4 animate-spin" />}
            {loading ? 'Assigning...' : 'Assign Driver'}
          </button>
        </div>
      </div>
    </div>
  )
}
