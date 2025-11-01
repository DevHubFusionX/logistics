import { Clock, CheckCircle, Truck, Package, XCircle, Pause, AlertTriangle } from 'lucide-react'

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  ON_HOLD: 'on_hold',
  FAILED: 'failed'
}

export const PAYMENT_STATUS = {
  PAID: 'paid',
  UNPAID: 'unpaid',
  PENDING: 'pending',
  FAILED: 'failed'
}

export const STATUS_CONFIG = {
  [BOOKING_STATUS.PENDING]: {
    label: 'Pending Review',
    badge: 'bg-yellow-100 text-yellow-700',
    icon: Clock,
    color: 'yellow'
  },
  [BOOKING_STATUS.CONFIRMED]: {
    label: 'Confirmed',
    badge: 'bg-blue-100 text-blue-700',
    icon: CheckCircle,
    color: 'blue'
  },
  [BOOKING_STATUS.IN_TRANSIT]: {
    label: 'In Transit',
    badge: 'bg-green-100 text-green-700',
    icon: Truck,
    color: 'green'
  },
  [BOOKING_STATUS.DELIVERED]: {
    label: 'Delivered',
    badge: 'bg-gray-100 text-gray-700',
    icon: Package,
    color: 'gray'
  },
  [BOOKING_STATUS.CANCELLED]: {
    label: 'Cancelled',
    badge: 'bg-red-100 text-red-700',
    icon: XCircle,
    color: 'red'
  },
  [BOOKING_STATUS.ON_HOLD]: {
    label: 'On Hold',
    badge: 'bg-orange-100 text-orange-700',
    icon: Pause,
    color: 'orange'
  },
  [BOOKING_STATUS.FAILED]: {
    label: 'Failed',
    badge: 'bg-red-100 text-red-700',
    icon: AlertTriangle,
    color: 'red'
  }
}

export const PAYMENT_CONFIG = {
  [PAYMENT_STATUS.PAID]: {
    label: 'Paid',
    badge: 'bg-green-100 text-green-700'
  },
  [PAYMENT_STATUS.UNPAID]: {
    label: 'Unpaid',
    badge: 'bg-orange-100 text-orange-700'
  },
  [PAYMENT_STATUS.PENDING]: {
    label: 'Pending',
    badge: 'bg-yellow-100 text-yellow-700'
  },
  [PAYMENT_STATUS.FAILED]: {
    label: 'Failed',
    badge: 'bg-red-100 text-red-700'
  }
}
