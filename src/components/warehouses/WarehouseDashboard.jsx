import { ArrowLeft, Package, TrendingUp, Clock, AlertTriangle } from 'lucide-react'

export default function WarehouseDashboard({ warehouse, onBack }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{warehouse.name}</h1>
            <p className="text-sm sm:text-base text-gray-600 truncate">{warehouse.location}</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Capacity Utilization</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{warehouse.utilization}%</p>
            </div>
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Inbound Today</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{warehouse.inbound}</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Outbound Today</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{warehouse.outbound}</p>
            </div>
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Avg Dwell Time</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{warehouse.dwellTime} days</p>
            </div>
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Top SKUs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Top SKUs by Volume</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {warehouse.topSkus?.map((sku, index) => (
              <div key={sku.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{sku.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 truncate">{sku.description}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs sm:text-sm font-medium text-gray-900">{sku.quantity.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">units</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exceptions */}
      {warehouse.exceptions > 0 && (
        <div className="bg-white rounded-lg border border-red-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-red-200 bg-red-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-semibold text-red-900">Active Exceptions ({warehouse.exceptions})</h3>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3">
              {warehouse.exceptionDetails?.map((exception) => (
                <div key={exception.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-red-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-red-900">{exception.type}</div>
                    <div className="text-xs sm:text-sm text-red-700">{exception.description}</div>
                  </div>
                  <div className="text-xs sm:text-sm text-red-600 flex-shrink-0">{exception.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}