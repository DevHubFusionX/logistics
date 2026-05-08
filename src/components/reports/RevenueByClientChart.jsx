import { DollarSign } from 'lucide-react'

export default function RevenueByClientChart({ data }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-green-500" />
        Revenue by Client
      </h3>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.client}</span>
              <span className="font-semibold">₦{(item.revenue / 1000000).toFixed(2)}M</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all" 
                style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
