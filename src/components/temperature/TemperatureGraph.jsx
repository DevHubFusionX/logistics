import { useState } from 'react'
import { Activity, Thermometer, TrendingUp, TrendingDown } from 'lucide-react'
import { temperatureHistory } from './temperatureData'

export default function TemperatureGraph() {
  const [selectedTruck, setSelectedTruck] = useState('DRA-017')
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const data = temperatureHistory[selectedTruck] || []

  const maxTemp = Math.max(...data.map(d => d.temp), 10)
  const minTemp = Math.min(...data.map(d => d.temp), 0)
  const range = maxTemp - minTemp || 1
  const currentTemp = data[data.length - 1]?.temp
  const prevTemp = data[data.length - 2]?.temp
  const tempChange = currentTemp - prevTemp
  const avgTemp = (data.reduce((sum, d) => sum + d.temp, 0) / data.length).toFixed(1)

  const getColor = (temp) => {
    if (temp < 3) return '#3b82f6'
    if (temp > 6) return '#ef4444'
    return '#10b981'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Temperature Chart</h3>
              <p className="text-xs text-gray-600">Real-time monitoring</p>
            </div>
          </div>
          <select 
            value={selectedTruck}
            onChange={(e) => setSelectedTruck(e.target.value)}
            className="text-sm border-2 border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold text-gray-700 shadow-sm hover:border-blue-300 transition-colors"
          >
            <option value="DRA-017">DRA-017</option>
            <option value="DRA-023">DRA-023</option>
          </select>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
            <div className="text-xs font-medium text-gray-600 mb-1">Current</div>
            <div className="text-2xl font-bold" style={{ color: getColor(currentTemp) }}>{currentTemp}°C</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
            <div className="text-xs font-medium text-gray-600 mb-1">Average</div>
            <div className="text-2xl font-bold text-purple-600">{avgTemp}°C</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-3 border border-orange-200">
            <div className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
              Change
              {tempChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            </div>
            <div className={`text-2xl font-bold ${tempChange > 0 ? 'text-orange-600' : 'text-blue-600'}`}>
              {tempChange > 0 ? '+' : ''}{tempChange?.toFixed(1)}°C
            </div>
          </div>
        </div>

        <div className="relative h-56 bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 border border-gray-200">
          <svg className="w-full h-full" onMouseLeave={() => setHoveredPoint(null)}>
            <defs>
              <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {[0, 25, 50, 75, 100].map((percent) => (
              <g key={percent}>
                <line x1="5%" y1={`${percent}%`} x2="95%" y2={`${percent}%`} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                <text x="2%" y={`${percent}%`} fill="#9ca3af" fontSize="10" dominantBaseline="middle">
                  {(maxTemp - (percent / 100) * range).toFixed(0)}°
                </text>
              </g>
            ))}
            
            <polygon
              points={`5%,100% ${data.map((d, i) => {
                const x = 5 + (i / (data.length - 1)) * 90
                const y = 100 - ((d.temp - minTemp) / range) * 100
                return `${x}%,${y}%`
              }).join(' ')} 95%,100%`}
              fill="url(#tempGradient)"
            />
            
            <polyline
              points={data.map((d, i) => {
                const x = 5 + (i / (data.length - 1)) * 90
                const y = 100 - ((d.temp - minTemp) / range) * 100
                return `${x}%,${y}%`
              }).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {data.map((d, i) => {
              const x = 5 + (i / (data.length - 1)) * 90
              const y = 100 - ((d.temp - minTemp) / range) * 100
              return (
                <g key={i}>
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r={hoveredPoint === i ? "6" : "4"}
                    fill="white"
                    stroke={getColor(d.temp)}
                    strokeWidth="3"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(i)}
                  />
                  {hoveredPoint === i && (
                    <g>
                      <rect x={`${x - 15}%`} y={`${y - 35}%`} width="30%" height="25%" rx="4" fill="#1f2937" opacity="0.95" />
                      <text x={`${x}%`} y={`${y - 25}%`} fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">
                        {d.temp}°C
                      </text>
                      <text x={`${x}%`} y={`${y - 15}%`} fill="#d1d5db" fontSize="9" textAnchor="middle">
                        {d.time}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
          
          <div className="flex justify-between mt-3 px-2">
            {data.map((d, i) => (
              <span key={i} className="text-xs font-medium text-gray-600">{d.time}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
