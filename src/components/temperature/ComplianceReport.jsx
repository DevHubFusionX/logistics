import { FileText } from 'lucide-react'

export default function ComplianceReport({ reports }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-3 sm:p-4 border-b">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          Temperature Compliance Report
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip ID</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Temp</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Temp</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Within Range</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.tripId} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{report.tripId}</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{report.duration}</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{report.minTemp}°C</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{report.maxTemp}°C</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[60px]">
                      <div 
                        className={`h-2 rounded-full transition-all ${report.withinRange === 100 ? 'bg-green-500' : report.withinRange >= 90 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${report.withinRange}%` }}
                      />
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${
                      report.withinRange === 100 ? 'text-green-600' : 
                      report.withinRange >= 90 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {report.withinRange}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
