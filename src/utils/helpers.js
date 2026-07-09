import { COLORS, FUEL_THRESHOLDS, PRIORITY_COLORS, SLA_RISK_COLORS, PRIORITY_BADGE_COLORS } from '../constants'

export const getColorClasses = (color) => COLORS[color] || COLORS.gray

export const getFuelColor = (level) => {
  if (level > FUEL_THRESHOLDS.HIGH) return 'text-green-600'
  if (level > FUEL_THRESHOLDS.MEDIUM) return 'text-yellow-600'
  return 'text-red-600'
}

export const getPriorityColor = (priority) => PRIORITY_COLORS[priority] || PRIORITY_COLORS.low

export const getPriorityBadgeColor = (priority) => PRIORITY_BADGE_COLORS[priority] || PRIORITY_BADGE_COLORS.low

export const getSLARiskColor = (risk) => SLA_RISK_COLORS[risk] || SLA_RISK_COLORS.low

export const getSLARisk = (eta, status) => {
  if (status === 'delivered') return null
  const now = new Date()
  const etaDate = new Date(eta)
  const hoursUntilETA = (etaDate - now) / (1000 * 60 * 60)
  
  if (hoursUntilETA < 2) return 'high'
  if (hoursUntilETA < 6) return 'medium'
  return 'low'
}

export const formatNumber = (num) => num.toLocaleString()

export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const getInitials = (name) => name?.split(' ').map(n => n[0]).join('') || ''

export const getCoordinatesForCity = (cityName) => {
  const normalized = String(cityName || '').trim().toUpperCase()
  if (normalized.includes('LAGOS')) return { lat: 6.5244, lng: 3.3792 }
  if (normalized.includes('ABUJA')) return { lat: 9.0765, lng: 7.3986 }
  if (normalized.includes('PORT HARCOURT') || normalized.includes('HARCOURT')) return { lat: 4.8156, lng: 7.0498 }
  if (normalized.includes('KANO')) return { lat: 12.0022, lng: 8.5920 }
  if (normalized.includes('WARRI')) return { lat: 5.5167, lng: 5.7500 }
  if (normalized.includes('BENIN')) return { lat: 6.3350, lng: 5.6269 }
  if (normalized.includes('ENUGU')) return { lat: 6.4281, lng: 7.4951 }
  if (normalized.includes('IBADAN')) return { lat: 7.3775, lng: 3.9470 }
  if (normalized.includes('LOKOJA')) return { lat: 7.8024, lng: 6.7333 }
  if (normalized.includes('ILORIN')) return { lat: 8.4799, lng: 4.5418 }
  if (normalized.includes('KADUNA')) return { lat: 10.5105, lng: 7.4165 }
  // Fallback to Abuja coordinates
  return { lat: 9.0765, lng: 7.3986 }
}