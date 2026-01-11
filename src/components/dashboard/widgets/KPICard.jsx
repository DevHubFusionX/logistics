import { memo } from 'react'

function KPICard({ 
  title, 
  value, 
  unit = '', 
  change, 
  period = '24h',
  sparklineData = [],
  onClick,
  color = 'blue'
}) {
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500'
  }

  const max = Math.max(...sparklineData)
  const min = Math.min(...sparklineData)

  return (
    <div 
      onClick={onClick} 
      className="group relative bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${colorMap[color]}`} />
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        {change !== undefined && change !== 0 && (
          <span className={`text-xs font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'}{Math.abs(change)}%
          </span>
        )}
      </div>
      
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-sm font-semibold text-gray-400">{unit}</span>}
      </div>

      {sparklineData.length > 0 && (
        <div className="h-10 mb-1">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`var(--${color})`} stopOpacity="0.2" />
                <stop offset="100%" stopColor={`var(--${color})`} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M ${sparklineData.map((val, i) => {
                const x = (i / (sparklineData.length - 1)) * 100
                const y = 100 - ((val - min) / (max - min || 1)) * 80
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')} L 100 100 L 0 100 Z`}
              fill={`url(#grad-${title})`}
            />
            <path
              d={sparklineData.map((val, i) => {
                const x = (i / (sparklineData.length - 1)) * 100
                const y = 100 - ((val - min) / (max - min || 1)) * 80
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')}
              fill="none"
              stroke="currentColor"
              className={`text-${color}-500`}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      <p className="text-xs text-gray-400">vs {period}</p>
    </div>
  )
}

export default memo(KPICard)
