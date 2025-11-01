// Color system constants
const createColorClasses = (color) => ({
  bg: `bg-${color}-50`,
  text: `text-${color}-600`,
  icon: `text-${color}-500`,
  border: `border-${color}-200`
})

export const COLORS = Object.fromEntries(
  ['blue', 'green', 'indigo', 'purple', 'emerald', 'orange', 'violet', 'red', 'gray', 'yellow']
    .map(color => [color, createColorClasses(color)])
)

export const BADGE_COLORS = {
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  error: 'bg-red-500 text-white'
}

export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  available: 'bg-green-100 text-green-800',
  'en route': 'bg-blue-100 text-blue-800',
  idle: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-gray-100 text-gray-800'
}

export const FUEL_THRESHOLDS = {
  HIGH: 50,
  MEDIUM: 25
}

export const PRIORITY_COLORS = {
  low: 'text-gray-600',
  medium: 'text-yellow-600',
  high: 'text-orange-600',
  urgent: 'text-red-600'
}

export const PRIORITY_BADGE_COLORS = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
}

export const SLA_RISK_COLORS = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600'
}

export const SEVERITY_COLORS = {
  success: 'text-green-600 bg-green-50 border-green-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  error: 'text-red-600 bg-red-50 border-red-200'
}

export const ICON_COLORS = {
  success: 'text-green-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500',
  error: 'text-red-500'
}