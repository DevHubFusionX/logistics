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