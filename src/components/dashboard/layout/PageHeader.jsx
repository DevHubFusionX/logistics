import { Calendar, MapPin, Filter } from 'lucide-react'

export default function PageHeader({ 
  title, 
  subtitle, 
  showFilters = false, 
  filters = {},
  onFilterChange = () => {} 
}) {
  return (
    <div className="mb-4 sm:mb-6">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm sm:text-base text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Context Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
          {/* Location Filter */}
          <div className="flex items-center gap-2 flex-1 min-w-0 sm:flex-initial">
            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <select 
              value={filters.location || ''}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 min-w-0"
            >
              <option value="">All Locations</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="port-harcourt">Port Harcourt</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2 flex-1 min-w-0 sm:flex-initial">
            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <select 
              value={filters.dateRange || ''}
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
              className="border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 min-w-0"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          {/* Warehouse Filter */}
          <div className="flex items-center gap-2 flex-1 min-w-0 sm:flex-initial">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <select 
              value={filters.warehouse || ''}
              onChange={(e) => onFilterChange('warehouse', e.target.value)}
              className="border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 min-w-0"
            >
              <option value="">All Warehouses</option>
              <option value="main">Main Warehouse</option>
              <option value="north">North Hub</option>
              <option value="south">South Hub</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}