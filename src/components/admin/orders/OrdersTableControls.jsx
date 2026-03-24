import React from 'react'
import { Search, Download, RefreshCw, Truck } from 'lucide-react'

export default function OrdersTableControls({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter 
}) {
  return (
    <div className="bg-white rounded-[20px] border border-gray-100 p-1.5 flex flex-col lg:flex-row items-center gap-3 shadow-sm">
      <div className="relative w-full lg:flex-1 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search company, fleet, goods, or location..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border-none rounded-[16px] focus:ring-0 font-medium placeholder:text-gray-400 text-gray-700 text-xs sm:text-sm"
        />
      </div>
      
      <div className="flex items-center bg-gray-50/80 p-1 rounded-[16px] border border-gray-100 w-full lg:w-auto lg:mr-1 overflow-x-auto no-scrollbar">
        {['all', 'fulfilled', 'unfulfilled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex-1 lg:flex-none px-4 py-2 rounded-[12px] text-xs font-bold capitalize transition-all duration-300 whitespace-nowrap ${
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
  )
}
