import { Download, Mail } from 'lucide-react'

const savedReports = [
  'Weekly Performance Summary', 
  'Cost Analysis by Route', 
  'Driver Efficiency Report'
]

export default function SavedReports() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Saved Custom Reports</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All →
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedReports.map((reportName, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{reportName}</h4>
              <div className="flex gap-1">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Download className="w-3 h-3" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Mail className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500">Last updated: 2 hours ago</p>
          </div>
        ))}
      </div>
    </div>
  )
}