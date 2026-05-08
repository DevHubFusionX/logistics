import { TrendingUp, DollarSign } from 'lucide-react'

export default function RevenueTrendChart({ data }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue))
  const minRevenue = Math.min(...data.map(d => d.revenue))
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">₦{(totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-gray-500">Total Revenue</p>
        </div>
      </div>
      <div className="relative h-56">
        <svg className="w-full h-full">
          {[0, 25, 50, 75, 100].map((p) => (
            <line key={p} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#e5e7eb" strokeWidth="1" />
          ))}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,100% ${data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100
              const y = 100 - ((d.revenue - minRevenue) / (maxRevenue - minRevenue)) * 100
              return `${x}%,${y}%`
            }).join(' ')} 100%,100%`}
            fill="url(#revenueGradient)"
          />
          <polyline
            points={data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100
              const y = 100 - ((d.revenue - minRevenue) / (maxRevenue - minRevenue)) * 100
              return `${x}%,${y}%`
            }).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100
            const y = 100 - ((d.revenue - minRevenue) / (maxRevenue - minRevenue)) * 100
            return <circle key={i} cx={`${x}%`} cy={`${y}%`} r="4" fill="#3b82f6" />
          })}
        </svg>
        <div className="flex justify-between mt-3 text-xs text-gray-600 font-medium">
          {data.map((d, i) => (
            <span key={i}>{d.month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
