import { Truck, Activity } from 'lucide-react'

export default function FleetUsageChart({ data }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Truck className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Fleet Usage</h3>
      </div>
      <div className="flex items-center justify-center h-56">
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="90" fill="#10b981" />
          <circle cx="110" cy="110" r="90" fill="#f59e0b" strokeDasharray="565 565" strokeDashoffset="113" stroke="#f59e0b" fill="none" strokeWidth="90" />
          <circle cx="110" cy="110" r="90" fill="#ef4444" strokeDasharray="565 565" strokeDashoffset="283" stroke="#ef4444" fill="none" strokeWidth="90" />
          <text x="110" y="110" textAnchor="middle" dy=".3em" className="text-3xl font-bold" fill="#1f2937">
            {data.active}%
          </text>
          <text x="110" y="135" textAnchor="middle" className="text-xs" fill="#6b7280">
            Active
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
          <p className="text-lg font-bold text-green-600">{data.active}%</p>
          <p className="text-xs text-gray-600">Active</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
          <p className="text-lg font-bold text-yellow-600">{data.idle}%</p>
          <p className="text-xs text-gray-600">Idle</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
          <p className="text-lg font-bold text-red-600">{data.maintenance}%</p>
          <p className="text-xs text-gray-600">Maintenance</p>
        </div>
      </div>
    </div>
  )
}
