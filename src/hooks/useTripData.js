import { useMemo } from 'react'

export const useTripData = (trips, filters) => {
  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      if (filters.search && 
          !trip.id.toLowerCase().includes(filters.search.toLowerCase()) &&
          !trip.driverName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.status && trip.status !== filters.status) return false
      return true
    })
  }, [trips, filters])

  const statusCounts = useMemo(() => ({
    pending: trips.filter(t => t.status === 'pending').length,
    in_transit: trips.filter(t => t.status === 'in_transit').length,
    delivered: trips.filter(t => t.status === 'delivered').length,
    cancelled: trips.filter(t => t.status === 'cancelled').length
  }), [trips])

  return { filteredTrips, statusCounts }
}

export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700',
    in_transit: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

export const getTempColor = (temp, range) => {
  if (!range) return 'text-gray-600'
  if (temp < range.min || temp > range.max) return 'text-red-600'
  return 'text-green-600'
}
