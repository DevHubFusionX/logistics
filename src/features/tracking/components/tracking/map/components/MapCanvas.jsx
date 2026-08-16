import React, { useCallback, useEffect, useRef } from 'react'
import { GoogleMap, Polyline, OverlayView } from '@react-google-maps/api'
import { MAP_OPTIONS } from '../constants'

const containerStyle = { width: '100%', height: '100%' }

function TruckOverlay({ position, bearing }) {
  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <div style={{ transform: 'translate(-50%, -50%)', width: 54, height: 54, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'rgba(59,130,246,0.2)',
          animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <div style={{
          fontSize: 30, position: 'relative', zIndex: 10,
          filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.2))',
          transform: `rotate(${bearing - 270}deg)`,
          transition: 'transform 0.4s ease-out',
        }}>
          🚚
        </div>
      </div>
    </OverlayView>
  )
}

function PinOverlay({ position, emoji, label, color }) {
  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <div style={{ transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 12, height: 12, borderRadius: '50%',
          background: color, border: '2.5px solid white',
          boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        }} />
        <span style={{
          fontSize: 9, fontWeight: 700, color: '#475569',
          background: 'rgba(255,255,255,0.95)', padding: '2px 7px',
          borderRadius: 4, marginTop: 4, border: '1px solid #e2e8f0',
          whiteSpace: 'nowrap', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          {emoji} {label.length > 15 ? label.slice(0, 13) + '…' : label}
        </span>
      </div>
    </OverlayView>
  )
}

export default function MapCanvas({
  center,
  zoom = 7,
  truckPosition,
  bearing,
  startCoords,
  endCoords,
  routePath,
  isDelivered,
}) {
  const mapRef = useRef(null)

  const handleLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  // Pan map smoothly when truck position updates
  useEffect(() => {
    if (mapRef.current && truckPosition) {
      mapRef.current.panTo(truckPosition)
    }
  }, [truckPosition?.lat, truckPosition?.lng])

  const polylineOptions = {
    strokeColor: isDelivered ? '#10b981' : '#0056B8',
    strokeWeight: 4,
    strokeOpacity: 0.75,
    // Dashed for active routes
    ...(isDelivered ? {} : {
      icons: [{
        icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 3 },
        offset: '0',
        repeat: '16px',
      }],
      strokeOpacity: 0,
    }),
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={MAP_OPTIONS}
      onLoad={handleLoad}
    >
      {routePath.length > 0 && (
        <Polyline path={routePath} options={polylineOptions} />
      )}

      {startCoords && (
        <PinOverlay position={startCoords} emoji="📦" label="Origin" color="#10b981" />
      )}
      {endCoords && (
        <PinOverlay position={endCoords} emoji="🏁" label="Destination" color="#ef4444" />
      )}
      {truckPosition && (
        <TruckOverlay position={truckPosition} bearing={bearing} />
      )}
    </GoogleMap>
  )
}
