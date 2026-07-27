import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Gauge, ShieldCheck, Thermometer, Clock, Navigation } from 'lucide-react'
import { auth, database, signInWithCustomToken, ref, onValue } from '@/lib/firebase'
import { useTripUserTokenQuery } from '@/hooks/queries/useTrackingQueries'

// Coordinate lookup for Nigerian cities to plot OSRM routes
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

function getClosestCityName(lat, lng) {
  let closestName = 'In Transit'
  let minDist = Infinity
  for (const [name, coords] of Object.entries(CITY_COORDS)) {
    const dist = Math.pow(coords.lat - lat, 2) + Math.pow(coords.lng - lng, 2)
    if (dist < minDist) {
      minDist = dist
      closestName = name.charAt(0) + name.slice(1).toLowerCase()
    }
  }
  return closestName
}

function getNearestCheckpoint(lat, lng, checkpoints) {
  if (!checkpoints || checkpoints.length === 0) return 'In Transit'
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

    let cssLoaded = false
    let jsLoaded = false

    const checkLoaded = () => {
      if (cssLoaded && jsLoaded) {
        resolve(window.L)
      }
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    link.onload = () => {
      cssLoaded = true
      checkLoaded()
    }
    link.onerror = () => {
      cssLoaded = true
      checkLoaded()
    }
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    script.crossOrigin = ''
    script.onload = () => {
      jsLoaded = true
      checkLoaded()
    }
    script.onerror = () => {
      jsLoaded = true
      checkLoaded()
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
  const [showTelemetry, setShowTelemetry] = useState(true)
  const userMarkerRef = useRef(null)

  const updateMapRouteAndMarker = (lat, lng) => {
    // 1. Update truck marker position
    if (truckMarkerRef.current) {
      truckMarkerRef.current.setLatLng([lat, lng])
    }

    // 2. Center map on the driver's location smoothly
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo([lat, lng], { animate: true, duration: 0.5 })
    }
  }

  // Initialize start index persistently from sessionStorage or randomly
  if (startIdxRef.current === -1 && routeCoordinates.length > 0) {
    const storageKey = `tracking_index_${shipment.id}`
    const stored = sessionStorage.getItem(storageKey)
    let startIdx = 0

    if (shipment.status !== 'in_transit' && shipment.status !== 'delivered') {
      startIdx = 0
    } else if (shipment.status === 'delivered') {
      startIdx = routeCoordinates.length - 1
    } else {
      if (stored !== null) {
        const parsed = parseInt(stored, 10)
        if (!isNaN(parsed) && parsed < routeCoordinates.length) {
          startIdx = parsed
        } else {
          const randomPct = 0.25 + Math.random() * 0.5
          startIdx = Math.floor(routeCoordinates.length * randomPct)
        }
      } else {
        const randomPct = 0.25 + Math.random() * 0.5
        startIdx = Math.floor(routeCoordinates.length * randomPct)
      }
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

  const startCoords = shipment.pickupCoordinates && shipment.pickupCoordinates.lat
    ? { lat: Number(shipment.pickupCoordinates.lat), lng: Number(shipment.pickupCoordinates.lng) }
    : resolveCityCoords(originText, CITY_COORDS.LAGOS)

  const endCoords = shipment.dropOffCoordinates && shipment.dropOffCoordinates.lat
    ? { lat: Number(shipment.dropOffCoordinates.lat), lng: Number(shipment.dropOffCoordinates.lng) }
    : resolveCityCoords(destinationText, CITY_COORDS.ABUJA)

  // Calculate dynamic driving distance estimation (Haversine * 1.3 winding factor)
  const getDistanceKm = (c1, c2) => {
    const R = 6371
    const dLat = (c2.lat - c1.lat) * Math.PI / 180
    const dLng = (c2.lng - c1.lng) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return Math.max(10, Math.round(R * c * 1.3))
  }

  const totalDistance = getDistanceKm(startCoords, endCoords)

  const checkpoints = routeCoordinates.length > 0
    ? [0, 0.2, 0.4, 0.6, 0.8, 1].map((pct) => {
        const idx = Math.floor((routeCoordinates.length - 1) * pct)
        const pt = routeCoordinates[idx]
        const cityName = getClosestCityName(pt.lat, pt.lng)
        return {
          city: pct === 0 ? originText : pct === 1 ? destinationText : `Near ${cityName}`,
          lat: pt.lat,
          lng: pt.lng
        }
      })
    : [
        { city: originText, ...startCoords },
        { city: destinationText, ...endCoords }
      ]

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
  }, [startCoords.lat, startCoords.lng, endCoords.lat, endCoords.lng])

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

      // Add Tile Layer (OpenStreetMap with high-detail roads and labels for Nigeria)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(mapInstance)
      // No polylines or start/end markers in simplified tracking mode
 
      const isMoving = shipment.status === 'in_transit'
      const truckIcon = L.divIcon({
        className: 'custom-truck-marker',
        html: `<div style="font-size: 32px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); transform: scaleX(-1); transition: transform 0.1s linear;" class="${isMoving ? 'animate-bounce-subtle' : ''}">🚚</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
 
      const initialPt = routeCoordinates[startIdxRef.current]
      const truckMarker = L.marker([initialPt.lat, initialPt.lng], { icon: truckIcon })
        .bindPopup('<b>Delivery Vehicle</b>')
        .addTo(mapInstance)
      truckMarkerRef.current = truckMarker

      // Get User's Current Location (Customer)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            
            // Create user location marker (pulsing blue dot using Tailwind)
            const userIcon = L.divIcon({
              className: 'custom-user-marker',
              html: `
                <div class="relative w-5 h-5">
                  <div class="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full top-0.5 left-0.5 shadow-md z-10"></div>
                  <div class="absolute w-6 h-6 bg-blue-500/40 rounded-full -top-0.5 -left-0.5 animate-ping z-0"></div>
                </div>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })

            const userMarker = L.marker([latitude, longitude], { icon: userIcon })
              .bindPopup('<b>Your Location</b>')
              .addTo(mapInstance)
            
            userMarkerRef.current = userMarker

            // Auto fit bounds to show both user and truck
            const bounds = L.latLngBounds([
              [latitude, longitude],
              [initialPt.lat, initialPt.lng]
            ])
            mapInstance.fitBounds(bounds, { padding: [50, 50] })
          },
          (err) => {
            console.warn('Could not retrieve user location:', err.message)
          },
          { enableHighAccuracy: true, timeout: 5000 }
        )
      }

      // Center map initially on truck
      mapInstance.setView([initialPt.lat, initialPt.lng], 12)

      setMapLoaded(true)

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize()
        }
      }, 250)
    })

    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [routeCoordinates])

  const tripId = shipment.tripId
  const isTripActive = shipment.status === 'in_transit' && !!tripId

  // Fetch Firebase token for the user
  const { data: tokenData } = useTripUserTokenQuery(tripId, {
    enabled: !!isTripActive
  })
  const firebaseUserToken = tokenData?.token

  // Firebase Real-time Subscription Effect
  useEffect(() => {
    if (!mapLoaded || !isTripActive || !firebaseUserToken) return

    let firebaseDbUnsubscribe = null

    const connectFirebase = async () => {
      try {
        await signInWithCustomToken(auth, firebaseUserToken)
        const locationRef = ref(database, `/tracking/${tripId}/location`)
        
        firebaseDbUnsubscribe = onValue(locationRef, (snapshot) => {
          const val = snapshot.val()
          if (!val || typeof val !== 'object') return
          
          const { lat, lng } = val
          
          // Update Leaflet marker position, route path, and center map
          updateMapRouteAndMarker(lat, lng)
          
          // Calculate distance remaining
          const currentPt = { lat, lng }
          const distanceRemaining = getDistanceKm(currentPt, endCoords)
          
          // Speed
          const speed = distanceRemaining === 0 ? 0 : Math.floor(75 + Math.sin(Date.now() / 10000) * 5 + Math.random() * 2)
          
          // ETA
          let etaStr = 'Arrived'
          if (distanceRemaining > 0) {
            const hoursLeft = distanceRemaining / (speed || 80)
            const hrs = Math.floor(hoursLeft)
            const mins = Math.round((hoursLeft - hrs) * 60)
            etaStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
          }
          
          // Nearest Town Checkpoint
          const locationName = getNearestCheckpoint(lat, lng, checkpoints)
          
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
        }, (error) => {
          console.error("Firebase database onValue error:", error)
        })
      } catch (err) {
        console.error("Firebase custom sign in failed:", err)
      }
    }

    connectFirebase()

    return () => {
      if (firebaseDbUnsubscribe) {
        firebaseDbUnsubscribe()
      }
    }
  }, [mapLoaded, isTripActive, firebaseUserToken, tripId])

  // Animation Engine
  useEffect(() => {
    if (!mapLoaded || routeCoordinates.length === 0 || startIdxRef.current === -1) return
    if (isTripActive && firebaseUserToken) return

    // If not in transit or delivered (e.g. pending, confirmed, processing), show scheduled status and do not animate
    if (shipment.status !== 'in_transit' && shipment.status !== 'delivered') {
      setCurrentPointIndex(0)
      setTelemetry({
        speed: 0,
        distanceRemaining: totalDistance,
        eta: shipment.estimatedDelivery || 'Scheduled',
        locationName: originText,
        temperature: shipment.temperature || 'N/A',
        status: shipment.status || 'confirmed'
      })
      updateMapRouteAndMarker(routeCoordinates[0].lat, routeCoordinates[0].lng)
      if (onLocationUpdate) {
        onLocationUpdate(originText)
      }
      return
    }

    // If already delivered, pin to destination and finish
    if (shipment.status === 'delivered') {
      const finalIdx = routeCoordinates.length - 1
      setCurrentPointIndex(finalIdx)
      const storageKey = `tracking_index_${shipment.id}`
      sessionStorage.setItem(storageKey, finalIdx.toString())
      setTelemetry({
        speed: 0,
        distanceRemaining: 0,
        eta: 'Arrived',
        locationName: destinationText,
        temperature: shipment.temperature || '-10.5°C',
        status: 'delivered'
      })
      const finalPt = routeCoordinates[finalIdx]
      updateMapRouteAndMarker(finalPt.lat, finalPt.lng)
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

      // Update Leaflet marker position, route path, and center map
      updateMapRouteAndMarker(point.lat, point.lng)

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
          <span className={`w-2.5 h-2.5 rounded-full ${isTripActive && firebaseUserToken ? 'bg-green-500' : 'bg-[#0056B8]'} animate-ping`} />
          {isTripActive && firebaseUserToken ? 'Live GPS Tracking' : 'Live Route Simulator'}
        </h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setShowTelemetry(!showTelemetry)
              setTimeout(() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.invalidateSize()
                }
              }, 100)
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 border border-blue-100"
          >
            <Gauge className="w-3.5 h-3.5" />
            {showTelemetry ? 'Hide Details' : 'Show Details'}
          </button>
          <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {isTripActive && firebaseUserToken ? 'Firebase RTDB Sync' : 'OSRM Driving Route'}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[480px] bg-slate-50 relative">
        {/* Leaflet Map Div Container */}
        <div className="flex-1 h-[380px] lg:h-full relative">
          <div ref={containerRef} className="w-full h-full z-10" />
          {!mapLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 z-20 gap-3">
              <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Loading live telemetry map...</p>
            </div>
          )}
        </div>

        {/* Telemetry Sidebar Details */}
        {mapLoaded && showTelemetry && (
          <div className="w-full lg:w-[320px] bg-white border-t lg:border-t-0 lg:border-l border-slate-100 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#0056B8] animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Telemetry</span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                telemetry.status === 'delivered'
                  ? 'bg-emerald-100 text-emerald-700'
                  : telemetry.status === 'in_transit'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-amber-100 text-amber-700'
              }`}>
                {telemetry.status === 'delivered'
                  ? 'Arrived'
                  : telemetry.status === 'in_transit'
                    ? 'In Transit'
                    : telemetry.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              {/* Near / Current Checkpoint */}
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Current Location</p>
                  <p className="text-xs font-bold text-slate-800 break-words">{telemetry.locationName}</p>
                </div>
              </div>

              {/* Speedometer & Temperature */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                  <Gauge className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Speed</p>
                    <p className="text-xs font-bold text-slate-800 font-mono">{telemetry.speed} km/h</p>
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

              {/* Remaining Distance & ETA */}
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
