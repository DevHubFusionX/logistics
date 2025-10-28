import { Calendar, MapPin, Filter, RefreshCw } from 'lucide-react'

export default function PageHeader({ 
  title, 
  subtitle, 
  showFilters = false, 
  filters = {},
  onFilterChange = () => {} 
}) {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-1.5">{subtitle}</p>}
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <MapPin className="w-4 h-4 text-gray-500" />
              <select 
                value={filters.location || ''}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="">All Locations</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="kano">Kano</option>
                <option value="port-harcourt">Port Harcourt</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select 
                value={filters.dateRange || ''}
                onChange={(e) => onFilterChange('dateRange', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                value={filters.warehouse || ''}
                onChange={(e) => onFilterChange('warehouse', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              >
                <option value="">All Warehouses</option>
                <option value="main">Main Warehouse</option>
                <option value="north">North Hub</option>
                <option value="south">South Hub</option>
              </select>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}