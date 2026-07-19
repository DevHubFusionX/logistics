import { useState, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal, ChevronDown, Check, RotateCcw } from 'lucide-react'

const GROUP_OPTIONS = [
  { value: 'none', label: 'No Grouping' },
  { value: 'status', label: 'Group by Status' },
  { value: 'goodsType', label: 'Group by Goods Type' },
  { value: 'destination', label: 'Group by Destination' },
]

export default function BookingSearchBar({
  searchQuery,
  searchAllLocations,
  onSearchChange,
  onToggleSearchAll,
  groupBy = 'none',
  onGroupByChange,
  filters = {},
  onFiltersChange
}) {
  const [showGroup, setShowGroup] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const groupRef = useRef(null)
  const filterRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (groupRef.current && !groupRef.current.contains(event.target)) {
        setShowGroup(false)
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeGroupLabel = GROUP_OPTIONS.find(o => o.value === groupBy)?.label || 'Group by'

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const resetFilters = () => {
    onFiltersChange({
      paymentStatus: 'all',
      isFragile: 'all',
      isPerishable: 'all',
      truckSize: 'all'
    })
  }

  const hasActiveFilters = 
    (filters.paymentStatus && filters.paymentStatus !== 'all') ||
    (filters.isFragile && filters.isFragile !== 'all') ||
    (filters.isPerishable && filters.isPerishable !== 'all') ||
    (filters.truckSize && filters.truckSize !== 'all')

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-100 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative">
      <div className="flex flex-wrap items-center gap-4 flex-1">
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-lg">
          <span className="text-xs font-semibold text-slate-600">Search all location</span>
          <button
            type="button"
            onClick={onToggleSearchAll}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
              searchAllLocations ? 'bg-sky-600' : 'bg-slate-300'
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
              searchAllLocations ? 'translate-x-4' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Search input */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by order no. or customer's details"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Group By Dropdown */}
        <div className="relative" ref={groupRef}>
          <button
            onClick={() => setShowGroup(!showGroup)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 border text-sm font-semibold rounded-lg transition-colors ${
              groupBy !== 'none'
                ? 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-800'
            }`}
          >
            {activeGroupLabel} <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showGroup && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                Group Bookings By
              </div>
              {GROUP_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onGroupByChange(opt.value)
                    setShowGroup(false)
                  }}
                  className="flex items-center justify-between w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span>{opt.label}</span>
                  {groupBy === opt.value && <Check className="w-4 h-4 text-sky-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 border text-sm font-semibold rounded-lg transition-colors ${
              hasActiveFilters
                ? 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filter
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-sky-600" />
            )}
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-100 rounded-xl shadow-xl z-20 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filters</span>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Payment Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Payment Status</label>
                <select
                  value={filters.paymentStatus || 'all'}
                  onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-slate-50 text-slate-700 focus:outline-none focus:border-sky-500"
                >
                  <option value="all">All Payment Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Fragile */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Fragility</label>
                <select
                  value={filters.isFragile || 'all'}
                  onChange={(e) => handleFilterChange('isFragile', e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-slate-50 text-slate-700 focus:outline-none focus:border-sky-500"
                >
                  <option value="all">All</option>
                  <option value="fragile">Fragile Only</option>
                  <option value="non_fragile">Non-Fragile Only</option>
                </select>
              </div>

              {/* Perishable */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Perishability</label>
                <select
                  value={filters.isPerishable || 'all'}
                  onChange={(e) => handleFilterChange('isPerishable', e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-slate-50 text-slate-700 focus:outline-none focus:border-sky-500"
                >
                  <option value="all">All</option>
                  <option value="perishable">Perishable Only</option>
                  <option value="non_perishable">Non-Perishable Only</option>
                </select>
              </div>

              {/* Truck Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Vehicle Capacity</label>
                <select
                  value={filters.truckSize || 'all'}
                  onChange={(e) => handleFilterChange('truckSize', e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-slate-50 text-slate-700 focus:outline-none focus:border-sky-500"
                >
                  <option value="all">All capacities</option>
                  <option value="5">5 Ton</option>
                  <option value="10">10 Ton</option>
                  <option value="15">15 Ton</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
