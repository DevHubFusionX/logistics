export const getStatusBadge = (status) => {
  const badges = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-blue-100 text-blue-700',
    in_transit: 'bg-green-100 text-green-700',
    delivered: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700'
  }
  return badges[status] || 'bg-gray-100 text-gray-700'
}

export const getStatusText = (status) => {
  const texts = {
    pending: 'Pending Pickup',
    confirmed: 'Driver Assigned',
    processing: 'Processing',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return texts[status] || status
}

export const calculateBookingPrice = (booking) => {
  const price = booking.price || booking.shipping_fee || booking.calculatedPrice || booking.totalCost || booking.estimatedCost
  if (price) return price;
  const baseRate = 5000
  const weight = parseFloat(booking.cargoWeightKg || booking.weight || 0)
  const weightRate = weight * 50
  const quantity = booking.quantity || booking.dimensions?.quantity || 1
  const quantityRate = quantity * 500
  const isFragile = booking.isFragile || booking.dimensions?.isFragile
  const fragileCharge = isFragile ? 2000 : 0
  const isPerishable = booking.isPerishable || booking.dimensions?.isPerishable
  const perishableCharge = isPerishable ? 3000 : 0
  const vehicleType = booking.vehicleType || booking.service_type
  const vehicleRates = { 'van': 0, 'truck': 5000, 'van_refrigerated': 8000, 'Standard': 0 }
  const vehicleCharge = vehicleRates[vehicleType] || 0
  return baseRate + weightRate + quantityRate + fragileCharge + perishableCharge + vehicleCharge
}

export const getBookingStats = (bookings) => ({
  pendingCount: bookings.filter(b => b.status === 'pending').length,
  activeCount: bookings.filter(b => b.status === 'in_transit' || b.status === 'confirmed' || b.status === 'processing').length,
  deliveredThisMonth: bookings.filter(b => b.status === 'delivered').length,
  outstandingInvoices: bookings.filter(b => (b.paymentStatus || b.payment_status) === 'unpaid').length
})
