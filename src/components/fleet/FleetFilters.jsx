import { Plus } from 'lucide-react'

export default function FleetFilters({ filters, onFilterChange, onClear, onAddTruck }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by Truck ID or Plate..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="flex-1 min-w-[250px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
        <select
          value={filters.status || ''}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="on_trip">On Trip</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button
          onClick={onClear}
          className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Clear
        </button>
        <button
          onClick={onAddTruck}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Truck
        </button>
      </div>
    </div>
  )
}
