import { Thermometer, AlertTriangle, Activity, WifiOff, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TemperatureWidget() {
  const navigate = useNavigate()

  const stats = [
    { label: 'Active Monitoring', value: '5', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Temperature Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Offline Sensors', value: '1', icon: WifiOff, color: 'text-gray-500', bg: 'bg-gray-50' },
  ]

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => navigate('/temperature')}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-sm">
            <Thermometer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Temperature Monitoring</h3>
            <p className="text-sm text-gray-500">Real-time cold chain tracking</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className={`${stat.bg} rounded-lg p-4 border border-gray-100`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs font-medium text-gray-600">{stat.label}</span>
              </div>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
