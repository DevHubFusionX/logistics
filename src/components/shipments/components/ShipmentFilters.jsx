import { Search, Filter } from 'lucide-react'
import { FILTER_OPTIONS } from '../../../constants/mockData'

export default function ShipmentFilters({ filters, onFilterChange, onClearFilters }) {

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          <span>Filters</span>
        </h3>
        <button
          onClick={onClearFilters}
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Shipment ID, Customer..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {FILTER_OPTIONS.status.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={filters.priority || ''}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {FILTER_OPTIONS.priority.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select
            value={filters.dateRange || ''}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {FILTER_OPTIONS.dateRange.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}