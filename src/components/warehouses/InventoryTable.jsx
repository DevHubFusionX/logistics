import { AlertCircle, Package, MapPin } from 'lucide-react'

export default function InventoryTable({ inventory }) {
  const getStockStatus = (current, reorderPoint) => {
    if (current <= reorderPoint) return { status: 'Low Stock', color: 'text-red-600 bg-red-50' }
    if (current <= reorderPoint * 1.5) return { status: 'Warning', color: 'text-yellow-600 bg-yellow-50' }
    return { status: 'In Stock', color: 'text-green-600 bg-green-50' }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Inventory Overview</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Reorder</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventory.map((item) => {
              const stockStatus = getStockStatus(item.currentStock, item.reorderPoint)
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.sku}</div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center text-xs sm:text-sm text-gray-900">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">{item.currentStock.toLocaleString()}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 hidden sm:table-cell">{item.reorderPoint.toLocaleString()}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                      {item.currentStock <= item.reorderPoint && <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />}
                      <span className="truncate">{stockStatus.status}</span>
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 hidden md:table-cell">{item.lastUpdated}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}