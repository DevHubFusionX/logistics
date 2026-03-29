import React, { useState, useRef, useEffect } from 'react'
import { 
  Search, ChevronDown, ListFilter, 
  ArrowUpAZ, ArrowDownZA, ArrowUpNarrowWide, 
  ArrowDownWideNarrow, Check, X 
} from 'lucide-react'

const sortOptions = [
  { value: 'date', label: 'Shipment Date' },
  { value: 'company', label: 'Company Name' },
  { value: 'revenue', label: 'Financial Revenue' },
  { value: 'pickup', label: 'Pickup Point' },
  { value: 'delivery', label: 'Delivery Point' },
  { value: 'fleet', label: 'Fleet Partner' },
  { value: 'default', label: 'Default (Newest First)', icon: X }
]

export default function OrdersTableControls({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder
}) {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentSortLabel = sortOptions.find(opt => opt.value === sortField)?.label || 'Sort System'

  return (
    <div className="flex flex-col xl:flex-row gap-4 w-full">
      {/* Primary Search & Status Bar */}
      <div className="flex-1 bg-white rounded-[24px] border border-gray-100 p-1.5 flex flex-col md:flex-row items-center gap-3 shadow-xl shadow-gray-200/40 w-full">
        <div className="relative w-full md:flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search company, fleet, goods, or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border-none rounded-[18px] focus:ring-0 font-medium placeholder:text-gray-400 text-gray-700 text-xs sm:text-sm"
          />
        </div>
        
        <div className="flex items-center bg-gray-50/80 p-1 rounded-[18px] border border-gray-100 w-full md:w-auto overflow-x-auto no-scrollbar">
          {['all', 'Fulfilled', 'Unfulfilled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-[14px] text-xs font-black capitalize transition-all duration-300 whitespace-nowrap ${
                statusFilter === status 
                  ? 'bg-white text-blue-600 shadow-sm shadow-gray-200/50' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Specialty Sorting Component (Custom Premium UI) */}
      <div className="flex items-center gap-2 w-full xl:w-auto">
        <div className="relative flex-1 xl:flex-none" ref={dropdownRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full xl:w-auto flex items-center gap-3 px-4 py-2.5 bg-gray-900 hover:bg-black rounded-[20px] transition-all shadow-lg shadow-gray-900/20 group"
          >
            <ListFilter className="w-4 h-4 text-blue-400" />
            <div className="flex flex-col items-start pr-4 border-r border-gray-700">
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Sort By</span>
              <span className="text-[11px] font-bold text-white whitespace-nowrap leading-none">{currentSortLabel}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isSortOpen ? 'rotate-180 text-white' : ''}`} />
          </button>

          {/* Custom Dropdown Menu */}
          {isSortOpen && (
            <div className="absolute top-full left-0 mt-2 w-full xl:w-64 bg-white rounded-[24px] shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 gap-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      if (opt.value === 'default') {
                        setSortField('date')
                        setSortOrder('desc')
                      } else {
                        setSortField(opt.value)
                      }
                      setIsSortOpen(false)
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-[16px] transition-all ${
                      (sortField === opt.value || (opt.value === 'default' && sortField === 'date' && sortOrder === 'desc'))
                        ? 'bg-blue-50 text-blue-700' 
                        : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                       {opt.icon && <opt.icon className="w-3.5 h-3.5 opacity-50" />}
                       <span className="text-xs font-bold">{opt.label}</span>
                    </div>
                    {(sortField === opt.value || (opt.value === 'default' && sortField === 'date' && sortOrder === 'desc')) && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center justify-center w-12 h-12 bg-white hover:shadow-xl border border-gray-100 rounded-[20px] transition-all group shrink-0 shadow-lg shadow-gray-200/50"
          title={`Order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
        >
          {sortOrder === 'asc' ? (
            <div className="flex flex-col items-center">
              {sortField === 'company' || sortField === 'pickup' || sortField === 'delivery' || sortField === 'fleet' ? (
                <ArrowUpAZ className="w-5 h-5 text-blue-600" />
              ) : (
                <ArrowUpNarrowWide className="w-5 h-5 text-blue-600" />
              )}
              <span className="text-[8px] font-black uppercase text-blue-400 mt-0.5">
                {sortField === 'date' ? 'Oldest' : 'Asc'}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {sortField === 'company' || sortField === 'pickup' || sortField === 'delivery' || sortField === 'fleet' ? (
                <ArrowDownZA className="w-5 h-5 text-amber-600" />
              ) : (
                <ArrowDownWideNarrow className="w-5 h-5 text-amber-600" />
              )}
              <span className="text-[8px] font-black uppercase text-amber-400 mt-0.5">
                {sortField === 'date' ? 'Newest' : 'Desc'}
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
