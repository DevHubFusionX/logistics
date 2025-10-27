import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const Sparkline = ({ data = [], color = '#2563eb' }) => {
  if (!data.length) return null
  
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg className="w-16 h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        className="opacity-70"
      />
    </svg>
  )
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  trend = 'neutral',
  sparklineData = [],
  unit = '',
  detail,
  colorblindSafe = true
}) {
  const [showDetail, setShowDetail] = useState(false)
  
  const trendConfig = {
    up: { 
      icon: TrendingUp, 
      color: colorblindSafe ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50',
      sparkColor: colorblindSafe ? '#2563eb' : '#059669'
    },
    down: { 
      icon: TrendingDown, 
      color: colorblindSafe ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50',
      sparkColor: colorblindSafe ? '#ea580c' : '#dc2626'
    },
    neutral: { 
      icon: Minus, 
      color: 'text-gray-600 bg-gray-50',
      sparkColor: '#6b7280'
    }
  }
  
  const config = trendConfig[trend]
  const TrendIcon = config.icon
  
  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-all duration-200 cursor-pointer relative"
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${value}${unit}${change ? `, ${change > 0 ? 'up' : 'down'} ${Math.abs(change)}%` : ''}`}
    >
      <div className="flex items-start justify-between mb-1 sm:mb-2 gap-2">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 truncate flex-1">{title}</h3>
        {sparklineData.length > 0 && (
          <div className="hidden sm:block flex-shrink-0">
            <Sparkline data={sparklineData} color={config.sparkColor} />
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
            {typeof value === 'number' ? value.toLocaleString() : value}
            {unit && <span className="text-xs sm:text-sm font-normal text-gray-500 ml-1">{unit}</span>}
          </p>
          
          {change !== undefined && (
            <div className={`inline-flex items-center gap-1 mt-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${config.color}`}>
              <TrendIcon className="w-3 h-3 flex-shrink-0" />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Hover Detail - Hidden on mobile */}
      {showDetail && detail && (
        <div className="hidden sm:block absolute z-10 mt-2 p-2 sm:p-3 bg-gray-900 text-white text-xs sm:text-sm rounded-lg shadow-lg animate-fade-in max-w-xs left-0 right-0">
          {detail}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
        </div>
      )}
    </div>
  )
}