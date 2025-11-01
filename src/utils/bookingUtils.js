export const getStatusBadge = (status) => {
  const badges = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    in_transit: 'bg-green-100 text-green-700',
    delivered: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700'
  }
  return badges[status] || 'bg-gray-100 text-gray-700'
}

export const getStatusText = (status) => {
  const texts = {
    pending: 'Pending Review',
    confirmed: 'Confirmed',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return texts[status] || status
}

export const calculateBookingPrice = (booking) => {
  if (booking.totalCost || booking.estimatedCost || booking.price) {
    return booking.totalCost || booking.estimatedCost || booking.price
  }
  const baseRate = 5000
  const weightRate = parseFloat(booking.cargoWeightKg || 0) * 50
  const quantityRate = (booking.quantity || 1) * 500
  const fragileCharge = booking.isFragile ? 2000 : 0
  const perishableCharge = booking.isPerishable ? 3000 : 0
  const vehicleRates = { 'Van': 0, 'Truck': 5000, 'Refrigerated Van': 8000 }
  const vehicleCharge = vehicleRates[booking.vehicleType] || 0
  return baseRate + weightRate + quantityRate + fragileCharge + perishableCharge + vehicleCharge
}

export const getBookingStats = (bookings) => ({
  pendingCount: bookings.filter(b => b.status === 'pending').length,
  activeCount: bookings.filter(b => b.status === 'in_transit' || b.status === 'confirmed').length,
  deliveredThisMonth: bookings.filter(b => b.status === 'delivered').length,
  outstandingInvoices: bookings.filter(b => b.paymentStatus === 'unpaid').length
})
