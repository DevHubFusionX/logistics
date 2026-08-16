import { useState, useEffect } from 'react'

/**
 * Fetches a road-accurate route using Google Directions API.
 * Falls back to a straight-line polyline if the API call fails.
 */
export function useGoogleRoute(isLoaded, startCoords, endCoords) {
  const [routePath, setRoutePath] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !startCoords || !endCoords) return

    let active = true
    setLoading(true)

    const service = new window.google.maps.DirectionsService()
    service.route(
      {
        origin: startCoords,
        destination: endCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (!active) return

        if (status === 'OK') {
          const points = result.routes[0].overview_path.map(p => ({
            lat: p.lat(),
            lng: p.lng(),
          }))
          setRoutePath(points)
        } else {
          // Straight-line fallback
          const pts = []
          for (let i = 0; i <= 60; i++) {
            const t = i / 60
            pts.push({
              lat: startCoords.lat + (endCoords.lat - startCoords.lat) * t,
              lng: startCoords.lng + (endCoords.lng - startCoords.lng) * t,
            })
          }
          setRoutePath(pts)
        }
        setLoading(false)
      }
    )

    return () => { active = false }
  }, [isLoaded, startCoords?.lat, startCoords?.lng, endCoords?.lat, endCoords?.lng])

  return { routePath, loading }
}
