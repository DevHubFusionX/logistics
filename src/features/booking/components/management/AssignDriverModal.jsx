import { useState, useMemo } from 'react'
import { X, UserCheck, Truck, Star, MapPin, Phone, RefreshCcw, AlertTriangle } from 'lucide-react'
import { useFleetQuery, useDriversQuery } from '@/hooks/queries/useAdminQueries'
import { useBookingMutations } from '@/features/booking'

export default function AssignDriverModal({ booking, onClose, onAssign }) {
  const { data: fleetResponse, isLoading: loadingFleet, isError: fleetError, refetch: fetchFleet } = useFleetQuery({ status: 'approved' })
  const { data: drivers = [], isLoading: loadingDrivers } = useDriversQuery({ status: 'active' })
  const { assignTruck } = useBookingMutations()
  const [selectedTruck, setSelectedTruck] = useState(null)
  const [loading, setLoading] = useState(false)

  const driverMap = useMemo(() => {
    const map = {}
    drivers.forEach(d => {
      map[d.id || d._id] = d
    })
    return map
  }, [drivers])

  const trucks = useMemo(() => {
    return fleetResponse?.records || []
  }, [fleetResponse])

  const handleAssign = async () => {
    if (!selectedTruck) return
    setLoading(true)
    try {
      await assignTruck.mutateAsync({ 
        bookingId: booking.id, 
        truckId: selectedTruck.id
      })
      onAssign(booking.id, selectedTruck)
      onClose()
    } catch (error) {
      console.error('Error assigning truck:', error)
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loadingFleet || loadingDrivers

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-indigo-950 px-6 py-5 text-white flex items-center justify-between z-10">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Assign Vehicle</h3>
            <p className="text-sm text-slate-300 mt-1">
              Select an approved truck to assign to Booking ID: <span className="font-semibold text-sky-400">{booking.trackingNumber || booking.id}</span>
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {/* Booking Summary Section */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 mb-6 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-indigo-500" />
              <span>Shipment Overview</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer</p>
                <p className="font-bold text-slate-800 mt-0.5 truncate">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Route</p>
                <p className="font-bold text-slate-800 mt-0.5 truncate">{booking.pickupCity} → {booking.deliveryCity}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weight</p>
                <p className="font-bold text-slate-800 mt-0.5">{booking.weight} kg</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Requested Vehicle</p>
                <p className="font-bold text-indigo-600 capitalize mt-0.5 truncate">{booking.serviceType}</p>
              </div>
            </div>
          </div>

          {/* Truck Selection Header */}
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
            <span>Approved Vehicles Available</span>
            {isLoading && <RefreshCcw className="w-4 h-4 animate-spin text-indigo-600" />}
          </h4>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-100 rounded-2xl">
              <RefreshCcw className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
              <p className="text-sm font-medium text-slate-500">Retrieving available fleet details...</p>
            </div>
          ) : fleetError ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-100 rounded-2xl text-center">
              <AlertTriangle className="w-12 h-12 text-rose-500 mb-3" />
              <p className="text-sm font-semibold text-slate-800 mb-4">Unable to load fleet details</p>
              <button 
                onClick={() => { fetchFleet() }} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-xs transition-colors"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {trucks.length === 0 ? (
                <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 bg-white rounded-2xl font-medium">
                  No approved/available vehicles found in the fleet.
                </div>
              ) : (
                trucks.map(truck => {
                  const driverObj = typeof truck.driver === 'object' && truck.driver
                    ? truck.driver
                    : (driverMap[truck.driverId || truck.driver] || null)
                  
                  const isSelected = selectedTruck?.id === truck.id
                  const driverName = driverObj
                    ? `${driverObj.firstName || driverObj.first_name || ''} ${driverObj.lastName || driverObj.last_name || ''}`.trim() || driverObj.name
                    : 'Unassigned Driver'

                  return (
                    <div
                      key={truck.id}
                      onClick={() => setSelectedTruck(truck)}
                      className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/45 shadow-sm'
                          : 'border-slate-100 hover:border-slate-200 bg-white hover:shadow-sm'
                      }`}
                    >
                      {/* Truck details header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                          } transition-colors`}>
                            <Truck className="w-5.5 h-5.5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-900">{truck.plateNumber || 'N/A'}</p>
                              <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-150 text-[10px] font-bold text-indigo-700 rounded-full uppercase tracking-wider">
                                {truck.vehicleType}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{truck.make} {truck.model} ({truck.truckCapacity || 'N/A'})</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-md">
                            <UserCheck className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Driver Details inside truck card */}
                      <div className="border-t border-slate-100 pt-3.5 mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-[10px]">
                            {driverName[0]?.toUpperCase()}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Driver</span>
                            <span className="font-semibold text-slate-700">{driverName}</span>
                          </div>
                        </div>
                        
                        {driverObj?.phone || driverObj?.phoneNumber ? (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Phone</span>
                              <span className="font-semibold text-slate-700">{driverObj.phone || driverObj.phoneNumber}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-400">
                            <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
                            <span className="font-semibold italic">Requires driver assignment</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>

        {/* Sticky Footer Actions */}
        <div className="sticky bottom-0 bg-white px-6 py-4.5 border-t border-slate-100 flex gap-4 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-3 border border-slate-200 hover:border-slate-350 text-slate-600 font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all active:scale-98"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedTruck || loading}
            className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-98"
          >
            {loading && <RefreshCcw className="w-4 h-4 animate-spin" />}
            {loading ? 'Assigning...' : 'Assign Vehicle'}
          </button>
        </div>
      </div>
    </div>
  )
}
