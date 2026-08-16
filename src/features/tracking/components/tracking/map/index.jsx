import React, { useState, useRef, useCallback } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { useTripUserTokenQuery } from '@/hooks/queries/useTrackingQueries'

import { CITY_COORDS, GOOGLE_LIBRARIES } from './constants'
import { resolveCityCoords, calculateBearing, getDistanceKm } from './utils'
import { useGoogleRoute } from './hooks/useGoogleRoute'
import { useFirebaseLive } from './hooks/useFirebaseLive'
import MapCanvas from './components/MapCanvas'
import MapHeader from './components/MapHeader'
import TelemetrySidebar from './components/TelemetrySidebar'

export default function TrackingMap({ shipment, onLocationUpdate }) {
  const [showTelemetry, setShowTelemetry] = useState(true)
  const [truckPos, setTruckPos] = useState(null)
  const bearingRef = useRef(90)

  // ── Google Maps loader ───────────────────────────────────────────────────────
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: GOOGLE_LIBRARIES,
  })

  // ── Resolve coordinates ──────────────────────────────────────────────────────
  const originText = shipment.origin || shipment.pickupCity || 'Lagos'
  const destinationText = shipment.destination || shipment.deliveryCity || 'Abuja'

  const startCoords = shipment.pickupCoordinates?.lat
    ? { lat: Number(shipment.pickupCoordinates.lat), lng: Number(shipment.pickupCoordinates.lng) }
    : resolveCityCoords(originText, CITY_COORDS.LAGOS)

  const endCoords = shipment.dropOffCoordinates?.lat
    ? { lat: Number(shipment.dropOffCoordinates.lat), lng: Number(shipment.dropOffCoordinates.lng) }
    : resolveCityCoords(destinationText, CITY_COORDS.ABUJA)

  const isDelivered = shipment.status === 'delivered'
  const isInTransit = shipment.status === 'in_transit'

  // Truck starts at origin; moves to destination on delivery
  const staticTruckPos = isDelivered ? endCoords : startCoords
  const currentTruckPos = truckPos || staticTruckPos

  // ── Route ────────────────────────────────────────────────────────────────────
  const { routePath, loading: routeLoading } = useGoogleRoute(isLoaded, startCoords, endCoords)

  // ── Telemetry state ──────────────────────────────────────────────────────────
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    distanceRemaining: isDelivered ? 0 : getDistanceKm(startCoords, endCoords),
    eta: isDelivered ? 'Arrived' : (shipment.estimatedDelivery || 'Awaiting dispatch'),
    locationName: isDelivered ? destinationText : originText,
    temperature: shipment.temperature || 'N/A',
    status: shipment.status || 'confirmed',
  })

  // ── Firebase live token ──────────────────────────────────────────────────────
  const tripId = shipment.tripId
  const { data: tokenData } = useTripUserTokenQuery(tripId, {
    enabled: !!tripId && (isInTransit || isDelivered),
  })
  const firebaseToken = tokenData?.token
  const isLive = isInTransit && !!firebaseToken

  // ── Firebase callbacks ───────────────────────────────────────────────────────
  const handleTruckMove = useCallback((lat, lng) => {
    setTruckPos(prev => {
      if (prev) bearingRef.current = calculateBearing(prev.lat, prev.lng, lat, lng)
      return { lat, lng }
    })
  }, [])

  const handleTelemetryUpdate = useCallback((update) => {
    setTelemetry(prev => ({ ...prev, ...update }))
    if (update.locationName) onLocationUpdate?.(update.locationName)
  }, [onLocationUpdate])

  useFirebaseLive({
    tripId,
    firebaseToken,
    isActive: isInTransit,
    isDelivered,
    endCoords,
    onTruckMove: handleTruckMove,
    onTelemetryUpdate: handleTelemetryUpdate,
  })

  // ── Loading / error states ───────────────────────────────────────────────────
  const isInitializing = !isLoaded || routeLoading

  if (loadError) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 h-[520px] flex items-center justify-center">
        <p className="text-sm text-slate-500">Map failed to load. Check your API key.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.015)]">
      <MapHeader
        isLive={isLive}
        isDelivered={isDelivered}
        showTelemetry={showTelemetry}
        onToggleTelemetry={() => setShowTelemetry(v => !v)}
      />

      <div className="flex flex-col lg:flex-row h-auto lg:h-[480px] bg-slate-50 relative">
        {/* Map */}
        <div className="flex-1 h-[380px] lg:h-full relative">
          {isInitializing ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/90 z-20 gap-3">
              <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Loading map...</p>
            </div>
          ) : (
            <MapCanvas
              center={currentTruckPos}
              zoom={isInTransit ? 13 : 7}
              truckPosition={currentTruckPos}
              bearing={bearingRef.current}
              startCoords={startCoords}
              endCoords={endCoords}
              routePath={routePath}
              isDelivered={isDelivered}
            />
          )}

          {/* Waiting for live signal banner */}
          {!isInitializing && isInTransit && !isLive && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm border border-amber-200 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-[11px] font-semibold text-amber-700">
                Waiting for driver signal
              </p>
            </div>
          )}
        </div>

        {/* Telemetry Sidebar */}
        {showTelemetry && !isInitializing && (
          <TelemetrySidebar
            telemetry={telemetry}
            isLive={isLive}
            isDelivered={isDelivered}
            originText={originText}
            destinationText={destinationText}
          />
        )}
      </div>
    </div>
  )
}
