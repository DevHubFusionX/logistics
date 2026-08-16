import { CITY_COORDS } from './constants'

export function calculateBearing(lat1, lon1, lat2, lon2) {
  const dLon = (lon2 - lon1) * Math.PI / 180
  const lat1Rad = lat1 * Math.PI / 180
  const lat2Rad = lat2 * Math.PI / 180
  const y = Math.sin(dLon) * Math.cos(lat2Rad)
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
             Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon)
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
}

export function resolveCityCoords(cityText, fallback) {
  if (!cityText) return fallback
  const upper = cityText.toUpperCase()
  const matches = []
  for (const [key, value] of Object.entries(CITY_COORDS)) {
    const idx = upper.indexOf(key)
    if (idx !== -1) matches.push({ value, idx })
  }
  if (matches.length > 0) {
    matches.sort((a, b) => a.idx - b.idx)
    return matches[0].value
  }
  return fallback
}

export function getDistanceKm(c1, c2) {
  const R = 6371
  const dLat = (c2.lat - c1.lat) * Math.PI / 180
  const dLng = (c2.lng - c1.lng) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return Math.max(1, Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.3))
}

export function nearestCityName(lat, lng) {
  return Object.entries(CITY_COORDS).reduce(
    (best, [name, coords]) => {
      const dist = Math.pow(coords.lat - lat, 2) + Math.pow(coords.lng - lng, 2)
      return dist < best.dist
        ? { name: name.charAt(0) + name.slice(1).toLowerCase(), dist }
        : best
    },
    { name: 'In Transit', dist: Infinity }
  ).name
}
