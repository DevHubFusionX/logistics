import { Download, Calendar, Filter } from 'lucide-react'
import ReportCard from './ReportCard'
import { prebuiltReports } from './reportsData'

export default function PrebuiltReports({ onExport, onSchedule }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Calendar className="w-4 h-4" />
            <span>Schedule Reports</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <select className="border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm flex-1 sm:flex-initial">
            <option>All Categories</option>
            <option>Performance</option>
            <option>Financial</option>
            <option>Operational</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {prebuiltReports.map((report) => (
          <ReportCard 
            key={report.id} 
            report={report} 
            onExport={onExport}
            onSchedule={onSchedule}
          />
        ))}
      </div>
    </div>
  )
}