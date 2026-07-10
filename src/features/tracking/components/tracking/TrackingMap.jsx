import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Gauge, ShieldCheck, Thermometer, Clock, Navigation } from 'lucide-react'

// Coordinate lookup for Nigerian cities to plot OSRM routes
const CITY_COORDS = {
  'LAGOS': { lat: 6.5244, lng: 3.3792 },
  'IBADAN': { lat: 7.3775, lng: 3.9470 },
  'LOKOJA': { lat: 7.8024, lng: 6.7333 },
  'ABUJA': { lat: 9.0765, lng: 7.3986 },
  'ILORIN': { lat: 8.4799, lng: 4.5418 },
  'KADUNA': { lat: 10.5105, lng: 7.4165 },
  'KANO': { lat: 12.0022, lng: 8.5920 },
  'PORT HARCOURT': { lat: 4.8156, lng: 7.0498 }
}

const CHECKPOINTS_LAGOS_ABUJA = [
  { city: 'Lagos (Ketu)', lat: 6.5976, lng: 3.3853 },
  { city: 'Sagamu Interchange', lat: 6.8402, lng: 3.6428 },
  { city: 'Ibadan Bypass', lat: 7.3775, lng: 3.9470 },
  { city: 'Akure Junction', lat: 7.2571, lng: 5.2058 },
  { city: 'Okene Bypass', lat: 7.5489, lng: 6.2367 },
  { city: 'Lokoja Bypass', lat: 7.8024, lng: 6.7333 },
  { city: 'Gwagwalada', lat: 8.9515, lng: 7.0754 },
  { city: 'Abuja (Garki)', lat: 9.0192, lng: 7.4184 }
]

const CHECKPOINTS_LAGOS_KANO = [
  { city: 'Lagos (Ketu)', lat: 6.5976, lng: 3.3853 },
  { city: 'Ilorin Bypass', lat: 8.4799, lng: 4.5418 },
  { city: 'Kaduna Bypass', lat: 10.5105, lng: 7.4165 },
  { city: 'Kano (Fagge)', lat: 12.0022, lng: 8.5920 }
]

function resolveCityCoords(cityText, defaultCoords) {
  if (!cityText) return defaultCoords
  const upper = cityText.toUpperCase()
  for (const [key, value] of Object.entries(CITY_COORDS)) {
    if (upper.includes(key)) {
      return value
    }
  }
  return defaultCoords
}

function getNearestCheckpoint(lat, lng, checkpoints) {
  let nearest = checkpoints[0].city
  let minDist = Infinity
  for (const cp of checkpoints) {
    const dist = Math.pow(cp.lat - lat, 2) + Math.pow(cp.lng - lng, 2)
    if (dist < minDist) {
      minDist = dist
      nearest = cp.city
    }
  }
  return nearest
}

