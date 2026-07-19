import { useState, useMemo } from 'react'
import { PageHeader } from '@/features/dashboard'
import { useToast } from '@/components/ui'
import {
  Truck, Clock, CheckCircle, XCircle, Navigation,
  RefreshCw, AlertCircle, Search, Plus, Eye,
  User, MapPin, Calendar, ArrowRight, Loader2, X,
  UserCheck, AlertTriangle
} from 'lucide-react'
import { useTripsQuery, useDriversQuery, useAdminMutations } from '@/features/admin/hooks/queries/useAdminQueries'
import TripFormModal from '@/features/admin/components/trips/TripFormModal'

// ─── Status helpers ───────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending:    { label: 'Pending',    pill: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-400'   },
  in_transit: { label: 'In Transit', pill: 'bg-blue-100 text-blue-700',       dot: 'bg-blue-500'    },
  completed:  { label: 'Completed',  pill: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  delivered:  { label: 'Delivered',  pill: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  cancelled:  { label: 'Cancelled',  pill: 'bg-red-100 text-red-700',         dot: 'bg-red-400'     },
}
const getStatus = (s) => STATUS_CONFIG[s] || { label: s || 'Unknown', pill: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' }

// ─── Trip Detail Modal ────────────────────────────────────────────────────────
function TripDetailModal({ trip, drivers, onClose, onRefresh }) {
  const [selectedDriverId, setSelectedDriverId] = useState('')
  const [isAssigning, setIsAssigning] = useState(false)
  const { assignTripDriver, startTripMutation, completeTripMutation, cancelTripMutation } = useAdminMutations()

  if (!trip) return null

  console.log('[TripDetailModal] raw trip object:', trip)
  console.log('[TripDetailModal] trip.driver:', trip.driver)

  const cfg = getStatus(trip.status)
  const tripId = trip._id || trip.id
  const isActionPending = assignTripDriver.isPending || startTripMutation.isPending || completeTripMutation.isPending || cancelTripMutation.isPending

  const handleStart = () => startTripMutation.mutate({ tripId }, { onSuccess: () => { onRefresh(); onClose() } })
  const handleComplete = () => completeTripMutation.mutate({ tripId }, { onSuccess: () => { onRefresh(); onClose() } })
  const handleCancel = () => {
    if (!window.confirm('Cancel this trip?')) return
    cancelTripMutation.mutate({ tripId }, { onSuccess: () => { onRefresh(); onClose() } })
  }

  // driver field can be: null | string id | { _id } (unpopulated) | { _id, name, ... } (populated)
  const driverRef = trip.driver
  const driverRefId = typeof driverRef === 'string'
    ? driverRef
    : driverRef?._id || driverRef?.id || null

  // Try populated fields first, then fall back to looking up from drivers list
  const populatedName = typeof driverRef === 'object' && driverRef
    ? (driverRef.name || `${driverRef.firstName || ''} ${driverRef.lastName || ''}`.trim() || driverRef.email || null)
    : null
  const lookedUp = driverRefId ? drivers.find(d => d.id === driverRefId || d._id === driverRefId) : null
  const driverName = populatedName || lookedUp?.name || null
  const driverObj = lookedUp || (typeof driverRef === 'object' ? driverRef : null)

  const hasDriver = !!driverRefId

  console.log('[TripDetailModal] driverRefId:', driverRefId, '| populatedName:', populatedName, '| lookedUp:', lookedUp?.name, '| final:', driverName)

  const handleAssignDriver = () => {
    if (!selectedDriverId) return
    assignTripDriver.mutate(
      { tripId, driverId: selectedDriverId },
      {
        onSuccess: () => {
          setIsAssigning(false)
          setSelectedDriverId('')
          onRefresh()
          onClose()
        }
      }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Trip Details</h2>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.pill} bg-opacity-20`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">{tripId}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/15 rounded-lg transition-all border border-white/10">
              <X className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">

          {/* Route */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Route</p>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-gray-700">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">
                  {(() => {
                    const b = typeof trip.booking === 'object' ? trip.booking : null
                    if (b?.pickupLocation) return typeof b.pickupLocation === 'string' ? b.pickupLocation : b.pickupLocation?.city || b.pickupLocation?.address
                    return trip.origin?.lat != null ? `${trip.origin.lat}, ${trip.origin.lng}` : 'Origin not set'
                  })()}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              <div className="flex items-center gap-1.5 text-gray-700">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="font-medium">
                  {(() => {
                    const b = typeof trip.booking === 'object' ? trip.booking : null
                    if (b?.dropoffLocation) return typeof b.dropoffLocation === 'string' ? b.dropoffLocation : b.dropoffLocation?.city || b.dropoffLocation?.address
                    return trip.destination?.lat != null ? `${trip.destination.lat}, ${trip.destination.lng}` : 'Destination not set'
                  })()}
                </span>
              </div>
            </div>
          </div>

          {/* Driver */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned Driver</p>
              {hasDriver && !isAssigning && (
                <button
                  onClick={() => setIsAssigning(true)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Reassign
                </button>
              )}
            </div>

            {isAssigning ? (
              <div className="flex items-center gap-2">
                <select
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                  className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  autoFocus
                >
                  <option value="">Select a driver...</option>
                  {drivers.filter(d => d.isVerified).map(d => (
                    <option key={d.id} value={d.id}>{d.name} — {d.phone}</option>
                  ))}
                </select>
                <button
                  onClick={handleAssignDriver}
                  disabled={!selectedDriverId || assignTripDriver.isPending}
                  className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {assignTripDriver.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => { setIsAssigning(false); setSelectedDriverId('') }}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : hasDriver ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm">
                  {(driverName || 'D')[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{driverName || (typeof trip.driver === 'string' ? trip.driver : 'Driver assigned')}</p>
                  {driverObj?.email && <p className="text-xs text-gray-400">{driverObj.email}</p>}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-medium">No driver assigned</span>
                </div>
                <button
                  onClick={() => setIsAssigning(true)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Assign Driver
                </button>
              </div>
            )}
          </div>

          {/* Booking + User */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Booking ID</p>
              <p className="text-sm font-mono font-semibold text-gray-800 truncate">
                {typeof trip.booking === 'object' ? (trip.booking?._id || trip.booking?.id) : (trip.booking || '—')}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Customer</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {typeof trip.user === 'object' ? (trip.user?.name || trip.user?.email || trip.user?._id) : (trip.user || '—')}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Timeline</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400 flex items-center gap-1 text-xs"><Calendar className="w-3 h-3" /> Created</span>
                <p className="font-medium mt-0.5">{trip.createdAt ? new Date(trip.createdAt).toLocaleString() : '—'}</p>
              </div>
              <div>
                <span className="text-gray-400 flex items-center gap-1 text-xs"><Calendar className="w-3 h-3" /> Updated</span>
                <p className="font-medium mt-0.5">{trip.updatedAt ? new Date(trip.updatedAt).toLocaleString() : '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 shrink-0 flex gap-3">
          {trip.status === 'pending' && (
            <button
              onClick={handleStart}
              disabled={isActionPending}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {startTripMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
              Start Trip
            </button>
          )}
          {trip.status === 'in_transit' && (
            <button
              onClick={handleComplete}
              disabled={isActionPending}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {completeTripMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              Complete Trip
            </button>
          )}
          {(trip.status === 'pending' || trip.status === 'in_transit') && (
            <button
              onClick={handleCancel}
              disabled={isActionPending}
              className="py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {cancelTripMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              Cancel
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminTrips() {
  const [filters, setFilters] = useState({ search: '', status: '' })
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { showToast, ToastContainer } = useToast()

  const { data: tripsData, isLoading, isError, refetch } = useTripsQuery()
  const trips = useMemo(() => tripsData?.records || [], [tripsData])
  const pagination = tripsData?.pagination || {}
  const totalRecords = pagination.totalRecords ?? trips.length

  // After refetch, sync selectedTrip with fresh data so modal shows updated driver
  const handleRefreshAndSync = async () => {
    const result = await refetch()
    const freshTrips = result.data?.records || []
    console.log('[AdminTrips] fresh trips after refetch:', freshTrips)
    if (selectedTrip) {
      const id = selectedTrip._id || selectedTrip.id
      const updated = freshTrips.find(t => (t._id || t.id) === id)
      console.log('[AdminTrips] synced selectedTrip:', updated)
      if (updated) setSelectedTrip(updated)
    }
  }
  const { data: drivers = [] } = useDriversQuery()
  const { createTrip } = useAdminMutations()

  const verifiedDrivers = useMemo(() => drivers.filter(d => d.isVerified), [drivers])

  const filtered = useMemo(() => {
    return trips.filter(t => {
      const id = (t._id || t.id || '').toLowerCase()
      const driverName = typeof t.driver === 'object'
        ? `${t.driver?.firstName || ''} ${t.driver?.lastName || ''}`.toLowerCase()
        : ''
      const search = filters.search.toLowerCase()
      if (search && !id.includes(search) && !driverName.includes(search)) return false
      if (filters.status && t.status !== filters.status) return false
      return true
    })
  }, [trips, filters])

  const stats = useMemo(() => ({
    total: totalRecords,
    pending: trips.filter(t => t.status === 'pending').length,
    in_transit: trips.filter(t => t.status === 'in_transit').length,
    completed: trips.filter(t => t.status === 'completed').length,
    delivered: trips.filter(t => t.status === 'delivered').length,
    cancelled: trips.filter(t => t.status === 'cancelled').length,
    unassigned: trips.filter(t => {
      const ref = t.driver
      return !ref || (typeof ref === 'object' && !ref._id && !ref.id)
    }).length,
  }), [trips, totalRecords])

  const handleCreateTrip = (payload) => {
    createTrip.mutate(payload, {
      onSuccess: () => {
        setShowCreateModal(false)
        refetch()
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="text-gray-500 animate-pulse">Loading trips...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-lg font-bold text-gray-900">Failed to load trips</h3>
        <button onClick={() => refetch()} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <PageHeader
          title="Trip Management"
          subtitle={`${totalRecords} total trips · ${stats.unassigned} unassigned`}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create Trip
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total',      value: stats.total,      icon: Navigation,    color: 'text-slate-600',   bg: 'bg-slate-100'   },
          { label: 'Pending',    value: stats.pending,    icon: Clock,         color: 'text-amber-600',   bg: 'bg-amber-100'   },
          { label: 'In Transit', value: stats.in_transit, icon: Truck,         color: 'text-blue-600',    bg: 'bg-blue-100'    },
          { label: 'Completed',  value: stats.completed,  icon: CheckCircle,   color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Cancelled',  value: stats.cancelled,  icon: XCircle,       color: 'text-red-600',     bg: 'bg-red-100'     },
          { label: 'Unassigned', value: stats.unassigned, icon: User,          color: 'text-orange-600',  bg: 'bg-orange-100'  },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className={`text-2xl font-bold mt-0.5 ${color}`}>{value}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search by trip ID or driver name..."
              value={filters.search}
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-sm font-medium"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="completed">Completed</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {(filters.search || filters.status) && (
            <button
              onClick={() => setFilters({ search: '', status: '' })}
              className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Navigation className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No trips found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or create a new trip</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trip ID</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Driver</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Booking</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Origin → Dest</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Created</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(trip => {
                  const id = trip._id || trip.id
                  const cfg = getStatus(trip.status)

                  // driver can be null | string | { _id } | { _id, name, ... }
                  const driverRef = trip.driver
                  const driverRefId = typeof driverRef === 'string'
                    ? driverRef
                    : driverRef?._id || driverRef?.id || null
                  const populatedName = typeof driverRef === 'object' && driverRef
                    ? (driverRef.name || `${driverRef.firstName || ''} ${driverRef.lastName || ''}`.trim() || null)
                    : null
                  const lookedUp = driverRefId ? verifiedDrivers.find(d => d.id === driverRefId || d._id === driverRefId) : null
                  const dName = populatedName || lookedUp?.name || null

                  // Resolve human-readable locations from booking or fall back to coords
                  const bookingObj = typeof trip.booking === 'object' ? trip.booking : null
                  const originLabel = bookingObj?.pickupLocation
                    ? (typeof bookingObj.pickupLocation === 'string' ? bookingObj.pickupLocation : bookingObj.pickupLocation?.city || bookingObj.pickupLocation?.address)
                    : trip.origin?.lat != null ? `${trip.origin.lat.toFixed(3)}, ${trip.origin.lng.toFixed(3)}` : null
                  const destLabel = bookingObj?.dropoffLocation
                    ? (typeof bookingObj.dropoffLocation === 'string' ? bookingObj.dropoffLocation : bookingObj.dropoffLocation?.city || bookingObj.dropoffLocation?.address)
                    : trip.destination?.lat != null ? `${trip.destination.lat.toFixed(3)}, ${trip.destination.lng.toFixed(3)}` : null

                  const bookingId = bookingObj?._id || bookingObj?.id || (typeof trip.booking === 'string' ? trip.booking : null)

                  console.log(`[AdminTrips row] id=${id?.slice(-8)} driverRef:`, driverRef, '→ resolved:', dName)

                  return (
                    <tr key={id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs font-bold text-gray-700">{id?.slice(-10).toUpperCase()}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${cfg.pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {dName ? (
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-xs flex-shrink-0">
                              {dName[0].toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-800 truncate max-w-[120px]">{dName}</span>
                          </div>
                        ) : (
                          <span className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold">
                            <AlertTriangle className="w-3.5 h-3.5" /> Unassigned
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-gray-500">{bookingId?.slice(-8).toUpperCase() || '—'}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          {originLabel ? (
                            <>
                              <span className="font-medium truncate max-w-[100px]" title={originLabel}>{originLabel}</span>
                              <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
                              <span className="font-medium truncate max-w-[100px]" title={destLabel}>{destLabel || '—'}</span>
                            </>
                          ) : (
                            <span className="text-gray-400 italic">No location</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400">
                        {trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelectedTrip(trip)}
                          className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedTrip && (
        <TripDetailModal
          trip={selectedTrip}
          drivers={verifiedDrivers}
          onClose={() => setSelectedTrip(null)}
          onRefresh={handleRefreshAndSync}
        />
      )}

      <TripFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTrip}
        drivers={verifiedDrivers}
        isSubmitting={createTrip.isPending}
      />

      <ToastContainer />
    </div>
  )
}
