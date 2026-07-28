import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Gauge, ShieldCheck, Thermometer, Clock, Navigation, Wifi, WifiOff } from 'lucide-react'
import { auth, database, signInWithCustomToken, ref, onValue } from '@/lib/firebase'
import { useTripUserTokenQuery } from '@/hooks/queries/useTrackingQueries'

// Coordinate lookup for Nigerian cities
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
    if (idx !== -1) matches.push({ key, value, idx })
  }
  if (matches.length > 0) {
    matches.sort((a, b) => a.idx - b.idx)
    return matches[0].value
  }
  return defaultCoords
}


// Dynamically load Leaflet from CDN
const loadLeaflet = () => {
  return new Promise((resolve) => {
    if (window.L) { resolve(window.L); return }
    let cssLoaded = false
    let jsLoaded = false
    const checkLoaded = () => { if (cssLoaded && jsLoaded) resolve(window.L) }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    link.onload = () => { cssLoaded = true; checkLoaded() }
    link.onerror = () => { cssLoaded = true; checkLoaded() }
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    script.crossOrigin = ''
    script.onload = () => { jsLoaded = true; checkLoaded() }
    script.onerror = () => { jsLoaded = true; checkLoaded() }
    document.body.appendChild(script)
  })
}

export default function TrackingMap({ shipment, onLocationUpdate }) {
  const containerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const truckMarkerRef = useRef(null)
  const userMarkerRef = useRef(null)

  const [mapLoaded, setMapLoaded] = useState(false)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [showTelemetry, setShowTelemetry] = useState(true)

  const originText = shipment.origin || shipment.pickupCity || 'Lagos'
  const destinationText = shipment.destination || shipment.deliveryCity || 'Abuja'

  const startCoords = shipment.pickupCoordinates && shipment.pickupCoordinates.lat
    ? { lat: Number(shipment.pickupCoordinates.lat), lng: Number(shipment.pickupCoordinates.lng) }
    : resolveCityCoords(originText, CITY_COORDS.LAGOS)

  const endCoords = shipment.dropOffCoordinates && shipment.dropOffCoordinates.lat
    ? { lat: Number(shipment.dropOffCoordinates.lat), lng: Number(shipment.dropOffCoordinates.lng) }
    : shipment.currentTripCoordinates && shipment.currentTripCoordinates.lat
      ? { lat: Number(shipment.currentTripCoordinates.lat), lng: Number(shipment.currentTripCoordinates.lng) }
      : resolveCityCoords(destinationText, CITY_COORDS.ABUJA)

  // Haversine distance
  const getDistanceKm = (c1, c2) => {
    const R = 6371
    const dLat = (c2.lat - c1.lat) * Math.PI / 180
    const dLng = (c2.lng - c1.lng) * Math.PI / 180
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2
    return Math.max(1, Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.3))
  }

  // Determine initial truck position based on status — no simulation
  const isDelivered = shipment.status === 'delivered'
  const isInTransit = shipment.status === 'in_transit'

  // Truck starts at origin for non-transit, at destination for delivered
  const staticTruckCoords = isDelivered
    ? (shipment.currentTripCoordinates?.lat ? { lat: Number(shipment.currentTripCoordinates.lat), lng: Number(shipment.currentTripCoordinates.lng) } : endCoords)
    : startCoords

  // Telemetry state — static for non-Firebase, updated live for Firebase
  const [telemetry, setTelemetry] = useState(() => ({
    speed: 0,
    distanceRemaining: isDelivered ? 0 : getDistanceKm(startCoords, endCoords),
    eta: isDelivered ? 'Arrived' : (shipment.estimatedDelivery || 'Awaiting dispatch'),
    locationName: isDelivered ? destinationText : originText,
    temperature: shipment.temperature || 'N/A',
    status: shipment.status || 'confirmed'
  }))

  const updateTruckMarker = (lat, lng) => {
    if (truckMarkerRef.current) truckMarkerRef.current.setLatLng([lat, lng])
    if (mapInstanceRef.current) mapInstanceRef.current.panTo([lat, lng], { animate: true, duration: 0.5 })
  }

  // Fetch OSRM route for the visual path only (not for simulation)
  useEffect(() => {
    let active = true
    const fetchRoute = async () => {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=geojson`
        )
        if (!res.ok) throw new Error('OSRM failed')
        const data = await res.json()
        if (!data.routes?.length) throw new Error('No route')
        if (active) {
          setRouteCoordinates(data.routes[0].geometry.coordinates.map(c => ({ lat: c[1], lng: c[0] })))
        }
      } catch {
        // Straight-line fallback for visual polyline only (not animation)
        if (active) {
          const coords = []
          for (let i = 0; i <= 100; i++) {
            const t = i / 100
            coords.push({
              lat: startCoords.lat + (endCoords.lat - startCoords.lat) * t,
              lng: startCoords.lng + (endCoords.lng - startCoords.lng) * t
            })
          }
          setRouteCoordinates(coords)
        }
      }
    }
    fetchRoute()
    return () => { active = false }
  }, [startCoords.lat, startCoords.lng, endCoords.lat, endCoords.lng])

  // Initialize Map once route is ready
  useEffect(() => {
    if (routeCoordinates.length === 0) return
    let mapInstance = null

    loadLeaflet().then((L) => {
      if (!containerRef.current) return
      if (mapInstanceRef.current) mapInstanceRef.current.remove()

      mapInstance = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false
      })
      mapInstanceRef.current = mapInstance

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapInstance)

      // Route polyline — solid for delivered, dashed for active/pending
      L.polyline(routeCoordinates.map(c => [c.lat, c.lng]), {
        color: isDelivered ? '#10b981' : '#0056B8',
        weight: 4,
        opacity: 0.6,
        dashArray: isDelivered ? null : '8, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(mapInstance)

      // Origin pin
      const originIcon = L.divIcon({
        className: '',
        html: `<div style="background:#10b981;color:white;font-size:10px;font-weight:700;padding:4px 8px;border-radius:20px;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,0.25);border:2px solid white;">📦 ${originText.length > 22 ? originText.slice(0, 20) + '…' : originText}</div>`,
        iconAnchor: [0, 28]
      })
      L.marker([startCoords.lat, startCoords.lng], { icon: originIcon })
        .bindPopup(`<b>Origin</b><br>${originText}`)
        .addTo(mapInstance)

      // Destination pin
      const destIcon = L.divIcon({
        className: '',
        html: `<div style="background:#ef4444;color:white;font-size:10px;font-weight:700;padding:4px 8px;border-radius:20px;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,0.25);border:2px solid white;">🏁 ${destinationText.length > 22 ? destinationText.slice(0, 20) + '…' : destinationText}</div>`,
        iconAnchor: [0, 28]
      })
      L.marker([endCoords.lat, endCoords.lng], { icon: destIcon })
        .bindPopup(`<b>Destination</b><br>${destinationText}`)
        .addTo(mapInstance)

      // Truck marker — pinned statically at correct position
      const truckIcon = L.divIcon({
        className: '',
        html: `<div style="font-size:32px;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3));transform:scaleX(-1);">🚚</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
      const truckMarker = L.marker([staticTruckCoords.lat, staticTruckCoords.lng], { icon: truckIcon })
        .bindPopup('<b>Delivery Vehicle</b>')
        .addTo(mapInstance)
      truckMarkerRef.current = truckMarker

      // User location (best effort, silent fail)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            const userIcon = L.divIcon({
              className: '',
              html: `<div style="position:relative;width:20px;height:20px;">
                <div style="position:absolute;width:14px;height:14px;background:#3b82f6;border:2px solid white;border-radius:50%;top:3px;left:3px;box-shadow:0 2px 6px rgba(0,0,0,0.3);z-index:10;"></div>
                <div style="position:absolute;width:20px;height:20px;background:rgba(59,130,246,0.35);border-radius:50%;top:0;left:0;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
              </div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })
            const userMarker = L.marker([latitude, longitude], { icon: userIcon })
              .bindPopup('<b>Your Location</b>')
              .addTo(mapInstance)
            userMarkerRef.current = userMarker
          },
          () => { }, // silent
          { enableHighAccuracy: false, timeout: 5000 }
        )
      }

      // Fit bounds to show full route
      const bounds = L.latLngBounds([[startCoords.lat, startCoords.lng], [endCoords.lat, endCoords.lng]])
      mapInstance.fitBounds(bounds, { padding: [60, 60] })

      setMapLoaded(true)
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 250)
    })

    return () => { if (mapInstance) mapInstance.remove() }
  }, [routeCoordinates])

  // Firebase — token enabled for both active (live) and delivered (last known position)
  const tripId = shipment.tripId
  const isTripActive = isInTransit && !!tripId
  const { data: tokenData, isLoading: tokenLoading } = useTripUserTokenQuery(tripId, {
    enabled: !!tripId && (isInTransit || isDelivered)
  })
  const firebaseUserToken = tokenData?.token

  useEffect(() => {
    if (!mapLoaded || !isTripActive || !firebaseUserToken) return

    let unsubscribe = null

    const connect = async () => {
      try {
        await signInWithCustomToken(auth, firebaseUserToken)
        const locationRef = ref(database, `/tracking/${tripId}/location`)

        unsubscribe = onValue(locationRef, (snapshot) => {
          const val = snapshot.val()
          if (!val || typeof val.lat !== 'number') return

          const { lat, lng } = val
          updateTruckMarker(lat, lng)

          const distanceRemaining = getDistanceKm({ lat, lng }, endCoords)
          const speed = distanceRemaining === 0 ? 0 : Math.floor(72 + Math.sin(Date.now() / 10000) * 8)
          let etaStr = 'Arrived'
          if (distanceRemaining > 0) {
            const hrs = Math.floor(distanceRemaining / (speed || 80))
            const mins = Math.round(((distanceRemaining / (speed || 80)) - hrs) * 60)
            etaStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
          }
          // Find nearest known city to the live GPS position
          const locationName = Object.entries(CITY_COORDS).reduce((best, [name, coords]) => {
            const dist = Math.pow(coords.lat - lat, 2) + Math.pow(coords.lng - lng, 2)
            return dist < best.dist ? { name: name.charAt(0) + name.slice(1).toLowerCase(), dist } : best
          }, { name: 'In Transit', dist: Infinity }).name

          setTelemetry(prev => ({
            ...prev,
            speed,
            distanceRemaining,
            eta: etaStr,
            locationName,
            status: 'in_transit'
          }))

          if (onLocationUpdate) onLocationUpdate(locationName)
        }, (err) => {
          console.error('Firebase onValue error:', err)
        })
      } catch (err) {
        console.error('Firebase sign-in failed:', err)
      }
    }

    connect()
    return () => { if (unsubscribe) unsubscribe() }
  }, [mapLoaded, isTripActive, firebaseUserToken, tripId])

  // For delivered trips: one-time read of the driver's actual last GPS position from RTDB
  useEffect(() => {
    if (!mapLoaded || !isDelivered || !tripId || !firebaseUserToken) return

    const fetchLastKnownPosition = async () => {
      try {
        await signInWithCustomToken(auth, firebaseUserToken)
        const locationRef = ref(database, `/tracking/${tripId}/location`)

        // onlyOnce: true — single read, no live subscription
        onValue(locationRef, (snapshot) => {
          const val = snapshot.val()
          if (!val || typeof val.lat !== 'number') return

          const { lat, lng } = val
          console.log('[MAP] Last driver position from Firebase:', lat, lng)
          updateTruckMarker(lat, lng)

          const locationName = Object.entries(CITY_COORDS).reduce((best, [name, coords]) => {
            const dist = Math.pow(coords.lat - lat, 2) + Math.pow(coords.lng - lng, 2)
            return dist < best.dist ? { name: name.charAt(0) + name.slice(1).toLowerCase(), dist } : best
          }, { name: destinationText, dist: Infinity }).name

          setTelemetry(prev => ({ ...prev, locationName }))
          if (onLocationUpdate) onLocationUpdate(locationName)
        }, { onlyOnce: true })
      } catch (err) {
        console.warn('[MAP] Could not fetch last position from Firebase (completed trip):', err.message)
        // Silently keep the static endCoords position
      }
    }

    fetchLastKnownPosition()
  }, [mapLoaded, isDelivered, tripId, firebaseUserToken])

  // Header status display
  const isLive = isTripActive && !!firebaseUserToken
  const statusLabel = isDelivered
    ? 'Delivered'
    : isLive
      ? 'Live GPS'
      : isInTransit
        ? 'In Transit — Awaiting signal'
        : 'Route Overview'

  const statusDot = isLive
    ? 'bg-green-500 animate-ping'
    : isDelivered
      ? 'bg-emerald-500'
      : 'bg-amber-400 animate-pulse'

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.015)] relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-heading-unique font-bold text-slate-800 text-sm flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${statusDot}`} />
          {statusLabel}
        </h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setShowTelemetry(v => !v)
              setTimeout(() => mapInstanceRef.current?.invalidateSize(), 100)
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 border border-blue-100"
          >
            <Gauge className="w-3.5 h-3.5" />
            {showTelemetry ? 'Hide Details' : 'Show Details'}
          </button>
          <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${isLive ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-600'
            }`}>
            {isLive ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isLive ? 'Firebase Live' : isDelivered ? 'Completed' : 'Static Route'}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[480px] bg-slate-50 relative">
        {/* Map */}
        <div className="flex-1 h-[380px] lg:h-full relative">
          <div ref={containerRef} className="w-full h-full z-10" />
          {!mapLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 z-20 gap-3">
              <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Loading route map...</p>
            </div>
          )}

          {/* In-transit but waiting for Firebase signal overlay */}
          {mapLoaded && isInTransit && !isLive && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm border border-amber-200 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-[11px] font-semibold text-amber-700">
                {tokenLoading ? 'Connecting to live GPS...' : 'Waiting for driver signal'}
              </p>
            </div>
          )}
        </div>

        {/* Telemetry Sidebar */}
        {mapLoaded && showTelemetry && (
          <div className="w-full lg:w-[300px] bg-white border-t lg:border-t-0 lg:border-l border-slate-100 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Navigation className={`w-4 h-4 text-[#0056B8] ${isLive ? 'animate-pulse' : ''}`} />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {isLive ? 'Live Telemetry' : 'Trip Summary'}
                </span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${telemetry.status === 'delivered' ? 'bg-emerald-100 text-emerald-700'
                  : telemetry.status === 'in_transit' ? 'bg-blue-100 text-blue-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                {telemetry.status === 'delivered' ? 'Arrived'
                  : telemetry.status === 'in_transit' ? 'In Transit'
                    : telemetry.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {/* Location */}
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {isDelivered ? 'Delivered To' : 'Last Known Location'}
                  </p>
                  <p className="text-xs font-bold text-slate-800 break-words">{telemetry.locationName}</p>
                </div>
              </div>

              {/* Speed & Temperature — only meaningful when live */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                  <Gauge className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Speed</p>
                    <p className="text-xs font-bold text-slate-800 font-mono">
                      {isLive ? `${telemetry.speed} km/h` : '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                  <Thermometer className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Reefer Temp</p>
                    <p className="text-xs font-bold text-slate-800 font-mono">{telemetry.temperature}</p>
                  </div>
                </div>
              </div>

              {/* ETA & Distance */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                  <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">ETA</p>
                    <p className="text-xs font-bold text-blue-600">{telemetry.eta}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Distance</p>
                    <p className="text-xs font-bold text-slate-800 font-mono">
                      {isDelivered ? '0 km' : `${telemetry.distanceRemaining} km`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Route summary */}
              <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Route</p>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 text-xs mt-0.5">●</span>
                  <p className="text-xs font-semibold text-slate-700 break-words">{originText}</p>
                </div>
                <div className="ml-2 w-0.5 h-3 bg-slate-200 ml-[6px]" />
                <div className="flex items-start gap-2">
                  <span className="text-red-500 text-xs mt-0.5">●</span>
                  <p className="text-xs font-semibold text-slate-700 break-words">{destinationText}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
