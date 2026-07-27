import { useState, useEffect, useRef } from 'react'
import { PageHeader } from '@/features/dashboard'
import { Package, MapPin, CheckCircle, Navigation, Phone, Clock, Play, Power, Compass } from 'lucide-react'
import { useToast } from '@/components/ui'
import {
  useTripsQuery,
  useStartTripMutation,
  useEndTripMutation
} from '@/hooks/queries/useTrackingQueries'
import { auth, database, signInWithCustomToken, ref, set } from '@/lib/firebase'

const CITY_COORDS = {
  'LAGOS': { lat: 6.5244, lng: 3.3792 },
  'WARRI': { lat: 5.5184, lng: 5.7512 },
  'BENIN': { lat: 6.3350, lng: 5.6037 },
  'ENUGU': { lat: 6.4584, lng: 7.5464 },
  'PORT HARCOURT': { lat: 4.8156, lng: 7.0498 },
  'ABUJA': { lat: 9.0765, lng: 7.3986 },
  'IBADAN': { lat: 7.3775, lng: 3.9470 },
  'LOKOJA': { lat: 7.8024, lng: 6.7333 },
  'ILORIN': { lat: 8.4799, lng: 4.5418 },
  'KADUNA': { lat: 10.5105, lng: 7.4165 },
  'KANO': { lat: 12.0022, lng: 8.5920 }
}

function resolveCityCoords(cityText, defaultCoords) {
  if (!cityText) return defaultCoords
  const upper = cityText.toUpperCase()
  const matches = []
  for (const [key, value] of Object.entries(CITY_COORDS)) {
    const idx = upper.indexOf(key)
    if (idx !== -1) {
      matches.push({ key, value, idx })
    }
  }
  if (matches.length > 0) {
    matches.sort((a, b) => a.idx - b.idx)
    return matches[0].value
  }
  return defaultCoords
}

function formatLocation(loc) {
  if (!loc) return ''
  if (typeof loc === 'string') return loc
  return `${loc.city || ''} ${loc.address || ''}`.trim()
}

