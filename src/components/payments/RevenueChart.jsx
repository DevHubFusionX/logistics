import { TrendingUp } from 'lucide-react'

export default function RevenueChart({ data }) {
  const maxAmount = Math.max(...data.map(d => d.amount))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
        Weekly Revenue Trend
      </h3>
      
      <div className="relative h-48">
        <svg className="w-full h-full">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={`${percent}%`}
              x2="100%"
              y2={`${percent}%`}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Bars */}
          {data.map((d, i) => {
            const barHeight = (d.amount / maxAmount) * 100
            const x = (i / data.length) * 100 + 5
            const width = (100 / data.length) - 10
            
            return (
              <g key={i}>
                <rect
                  x={`${x}%`}
                  y={`${100 - barHeight}%`}
                  width={`${width}%`}
                  height={`${barHeight}%`}
                  fill="#10b981"
                  rx="4"
                />
              </g>
            )
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-around mt-2 text-xs text-gray-500">
          {data.map((d, i) => (
            <span key={i}>{d.date}</span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center border-t pt-3">
        <div>
          <div className="text-xs text-gray-500">Highest</div>
          <div className="text-sm font-semibold text-gray-900">₦{Math.max(...data.map(d => d.amount)).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Average</div>
          <div className="text-sm font-semibold text-gray-900">
            ₦{Math.round(data.reduce((sum, d) => sum + d.amount, 0) / data.length).toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Lowest</div>
          <div className="text-sm font-semibold text-gray-900">₦{Math.min(...data.map(d => d.amount)).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
