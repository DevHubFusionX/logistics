export const BOOKING_STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    dot: 'bg-amber-400 animate-pulse',
    pill: 'bg-amber-50 text-amber-700 border-amber-200/50'
  },
  confirmed: {
    label: 'Confirmed',
    dot: 'bg-sky-500',
    pill: 'bg-sky-50 text-sky-700 border-sky-200/50'
  },
  processing: {
    label: 'Processing',
    dot: 'bg-indigo-500 animate-pulse',
    pill: 'bg-indigo-50 text-indigo-700 border-indigo-200/50'
  },
  in_transit: {
    label: 'In Transit',
    dot: 'bg-blue-600',
    pill: 'bg-blue-50 text-blue-700 border-blue-200/50'
  },
  delivered: {
    label: 'Delivered',
    dot: 'bg-emerald-500',
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
  },
  cancelled: {
    label: 'Cancelled',
    dot: 'bg-rose-500',
    pill: 'bg-rose-50 text-rose-700 border-rose-200/50'
  },
  on_hold: {
    label: 'On Hold',
    dot: 'bg-orange-500',
    pill: 'bg-orange-50 text-orange-700 border-orange-200/50'
  },
  failed: {
    label: 'Failed',
    dot: 'bg-red-500',
    pill: 'bg-red-50 text-red-700 border-red-200/50'
  }
}

export const getStatusBadge = (status) => {
  return BOOKING_STATUS_CONFIG[status]?.pill || 'bg-gray-100 text-gray-700'
}

export const getStatusText = (status) => {
  return BOOKING_STATUS_CONFIG[status]?.label || (status ? status.charAt(0).toUpperCase() + status.slice(1) : '')
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
  activeCount: bookings.filter(b => b.status === 'in_transit' || b.status === 'processing').length,
  deliveredThisMonth: bookings.filter(b => b.status === 'delivered').length,
  outstandingInvoices: bookings.filter(b => (b.paymentStatus || b.payment_status) === 'unpaid').length
})
