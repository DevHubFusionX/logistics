import { useState, useMemo } from 'react'
import { X, UserCheck, Truck, Phone, RefreshCcw, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { useFleetQuery, useDriversQuery, useAdminMutations } from '@/hooks/queries/useAdminQueries'
import { useBookingMutations } from '@/features/booking'

export default function AssignDriverModal({ booking, onClose, onAssign }) {
  const { data: fleetResponse, isLoading: loadingFleet, isError: fleetError, refetch: fetchFleet } = useFleetQuery({ status: 'approved' })
  const { data: drivers = [], isLoading: loadingDrivers } = useDriversQuery()
  const { assignTruck } = useBookingMutations()
  const { createTrip } = useAdminMutations()

  const [selectedTruck, setSelectedTruck] = useState(null)
  const [step, setStep] = useState('select') // 'select' | 'confirm' | 'done'
  const [error, setError] = useState(null)

  const isSubmitting = assignTruck.isPending || createTrip.isPending

  const driverMap = useMemo(() => {
    const map = {}
    drivers.forEach(d => { map[d.id || d._id] = d })
    return map
  }, [drivers])

  const trucks = useMemo(() => fleetResponse?.records || [], [fleetResponse])

  // The driver attached to the selected truck
  const assignedDriver = selectedTruck
    ? (typeof selectedTruck.driver === 'object' && selectedTruck.driver)
      || driverMap[selectedTruck.driverId || selectedTruck.driver]
      || null
    : null

  const driverName = assignedDriver
    ? `${assignedDriver.firstName || assignedDriver.first_name || ''} ${assignedDriver.lastName || assignedDriver.last_name || ''}`.trim() || assignedDriver.name
    : null

  const handleAssign = async () => {
    if (!selectedTruck) return
    setError(null)

    try {
      // Step 1: assign truck to booking
      await assignTruck.mutateAsync({
        bookingId: booking.id,
        truckId: selectedTruck.id
      })

      // Step 2: create trip — links booking + driver in the system
      const driverId = assignedDriver?._id || assignedDriver?.id || selectedTruck.driverId || null
      await createTrip.mutateAsync({
        bookingId: booking.id,
        ...(driverId && { driverId })
      })

      setStep('done')
    } catch (err) {
      setError(err.message || 'Assignment failed. Please try again.')
    }
  }

  const handleDone = () => {
    onAssign(booking.id, selectedTruck)
    onClose()
  }

  const isLoading = loadingFleet || loadingDrivers

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100 flex flex-col">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-indigo-950 px-6 py-5 text-white flex items-center justify-between z-10 shrink-0">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Assign Vehicle & Create Trip</h3>
            <p className="text-sm text-slate-300 mt-1">
              Booking: <span className="font-semibold text-sky-400">{booking.trackingNumber || booking.id}</span>
              <span className="mx-2 text-slate-600">·</span>
              <span className="text-slate-300">{booking.pickupCity} → {booking.deliveryCity}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-slate-300 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success state */}
        {step === 'done' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Assignment Complete</h4>
              <p className="text-sm text-gray-500 mt-1">
                Truck <span className="font-semibold text-gray-700">{selectedTruck?.plateNumber}</span> has been assigned
                {driverName && <> with driver <span className="font-semibold text-gray-700">{driverName}</span></>}.
                A trip has been created for this booking.
              </p>
            </div>
            <button
              onClick={handleDone}
              className="mt-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">

              {/* Booking summary */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Shipment Overview</p>
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
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vehicle Type</p>
                    <p className="font-bold text-indigo-600 capitalize mt-0.5 truncate">{booking.serviceType}</p>
                  </div>
                </div>
              </div>

              {/* What happens note */}
              <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 mb-5 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-sky-800 font-medium leading-relaxed">
                  Selecting a truck will <strong>assign it to this booking</strong> and <strong>create a trip</strong> — the driver linked to the truck will receive the job.
                </p>
              </div>

              {/* Truck list */}
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Select an Approved Vehicle</span>
                {isLoading && <RefreshCcw className="w-4 h-4 animate-spin text-indigo-600" />}
              </p>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-100 rounded-2xl">
                  <RefreshCcw className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
                  <p className="text-sm font-medium text-slate-500">Loading fleet...</p>
                </div>
              ) : fleetError ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-100 rounded-2xl text-center">
                  <AlertTriangle className="w-10 h-10 text-rose-500 mb-3" />
                  <p className="text-sm font-semibold text-slate-800 mb-4">Unable to load fleet</p>
                  <button onClick={() => fetchFleet()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold">
                    Retry
                  </button>
                </div>
              ) : trucks.length === 0 ? (
                <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 bg-white rounded-2xl font-medium">
                  No approved vehicles available in the fleet.
                </div>
              ) : (
                <div className="space-y-3">
                  {trucks.map(truck => {
                    const driverObj = typeof truck.driver === 'object' && truck.driver
                      ? truck.driver
                      : (driverMap[truck.driverId || truck.driver] || null)

                    const truckDriverName = driverObj
                      ? `${driverObj.firstName || driverObj.first_name || ''} ${driverObj.lastName || driverObj.last_name || ''}`.trim() || driverObj.name
                      : null

                    const isSelected = selectedTruck?.id === truck.id

                    return (
                      <div
                        key={truck.id}
                        onClick={() => setSelectedTruck(truck)}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                            : 'border-slate-100 hover:border-slate-200 bg-white hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3.5">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <Truck className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-slate-900">{truck.plateNumber || 'N/A'}</p>
                                <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-700 rounded-full uppercase tracking-wider">
                                  {truck.vehicleType}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 font-medium mt-0.5">{truck.make} {truck.model} · {truck.truckCapacity || 'N/A'}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow">
                              <UserCheck className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Driver row */}
                        <div className="border-t border-slate-100 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {truckDriverName ? (
                            <>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-[10px]">
                                  {truckDriverName[0]?.toUpperCase()}
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Driver</span>
                                  <span className="font-semibold text-slate-700">{truckDriverName}</span>
                                </div>
                              </div>
                              {(driverObj?.phone || driverObj?.phoneNumber) && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-slate-400" />
                                  <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Phone</span>
                                    <span className="font-semibold text-slate-700">{driverObj.phone || driverObj.phoneNumber}</span>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex items-center gap-2 text-amber-600 col-span-2">
                              <AlertTriangle className="w-4 h-4 animate-pulse" />
                              <span className="font-semibold text-xs italic">No driver assigned to this truck — trip will be created without a driver</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 font-medium">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-slate-100 flex gap-4 shrink-0">
              <button
                onClick={onClose}
                className="flex-1 px-5 py-3 border border-slate-200 text-slate-600 font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedTruck || isSubmitting}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
              >
                {isSubmitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Assigning...</>
                  : <><Truck className="w-4 h-4" /> Assign & Create Trip</>
                }
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