// Dynamically load Leaflet from CDN
const loadLeaflet = () => {
  return new Promise((resolve) => {
    if (window.L) {
      resolve(window.L)
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    script.crossOrigin = ''
    script.onload = () => {
      resolve(window.L)
    }
    document.body.appendChild(script)
  })
}

export default function TrackingMap({ shipment, onLocationUpdate }) {
  const containerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const truckMarkerRef = useRef(null)
  const startIdxRef = useRef(-1)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [currentPointIndex, setCurrentPointIndex] = useState(0)

  // Initialize start index persistently from sessionStorage or randomly
  if (startIdxRef.current === -1 && routeCoordinates.length > 0) {
    const storageKey = `tracking_index_${shipment.id}`
    const stored = sessionStorage.getItem(storageKey)
    let startIdx = 0
    if (stored !== null) {
      const parsed = parseInt(stored, 10)
      if (!isNaN(parsed) && parsed < routeCoordinates.length) {
        startIdx = parsed
      } else {
        if (shipment.id === 'DARA-BK100190726') {
          startIdx = Math.floor(routeCoordinates.length * 0.46)
        } else if (shipment.id === 'DARA-BK300390726') {
          startIdx = Math.floor(routeCoordinates.length * 0.60)
        } else {
          const randomPct = 0.25 + Math.random() * 0.5
          startIdx = Math.floor(routeCoordinates.length * randomPct)
        }
      }
    } else {
      if (shipment.id === 'DARA-BK100190726') {
        startIdx = Math.floor(routeCoordinates.length * 0.46)
      } else if (shipment.id === 'DARA-BK300390726') {
        startIdx = Math.floor(routeCoordinates.length * 0.60)
      } else {
        const randomPct = 0.25 + Math.random() * 0.5
        startIdx = Math.floor(routeCoordinates.length * randomPct)
      }
    }

    if (shipment.status === 'delivered') {
      startIdx = routeCoordinates.length - 1
    }

    sessionStorage.setItem(storageKey, startIdx.toString())
    startIdxRef.current = startIdx
  }
  
  // Simulated telemetry state
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    distanceRemaining: 0,
    eta: 'Calculating...',
    locationName: 'Lagos',
    temperature: shipment.temperature || '-10.5°C',
    status: shipment.status || 'in_transit'
  })

  const originText = shipment.origin || shipment.pickupCity || 'Lagos'
  const destinationText = shipment.destination || shipment.deliveryCity || 'Abuja'

  const startCoords = resolveCityCoords(originText, CITY_COORDS.LAGOS)
  const endCoords = resolveCityCoords(destinationText, CITY_COORDS.ABUJA)
  const isKano = destinationText.toUpperCase().includes('KANO')
  const checkpoints = isKano ? CHECKPOINTS_LAGOS_KANO : CHECKPOINTS_LAGOS_ABUJA

  const totalDistance = isKano ? 990 : 740 // km

  // Fetch OSRM route
  useEffect(() => {
    let active = true

    const fetchRoute = async () => {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=geojson`
        )
        if (!res.ok) throw new Error('OSRM API failed')
        const data = await res.json()
        if (!data.routes || data.routes.length === 0) throw new Error('No route found')

        if (active) {
          const coords = data.routes[0].geometry.coordinates.map((c) => ({
            lat: c[1],
            lng: c[0]
          }))
          setRouteCoordinates(coords)
        }
      } catch (err) {
        console.warn('OSRM Route fetch failed. Falling back to straight-line interpolation:', err)
        if (active) {
          // Generate 200 fallback interpolated points
          const coords = []
          const steps = 200
          for (let i = 0; i <= steps; i++) {
            const t = i / steps
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

    return () => {
      active = false
    }
  }, [originText, destinationText])

  // Initialize Map
  useEffect(() => {
    if (routeCoordinates.length === 0) return

    let mapInstance = null

    loadLeaflet().then((L) => {
      if (!containerRef.current) return

      // Clean up previous map if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }

      // Initialize map
      mapInstance = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false
      })

      mapInstanceRef.current = mapInstance

      // Add Tile Layer (modern, sleek grayscale map to make markers stand out)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(mapInstance)

      // Add Route Polyline
      const latlngs = routeCoordinates.map((c) => [c.lat, c.lng])
      L.polyline(latlngs, {
        color: '#0056B8',
        weight: 4,
        opacity: 0.8,
        dashArray: '2, 6'
      }).addTo(mapInstance)

      // Add Custom Markers
      const startIcon = L.divIcon({
        className: 'custom-start-marker',
        html: '<div style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));">🟢</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
      L.marker([startCoords.lat, startCoords.lng], { icon: startIcon }).addTo(mapInstance)

      const endIcon = L.divIcon({
        className: 'custom-end-marker',
        html: '<div style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));">🏁</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
      L.marker([endCoords.lat, endCoords.lng], { icon: endIcon }).addTo(mapInstance)

      // Add Truck Marker
      const truckIcon = L.divIcon({
        className: 'custom-truck-marker',
        html: '<div style="font-size: 32px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); transform: scaleX(-1); transition: transform 0.1s linear;" class="animate-bounce-subtle">🚚</div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })

      const initialPt = routeCoordinates[startIdxRef.current]
      const truckMarker = L.marker([initialPt.lat, initialPt.lng], { icon: truckIcon }).addTo(mapInstance)
      truckMarkerRef.current = truckMarker

      // Fit Bounds
      mapInstance.fitBounds(L.polyline(latlngs).getBounds(), {
        padding: [40, 40]
      })

      setMapLoaded(true)
    })

    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [routeCoordinates])

  // Animation Engine
  useEffect(() => {
    if (!mapLoaded || routeCoordinates.length === 0 || startIdxRef.current === -1) return

    // If already delivered, pin to destination and finish
    if (shipment.status === 'delivered') {
      const finalIdx = routeCoordinates.length - 1
      setCurrentPointIndex(finalIdx)
      setTelemetry({
        speed: 0,
        distanceRemaining: 0,
        eta: 'Arrived',
        locationName: destinationText,
        temperature: shipment.temperature || '-10.5°C',
        status: 'delivered'
      })
      if (onLocationUpdate) {
        onLocationUpdate(destinationText)
      }
      return
    }

    let intervalId = null
    const storageKey = `tracking_index_${shipment.id}`
    let index = startIdxRef.current

    const stepDuration = 180 // ms per coordinate transition
    
    intervalId = setInterval(() => {
      if (index >= routeCoordinates.length) {
        if (shipment.id === 'DARA-BK100190726') {
          index = Math.floor(routeCoordinates.length * 0.46)
        } else if (shipment.id === 'DARA-BK300390726') {
          index = Math.floor(routeCoordinates.length * 0.60)
        } else {
          index = 0 // Loop for demo purposes
        }
      }

      const point = routeCoordinates[index]
      setCurrentPointIndex(index)
      sessionStorage.setItem(storageKey, index.toString())

      // Update Leaflet marker position
      if (truckMarkerRef.current) {
        truckMarkerRef.current.setLatLng([point.lat, point.lng])
      }

      // Calculate dynamic telemetry
      const pct = index / routeCoordinates.length
      const distanceRemaining = Math.max(0, Math.round(totalDistance * (1 - pct)))
      
      // Dynamic speed with realistic fluctuations (72km/h - 86km/h)
      const speed = distanceRemaining === 0 ? 0 : Math.floor(75 + Math.sin(index / 10) * 8 + Math.random() * 3)
      
      // Calculate ETA
      let etaStr = 'Arrived'
      if (distanceRemaining > 0) {
        const hoursLeft = distanceRemaining / (speed || 80)
        const hrs = Math.floor(hoursLeft)
        const mins = Math.round((hoursLeft - hrs) * 60)
        etaStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
      }

      // Nearest Town Checkpoint
      const locationName = getNearestCheckpoint(point.lat, point.lng, checkpoints)

      setTelemetry((prev) => ({
        ...prev,
        speed,
        distanceRemaining,
        eta: etaStr,
        locationName,
        status: 'in_transit'
      }))

      if (onLocationUpdate) {
        onLocationUpdate(locationName)
      }

      index++
    }, stepDuration)

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [mapLoaded, routeCoordinates, shipment.status, shipment.id])

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.015)] relative">
      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-heading-unique font-bold text-slate-800 text-sm flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0056B8] animate-ping" />
          Live Route Simulator
        </h3>
        <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
          OSRM Driving Route
        </div>
      </div>

      <div className="h-[480px] relative bg-slate-50">
        {/* Leaflet Map Div Container */}
        <div ref={containerRef} className="w-full h-full z-10" />

        {!mapLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 z-20 gap-3">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-500">Loading live telemetry map...</p>
          </div>
        )}

        {/* Floating Telemetry Glassmorphic Card */}
        {mapLoaded && (
          <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-[0_12px_32px_rgba(0,0,0,0.08)] w-[280px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#0056B8] animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Telemetry</span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                telemetry.status === 'delivered' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {telemetry.status === 'delivered' ? 'Arrived' : 'In Transit'}
              </span>
            </div>

            <div className="space-y-3">
              {/* Near / Current Checkpoint */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Current Location</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{telemetry.locationName}</p>
                </div>
              </div>

              {/* Speedometer & Temperature */}
              <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-100/50">
                <div className="flex items-start gap-2">
                  <Gauge className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Speed</p>
                    <p className="text-xs font-bold text-slate-800 font-mono">{telemetry.speed} km/h</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Thermometer className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Reefer Temp</p>
                    <p className="text-xs font-bold text-slate-800 font-mono">{telemetry.temperature}</p>
                  </div>
                </div>
              </div>

              {/* Remaining Distance & ETA */}
              <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-100/50">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">ETA</p>
                    <p className="text-xs font-bold text-blue-600">{telemetry.eta}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Distance</p>
                    <p className="text-xs font-bold text-slate-800 font-mono">{telemetry.distanceRemaining} km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
