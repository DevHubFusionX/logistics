import { useEffect, useRef } from 'react'
import { auth, database, signInWithCustomToken, ref, onValue } from '@/lib/firebase'
import { nearestCityName, getDistanceKm } from '../utils'

/**
 * Subscribes to Firebase Realtime Database for live truck GPS.
 * Works for both active (in_transit) and delivered trips (one-time read).
 */
export function useFirebaseLive({
  tripId,
  firebaseToken,
  isActive,
  isDelivered,
  endCoords,
  onTruckMove,
  onTelemetryUpdate,
}) {
  const onTruckMoveRef = useRef(onTruckMove)
  const onTelemetryUpdateRef = useRef(onTelemetryUpdate)
  const endCoordsRef = useRef(endCoords)

  useEffect(() => {
    onTruckMoveRef.current = onTruckMove
    onTelemetryUpdateRef.current = onTelemetryUpdate
    endCoordsRef.current = endCoords
  })

  useEffect(() => {
    if (!firebaseToken || !tripId || (!isActive && !isDelivered)) return

    let unsubscribe = null

    const connect = async () => {
      try {
        await signInWithCustomToken(auth, firebaseToken)
        const locationRef = ref(database, `/tracking/${tripId}/location`)
        const opts = isDelivered ? { onlyOnce: true } : undefined

        unsubscribe = onValue(
          locationRef,
          (snapshot) => {
            const val = snapshot.val()
            if (!val || typeof val.lat !== 'number') return

            const { lat, lng } = val
            onTruckMoveRef.current?.(lat, lng)

            const distanceRemaining = getDistanceKm({ lat, lng }, endCoordsRef.current)
            const speed = distanceRemaining === 0
              ? 0
              : Math.floor(72 + Math.sin(Date.now() / 10000) * 8)

            let eta = 'Arrived'
            if (distanceRemaining > 0) {
              const hrs = Math.floor(distanceRemaining / (speed || 80))
              const mins = Math.round(((distanceRemaining / (speed || 80)) - hrs) * 60)
              eta = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
            }

            onTelemetryUpdateRef.current?.({
              speed,
              distanceRemaining,
              eta,
              locationName: nearestCityName(lat, lng),
              status: isDelivered ? 'delivered' : 'in_transit',
            })
          },
          opts
        )
      } catch (err) {
        console.warn('[Firebase] Connection error:', err.message)
      }
    }

    connect()
    return () => { if (unsubscribe) unsubscribe() }
  }, [tripId, firebaseToken, isActive, isDelivered])
}
