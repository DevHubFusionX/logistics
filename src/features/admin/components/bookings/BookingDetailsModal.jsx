import { X, MapPin, Package, Calendar, Clock, Truck, CheckCircle, AlertCircle, Info } from 'lucide-react'

const STATUSES = [
  { id: 'pending',    label: 'Pending',    icon: Clock },
  { id: 'confirmed',  label: 'Confirmed',  icon: CheckCircle },
  { id: 'processing', label: 'Processing', icon: Package },
  { id: 'in_transit', label: 'In Transit', icon: Truck },
  { id: 'delivered',  label: 'Delivered',  icon: CheckCircle },
]

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || '—'}</p>
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
          <Icon className="w-3.5 h-3.5 text-sky-700" />
        </div>
        <h3 className="text-sm font-heading font-bold text-gray-900">{title}</h3>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
        {children}
      </div>
    </div>
  )
}

export default function BookingDetailsModal({ booking, onClose, getStatusBadge, getStatusText, onAssignDriver, onRemoveTruck }) {
  if (!booking) return null

  const currentIdx  = STATUSES.findIndex(s => s.id === booking.status)
  const isCancelled = booking.status === 'cancelled'

  const pickupAddr = typeof booking.pickupLocation === 'string'
    ? booking.pickupLocation
    : [booking.pickupLocation?.address, booking.pickupLocation?.city, booking.pickupLocation?.state].filter(Boolean).join(', ')

  const dropoffAddr = typeof booking.dropoffLocation === 'string'
    ? booking.dropoffLocation
    : [booking.dropoffLocation?.address, booking.dropoffLocation?.city, booking.dropoffLocation?.state].filter(Boolean).join(', ')

  const amount    = booking.amount || booking.price || 0
  const trackingId = booking.trackingNumber || booking.tracking_number || booking._id

  const hasAssignment = !!(booking.driverName || booking.truckPlateNumber || booking.driverId || booking.truckId)
  const canAssign   = !!onAssignDriver && booking.status === 'pending' && !hasAssignment
  const canReassign = !!onAssignDriver && !isCancelled && booking.status !== 'delivered' && (booking.status === 'processing' || hasAssignment)

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-heading font-bold text-gray-900">Booking details</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">{trackingId}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* Status stepper */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            {isCancelled ? (
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Booking cancelled</p>
                  <p className="text-xs text-gray-400 mt-0.5">This booking is no longer active.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                {STATUSES.map((s, i) => {
                  const done   = i < currentIdx
                  const active = i === currentIdx
                  const Icon   = s.icon
                  return (
                    <div key={s.id} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          done   ? 'bg-sky-700 text-white' :
                          active ? 'bg-sky-700 text-white ring-4 ring-sky-100' :
                                   'bg-white border border-gray-200 text-gray-400'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-[10px] font-semibold hidden sm:block ${
                          active ? 'text-sky-700' : done ? 'text-gray-500' : 'text-gray-300'
                        }`}>{s.label}</span>
                      </div>
                      {i < STATUSES.length - 1 && (
                        <div className="flex-1 h-px mx-2 mb-4 sm:mb-5 relative">
                          <div className="absolute inset-0 bg-gray-200 rounded-full" />
                          <div className={`absolute inset-0 rounded-full bg-sky-700 transition-all duration-500 ${done ? 'w-full' : 'w-0'}`} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Amount + status */}
          <div className="flex items-center justify-between px-1">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Amount</p>
              <p className="font-heading font-black text-2xl text-gray-900">₦{amount.toLocaleString()}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusBadge(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>

          {/* Route */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Section icon={MapPin} title="Pickup">
              <Field label="Address" value={pickupAddr} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Contact" value={booking.pickupPerson?.name} />
                <Field label="Phone"   value={booking.pickupPerson?.phone} />
              </div>
            </Section>
            <Section icon={MapPin} title="Delivery">
              <Field label="Address" value={dropoffAddr} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Receiver" value={booking.receiverPerson?.name} />
                <Field label="Phone"    value={booking.receiverPerson?.phone} />
              </div>
            </Section>
          </div>

          {/* Cargo */}
          <Section icon={Package} title="Cargo">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Field label="Type"     value={booking.cargoType || booking.goodsType} />
              <Field label="Weight"   value={`${booking.weight || booking.cargoWeightKg || 0} kg`} />
              <Field label="Quantity" value={`${booking.quantity || 1} units`} />
              <Field label="Vehicle"  value={booking.serviceType || booking.vehicleType} />
            </div>
            {(booking.isFragile || booking.isPerishable || booking.tempControlCelsius) && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                {booking.isFragile && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-red-50 text-red-600 rounded-full">
                    <Info className="w-3 h-3" /> Fragile
                  </span>
                )}
                {booking.isPerishable && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
                    <Info className="w-3 h-3" /> Perishable
                  </span>
                )}
                {booking.tempControlCelsius && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-cyan-50 text-cyan-600 rounded-full">
                    <Info className="w-3 h-3" /> {booking.tempControlCelsius}°C
                  </span>
                )}
              </div>
            )}
          </Section>

          {/* Assigned Transportation */}
          {(booking.truckPlateNumber || booking.driverName) && (
            <Section icon={Truck} title="Assigned Transportation">
              <div className="grid grid-cols-2 gap-4">
                {booking.truckPlateNumber && (
                  <div>
                    <Field label="Plate Number" value={booking.truckPlateNumber} />
                    {booking.truckMakeModel && (
                      <p className="text-xs text-gray-500 mt-1 font-semibold">{booking.truckMakeModel}</p>
                    )}
                  </div>
                )}
                {booking.driverName && (
                  <div>
                    <Field label="Driver" value={booking.driverName} />
                    {booking.driverPhone && (
                      <p className="text-xs text-gray-500 mt-1 font-mono font-semibold">{booking.driverPhone}</p>
                    )}
                    {booking.driverEmail && (
                      <p className="text-xs text-gray-400 font-medium truncate mt-0.5">{booking.driverEmail}</p>
                    )}
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-gray-300 flex-shrink-0" />
              <Field label="Booked on" value={new Date(booking.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })} />
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-gray-300 flex-shrink-0" />
              <Field label="Est. delivery" value={new Date(booking.pickupDate || booking.estimatedDeliveryDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })} />
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
              <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-gray-700 leading-relaxed">"{booking.notes}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-colors"
          >
            Close
          </button>

          {canAssign && (
            <button
              onClick={() => {
                onClose()
                onAssignDriver(booking)
              }}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100"
            >
              <Truck className="w-4 h-4" /> Assign Truck
            </button>
          )}

          {canReassign && (
            <>
              <button
                onClick={() => {
                  onClose()
                  onAssignDriver(booking)
                }}
                className="flex-1 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-150 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                Reassign
              </button>
              {onRemoveTruck && (
                <button
                  onClick={() => {
                    onClose()
                    onRemoveTruck(booking)
                  }}
                  className="py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  Unassign
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
