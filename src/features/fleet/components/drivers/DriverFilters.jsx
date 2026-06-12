import { Plus } from 'lucide-react'

export default function DriverFilters({ 
  searchTerm, 
  onSearchChange, 
  filterStatus, 
  onStatusChange,
  onClear,
  onAddDriver 
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by name or license..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 min-w-[250px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="on_trip">On Trip</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={onClear}
          className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Clear
        </button>
        <button 
          onClick={onAddDriver}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Driver
        </button>
      </div>
    </div>
  )
}
