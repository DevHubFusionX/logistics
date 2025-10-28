export default function MetricCard({ 
  title, 
  value, 
  icon: Icon,
  sparklineData = [],
  unit = '',
  color = 'blue'
}) {
  const colorMap = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', stroke: '#3b82f6' },
    green: { bg: 'bg-green-500', text: 'text-green-500', stroke: '#22c55e' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', stroke: '#f97316' },
    red: { bg: 'bg-red-500', text: 'text-red-500', stroke: '#ef4444' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', stroke: '#a855f7' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-500', stroke: '#06b6d4' },
    gray: { bg: 'bg-gray-500', text: 'text-gray-500', stroke: '#6b7280' }
  }

  const colors = colorMap[color] || colorMap.blue
  const max = sparklineData.length > 0 ? Math.max(...sparklineData) : 0
  const min = sparklineData.length > 0 ? Math.min(...sparklineData) : 0

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${colors.bg}`} />
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        {Icon && (
          <div className={`p-2 rounded-lg ${colors.bg} bg-opacity-10 flex-shrink-0`}>
            <Icon className={`w-4 h-4 ${colors.text}`} />
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-sm font-semibold text-gray-400">{unit}</span>}
      </div>

      {sparklineData.length > 0 && (
        <div className="h-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`grad-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.2" />
                <stop offset="100%" stopColor={colors.stroke} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M ${sparklineData.map((val, i) => {
                const x = (i / (sparklineData.length - 1)) * 100
                const y = 100 - ((val - min) / (max - min || 1)) * 80
                return `${x} ${y}`
              }).join(' L ')} L 100 100 L 0 100 Z`}
              fill={`url(#grad-${title.replace(/\s+/g, '-')})`}
            />
            <polyline
              points={sparklineData.map((val, i) => {
                const x = (i / (sparklineData.length - 1)) * 100
                const y = 100 - ((val - min) / (max - min || 1)) * 80
                return `${x},${y}`
              }).join(' ')}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
