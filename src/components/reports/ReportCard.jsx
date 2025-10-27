import { Download, Mail } from 'lucide-react'

export default function ReportCard({ report, onExport, onSchedule }) {
  const IconComponent = report.icon

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`${report.color} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button 
            onClick={onExport}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={onSchedule}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 truncate">{report.title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{report.description}</p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{report.metrics}</span>
        <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium whitespace-nowrap">
          View →
        </button>
      </div>
    </div>
  )
}