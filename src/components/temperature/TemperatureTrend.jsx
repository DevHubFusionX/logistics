import { TrendingUp, TrendingDown, Thermometer, Activity } from 'lucide-react'

export default function TemperatureTrend() {
  const trendData = [
    { truck: 'DRA-017', current: 22, avg: 21.5, trend: 'up', change: 0.5, status: 'normal', sparkline: [21, 21.2, 21.5, 21.8, 22] },
    { truck: 'DRA-023', current: 18, avg: 18.2, trend: 'down', change: -0.2, status: 'normal', sparkline: [18.5, 18.4, 18.3, 18.1, 18] },
    { truck: 'DRA-031', current: 25, avg: 22.0, trend: 'up', change: 3.0, status: 'warning', sparkline: [22, 22.5, 23.5, 24.2, 25] },
    { truck: 'DRA-045', current: 20, avg: 20.1, trend: 'down', change: -0.1, status: 'normal', sparkline: [20.3, 20.2, 20.1, 20.1, 20] },
    { truck: 'DRA-052', current: 19, avg: 19.5, trend: 'down', change: -0.5, status: 'normal', sparkline: [20, 19.8, 19.6, 19.3, 19] }
  ]

  const getStatusStyle = (status) => {
    return status === 'warning' 
      ? 'bg-gradient-to-br from-orange-500 to-red-500' 
      : 'bg-gradient-to-br from-green-500 to-emerald-500'
  }

  const getTempGradient = (temp) => {
    if (temp < 20) return 'from-blue-500 to-cyan-500'
    if (temp > 24) return 'from-orange-500 to-red-500'
    return 'from-green-500 to-emerald-500'
  }

  const renderSparkline = (data, trend) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const width = 80
    const height = 24
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((val - min) / range) * height
      return `${x},${y}`
    }).join(' ')

    return (
      <svg width={width} height={height} className="opacity-70">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Temperature Trends
            </h3>
            <p className="text-sm text-gray-600 mt-1">24h comparison with mini charts</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {trendData.map((item) => (
            <div key={item.truck} className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent opacity-50" />
              <div className="relative flex items-center gap-4 p-4">
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${getTempGradient(item.current)} flex items-center justify-center shadow-lg`}>
                  <div className="text-center">
                    <Thermometer className="w-6 h-6 text-white mx-auto mb-0.5" />
                    <div className="text-white font-bold text-sm">{item.current}°C</div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900 text-lg">{item.truck}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold text-white shadow-sm ${getStatusStyle(item.status)}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500">Avg:</span>
                      <span className="font-semibold text-gray-700">{item.avg}°C</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-blue-500" />
                      )}
                      <span className={`font-bold ${item.trend === 'up' ? 'text-orange-600' : 'text-blue-600'}`}>
                        {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}°C
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`flex-shrink-0 ${item.trend === 'up' ? 'text-orange-500' : 'text-blue-500'}`}>
                  {renderSparkline(item.sparkline, item.trend)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
