import { useMemo } from 'react'

export const useTripData = (trips, filters) => {
  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const id = trip._id || trip.id || ''
      const driverName = trip.driverName || ''
      if (
        filters.search &&
        !id.toLowerCase().includes(filters.search.toLowerCase()) &&
        !driverName.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }
      if (filters.status && trip.status !== filters.status) return false
      return true
    })
  }, [trips, filters])

  // Single-pass reduce instead of 4 separate .filter() calls over the same array
  const statusCounts = useMemo(() => {
    return trips.reduce(
      (acc, t) => {
        if (acc[t.status] !== undefined) acc[t.status]++
        return acc
      },
      { pending: 0, in_transit: 0, delivered: 0, cancelled: 0 }
    )
  }, [trips])

  return { filteredTrips, statusCounts }
}

export const getStatusColor = (status) => {
  const colors = {
    pending:    'bg-yellow-100 text-yellow-700',
    in_transit: 'bg-blue-100 text-blue-700',
    delivered:  'bg-green-100 text-green-700',
    cancelled:  'bg-red-100 text-red-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

export const getTempColor = (temp, range) => {
  if (!range) return 'text-gray-600'
  if (temp < range.min || temp > range.max) return 'text-red-600'
  return 'text-green-600'
}