export default function DriverApp() {
  const { data: tripsData, isLoading, refetch } = useTripsQuery()
  const trips = tripsData?.records || []

  const [selectedTrip, setSelectedTrip] = useState(null)
  const [simulateMode, setSimulateMode] = useState(true)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simCoords, setSimCoords] = useState([])
  const [simIndex, setSimIndex] = useState(0)

  const startTripMutation = useStartTripMutation()
  const endTripMutation = useEndTripMutation()
  const { showToast, ToastContainer } = useToast()

  // Trackers
  const watchIdRef = useRef(null)
  const intervalIdRef = useRef(null)

  // Sync state if selected trip status updates from background
  useEffect(() => {
    if (selectedTrip) {
      const updated = trips.find(t => t._id === selectedTrip._id)
      if (updated) {
        setSelectedTrip(updated)
      }
    }
  }, [trips, selectedTrip])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking()
    }
  }, [])

  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }
    setIsSimulating(false)
  }

  const handleStartTrip = async (trip) => {
    try {
      showToast.info('Starting trip...', 'Contacting server')
      const result = await startTripMutation.mutateAsync(trip._id)
      const token = result?.token

      if (!token) {
        throw new Error('No custom authentication token returned from server')
      }

      // Authenticate with Firebase Realtime Database
      await signInWithCustomToken(auth, token)
      showToast.success('Authenticated', 'Connected to real-time tracking network')

      const originCoords = trip.booking?.pickupCoordinates && trip.booking.pickupCoordinates.lat
        ? { lat: Number(trip.booking.pickupCoordinates.lat), lng: Number(trip.booking.pickupCoordinates.lng) }
        : (trip.origin || resolveCityCoords(trip.booking?.pickupLocation, CITY_COORDS.LAGOS))

      const destCoords = trip.booking?.dropOffCoordinates && trip.booking.dropOffCoordinates.lat
        ? { lat: Number(trip.booking.dropOffCoordinates.lat), lng: Number(trip.booking.dropOffCoordinates.lng) }
        : (trip.destination || resolveCityCoords(trip.booking?.dropoffLocation, CITY_COORDS.ABUJA))

      if (simulateMode) {
        // Fetch OSRM route for simulation
        setIsSimulating(true)
        showToast.info('Fetching route', 'Initializing simulated route coordinates...')
        
        try {
          const res = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`
          )
          const routeData = await res.json()
          const coords = routeData.routes?.[0]?.geometry?.coordinates?.map(c => ({
            lat: c[1],
            lng: c[0]
          })) || []
          
          if (coords.length === 0) throw new Error('OSRM returned empty coordinates')
          
          setSimCoords(coords)
          setSimIndex(0)
          
          let idx = 0
          intervalIdRef.current = setInterval(() => {
            if (idx >= coords.length) {
              idx = 0 // Loop simulated route
            }
            
            const pt = coords[idx]
            const dbRef = ref(database, `/tracking/${trip._id}/location`)
            set(dbRef, {
              lat: pt.lat,
              lng: pt.lng,
              timestamp: new Date().toISOString()
            }).catch(e => console.error('Firebase simulate error:', e))
            
            setSimIndex(idx)
            idx++
          }, 4000)

          showToast.success('Simulated GPS', 'Route streaming active')
        } catch (err) {
          console.warn('Simulation OSRM fetch failed. Using fallback straight line.', err)
          // Fallback straight line
          const fallbackCoords = []
          for (let i = 0; i <= 50; i++) {
            const t = i / 50
            fallbackCoords.push({
              lat: originCoords.lat + (destCoords.lat - originCoords.lat) * t,
              lng: originCoords.lng + (destCoords.lng - originCoords.lng) * t
            })
          }
          setSimCoords(fallbackCoords)
          setSimIndex(0)
          
          let idx = 0
          intervalIdRef.current = setInterval(() => {
            if (idx >= fallbackCoords.length) idx = 0
            const pt = fallbackCoords[idx]
            const dbRef = ref(database, `/tracking/${trip._id}/location`)
            set(dbRef, {
              lat: pt.lat,
              lng: pt.lng,
              timestamp: new Date().toISOString()
            }).catch(e => console.error('Firebase simulate error:', e))
            setSimIndex(idx)
            idx++
          }, 4000)
        }
      } else {
        // Real GPS Watcher
        if (!navigator.geolocation) {
          showToast.error('GPS Not Supported', 'Your browser does not support Geolocation. Falling back to simulation.')
          setSimulateMode(true)
          handleStartTrip(trip)
          return
        }

        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            const dbRef = ref(database, `/tracking/${trip._id}/location`)
            set(dbRef, {
              lat: latitude,
              lng: longitude,
              timestamp: new Date().toISOString()
            }).catch(e => console.error('Firebase real GPS write error:', e))
          },
          (error) => {
            console.error('GPS watch error:', error)
            showToast.error('GPS Signal Error', error.message)
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
        showToast.success('Live GPS Activated', 'Streaming real device coordinates')
      }
      refetch()
    } catch (error) {
      showToast.error('Failed to start trip', error.message || 'Server error occurred')
    }
  }

  const handleEndTrip = async (trip) => {
    try {
      showToast.info('Ending trip...', 'Submitting delivery confirmation')
      stopTracking()
      await endTripMutation.mutateAsync(trip._id)
      showToast.success('Trip completed', 'Delivered successfully')
      setSelectedTrip(null)
      refetch()
    } catch (error) {
      showToast.error('Failed to end trip', error.message || 'Server error occurred')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="Driver App" subtitle="Manage your delivery jobs" />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Driver App"
        subtitle="Manage your delivery jobs"
      />

      {!selectedTrip ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Your Assigned Trips ({trips.length})
          </h3>

          {trips.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-sm">No active or pending trips assigned to you.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-150">
              {trips.map((trip) => {
                const booking = trip.booking || {}
                const isPending = trip.status === 'pending'
                const isActive = trip.status === 'active'
                const isCompleted = trip.status === 'completed'

                return (
                  <div
                    key={trip._id}
                    onClick={() => setSelectedTrip(trip)}
                    className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 px-3 rounded-lg transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 font-mono">
                          Trip: {trip._id.substring(trip._id.length - 8).toUpperCase()}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                          isCompleted ? 'bg-green-100 text-green-700' :
                          isActive ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-0.5">
                        <p className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400">From:</span>
                          {formatLocation(booking.pickupLocation) || 'Origin'}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400">To:</span>
                          {formatLocation(booking.dropoffLocation) || 'Destination'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start md:self-center">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                        View details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Trip Control Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <button
                    onClick={() => { setSelectedTrip(null); stopTracking(); }}
                    className="text-xs text-blue-600 hover:underline mb-1 block"
                  >
                    ← Back to trips list
                  </button>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Job</p>
                  <p className="text-xl font-bold text-slate-900 font-mono">
                    {selectedTrip._id.toUpperCase()}
                  </p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  selectedTrip.status === 'completed' ? 'bg-green-100 text-green-700' :
                  selectedTrip.status === 'active' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {selectedTrip.status}
                </span>
              </div>

              {/* Simulation Mode Toggle (only show when pending or simulation is already running) */}
              {(selectedTrip.status === 'pending' || isSimulating) && (
                <div className="mb-4 bg-white/75 backdrop-blur border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-500 animate-spin-slow" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Simulate Location Stream</p>
                      <p className="text-[10px] text-slate-400">Push simulated coordinates along route path to database.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={simulateMode}
                    disabled={selectedTrip.status !== 'pending'}
                    onChange={(e) => setSimulateMode(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Origin Coordinates</p>
                  <p className="text-sm font-semibold text-slate-800 font-mono">
                    {selectedTrip.origin ? `${selectedTrip.origin.lat.toFixed(4)}, ${selectedTrip.origin.lng.toFixed(4)}` : 'Nigeria'}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Destination Coordinates</p>
                  <p className="text-sm font-semibold text-slate-800 font-mono">
                    {selectedTrip.destination.lat.toFixed(4)}, {selectedTrip.destination.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Details card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Pickup Address
                </h3>
                <p className="text-sm font-semibold text-gray-800 ml-7">
                  {formatLocation(selectedTrip.booking?.pickupLocation) || 'Origin'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  Delivery Destination
                </h3>
                <p className="text-sm font-semibold text-gray-800 ml-7">
                  {formatLocation(selectedTrip.booking?.dropoffLocation) || 'Destination'}
                </p>
              </div>

              {/* Status Controls */}
              <div className="pt-4 border-t border-gray-100">
                {selectedTrip.status === 'pending' && (
                  <button
                    onClick={() => handleStartTrip(selectedTrip)}
                    disabled={startTripMutation.isPending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-bold text-sm shadow-md"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Start Trip & Stream Live GPS
                  </button>
                )}

                {selectedTrip.status === 'active' && (
                  <div className="space-y-3">
                    {isSimulating && (
                      <div className="text-center py-2 px-4 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-semibold text-indigo-700 animate-pulse flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                        Simulation active: streaming coordinate point {simIndex + 1}/{simCoords.length}
                      </div>
                    )}
                    {!isSimulating && (
                      <div className="text-center py-2 px-4 bg-emerald-50 border border-emerald-100 rounded-lg text-xs font-semibold text-emerald-700 animate-pulse flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                        Real Device GPS location watch active
                      </div>
                    )}
                    <button
                      onClick={() => handleEndTrip(selectedTrip)}
                      disabled={endTripMutation.isPending}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors font-bold text-sm shadow-md"
                    >
                      <Power className="w-4 h-4" />
                      Complete Delivery (End Trip)
                    </button>
                  </div>
                )}

                {selectedTrip.status === 'completed' && (
                  <div className="text-center py-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 flex flex-col items-center justify-center gap-2">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                    <p className="font-bold text-sm">Trip successfully delivered!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Quoted Freight Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Estimated Delivery Price</p>
                  <p className="font-bold text-lg text-slate-800">
                    ₦{(selectedTrip.booking?.price || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Booking ID</p>
                  <p className="font-medium text-slate-800 font-mono">{selectedTrip.booking?._id || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 font-heading-unique">Quick Help Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => showToast.info('Call Dispatcher', 'Calling Dara dispatch officer...')}
                  className="w-full px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors text-xs font-semibold text-left text-slate-700 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  Call Support Officer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}
